// Centralized HTTP client for the Yala backend (Spring Boot, base path /api/v1),
// built on Axios. Responsibilities:
//   - Prefix every request with the configured baseURL.
//   - Attach the JWT access token as `Authorization: Bearer <token>`.
//   - On 401, transparently refresh the access token (POST /auth/refresh-token)
//     and retry the original request once. Concurrent 401s share one refresh.
//   - Normalize backend errors into ApiError (status + code + message + details).
//   - Support request cancellation via AbortController (`signal`).

import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from './tokens.js';

// Default to a same-origin relative base ('/api/v1') so the Vite dev proxy
// (see vite.config.js) forwards to the backend without CORS. Override with
// VITE_API_BASE_URL for an absolute URL (e.g. production deploy).
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message || 'Error de conexión con el servidor');
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// The Axios instance every service shares.
const http = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' },
});

// A bare instance for the refresh call, so it never re-enters the interceptors
// (which would loop on a failing refresh).
const refreshHttp = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' },
});

// --- Request interceptor: attach the bearer token --------------------------
http.interceptors.request.use((config) => {
  // Per-request opt-out for public endpoints (login/register/refresh).
  if (config.auth === false) return config;
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Refresh coordination: one in-flight refresh shared across 401s --------
let refreshPromise = null;

async function tryRefresh() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  if (!refreshPromise) {
    refreshPromise = refreshHttp
      .post('/auth/refresh-token', { refreshToken })
      .then(({ data }) => {
        setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        return true;
      })
      .catch(() => {
        clearTokens();
        return false;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

// --- Response interceptor: refresh-on-401 + error normalization ------------
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // Network / cancelled / no-response errors -> normalize without a status.
    if (!response) {
      if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
        // Propagate cancellation so callers can ignore it (AbortController).
        return Promise.reject(error);
      }
      return Promise.reject(
        new ApiError(0, 'NETWORK_ERROR', 'No pudimos conectar con el servidor. Revisa tu conexión.'),
      );
    }

    // Transparent refresh + single retry on 401.
    if (response.status === 401 && config && config.auth !== false && !config._retry) {
      const refreshed = await tryRefresh();
      if (refreshed) {
        config._retry = true;
        return http.request(config);
      }
    }

    // Backend ErrorResponse shape: { code, message, status, path, timestamp }.
    const data = response.data;
    const code = (data && (data.code || data.error)) || `HTTP_${response.status}`;
    const message = (data && data.message) || response.statusText;
    return Promise.reject(new ApiError(response.status, code, message, data));
  },
);

// --- Public surface: keep the same shape services already use --------------
// Each method returns the parsed response body (res.data), and forwards
// `signal`, `params`, `headers`, `auth`, etc. via `opts`.
export const api = {
  get: (path, opts) => http.get(path, opts).then((r) => r.data),
  post: (path, body, opts) => http.post(path, body, opts).then((r) => r.data),
  put: (path, body, opts) => http.put(path, body, opts).then((r) => r.data),
  patch: (path, body, opts) => http.patch(path, body, opts).then((r) => r.data),
  del: (path, opts) => http.delete(path, opts).then((r) => r.data),
};

export { BASE_URL, http };
