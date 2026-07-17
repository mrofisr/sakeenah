# Project Structure

Sakeenah uses a **feature-based architecture** (vertical slices) for scalability and maintainability.

## Directory Overview

```
sakeenah/
├── src/
│   ├── features/                    # Business features (vertical slices)
│   │   ├── invitation/              # Core invitation display & state
│   │   │   ├── components/
│   │   │   │   ├── hero.jsx         # Hero section with couple info
│   │   │   │   ├── landing-page.jsx # Entry page with invitation open
│   │   │   │   └── main-content.jsx # Main invitation content wrapper
│   │   │   ├── hooks/
│   │   │   │   └── use-config.js    # Config fetching hook
│   │   │   ├── invitation-context.jsx
│   │   │   └── index.js             # Public exports
│   │   ├── wishes/                  # Guest wishes/RSVP
│   │   │   ├── components/
│   │   │   │   └── wishes.jsx
│   │   │   └── index.js
│   │   ├── events/                  # Wedding events/agenda
│   │   │   ├── components/
│   │   │   │   ├── events.jsx
│   │   │   │   └── events-card.jsx
│   │   │   └── index.js
│   │   ├── gifts/                   # Gift registry
│   │   │   ├── components/
│   │   │   │   └── gifts.jsx
│   │   │   └── index.js
│   │   └── location/                # Venue and maps
│   │       ├── components/
│   │       │   └── location.jsx
│   │       └── index.js
│   ├── components/                  # Shared UI components
│   │   ├── ui/                      # Reusable primitives (shadcn/ui)
│   │   │   └── marquee.jsx
│   │   └── layout/                  # Layout components
│   │       ├── layout.jsx
│   │       ├── bottom-bar.jsx
│   │       └── index.js
│   ├── lib/                         # Shared utilities
│   │   ├── utils.js                 # cn() helper for Tailwind
│   │   ├── api.js                   # API client functions
│   │   ├── base64.js
│   │   ├── format-event-date.js
│   │   └── invitation-storage.js
│   ├── config/                      # Static configuration (fallback)
│   │   └── config.js
│   ├── server/                      # Backend API (Hono)
│   │   ├── features/                # Feature-based routes
│   │   │   ├── invitation/
│   │   │   │   ├── routes.js        # GET /api/invitation/:uid
│   │   │   │   └── index.js
│   │   │   └── wishes/
│   │   │       ├── routes.js        # CRUD /api/:uid/wishes
│   │   │       └── index.js
│   │   ├── lib/
│   │   │   └── db-client.js         # Database connection helper
│   │   ├── db/
│   │   │   ├── index.js             # PostgreSQL connection
│   │   │   └── migrations/
│   │   ├── index.js                 # Hono app (CF Workers entry)
│   │   ├── server.js                # Node.js/Bun server entry
│   │   └── schemas.js               # Zod validation schemas
│   ├── app.jsx                      # Root app component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles
├── public/                          # Static assets
├── wiki/                            # GitHub Wiki documentation
├── vite.config.js                   # Vite bundler configuration
├── wrangler.jsonc                   # Cloudflare Workers config
└── package.json
```

## Feature Module Pattern

Each feature exports its public API via `index.js`:

```javascript
// features/invitation/index.js
export { InvitationProvider, useInvitation } from "./invitation-context";
export { useConfig } from "./hooks/use-config";
export { default as Hero } from "./components/hero";
export { default as LandingPage } from "./components/landing-page";
export { default as MainContent } from "./components/main-content";
```

Usage in other files:

```javascript
import { useInvitation, useConfig } from "@/features/invitation";
import { Wishes } from "@/features/wishes";
```

## Naming Conventions

| Type                | Convention           | Example                      |
| ------------------- | -------------------- | ---------------------------- |
| Files               | kebab-case           | `hero.jsx`, `use-config.js`  |
| Components          | PascalCase           | `Hero`, `EventsCard`         |
| Functions/Variables | camelCase            | `formatDate`, `isLoading`    |
| Constants           | SCREAMING_SNAKE_CASE | `API_URL`, `ATTENDING`       |
| Hooks               | `use` prefix         | `useConfig`, `useInvitation` |

## Import Aliases

The `@/` alias maps to `src/`:

```javascript
// Instead of relative paths
import { cn } from "../../../lib/utils";

// Use alias
import { cn } from "@/lib/utils";
```
