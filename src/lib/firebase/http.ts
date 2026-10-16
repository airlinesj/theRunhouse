import "server-only";

import { NextResponse } from "next/server";

import { isFirebaseConfigured } from "@/lib/firebase/admin";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(
    { ok: true, data, generatedAt: new Date().toISOString() },
    { status: 200, ...init },
  );
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

/** Guard for routes that need Firestore access. Returns null when OK. */
export function requireFirebase(): NextResponse | null {
  if (!isFirebaseConfigured()) {
    return jsonError(
      "Firebase is not configured on the server. Set FIREBASE_SERVICE_ACCOUNT " +
        "or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY.",
      503,
    );
  }
  return null;
}

/** Shared bearer-secret check for ingest endpoints. */
export function isAuthorizedIngest(request: Request): boolean {
  const expected = process.env.INGEST_API_KEY;
  if (!expected) return false;
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  return token.length > 0 && token === expected;
}
