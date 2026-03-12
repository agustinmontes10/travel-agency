# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

Prisma:
```bash
npx prisma migrate dev   # Run migrations and regenerate client
npx prisma generate      # Regenerate client after schema changes (output: src/generated/prisma)
npx prisma studio        # Open Prisma Studio GUI
```

## Architecture

This is a **Next.js 16 App Router** project for a travel agency. It uses TypeScript, Tailwind CSS v4, Prisma with PostgreSQL (Supabase), and Zod for validation.

### Route structure

- `src/app/layout.tsx` — root layout (fonts, global CSS)
- `src/app/(public)/` — public-facing pages with `PageShell` wrapper (max-w-6xl centered layout)

The `(public)` route group wraps children in `PageShell` via its own `layout.tsx`.

### Feature-based organization (`src/features/`)

Each feature follows a layered pattern:

```
features/<feature>/
  schemas.ts      — Zod schemas and inferred types
  repository.ts   — Direct Prisma DB calls (raw data access)
  service.ts      — Business logic, orchestrates repository calls
  actions.ts      — Next.js Server Actions ("use server"), validates with Zod, calls service, revalidates paths
  components/     — React components specific to this feature
```

Currently implemented feature: **`packages`** — travel packages with title, image URL, and start date.

> **Note:** `service.ts` currently uses `MOCK_PACKAGES` instead of real DB calls. The `repo.findAll()` call is commented out. To enable real DB data, uncomment the repo call in `listPackages()`.

### Shared UI components (`src/components/ui/`)

Reusable primitives: `Button`, `Input`, `Card`/`CardHeader`/`CardTitle`/`CardDescription`, `PageShell`. All exported from `src/components/ui/index.ts` barrel.

### Database

- Prisma client is generated to `src/generated/prisma/` (not the default `node_modules/.prisma`)
- Singleton pattern in `src/lib/db.ts` using `PrismaPg` adapter for Supabase connection pooling
- Requires `DATABASE_URL` env var (Supabase pooler URL)
- Single `Package` model: `id` (cuid), `title`, `image` (URL string), `startDate`, `createdAt`

### Utility

- `src/lib/cn.ts` — `cn()` helper for merging Tailwind class names
