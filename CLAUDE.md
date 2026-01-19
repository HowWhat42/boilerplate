# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack TypeScript monorepo with AdonisJS v6 backend, TanStack Start frontend, and shared design system. Uses pnpm workspaces + Turbo for monorepo management.

**Key Architecture Pattern**: Modular backend with feature-based organization, type-safe API client via Tuyau, and file-based routing in frontend.

## Development Commands

### Root Commands (Run from repository root)
```bash
# Start PostgreSQL + all dev servers (backend on :3333, frontend on :3000)
pnpm dev

# Linting with oxlint (project uses oxfmt/oxlint, NOT eslint at root)
pnpm lint

# Formatting with oxfmt
pnpm format

# Type-checking across all workspaces
pnpm typecheck

# Run all tests across workspaces
pnpm test

# Interactive dependency updates
pnpm taze
```

### Backend Commands (cd apps/backend)
```bash
# Development with HMR
pnpm dev
node ace serve --hmr

# Production build
pnpm build
pnpm start

# Testing
pnpm test                                    # Run all tests
node ace test                                # AdonisJS test runner
node ace test --groups "group-name"          # Run specific test group
node ace test tests/functional/auth.spec.ts  # Run single test file

# Database operations
node ace migration:run                       # Run migrations
node ace migration:rollback                  # Rollback last batch
node ace migration:rollback --batch=0        # Rollback all
node ace db:seed                             # Run seeders

# Generate APP_KEY (required for encryption)
node ace generate:key

# Type-safe API client generation (after route changes)
node ace tuyau:generate

# Email template development
pnpm email                                   # Start React Email preview server

# Backend-specific linting/formatting (uses eslint + prettier)
pnpm lint
pnpm format
pnpm typecheck
```

### Frontend Commands (cd apps/frontend)
```bash
# Development server
pnpm dev

# Production build
pnpm build
pnpm serve        # Preview production build

# Testing with Vitest
pnpm test

# Linting/formatting (uses eslint + prettier, NOT oxlint)
pnpm lint
pnpm format
pnpm check        # Run prettier + eslint fix

# Internationalization
pnpm intlayer build    # Build i18n content

# Cloudflare deployment
pnpm deploy
```

## Architecture & Module System

### Backend Module Organization

AdonisJS backend uses **feature-based modular architecture**. Each domain module (auth, users, admin) contains:

```
app/
├── auth/
│   ├── controllers/     # HTTP controllers
│   ├── middleware/      # Auth-specific middleware
│   ├── services/        # Business logic
│   ├── validators/      # VineJS validation schemas
│   └── tests/           # Module tests
├── users/
│   ├── models/          # Lucid ORM models
│   ├── dtos/            # Data transfer objects (@adocasts.com/dto)
│   └── factories/       # Database factories for testing
├── admin/               # Admin features (impersonation, user management)
├── common/              # Shared utilities across modules
└── core/
    ├── middleware/      # Global middleware
    ├── exceptions/      # Custom exceptions & error handler
    ├── policies/        # Authorization policies (Bouncer)
    └── abilities/       # Permission definitions
```

**Path Aliases** (defined in package.json imports):
- `#core/*` → `./app/core/*.js`
- `#users/*` → `./app/users/*.js`
- `#auth/*` → `./app/auth/*.js`
- `#admin/*` → `./app/admin/*.js`
- `#common/*` → `./app/common/*.js`
- `#middleware/*` → `./app/core/middleware/*.js`
- `#exceptions/*` → `./app/core/exceptions/*.js`
- `#config/*` → `./config/*.js`
- `#database/*` → `./database/*.js`
- `#start/*` → `./start/*.js`
- `#emails/*` → `./emails/*.js`

### Route Registration

Routes are registered in `start/routes.ts`. Uses **Facteur** (notification system) for route registration:
```typescript
router.group(() => facteur.registerRoutes())
```

Middleware is configured in `start/kernel.ts`:
- **Server middleware**: Runs on ALL requests (CORS, ACL, container bindings)
- **Router middleware**: Runs on matched routes (bodyparser, session, auth)
- **Named middleware**: Explicitly applied to routes/groups (auth, silentAuth, requireSecretToken)

### Frontend Architecture

**TanStack Start** with file-based routing:
```
src/
├── routes/              # File-based routes (__root.tsx is layout)
├── components/          # React components
├── lib/
│   ├── queries/         # TanStack Query hooks using Tuyau
│   ├── schemas/         # Zod validation schemas
│   └── tuyau.ts         # Type-safe API client setup
├── hooks/               # Custom React hooks
├── contents/            # Intlayer i18n content
└── integrations/        # Third-party integrations (Sentry, etc.)
```

**Tuyau Integration**: Type-safe API client automatically synced with backend routes
- Backend exports API definition: `.adonisjs/index.ts`
- Frontend imports: `import { api } from '@boilerplate/backend/api'`
- Generate types: `node ace tuyau:generate` (in backend)
- React Query integration: `createTuyauReactQueryClient` in `lib/tuyau.ts`

### Design System

Shared component library in `packages/design-system`:
- Built on **Radix UI** primitives
- Styled with **Tailwind CSS**
- Exported components used by frontend via workspace dependency

## Testing Strategy

### Backend Testing
- Uses **Japa** test runner with API client plugin
- Test suites defined in `adonisrc.ts`:
  - **unit**: `app/**/tests/unit/**/*.spec.ts` (timeout: 2s)
  - **functional**: `tests/functional/**/*.spec.ts` (timeout: 30s)
  - **e2e**: `tests/e2e/**/*.spec.ts` (timeout: 1min)
- Run with: `node ace test` or `node ace test --groups "unit"`

### Frontend Testing
- Uses **Vitest** + **@testing-library/react**
- JSDOM environment for component testing
- Run with: `pnpm test` (from apps/frontend)

## Key Dependencies & Integration Points

### Backend
- **Authentication**: Session-based (web guard) with AdonisJS Auth
- **Authorization**: Role-based permissions via `@holoyan/adonisjs-permissions` + Bouncer
- **Email**: React Email templates rendered with `@react-email/render`
- **Notifications**: Facteur system for multi-channel notifications
- **Payments**: Stripe via `@foadonis/shopkeeper`
- **File Storage**: AdonisJS Drive with S3 support
- **Monitoring**: Monocle agent for observability
- **I18n**: AdonisJS i18n with locale detection middleware

### Frontend
- **State Management**: TanStack Query for server state, TanStack Store for client state
- **Forms**: TanStack Form with Zod validation
- **I18n**: Intlayer with localized routing and browser locale detection
- **Notifications**: Sonner for toast notifications
- **Icons**: Lucide React
- **Drag & Drop**: dnd-kit
- **Charts**: Recharts
- **Error Tracking**: Sentry (TanStack Start integration)

## Database Workflow

Always apply migrations manually (do not ask about pushing to DB):
1. Create migration: `node ace make:migration <name>`
2. Edit migration file in `database/migrations/`
3. Run migration: `node ace migration:run`
4. If needed, rollback: `node ace migration:rollback`

Seeders location: `database/seeders/`

## Linting & Formatting

**Root level**: Uses `oxlint` + `oxfmt` (configured via `.oxlintrc.json` + `.oxfmtrc.json`)
**Backend**: Uses `eslint` + `prettier` (AdonisJS prettier config)
**Frontend**: Uses `eslint` + `prettier`

When working across multiple workspaces, use root-level commands for consistency.

## Docker Setup

PostgreSQL runs via Docker Compose:
```bash
docker compose up -d      # Start services
docker compose down       # Stop services
docker compose logs -f    # View logs
```

Configuration in `docker-compose.yaml` (root directory).

## Environment Configuration

Backend `.env` critical variables:
- `APP_KEY`: Generate with `node ace generate:key`
- `DB_*`: PostgreSQL connection (default: localhost:5432)
- `DRIVE_DISK`: Storage driver (s3 or local)
- `SESSION_DRIVER`: Session storage (cookie or redis)
- `STRIPE_KEY/STRIPE_SECRET`: Payment processing
- `RESEND_API_KEY`: Email delivery

Frontend `.env`:
- `VITE_API_URL`: Backend API URL (default: http://localhost:3333)

## Common Patterns

### Adding Backend Routes
1. Create controller in module (e.g., `app/auth/controllers/`)
2. Use Facteur pattern or register in `start/routes.ts`
3. Apply middleware via `use()` or kernel configuration
4. Regenerate API types: `node ace tuyau:generate`

### Adding Frontend Pages
1. Create route file in `src/routes/` (e.g., `about.tsx`)
2. TanStack Router auto-generates route types in `routeTree.gen.ts`
3. Use `<Link to="/about">` for navigation
4. Add queries in `lib/queries/` using Tuyau client

### Authorization Pattern
- Define abilities in `app/core/abilities/`
- Create policies in `app/core/policies/`
- Use `@bouncer()` decorator or `bouncer.authorize()` in controllers
- Permission middleware: `initializeBouncerMiddleware`

### Email Templates
- Create React components in `emails/`
- Preview with `pnpm email` (starts dev server)
- Render with `@react-email/render` in mail services
- Configure mail driver in `config/mail.ts`
