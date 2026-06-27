// Shared types for the Yala frontend.
// DTOs from the backend are kept intentionally loose (the API layer returns
// `any`-friendly shapes); these types cover the option bags and paginated
// envelopes that flow through the app, plus a few domain unions.

export type Role = 'USER' | 'SELLER' | 'ADMIN';
export type ListingMode = 'FIXED' | 'AUCTION';
export type AuctionStatus = 'ACTIVE' | 'ENDED' | 'CANCELLED';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

// Common request options: every service forwards an AbortSignal for cancellation.
export interface ReqOpts {
  signal?: AbortSignal;
}

// Pagination + filtering options for list endpoints. The index signature lets
// callers pass extra filters (category, condition, q, mode, …) freely.
export interface PageQuery extends ReqOpts {
  page?: number;
  size?: number;
  sort?: string;
  [key: string]: any;
}

// Spring Data Page<T> response envelope.
export interface Page<T = any> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  [key: string]: any;
}

// Tokens returned by the auth endpoints.
export interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

// --- Realtime DTOs (STOMP broadcasts) -------------------------------------
// Field names mirror the backend records EXACTLY — do not rename. The legacy
// JS client used `bidCount`/`winnerName`, which the backend never sends.

// Nested detail of the most recent bid (com.yala.dto.auction.LatestBidInfo).
export interface LatestBidInfo {
  user: string;
  amount: number;
  placedAt: string; // ISO LocalDateTime, e.g. "2026-05-19T14:32:00"
}

// Broadcast on /topic/auction/{id} on every new bid and when the auction ends
// (com.yala.dto.auction.AuctionUpdateMessage).
export interface AuctionUpdateMessage {
  auctionId: number;
  currentPrice: number;
  totalBids: number;
  status: 'ACTIVE' | 'FINISHED' | 'CANCELLED';
  latestBid: LatestBidInfo | null;
  winnerUsername: string | null; // present only when status === 'FINISHED'
}

// --- Live streaming DTOs (com.yala.dto.live.*) ----------------------------

export type LiveStatus = 'LIVE' | 'ENDED';
export type FlashAuctionStatus = 'ACTIVE' | 'SOLD' | 'DESERTED';

export interface LiveSummary {
  id: number;
  title: string;
  status: LiveStatus;
  coverImageUrl: string | null;
  sellerName: string | null;
  sellerId: number | null;
  startedAt: string;
}

export interface FlashAuction {
  id: number;
  liveStreamId: number;
  title: string;
  basePrice: number;
  bidIncrement: number;
  currentPrice: number | null;
  status: FlashAuctionStatus;
  winnerName: string | null;
  totalBids: number;
  startedAt: string;
}

export interface LiveDetail {
  id: number;
  title: string;
  status: LiveStatus;
  roomName: string;
  coverImageUrl: string | null;
  startedAt: string;
  endedAt: string | null;
  seller: { id: number; name: string; isVerifiedSeller?: boolean } | null;
  activeAuction: FlashAuction | null;
}

export interface LiveToken {
  streamId: number;
  roomName: string;
  url: string;
  token: string;
}

export interface LiveComment {
  id: number;
  text: string;
  createdAt: string;
  userName: string | null;
  userId: number | null;
}

// Broadcast on /topic/live/{id} (com.yala.dto.live.LiveUpdateMessage).
export interface LiveUpdateMessage {
  type: 'AUCTION_STARTED' | 'BID' | 'AUCTION_CLOSED' | 'LIVE_ENDED';
  auction: FlashAuction | null;
}
