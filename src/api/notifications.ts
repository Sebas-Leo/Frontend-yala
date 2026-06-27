// Notifications service — maps to the Notifications tag in openapi.yaml.
//   GET /notifications                 (paginado)
//   GET /notifications/unread-count    -> { count: number }
//   PUT /notifications/{id}/read
//   PUT /notifications/read-all        -> { updated: number }

import { api } from './client';
import type { PageQuery, ReqOpts } from '../types';

export function listNotifications({ page = 0, size = 20, sort, signal }: PageQuery = {}) {
  const params: any = { page, size };
  if (sort) params.sort = sort;
  return api.get('/notifications', { params, signal });
}

export function getUnreadCount({ signal }: ReqOpts = {}) {
  return api.get('/notifications/unread-count', { signal });
}

export function markRead(id: number | string) {
  return api.put(`/notifications/${id}/read`);
}

export function markAllRead() {
  return api.put('/notifications/read-all');
}
