# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack TypeScript monorepo boilerplate: **AdonisJS v7** backend, **TanStack Start** frontend, and a **Radix/Tailwind** design system. Managed with pnpm workspaces and Turborepo.

**Current branch**: `adonis-v7` (AdonisJS v7 pre-release — many packages use `-next` versions)

## Commands

### Root (monorepo)
```bash
pnpm dev              # docker compose up -d && turbo dev (starts everything)
pnpm lint             # oxlint across all workspaces
pnpm format           # oxfmt across all workspaces
pnpm typecheck        # turbo typecheck
pnpm test             # turbo test
```

### Backend (`apps/backend`)
```bash
node ace serve --hmr              # Dev server with hot module replacement
node ace test                     # Run all test suites
node ace test --files "app/**/tests/functional/auth.spec.ts"  # Single test file
node ace migration:run            # Run pending migrations
node ace db:seed                  # Seed database
node ace build                    # Production build
pnpm email                       # Preview React Email templates (dev server)
```

### Frontend (`apps/frontend`)
```bash
pnpm dev              # Vite dev server
pnpm build            # Production build
pnpm deploy           # Deploy to Cloudflare Workers (wrangler)
```

### Docker services (started automatically by `pnpm dev`)
- **PostgreSQL 18**: port 5432 (databases: `app`, `app_test`)
- **MinIO** (S3-compatible): port 9000 (API), 9001 (console)
- **Redis**: port 6379
- **Mailpit**: port 1025 (SMTP), 8025 (web UI)

## Architecture

### Monorepo layout
```
apps/backend          # @boilerplate/backend - AdonisJS v7 API
apps/frontend         # @boilerplate/frontend - TanStack Start SPA
packages/design-system # @boilerplate/design-system - Radix + Tailwind components
```

Shared dependency versions are managed via `pnpm-workspace.yaml` catalog (React 19, TypeScript 5.9, Tailwind 4, Tuyau).

### Type-safe API contract
**Tuyau** generates TypeScript types from AdonisJS controllers, consumed by the frontend via `@tuyau/react-query`. Changes to backend controllers require running `node ace tuyau:generate` to update the shared types exported from `@boilerplate/backend/registry`.

### Backend structure (AdonisJS v7)

Feature-based organization under `app/`:
- `app/auth/` — Auth controllers, middleware, services (session-based auth)
- `app/admin/` — Admin features (user management, impersonation)
- `app/users/` — User model and DTOs
- `app/core/` — Abilities, global middleware, exception handler, policies
- `app/common/` — Shared utilities

**Path aliases** use `#` prefix (Node.js subpath imports in package.json):
`#auth/*`, `#admin/*`, `#users/*`, `#core/*`, `#common/*`, `#config/*`, `#database/*`, `#start/*`, `#emails/*`

**Girouette** auto-discovers controllers (`**/*_controller.ts`) and generates routes in `start/routes.girouette.ts`. Manual routes live in `start/routes.ts`.

**Schema-first models**: `database/schema.ts` defines base schema classes (UserSchema, etc.) that models extend. Models add mixins like `withAuthFinder` and `withUUID`.

**Middleware stack** (in order):
- Server: container bindings → force JSON → CORS
- Router: Monocle → bodyparser → session → auth init → silent auth → bouncer
- Named: `auth`, `silentAuth`, `requireSecretToken`

**Testing**: Japa test runner with suites:
- Unit tests: `app/**/tests/unit/**/*.spec.ts` (2s timeout)
- Functional tests: `app/**/tests/functional/**/*.spec.ts` (30s timeout)
- Database is truncated before test runs. Functional/e2e suites start the HTTP server.

**Important**: Migrations are applied manually — never run `db:push` or auto-apply migrations.

### Frontend structure (TanStack Start)

- **Routing**: File-based via TanStack Router under `src/routes/`. Localized routes under `$locale/`.
- **Data fetching**: TanStack Query with Tuyau's React Query integration (`@tuyau/react-query`)
- **i18n**: Intlayer with prefix-all routing mode (English default, French supported). Content files in `src/contents/`.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Deployment**: Cloudflare Workers via Nitro adapter. SPA mode enabled.
- **Path alias**: `@/*` → `./src/*`

### Design system

Radix UI primitives styled with Tailwind and `class-variance-authority`. Follows shadcn/ui conventions (New York style, Zinc base color, CSS variables). 50+ components. Imports: `@boilerplate/design-system`.

## Code Style

Enforced by **oxlint** and **oxfmt** (Rust-based tooling):
- No semicolons, single quotes, trailing commas
- 100 char line width, arrow parens always
- Import sort order: descending
- Backend-specific: `node` plugin. Frontend-specific: `react`, `react-perf` plugins.
- Ignore patterns: `.adonisjs/**`, `node_modules/**`, `dist/**`, `build/**`

## CI

GitHub Actions (`checks.yml`) runs on PRs to `main`/`dev`:
1. `pnpm install` → `pnpm lint` → `pnpm typecheck` → `pnpm test` (with PostgreSQL + Mailpit services)
2. Trivy security scan on PRs

## Environment Variables

Backend env validation is in `apps/backend/start/env.ts`. Key groups: app config, database (PostgreSQL), session, S3 storage (MinIO locally), mail (Resend + SMTP), Stripe, Monocle monitoring.

## Patched Dependencies

`@adonisjs/transmit@2.0.2` has a local patch in `patches/`.
