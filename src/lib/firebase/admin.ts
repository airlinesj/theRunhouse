import "server-only";

import {
  cert,
  getApps,
  initializeApp,
  type App,
  type ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Firebase Admin access to the ABX Motion / theRunhouse shared project.
 *
 * The mobile app writes marathons, registrations, splits and community runs
 * into Firestore under the `docucraft-cd41b` project. Firestore rules require
 * a signed-in user for reads, so the public website must read server-side with
 * a service account (Admin SDK bypasses rules).
 *
 * Configure one of:
 *   A) FIREBASE_SERVICE_ACCOUNT  — full service-account JSON as a single string
 *      (recommended for Vercel; paste the JSON, keep the \n escapes).
 *   B) FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY
 *      (private key with literal "\n" sequences).
 *   C) GOOGLE_APPLICATION_CREDENTIALS — path to a key file (local dev only).
 */
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID ?? "docucraft-cd41b";

function loadServiceAccount(): ServiceAccount | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw && raw.trim().length > 0) {
    const parsed = JSON.parse(raw) as ServiceAccount & { private_key?: string };
    if (typeof parsed.private_key === "string") {
      parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
    }
    return parsed;
  }

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (clientEmail && privateKey) {
    return {
      projectId: PROJECT_ID,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    };
  }

  return null;
}

/** True when the site has enough config to talk to Firestore. */
export function isFirebaseConfigured(): boolean {
  return loadServiceAccount() !== null || Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);
}

let cachedApp: App | null = null;

function getApp(): App {
  if (cachedApp) return cachedApp;

  const existing = getApps();
  if (existing.length > 0) {
    cachedApp = existing[0];
    return cachedApp;
  }

  const account = loadServiceAccount();
  cachedApp = account
    ? initializeApp({ credential: cert(account), projectId: PROJECT_ID })
    : initializeApp({ projectId: PROJECT_ID });
  return cachedApp;
}

let cachedDb: Firestore | null = null;

/** Lazily-initialised Firestore instance (throws if unconfigured). */
export function getDb(): Firestore {
  if (cachedDb) return cachedDb;
  cachedDb = getFirestore(getApp());
  return cachedDb;
}
