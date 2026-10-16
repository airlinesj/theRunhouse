import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Outbound webhook dispatch.
 *
 * When OUTBOUND_WEBHOOK_URL is set, events are delivered as a JSON POST with:
 *   x-motion-event:     event type, e.g. "run.public.updated"
 *   x-motion-timestamp: unix seconds
 *   x-motion-signature: hex HMAC-SHA256 of `${timestamp}.${body}` (when
 *                       WEBHOOK_SIGNING_SECRET is configured)
 *
 * Receivers should recompute the signature over `${timestamp}.${rawBody}` and
 * compare in constant time (see verifyWebhookSignature).
 */

export type WebhookEventType =
  | "run.public.updated"
  | "registration.updated"
  | "webhook.received"
  | (string & {});

export interface WebhookDelivery {
  delivered: boolean;
  status?: number;
  reason?: string;
}

export function signWebhook(secret: string, timestamp: string, body: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

/** Constant-time comparison of a signature header against the expected value. */
export function verifyWebhookSignature(
  secret: string,
  timestamp: string,
  body: string,
  signature: string,
): boolean {
  if (!secret || !signature) return false;
  const expected = signWebhook(secret, timestamp, body);
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Fire-and-forget an event to the configured outbound webhook. Never throws. */
export async function emitEvent(
  type: WebhookEventType,
  payload: unknown,
): Promise<WebhookDelivery> {
  const url = process.env.OUTBOUND_WEBHOOK_URL;
  if (!url) return { delivered: false, reason: "no-url" };

  const secret = process.env.WEBHOOK_SIGNING_SECRET ?? "";
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const body = JSON.stringify({
    type,
    sentAt: new Date().toISOString(),
    payload,
  });

  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-motion-event": type,
    "x-motion-timestamp": timestamp,
  };
  if (secret) {
    headers["x-motion-signature"] = signWebhook(secret, timestamp, body);
  }

  try {
    const res = await fetch(url, { method: "POST", headers, body });
    return { delivered: res.ok, status: res.status };
  } catch (error) {
    console.error("[webhooks/dispatch] delivery failed", error);
    return { delivered: false, reason: "request-failed" };
  }
}
