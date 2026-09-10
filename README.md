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

## Deploy to Vercel

1. Import `https://github.com/airlinesj/theRunhouse` in Vercel.
2. Keep the detected framework as Next.js and use the default root directory.
3. Add `NEXT_PUBLIC_SITE_URL` with the final Vercel URL or custom domain.
4. Deploy. No other environment variables are required.

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
