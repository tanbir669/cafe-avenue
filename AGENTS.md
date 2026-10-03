# Cafe Avenue — Base44 Dev Environment

## Overview
A static cafe marketing website ("Cafe Avenue") exported from Caffeine.ai. React 19 + Vite 5 + Tailwind CSS 3. The `src/frontend/` directory is the Vite project root.

## Key Facts
- **App is purely static** — `App.tsx` is presentational only (hardcoded menu, reviews, photos). No backend calls at runtime.
- The ICP/Motoko backend (`src/backend/main.mo`) and `InternetIdentityProvider` in `main.tsx` are part of the Caffeine.ai export but are NOT used by the UI. The identity provider will log a harmless "CANISTER_ID_BACKEND is not set" error on mount; this does not crash the app.
- **Images** live in `frontend/public/assets/uploads/` (at repo root, NOT in `src/frontend/public/`). Vite's `publicDir` is configured to point there.
- Fonts: `frontend/public/fonts/` is empty; `index.css` references `Figtree.woff2` which 404s — falls back to `sans-serif` gracefully.
- No external secrets or credentials are required.

## Running
```
docker compose -f docker-compose.base44.yml up -d --build
```
The Vite dev server runs on port 5173 inside the container, mapped to host port 3000. Dependencies are installed via pnpm on container startup.

## Package Manager
pnpm (workspace at repo root; `pnpm-workspace.yaml` includes `src/**/*`). Lockfile is `pnpm-lock.yaml` (lockfileVersion 9.0).

## Dev Server
Run from `src/frontend/`: `npx vite --host 0.0.0.0 --port 5173`. There is no `dev` script in `package.json` — invoke vite directly.
