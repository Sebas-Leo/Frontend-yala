// Haptic feedback via the Vibration API. A thin, safe wrapper: where the API
// is unavailable (notably iOS Safari) every call is a silent no-op, so callers
// can fire haptics unconditionally without feature-checking at the call site.

const supported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

function vibrate(pattern) {
  if (!supported) return false;
  try {
    return navigator.vibrate(pattern);
  } catch {
    return false;
  }
}

export const haptics = {
  // Light tap: your bid was registered.
  bidPlaced: () => vibrate(20),
  // Double buzz: someone outbid you on a live auction.
  outbid: () => vibrate([40, 60, 40]),
  // Celebratory pattern: you won the auction.
  won: () => vibrate([60, 40, 120]),
};
