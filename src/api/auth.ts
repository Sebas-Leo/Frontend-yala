// Auth service — maps to the real backend contract (openapi.yaml):
//   POST /auth/login          (RequestLoginDTO)    -> ResponseAuthDTO
//   POST /auth/register       (RequestRegisterDTO) -> ResponseAuthDTO
//   POST /auth/refresh-token  (handled in client.js interceptor)
//   GET  /users/me            -> ResponseUserDTO (full session profile)
//
// Note: there is NO /register-store endpoint. A store/seller signs up through
// the same /register passing role: 'SELLER'.

import { api } from './client';
import { setTokens, clearTokens, getAccessToken } from './tokens';

// ResponseAuthDTO -> minimal session user (full profile comes from getCurrentUser)
function fromAuthDto(dto: any) {
  return { id: dto.userId, email: dto.email, name: dto.name, role: dto.role };
}

export async function login({ email, password }: { email: string; password: string }) {
  const dto = await api.post('/auth/login', { email, password }, { auth: false });
  setTokens(dto);
  return fromAuthDto(dto);
}

export async function register({ name, email, password, role = 'USER' }: { name: string; email: string; password: string; role?: string }) {
  const dto = await api.post('/auth/register', { name, email, password, role }, { auth: false });
  setTokens(dto);
  return fromAuthDto(dto);
}

// Full session profile: ResponseUserDTO { id, name, email, avatarUrl, reputation, isVerifiedSeller, role }
export function getCurrentUser() {
  return api.get('/users/me');
}

export function logout() {
  clearTokens();
}

export const hasSession = () => !!getAccessToken();
