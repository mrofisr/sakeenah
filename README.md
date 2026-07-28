# Sakeenah

Modern Islamic wedding invitation platform with multi-tenant architecture.

![Preview](public/preview.png)

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

[Getting Started](https://github.com/sakeenah-wedding/template/wiki/Getting-Started) · [Deployment](https://github.com/sakeenah-wedding/template/wiki/Deployment) · [API](https://github.com/sakeenah-wedding/template/wiki/API-Reference) · [Architecture](https://github.com/sakeenah-wedding/template/wiki/Architecture) · [Structure](https://github.com/sakeenah-wedding/template/wiki/Project-Structure) · [Security](https://github.com/sakeenah-wedding/template/wiki/Security) · [Testing](https://github.com/sakeenah-wedding/template/wiki/Testing) · [Links](https://github.com/sakeenah-wedding/template/wiki/Personalized-Links)

---

Apache 2.0 · [@mrofisr](https://github.com/mrofisr) · Built with [Vite](https://vite.dev/), [React](https://react.dev/), [Hono](https://hono.dev/) · Animations by [Motion](https://motion.dev/) · Icons by [Lucide](https://lucide.dev/)

