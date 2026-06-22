// Reviews service — maps to the Reviews tag in openapi.yaml.
//   POST /reviews                       (sobre una orden CONFIRMED) -> ResponseReviewDTO
//   GET  /reviews/user/{recipientId}     (paginado, reseñas recibidas)

import { api } from './client.js';

// body: { orderId, rating (1-5), comment }
export function createReview(body) {
  return api.post('/reviews', body);
}

export function listReviewsByUser(recipientId, { page = 0, size = 10, sort, signal } = {}) {
  const params = { page, size };
  if (sort) params.sort = sort;
  return api.get(`/reviews/user/${recipientId}`, { params, signal });
}
