// Images service — maps to the Images tag in openapi.yaml.
//   GET    /listings/{listingId}/images   (público)
//   POST   /listings/{listingId}/images   (multipart, dueño, máx 5 por listing)
//   DELETE /images/{imageId}              (dueño)

import { api } from './client.js';

export function listImages(listingId, { signal } = {}) {
  return api.get(`/listings/${listingId}/images`, { signal });
}

// Uploads a single file. Axios sets the multipart boundary automatically for FormData.
export function uploadImage(listingId, file, sortOrder) {
  const form = new FormData();
  form.append('file', file);
  const params = sortOrder != null ? { sortOrder } : undefined;
  return api.post(`/listings/${listingId}/images`, form, { params });
}

export function deleteImage(imageId) {
  return api.del(`/images/${imageId}`);
}
