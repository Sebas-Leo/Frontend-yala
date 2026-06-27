// Real-time channel for Yala over STOMP + SockJS.
//
// The Spring backend exposes a SockJS STOMP endpoint at `/ws`
// (WebSocketConfig.java) and broadcasts auction updates to
// `/topic/auction/{id}` on every new bid and when an auction closes
// (EventListeners.java). It also pushes per-user notifications to
// `/topic/notifications/{userId}`. This module owns a single shared STOMP
// client and hands out topic subscriptions.
//
// We connect DIRECTLY to the backend (not through the Vite proxy): the backend
// allows all origins (`setAllowedOriginPatterns("*")`), so a cross-origin
// SockJS connection works the same in dev and on the static Amplify build —
// unlike the Didit BFF, there is no secret to hide here. Override the target
// with VITE_WS_URL (e.g. http://localhost:8081/ws for a local backend).

import { Client, type StompSubscription, type IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getAccessToken } from './tokens';

const WS_URL = import.meta.env.VITE_WS_URL || 'https://yala.dpdns.org/ws';

type Listener = (payload: unknown) => void;

interface TopicEntry {
  callbacks: Set<Listener>;
  sub: StompSubscription | null;
}

let client: Client | null = null;
const topics = new Map<string, TopicEntry>();

function authHeaders(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function openSubscription(topic: string, entry: TopicEntry): void {
  if (!client || !client.connected || entry.sub) return;
  entry.sub = client.subscribe(topic, (message: IMessage) => {
    let payload: unknown = null;
    try {
      payload = JSON.parse(message.body);
    } catch {
      payload = null;
    }
    entry.callbacks.forEach((cb) => cb(payload));
  });
}

function ensureClient(): Client {
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
export function subscribe<T = unknown>(topic: string, cb: (payload: T | null) => void): () => void {
  ensureClient();
  let entry = topics.get(topic);
  if (!entry) {
    entry = { callbacks: new Set(), sub: null };
    topics.set(topic, entry);
    openSubscription(topic, entry);
  }
  const listener = cb as Listener;
  entry.callbacks.add(listener);

  return () => {
    const current = topics.get(topic);
    if (!current) return;
    current.callbacks.delete(listener);
    if (current.callbacks.size === 0) {
      if (current.sub) {
        try {
          current.sub.unsubscribe();
        } catch {
          /* already gone */
        }
        current.sub = null;
      }
      topics.delete(topic);
    }
  };
}

// Convenience wrapper for the live auction channel.
export function subscribeAuction<T = unknown>(auctionId: number | string, cb: (payload: T | null) => void): () => void {
  return subscribe<T>(`/topic/auction/${auctionId}`, cb);
}

// Convenience wrapper for a user's personal notification channel.
export function subscribeNotifications<T = unknown>(userId: number | string, cb: (payload: T | null) => void): () => void {
  return subscribe<T>(`/topic/notifications/${userId}`, cb);
}

// Live stream state channel: flash-auction started/bid/closed and LIVE_ENDED
// (com.yala.dto.live.LiveUpdateMessage), broadcast on /topic/live/{id}.
export function subscribeLive<T = unknown>(streamId: number | string, cb: (payload: T | null) => void): () => void {
  return subscribe<T>(`/topic/live/${streamId}`, cb);
}

// Live chat channel: each new comment (com.yala.dto.live.ResponseLiveCommentDTO)
// is broadcast on /topic/live/{id}/chat.
export function subscribeLiveChat<T = unknown>(streamId: number | string, cb: (payload: T | null) => void): () => void {
  return subscribe<T>(`/topic/live/${streamId}/chat`, cb);
}
