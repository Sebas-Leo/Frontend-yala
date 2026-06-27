// Bids service — maps to the Bids tag in openapi.yaml.
//   POST /bids                              -> ResponseBidDTO
//   GET  /bids/auction/{auctionId}           (paginated history)
//   GET  /bids/auction/{auctionId}/highest   -> ResponseBidDTO

import { api } from './client';
import type { PageQuery, ReqOpts } from '../types';

// body: { auctionId, amount } — amount must be strictly greater than currentPrice.
export function placeBid(body: any) {
  return api.post('/bids', body);
}

export function listBids(auctionId: any, { page = 0, size = 20, sort, signal }: PageQuery = {}) {
  const params: any = { page, size };
  if (sort) params.sort = sort;
  return api.get(`/bids/auction/${auctionId}`, { params, signal });
}

export function getHighestBid(auctionId: any, { signal }: ReqOpts = {}) {
  return api.get(`/bids/auction/${auctionId}/highest`, { signal });
}
