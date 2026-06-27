// Auctions service — maps to the Auctions tag in openapi.yaml.
//   GET  /auctions          (active, paginated) -> PageResponseAuctionSummaryDTO
//   GET  /auctions/{id}      -> ResponseAuctionDTO (detail: currentPrice, winner, totalBids)
//   POST /auctions           (SELLER/ADMIN dueño del listing)

import { api } from './client';
import type { PageQuery, ReqOpts } from '../types';

export function listActiveAuctions({ page = 0, size = 12, sort, signal }: PageQuery = {}) {
  const params: any = { page, size };
  if (sort) params.sort = sort;
  return api.get('/auctions', { params, signal });
}

export function getAuction(id: number | string, { signal }: ReqOpts = {}) {
  return api.get(`/auctions/${id}`, { signal });
}

// body: { listingId, startingPrice, endsAt (ISO-8601) }
export function createAuction(body: any) {
  return api.post('/auctions', body);
}
