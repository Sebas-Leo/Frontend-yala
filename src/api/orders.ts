// Orders service — maps to the Orders tag in openapi.yaml.
//   POST /orders                 (compra directa de un listing FIXED) -> ResponseOrderDTO
//   GET  /orders/{id}             (buyer o seller involucrados)
//   GET  /orders/my-orders        (paginado, comprador autenticado)
//   PUT  /orders/{id}/confirm     (solo seller)
//   PUT  /orders/{id}/cancel      (buyer o seller, solo si PENDING)

import { api } from './client';
import type { PageQuery, ReqOpts } from '../types';

// body: { listingId }
export function createOrder(body: any) {
  return api.post('/orders', body);
}

export function getOrder(id: number | string, { signal }: ReqOpts = {}) {
  return api.get(`/orders/${id}`, { signal });
}

export function listMyOrders({ page = 0, size = 10, sort, signal }: PageQuery = {}) {
  const params: any = { page, size };
  if (sort) params.sort = sort;
  return api.get('/orders/my-orders', { params, signal });
}

export function confirmOrder(id: number | string) {
  return api.put(`/orders/${id}/confirm`);
}

export function cancelOrder(id: number | string) {
  return api.put(`/orders/${id}/cancel`);
}
