# System Architecture

Sakeenah is built on a modern client-server architecture optimized for edge deployment.

## Overview

```
┌──────────────────┐
│   Client (SPA)   │  React + Vite (Port 5173)
│  Mobile-First    │  React Router v7 + Motion
└────────┬─────────┘
         │ HTTPS/REST
┌────────▼─────────┐
│  API Server      │  Hono (Port 3000)
│  (Bun Runtime)   │  CORS + Zod Validation
└────────┬─────────┘
         │ PostgreSQL Protocol
┌────────▼─────────┐
│   PostgreSQL     │  Multi-Tenant Database
│  (Connection     │  Per-Wedding Data Isolation
│   Pooling)       │
└──────────────────┘
```

## Technology Stack

| Layer      | Technology         | Purpose                                   |
| ---------- | ------------------ | ----------------------------------------- |
| Runtime    | Bun 1.3.5          | Package management and server execution   |
| Frontend   | React 19 + Vite    | Fast build tooling and reactive UI        |
| Backend    | Hono               | Lightweight edge-compatible API framework |
| Validation | Zod                | Type-safe schema validation for API       |
| Database   | PostgreSQL         | Multi-tenant data storage                 |
| Styling    | Tailwind CSS       | Utility-first responsive design           |
| Animation  | Motion             | Declarative animations and transitions    |
| Query      | TanStack Query     | Server state management and caching       |
| Deployment | Cloudflare Workers | Global edge network distribution          |

## Multi-Tenant Design

Sakeenah supports unlimited wedding invitations from a single deployment:

- **Unique Wedding UIDs**: Each wedding has a unique identifier for URL routing (e.g., `ahmad-fatimah-2025`)
- **Database-Driven**: Wedding data stored in PostgreSQL with no code changes needed
- **Isolated Data**: Wishes and analytics are isolated per wedding
- **Centralized Deployment**: One codebase serves all events

## Client-Side State

The frontend uses a layered state management approach:

- **Local State**: React `useState` for component-specific state
- **Server State**: TanStack Query for API data with caching
- **Global State**: React Context (`InvitationProvider`) for cross-component data

## Edge Deployment

When deployed to Cloudflare Workers:

- **Global Distribution**: 100+ edge locations worldwide
- **Low Latency**: Sub-50ms response times
- **High Availability**: 99.99% uptime SLA
- **Hyperdrive**: Connection pooling for PostgreSQL at the edge
