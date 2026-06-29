// Seller application service — maps to /api/v1/seller/application.
// A registered USER applies with their store data; the backend starts a Didit KYC
// session and returns a `diditUrl` to complete it. Approval (via Didit webhook)
// promotes the user to SELLER.

import { api } from './client';
import type { ReqOpts } from '../types';

export function applySeller(body: {
  storeName: string; address?: string; phone: string; cci: string;
}) {
  return api.post('/seller/application', body);
}

export function getMyApplication({ signal }: ReqOpts = {}) {
  return api.get('/seller/application/me', { signal });
}

// Public store data of a seller: { storeName, address }. 404 if no registered store.
export function getSellerStore(sellerId: number | string, { signal }: ReqOpts = {}) {
  return api.get(`/users/${sellerId}/store`, { signal });
}
