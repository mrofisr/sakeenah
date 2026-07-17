# Sakeenah

Modern Islamic wedding invitation platform with multi-tenant architecture.

```
bun install && cp .env.example .env
# edit .env → bun run dev
docker compose up -d    # or Docker
```

## Features

- **Guest mgmt** — personalized links, attendance tracking, real-time wishes
- **Multi-tenant** — one deployment, unlimited weddings, isolated data
- **UX** — Motion animations, audio, countdown, Google Maps, digital envelope

## Stack

| Layer | Tech | Purpose |
|-------|------|---------|
| Runtime | Bun | Package mgmt & server |
| Frontend | React 19 + Vite | UI & build |
| Backend | Hono | Edge API framework |
| Database | PostgreSQL | Multi-tenant storage |
| Styling | Tailwind CSS v4 | Utility-first |
| Animation | Motion | Declarative transitions |
| Deployment | Cloudflare Workers | Global edge |

## Scripts

| Command | Action |
|---------|--------|
| `bun run dev` | Client + server concurrently |
| `bun run dev:client` | Frontend only (Vite) |
| `bun run dev:server` | Backend only (Hono API) |
| `bun run build` | Build frontend to `dist/` |
| `bun run deploy` | Build + deploy to Cloudflare |
| `bun run generate-links` | Generate guest links |
| `bun run lint` | ESLint validation |

## Docs

[Getting Started](wiki/Getting-Started.md) · [Deployment](wiki/Deployment.md) · [API](wiki/API-Reference.md) · [Architecture](wiki/Architecture.md) · [Structure](wiki/Project-Structure.md) · [Security](wiki/Security.md) · [Testing](wiki/Testing.md) · [Links](wiki/Personalized-Links.md)

---

Apache 2.0 · [@mrofisr](https://github.com/mrofisr) · Built with [Vite](https://vite.dev/), [React](https://react.dev/), [Hono](https://hono.dev/) · Animations by [Motion](https://motion.dev/) · Icons by [Lucide](https://lucide.dev/)

*"And among His signs is that He created for you spouses from among yourselves so that you may find comfort in them."* — Quran 30:21
