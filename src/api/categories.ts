// Categories service — maps to the Categories tag in openapi.yaml.
//   GET  /categories            -> ResponseCategoryDTO[]
//   POST /categories            (solo ADMIN)

import { api } from './client';
import type { ReqOpts } from '../types';

export function listCategories({ signal }: ReqOpts = {}) {
  return api.get('/categories', { signal });
}

// body: { name, description? }
export function createCategory(body: any) {
  return api.post('/categories', body);
}
