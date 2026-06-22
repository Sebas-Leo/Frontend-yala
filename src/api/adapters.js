// Pure DTO -> UI adapters. They translate the backend response shapes
// (openapi.yaml) into the props the design-system components expect, so the
// design system never has to change. Keep these pure and side-effect free.

import { timeAgo } from '../utils/format.js';

// Neutral 4:3 placeholder for listings/auctions with no uploaded image.
export const PLACEHOLDER_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#1b1b26"/><text x="50%" y="50%" fill="#5b5b6b" font-family="sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">Yala</text></svg>`,
  );

function firstImage(dto) {
  return (Array.isArray(dto?.imageUrls) && dto.imageUrls[0]) || PLACEHOLDER_IMG;
}

// ResponseUserDTO -> normalized seller/user.
export function userFromDto(dto) {
  if (!dto) return null;
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    avatarUrl: dto.avatarUrl || null,
    rating: dto.reputation != null ? Number(dto.reputation) : null,
    verified: !!dto.isVerifiedSeller,
    role: dto.role,
  };
}

// ResponseListingDTO -> normalized listing (used by detail screens).
export function listingFromDto(dto) {
  if (!dto) return null;
  const seller = userFromDto(dto.seller);
  const auction = dto.auction
    ? {
        id: dto.auction.id,
        currentPrice: Number(dto.auction.currentPrice ?? 0),
        endsAt: dto.auction.endsAt,
        status: dto.auction.status,
      }
    : null;
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description || '',
    mode: dto.mode,
    fixedPrice: dto.fixedPrice != null ? Number(dto.fixedPrice) : null,
    condition: dto.condition || '',
    status: dto.status,
    createdAt: dto.createdAt,
    category: dto.category?.name || '',
    categoryId: dto.category?.id ?? null,
    images: Array.isArray(dto.imageUrls) && dto.imageUrls.length ? dto.imageUrls : [PLACEHOLDER_IMG],
    image: firstImage(dto),
    seller,
    auction,
  };
}

// ResponseListingDTO (mode=AUCTION) -> props for <AuctionCard>.
export function auctionCardFrom(dto) {
  const seller = dto.seller || {};
  return {
    id: dto.id, // listingId — the auction screen navigates by listing id
    auctionId: dto.auction?.id ?? null,
    image: firstImage(dto),
    title: dto.title,
    currentBid: Number(dto.auction?.currentPrice ?? 0),
    bidsCount: dto.auction?.totalBids ?? 0,
    endsAt: dto.auction?.endsAt ?? null,
    status: dto.auction?.status ?? 'ACTIVE',
    sellerName: seller.name || '',
    sellerVerified: !!seller.isVerifiedSeller,
  };
}

// ResponseListingDTO (mode=FIXED) -> props for <ListingCard>.
export function listingCardFrom(dto) {
  const seller = dto.seller || {};
  return {
    id: dto.id,
    image: firstImage(dto),
    title: dto.title,
    condition: dto.condition || '',
    price: Number(dto.fixedPrice ?? 0),
    status: undefined, // keep the favorite slot free on the catalog
    sellerName: seller.name || '',
    sellerVerified: !!seller.isVerifiedSeller,
    sellerRating: seller.reputation != null ? Number(seller.reputation) : null,
  };
}

// ResponseOrderDTO -> normalized order row.
export function orderFromDto(dto, currentUserId) {
  if (!dto) return null;
  const listing = listingFromDto(dto.listing);
  const buyer = userFromDto(dto.buyer);
  const seller = userFromDto(dto.seller);
  // From the current user's perspective, who is the counterparty?
  const isSeller = currentUserId != null && seller && seller.id === currentUserId;
  return {
    id: dto.id,
    amount: Number(dto.amount ?? 0),
    status: dto.status,
    createdAt: dto.createdAt,
    listing,
    buyer,
    seller,
    role: isSeller ? 'seller' : 'buyer',
    party: isSeller ? buyer?.name : seller?.name,
    title: listing?.title || '',
    image: listing?.image || PLACEHOLDER_IMG,
  };
}

// ResponseReviewDTO -> normalized review.
export function reviewFromDto(dto) {
  if (!dto) return null;
  return {
    id: dto.id,
    rating: dto.rating,
    comment: dto.comment || '',
    createdAt: dto.createdAt,
    time: timeAgo(dto.createdAt),
    author: userFromDto(dto.author),
  };
}

// Notification type -> presentation (the DTO only carries type/message/isRead/createdAt).
const NOTIF_META = {
  BID_OUTBID: { tone: 'warning', icon: 'Gavel', title: '¡Te superaron!' },
  AUCTION_WON: { tone: 'live', icon: 'Gavel', title: '¡Ganaste la subasta!' },
  SALE_CONFIRMED: { tone: 'success', icon: 'Check', title: 'Venta confirmada' },
  NEW_BID: { tone: 'brand', icon: 'Gavel', title: 'Nueva puja en tu subasta' },
};

export function notificationFromDto(dto) {
  if (!dto) return null;
  const meta = NOTIF_META[dto.type] || { tone: 'neutral', icon: 'Bell', title: 'Notificación' };
  return {
    id: dto.id,
    type: dto.type,
    msg: dto.message,
    read: !!dto.isRead,
    time: timeAgo(dto.createdAt),
    createdAt: dto.createdAt,
    ...meta,
  };
}

// ResponseBidDTO -> bid history row.
export function bidFromDto(dto, leaderId) {
  if (!dto) return null;
  return {
    id: dto.id,
    user: dto.bidder?.name || 'Anónimo',
    bidderId: dto.bidder?.id ?? null,
    amount: Number(dto.amount ?? 0),
    time: timeAgo(dto.placedAt),
    leader: leaderId != null && dto.bidder?.id === leaderId,
  };
}
