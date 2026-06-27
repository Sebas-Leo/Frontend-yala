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
