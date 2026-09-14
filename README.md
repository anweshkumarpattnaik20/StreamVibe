# StreamVibe

StreamVibe is a polished movie and TV discovery experience built with React, Vite, and Tailwind CSS. It includes cinematic browsing, search, rich title details, season and episode information, a persistent watchlist, plan comparison, and an accessible support flow.

The app is useful immediately after installation: when TMDB credentials are not configured, it automatically uses a curated demo catalog instead of showing broken or empty screens.

## Highlights

- Responsive movie and series browsing with genre filters
- Search across titles, genres, cast members, and descriptions
- Detailed title pages with cast, crew, reviews, trailers, and recommendations
- Season and episode exploration for television series
- Browser-persisted watchlist
- Accessible dialogs, keyboard navigation, focus states, and reduced-motion support
- Safe support form that never transmits data unless an endpoint is configured
- Route-level code splitting and resilient artwork fallbacks

## Local development

Requirements: Node.js 20.19 or newer (Node.js 22.12+ recommended) and npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local address printed by Vite. TMDB credentials are optional.

## Environment variables

```env
VITE_TMDB_API_KEY=
VITE_TMDB_BEARER=
VITE_SUPPORT_ENDPOINT=
```

Set either `VITE_TMDB_API_KEY` or `VITE_TMDB_BEARER` to use live catalog data. Create credentials from the [TMDB API settings](https://www.themoviedb.org/settings/api).

`VITE_SUPPORT_ENDPOINT` is optional. When omitted, the support form validates input and displays a local preview without sending personal information anywhere. If configured, use an HTTPS endpoint that accepts JSON.

## Quality checks

```bash
npm run check
```

This runs the full lint and production-build checks. To inspect the production build locally:

```bash
npm run preview
```

## Deployment

The included `vercel.json` provides single-page application rewrites for Vercel. Add production environment variables in the hosting dashboard rather than committing a `.env` file.

## Data attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.
# StreamVibe
# StreamVibe
