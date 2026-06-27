// Listings service — maps to the Listings tag in openapi.yaml.
//   GET    /listings            (paginated, filterable)
//   GET    /listings/{id}
//   POST   /listings            (SELLER verificado o ADMIN)
//   PUT    /listings/{id}        (dueño)
//   DELETE /listings/{id}        (soft-delete, dueño)

import { api } from './client';
import type { PageQuery, ReqOpts } from '../types';

// Filters: category, mode (FIXED|AUCTION), condition, minPrice, maxPrice, q.
// Pagination: page (0-based), size, sort (e.g. 'createdAt,desc').
export function listListings({ page = 0, size = 12, sort, signal, ...filters }: PageQuery = {}) {
  const params: any = { page, size, ...filters };
  if (sort) params.sort = sort;
  return api.get('/listings', { params, signal });
}

export function getListing(id: number | string, { signal }: ReqOpts = {}) {
  return api.get(`/listings/${id}`, { signal });
}

export function createListing(body) {
  return api.post('/listings', body);
}

export function updateListing(id, body) {
  return api.put(`/listings/${id}`, body);
}

export function cancelListing(id) {
  return api.del(`/listings/${id}`);
}
