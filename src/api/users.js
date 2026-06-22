// Users service — maps to the Users tag in openapi.yaml.
//   GET /users/me               -> ResponseUserDTO (perfil de sesión)
//   PUT /users/me                (actualiza nombre/avatar)
//   GET /users/{id}              -> ResponseUserDTO (perfil público)
//   GET /users/{id}/listings     (paginado)
//
// Note: getCurrentUser also lives in auth.js (used by AuthContext). Kept here
// too so user-domain screens import from a single, cohesive module.

import { api } from './client.js';

export function getCurrentUser({ signal } = {}) {
  return api.get('/users/me', { signal });
}

// body: { name?, avatarUrl? } — null/omitted fields are ignored by the backend.
export function updateCurrentUser(body) {
  return api.put('/users/me', body);
}

export function getUser(id, { signal } = {}) {
  return api.get(`/users/${id}`, { signal });
}

export function getUserListings(id, { page = 0, size = 12, sort, signal } = {}) {
  const params = { page, size };
  if (sort) params.sort = sort;
  return api.get(`/users/${id}/listings`, { params, signal });
}
