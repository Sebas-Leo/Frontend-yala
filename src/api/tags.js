// Tags service — maps to the Tags tag in openapi.yaml.
//   GET    /tags          (público)
//   GET    /tags/{id}      (público)
//   POST   /tags          (ADMIN)
//   PUT    /tags/{id}      (ADMIN)
//   DELETE /tags/{id}      (ADMIN)

import { api } from './client.js';

export function listTags({ signal } = {}) {
  return api.get('/tags', { signal });
}

export function getTag(id, { signal } = {}) {
  return api.get(`/tags/${id}`, { signal });
}

// body: { name }
export function createTag(body) {
  return api.post('/tags', body);
}

export function updateTag(id, body) {
  return api.put(`/tags/${id}`, body);
}

export function deleteTag(id) {
  return api.del(`/tags/${id}`);
}
