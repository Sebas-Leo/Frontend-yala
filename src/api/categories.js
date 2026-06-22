// Categories service — maps to the Categories tag in openapi.yaml.
//   GET  /categories            -> ResponseCategoryDTO[]
//   POST /categories            (solo ADMIN)

import { api } from './client.js';

export function listCategories({ signal } = {}) {
  return api.get('/categories', { signal });
}

// body: { name, description? }
export function createCategory(body) {
  return api.post('/categories', body);
}
