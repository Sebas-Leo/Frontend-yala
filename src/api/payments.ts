// Payments service — maps to the Payments tag in openapi.yaml.
//   POST /payments/preference   (orden PENDING del buyer) -> { initPoint, preferenceId }
//
// The webhook (POST /payments/webhook) is server-to-server and not called from
// the browser.

import { api } from './client';

// body: { orderId } -> redirect the user to the returned initPoint.
export function createPreference(body: any) {
  return api.post('/payments/preference', body);
}
