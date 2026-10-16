# theRunhouse

A modern running club marketing site for young adults in Norton, built around social runs, city energy, and community momentum.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Environment variables

This project does not require any API keys for local development, but these variables are recommended for deployment and custom metadata:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Set `NEXT_PUBLIC_SITE_URL` to the production deployment URL so sitemap and metadata generation point at the correct domain.

### Firebase (live app data)

Marathons, registrations, live splits and community runs are written into Firestore
by the ABX Motion mobile app (project `docucraft-cd41b`). Firestore rules require a
signed-in user for reads, so the public site reads **server-side with the Firebase
Admin SDK**. See `.env.example` for the full list. Configure one of:

- `FIREBASE_SERVICE_ACCOUNT` — whole service-account JSON as one string (best on Vercel)
- `FIREBASE_PROJECT_ID` + `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY`
- `GOOGLE_APPLICATION_CREDENTIALS` — path to a key file (local dev)

Without credentials the site still renders: dynamic sections quietly fall back to
their empty states instead of erroring.

`INGEST_API_KEY` protects the `/api/ingest/*` endpoints, used for timing-chip or
backfill data. Send it as `Authorization: Bearer <INGEST_API_KEY>`.

## App data API

| Endpoint | Purpose |
| --- | --- |
| `GET /api/marathons` | All events (`?status=`, `?type=`) |
| `GET /api/marathons/[id]` | One event with live registration count |
| `GET /api/marathons/[id]/registrations` | Public registration list (no emails) |
| `GET /api/marathons/[id]/leaderboard` | Ranked results (finishers first) |
| `GET /api/marathons/[id]/live` | Live per-runner split feed (polled) |
| `GET /api/runs` | Community runs from every athlete who shares publicly |
| `GET /api/runs/[id]` | One community run with splits |
| `POST /api/ingest/marathon` | Push registration/splits (bearer auth) |
| `POST /api/ingest/run` | Upsert a public run (bearer auth) |

The data contract lives in `src/lib/marathon/types.ts` and mirrors the Flutter
models in the app (`lib/features/marathon/models/*`, `lib/core/db/run_record.dart`).


## Deploy to Vercel

1. Import `https://github.com/airlinesj/theRunhouse` in Vercel.
2. Keep the detected framework as Next.js and use the default root directory.
3. Add `NEXT_PUBLIC_SITE_URL` with the final Vercel URL or custom domain.
4. Add the Firebase service account (`FIREBASE_SERVICE_ACCOUNT`) and `INGEST_API_KEY` to enable live app data.
5. Deploy.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — start the production server
- `npm run lint` — lint the project

## Production notes

- Uses App Router with metadata support and route-level loading/error states
- Includes structured data for organization and sports club schema
- Mobile navigation is implemented with a drawer pattern and accessible focus states
- Fonts use `next/font` with `display: "swap"` for faster first render performance
