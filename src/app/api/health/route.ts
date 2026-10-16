import { isFirebaseConfigured } from "@/lib/firebase/admin";
import { jsonOk } from "@/lib/firebase/http";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/health
 * Deployment + integration status. Safe to expose publicly; reveals only which
 * capabilities are configured, never the secrets themselves.
 */
export async function GET() {
  return jsonOk({
    service: "therunhouse",
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev",
    environment: process.env.VERCEL_ENV ?? "local",
    integrations: {
      firebase: isFirebaseConfigured(),
      ingest: Boolean(process.env.INGEST_API_KEY),
      inboundWebhook: Boolean(process.env.INGEST_API_KEY || process.env.WEBHOOK_SIGNING_SECRET),
      outboundWebhook: Boolean(process.env.OUTBOUND_WEBHOOK_URL),
    },
  });
}
