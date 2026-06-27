// Live streams service — maps to the Live tag in the backend (/api/v1/live).
// Video/audio flows through LiveKit; bids, chat and auction state go through the
// backend (REST here + STOMP in realtime.ts).

import { api } from './client';
import type { PageQuery, ReqOpts } from '../types';

// ----- Streams -----

export function listLives({ page = 0, size = 12, signal }: PageQuery = {}) {
  return api.get('/live', { params: { page, size }, signal, auth: false });
}

export function getLive(id: number | string, { signal }: ReqOpts = {}) {
  return api.get(`/live/${id}`, { signal, auth: false });
}

// SELLER (verified): starts a broadcast. Returns { streamId, roomName, url, token } (publisher).
export function startLive(body: { title: string; coverImageUrl?: string | null }) {
  return api.post('/live', body);
}

export function endLive(id: number | string) {
  return api.post(`/live/${id}/end`);
}

// Subscribe-only token to watch a live. Public: works with or without a session.
export function watchToken(id: number | string) {
  return api.post(`/live/${id}/watch-token`);
}

// ----- Flash auctions -----

// body: { title, basePrice, bidIncrement? } — bidIncrement defaults to 1 on the backend.
export function createFlashAuction(streamId: number | string, body: any) {
  return api.post(`/live/${streamId}/auctions`, body);
}

export function closeFlashAuction(auctionId: number | string) {
  return api.post(`/live/auctions/${auctionId}/close`);
}

// ----- Bids -----

export function placeLiveBid(auctionId: number | string, amount: number) {
  return api.post(`/live/auctions/${auctionId}/bids`, { amount });
}

export function listLiveBids(auctionId: number | string, { page = 0, size = 20, signal }: PageQuery = {}) {
  return api.get(`/live/auctions/${auctionId}/bids`, { params: { page, size }, signal, auth: false });
}

// ----- Chat -----

export function listComments(streamId: number | string, { page = 0, size = 30, signal }: PageQuery = {}) {
  return api.get(`/live/${streamId}/comments`, { params: { page, size }, signal, auth: false });
}

export function postComment(streamId: number | string, text: string) {
  return api.post(`/live/${streamId}/comments`, { text });
}
