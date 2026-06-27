// Single entry for the Yala design system inside the Vite app.
// Order matters: load.js runs the DS bundle (sets window.YalaDesignSystem_e5dc9e),
// then icons.jsx (window.Icon) and data.js (window.YData) register their globals.
import './load';
import './icons';
import './data';

const DS = (typeof window !== 'undefined' && window.YalaDesignSystem_e5dc9e) || {};

export const {
  Button, IconButton, Input, Textarea, Select, Checkbox, Radio, Switch,
  Badge, StatusBadge, Tag,
  Price, Avatar, ReputationStars, Countdown,
  Skeleton, CardSkeleton, EmptyState, OrderStepper, ORDER_STEPS, Dialog, Toast, DniGate,
  ListingCard, AuctionCard,
  Tabs, Pagination,
  ORDER_STATUS, AUCTION_STATUS, LISTING_STATUS,
} = DS;

export const Icon = (typeof window !== 'undefined' && window.Icon) || {};
export const YData = (typeof window !== 'undefined' && window.YData) || {};
export default DS;
