// Real-time channel for Yala over STOMP + SockJS.
//
// The Spring backend exposes a SockJS STOMP endpoint at `/ws`
// (WebSocketConfig.java) and broadcasts auction updates to
// `/topic/auction/{id}` on every new bid and when an auction closes
// (EventListeners.java). This module owns a single shared STOMP client and
// hands out topic subscriptions.
//
// We connect DIRECTLY to the backend (not through the Vite proxy): the backend
// allows all origins (`setAllowedOriginPatterns("*")`), so a cross-origin
// SockJS connection works the same in dev and on the static Amplify build —
// unlike the Didit BFF, there is no secret to hide here. Override the target
// with VITE_WS_URL (e.g. http://localhost:8081/ws for a local backend).

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getAccessToken } from './tokens.js';

const WS_URL = import.meta.env.VITE_WS_URL || 'https://yala.dpdns.org/ws';

let client = null;
// topic -> { callbacks: Set<fn>, sub: StompSubscription | null }
const topics = new Map();

function authHeaders() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function openSubscription(topic, entry) {
  if (!client || !client.connected || entry.sub) return;
  entry.sub = client.subscribe(topic, (message) => {
    let payload = null;
    try {
      payload = JSON.parse(message.body);
    } catch {
      payload = null;
    }
    entry.callbacks.forEach((cb) => cb(payload));
  });
}

function ensureClient() {
  if (client) return client;
  client = new Client({
    // SockJS needs an http(s) URL (not ws://); it negotiates the transport.
    webSocketFactory: () => new SockJS(WS_URL),
    connectHeaders: authHeaders(),
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    // @stomp/stompjs does NOT auto-resubscribe after a reconnect, so we
    // re-open every known subscription each time the connection comes up.
    onConnect: () => {
      topics.forEach((entry, topic) => {
        entry.sub = null;
        openSubscription(topic, entry);
      });
    },
  });
  client.activate();
  return client;
}

// Subscribe to a STOMP topic. The callback receives the parsed JSON payload
// (or null if the body was not JSON). Returns an unsubscribe function; the
// shared connection is kept warm so navigating between auctions doesn't churn
// the socket.
export function subscribe(topic, cb) {
  ensureClient();
  let entry = topics.get(topic);
  if (!entry) {
    entry = { callbacks: new Set(), sub: null };
    topics.set(topic, entry);
    openSubscription(topic, entry);
  }
  entry.callbacks.add(cb);

  return () => {
    entry.callbacks.delete(cb);
    if (entry.callbacks.size === 0) {
      if (entry.sub) {
        try {
          entry.sub.unsubscribe();
        } catch {
          /* already gone */
        }
        entry.sub = null;
      }
      topics.delete(topic);
    }
  };
}

// Convenience wrapper for the live auction channel.
export function subscribeAuction(auctionId, cb) {
  return subscribe(`/topic/auction/${auctionId}`, cb);
}

// Convenience wrapper for a user's personal notification channel.
export function subscribeNotifications(userId, cb) {
  return subscribe(`/topic/notifications/${userId}`, cb);
}
