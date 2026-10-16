import { isFirebaseConfigured, getDb } from "@/lib/firebase/admin";
import { isAuthorizedIngest, jsonError, jsonOk } from "@/lib/firebase/http";
import { emitEvent, verifyWebhookSignature } from "@/lib/webhooks/dispatch";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST /api/webhooks/inbound
 * Generic inbound webhook receiver for external providers (payments, timing
 * chips, partner systems).
 *
 * Auth (either):
 *   - Authorization: Bearer <INGEST_API_KEY>
 *   - x-motion-signature: <hex HMAC-SHA256 of `${x-motion-timestamp}.${rawBody}`>
 *     using WEBHOOK_SIGNING_SECRET
 *
 * The raw event is persisted to the `webhook_events` collection (when Firebase
 * is configured) and, if OUTBOUND_WEBHOOK_URL is set, forwarded downstream.
 */
export async function POST(request: Request) {
  const raw = await request.text();
  const timestamp = request.headers.get("x-motion-timestamp") ?? "";
  const signature = request.headers.get("x-motion-signature") ?? "";

  const bearerOk = isAuthorizedIngest(request);
  const signatureOk = verifyWebhookSignature(
    process.env.WEBHOOK_SIGNING_SECRET ?? "",
    timestamp,
    raw,
    signature,
  );

  if (!bearerOk && !signatureOk) {
    return jsonError("Unauthorized webhook request.", 401);
  }

  let payload: unknown;
  try {
    payload = raw.length > 0 ? JSON.parse(raw) : {};
  } catch {
    return jsonError("Invalid JSON body.", 400);
  }

  const eventType =
    typeof payload === "object" && payload !== null && "type" in payload
      ? String((payload as { type: unknown }).type)
      : "unknown";

  const record = {
    type: eventType,
    auth: bearerOk ? "bearer" : "signature",
    source: request.headers.get("x-motion-source") ?? request.headers.get("user-agent") ?? null,
    payload,
    receivedAt: new Date(),
  };

  if (isFirebaseConfigured()) {
    try {
      await getDb().collection("webhook_events").add(record);
    } catch (error) {
      console.error("[api/webhooks/inbound] failed to persist event", error);
    }
  }

  await emitEvent("webhook.received", record);

  return jsonOk({ received: true, type: eventType });
}
