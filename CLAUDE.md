# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # prisma generate && next build
npm run lint     # Run ESLint
```

Prisma (v7 — config lives in `prisma.config.ts`, not `schema.prisma`):
```bash
npx prisma migrate dev   # Run migrations and regenerate client (uses DIRECT_URL)
npx prisma generate      # Regenerate client after schema changes (output: src/generated/prisma)
npx prisma studio        # Open Prisma Studio GUI
```

No test suite is currently configured.

## Architecture

Next.js 16 App Router project for a travel agency (in Spanish), built as a reusable fullstack base rather than just a one-off site (see `project-context.md` for the original brief in Spanish). TypeScript, Tailwind CSS v4, Prisma 7 + PostgreSQL (Supabase), Zod validation, Supabase Storage for images.

### Route structure

- `src/app/layout.tsx` — root layout (fonts, global CSS, Vercel Analytics)
- `src/app/(public)/` — public site, wrapped in `PageShell` (max-w-6xl) via its own `layout.tsx`. Contains the landing page (`page.tsx`) and `/paquetes` (full package listing with filters).
- `src/app/admin/` — admin panel (`/admin/packages`, `/admin/packages/new`, `/admin/packages/[id]/edit`, `/admin/login`), protected by `middleware.ts`.

### Auth

Cookie-based, not a library. `middleware.ts` matches `/admin/:path*`, allows `/admin/login` through, and otherwise requires an `admin_session` cookie whose value equals `ADMIN_SESSION_SECRET`. `src/app/admin/login/actions.ts` sets/clears that cookie after checking `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars — there is no user table or hashing.

### Feature-based organization (`src/features/`)

Each feature follows a layered pattern, enforced strictly (see `project-context.md`):

```
features/<feature>/
  schemas.ts      — Zod schemas and inferred types
  repository.ts   — Direct Prisma DB calls only, no business logic
  service.ts      — Business logic, orchestrates repository calls, no knowledge of HTTP/FormData
  actions.ts       — Next.js Server Actions ("use server"), parses FormData, validates with Zod, calls service, revalidates paths, redirects
  components/     — React components specific to this feature
```

Flow: UI → Server Action → Service → Repository → Prisma → PostgreSQL. The UI never touches Prisma directly. Server Actions are used instead of API routes throughout (no public API / external clients needed); reach for an API route only if that changes.

Implemented features:
- **`packages`** — CRUD for travel packages (`title`, `image`, `months: Int[]`, `type: NACIONAL | INTERNACIONAL`). Fully wired to the database (no mocks). `service.ts` exposes both `listPackages()` (all, filterable by `month`/`type`/`title`) and `listPackagesPaginated()`. Image uploads go through `src/lib/storage.ts` (Supabase Storage `packages` bucket) — actions upload the file first, then persist the returned public URL.
- **`landing`** — presentational sections only (`Hero`, `Navbar`, `ServicesSection`, `CtaSection`, `ContactSection`), no schemas/repository/service/actions of its own. `PublicPackagesSection` (in `features/packages/components/`) is what actually renders live package data on the landing page.

### Shared UI components (`src/components/ui/`)

Reusable primitives: `Button`, `Input`, `Card`/`CardHeader`/`CardTitle`/`CardDescription`, `PageShell`. All exported from `src/components/ui/index.ts` barrel — import from `@/components/ui`, not individual files.

### Database

- Prisma client is generated to `src/generated/prisma/` (not the default `node_modules/.prisma`) — re-run `npx prisma generate` after schema changes.
- Singleton pattern in `src/lib/db.ts` using `PrismaPg` adapter over a `pg.Pool`, connecting via `DATABASE_URL` (Supabase pooler, used at runtime).
- `prisma.config.ts` (Prisma 7 style, replaces the `datasource url` in `schema.prisma`) uses `DIRECT_URL` (non-pooled) for migrations.
- Single `Package` model: `id` (cuid), `title`, `image` (URL string), `months` (`Int[]`), `type` (`PackageType` enum: `NACIONAL`/`INTERNACIONAL`), `createdAt`.

### Environment variables

See `.env.example` for the full list: `DATABASE_URL`, `DIRECT_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_WHATSAPP_PHONE`, `NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

### Utility

- `src/lib/cn.ts` — `cn()` helper for merging Tailwind class names.
- `src/lib/storage.ts` — Supabase Storage upload/delete for package images.
- `src/lib/supabase-server.ts` — Supabase service-role client factory (server-only, uses `SUPABASE_SERVICE_ROLE_KEY`).
