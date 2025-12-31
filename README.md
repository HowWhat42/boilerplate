# Boilerplate

A modern full-stack monorepo boilerplate featuring AdonisJS backend, TanStack Start frontend, and a custom design system. Built with TypeScript, optimized for developer experience, and production-ready.

## 🚀 Tech Stack

### Backend

- **[AdonisJS v6](https://adonisjs.com/)** - Node.js web framework
- **PostgreSQL** - Database
- **Lucid ORM** - Database toolkit
- **Authentication** - Built-in auth system with session management
- **Authorization** - Role-based permissions with Bouncer
- **Email** - React Email for beautiful email templates
- **Stripe Integration** - Payment processing with Shopkeeper
- **Tuyau** - Type-safe API client generation
- **Sentry** - Error tracking and monitoring

### Frontend

- **[TanStack Start](https://tanstack.com/start)** - Full-stack React framework
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[TanStack Table](https://tanstack.com/table)** - Headless table utilities
- **[Intlayer](https://intlayer.org/)** - Internationalization (i18n)
- **Tailwind CSS v4** - Utility-first CSS
- **Zod** - Type-safe schema validation
- **Cloudflare** - Optional deployment target

### Design System

- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **Tailwind CSS** - Styling framework
- **[Lucide Icons](https://lucide.dev/)** - Icon library
- **[dnd-kit](https://dndkit.com/)** - Drag and drop functionality
- **Recharts** - Chart components

### Monorepo Tools

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Turbo](https://turbo.build/)** - High-performance build system
- **Docker** - Containerization for development and deployment

## 📁 Project Structure

```
boilerplate/
├── apps/
│   ├── backend/              # AdonisJS API server
│   │   ├── app/
│   │   │   ├── admin/       # Admin features (user management, impersonation)
│   │   │   ├── auth/        # Authentication (login, register, verify email)
│   │   │   ├── users/       # User models and DTOs
│   │   │   └── core/        # Core middleware, policies, abilities
│   │   ├── config/          # Configuration files
│   │   ├── database/        # Migrations and seeders
│   │   ├── emails/          # React Email templates
│   │   └── start/           # Routes and kernel
│   │
│   └── frontend/            # TanStack Start app
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── routes/      # File-based routing
│       │   ├── hooks/       # Custom React hooks
│       │   ├── lib/         # Utilities and API queries
│       │   └── contents/    # i18n content
│       └── public/          # Static assets
│
└── packages/
    └── design-system/       # Shared UI components
        ├── components/      # Reusable UI components
        ├── hooks/          # Shared React hooks
        └── styles/         # Global styles
```

## 🛠️ Prerequisites

- **Node.js** v20 or higher
- **pnpm** v10.18.0 (specified in package.json)
- **Docker** and Docker Compose (for PostgreSQL)
- **PostgreSQL** (via Docker or local installation)

## 🚦 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Setup

Create `.env` files for both backend and frontend:

**Backend** (`apps/backend/.env`):

```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=<generate-with-node-ace-generate:key>
LOG_LEVEL=info
APP_URL=http://localhost:3001

# Database
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=boilerplate

# S3
DRIVE_DISK=s3
AWS_ACCESS_KEY_ID=key
AWS_SECRET_ACCESS_KEY=secret
AWS_REGION=localhost
S3_BUCKET=bucket

# Session
SESSION_DRIVER=cookie

# Mail
SMTP_HOST=localhost
SMTP_PORT=587
RESEND_API_KEY=your_resend_key

# Stripe
STRIPE_KEY=your_stripe_key
STRIPE_SECRET=your_stripe_secret
```

**Frontend** (`apps/frontend/.env`):

```env
VITE_API_URL=http://localhost:3333
```

### 3. Start Development Environment

```bash
# Start PostgreSQL and development servers
pnpm dev
```

This command will:

1. Start Docker containers (PostgreSQL)
2. Start the backend server (http://localhost:3333)
3. Start the frontend server (http://localhost:3000)

### 4. Run Migrations and Seeds

```bash
cd apps/backend
node ace migration:run
node ace db:seed
```

## 📜 Available Commands

### Root Level Commands

```bash
# Start all development servers
pnpm dev

# Run linting across all workspaces
pnpm lint

# Run tests across all workspaces
pnpm test

# Update dependencies interactively
pnpm taze
```

### Backend Commands

```bash
cd apps/backend

# Development with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run tests
pnpm test
node ace test
node ace test --groups "group-name"

# Database migrations
node ace migration:run
node ace migration:rollback

# Database seeding
node ace db:seed

# Generate API key
node ace generate:key

# Tuyau generate
node ace tuyau:generate

# Linting and formatting
pnpm lint
pnpm format

# Type checking
pnpm typecheck

# React Email Preview
pnpm email
```

### Frontend Commands

```bash
cd apps/frontend

# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm serve

# Run tests
pnpm test

# Linting and formatting
pnpm lint
pnpm format
pnpm check  # Format and lint fix

# Deploy to Cloudflare
pnpm deploy

# Build IntLayer
pnpm intlayer build
```

## 🔑 Key Features

### Authentication & Authorization

- Email/password authentication
- Email verification system
- Password reset functionality
- Role-based access control (RBAC)
- Admin impersonation
- Session management

### Payment Processing

- Stripe integration via Shopkeeper
- Subscription management
- Customer billing portal

### Developer Experience

- Type-safe API client (Tuyau)
- Hot module replacement
- Auto-generated route types
- Path aliases for cleaner imports
- Comprehensive linting and formatting
- Docker-based development environment

### Internationalization

- Multi-language support via Intlayer
- Localized routing
- Content management system

### UI/UX

- Modern, accessible component library
- Responsive design
- Dark mode support (via next-themes)
- Toast notifications
- Data tables with sorting, filtering, pagination
- Drag and drop interfaces

## 🐳 Docker

The project includes Docker configuration for easy development setup:

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f
```

## 🤝 Contributing

This is a boilerplate project. Feel free to fork and customize for your needs.

---

**Happy Coding!** 🎉
