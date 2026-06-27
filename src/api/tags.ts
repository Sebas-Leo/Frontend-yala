// Tags service — maps to the Tags tag in openapi.yaml.
//   GET    /tags          (público)
//   GET    /tags/{id}      (público)
//   POST   /tags          (ADMIN)
//   PUT    /tags/{id}      (ADMIN)
//   DELETE /tags/{id}      (ADMIN)

import { api } from './client';
import type { ReqOpts } from '../types';

export function listTags({ signal }: ReqOpts = {}) {
  return api.get('/tags', { signal });
}

export function getTag(id: number | string, { signal }: ReqOpts = {}) {
  return api.get(`/tags/${id}`, { signal });
}

// body: { name }
export function createTag(body: any) {
  return api.post('/tags', body);
}

export function updateTag(id: number | string, body: any) {
  return api.put(`/tags/${id}`, body);
}

export function deleteTag(id: number | string) {
  return api.del(`/tags/${id}`);
}
