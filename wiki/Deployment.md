# Deployment Guide

This guide covers deploying Sakeenah to production environments.

## Option 1: Cloudflare Workers (Recommended)

Deploy full-stack application to Cloudflare's edge network.

### Steps

1. **Authenticate with Cloudflare:**

   ```bash
   wrangler login
   ```

2. **Create Hyperdrive connection:**

   ```bash
   wrangler hyperdrive create sakeenah-db \
     --connection-string="postgresql://user:pass@host:5432/sakeenah"
   ```

3. **Update `wrangler.jsonc`** with your Hyperdrive ID and custom domain

4. **Deploy:**

   ```bash
   bun run deploy
   ```

### Benefits

- Global edge distribution (100+ locations)
- Sub-50ms response times
- Automatic SSL certificates
- 100,000 requests/day (free tier)

## Option 2: Separate Hosting

Deploy frontend and backend to different providers.

### Frontend Options

- Vercel
- Netlify
- Cloudflare Pages

Deploy the `dist/` folder after running `bun run build`.

### Backend Options

- VPS with Bun runtime
- Railway
- Fly.io
- Render

### Database Options

- Supabase
- Neon
- Railway PostgreSQL

### Environment Variables

```env
VITE_API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://user:pass@production-host:5432/sakeenah
```

### Build Commands

```bash
bun run build    # Frontend production build
bun run server   # Backend production server
```

## Scripts Reference

```bash
# Development
bun run dev              # Run client + server concurrently
bun run dev:client       # Frontend only (Vite)
bun run dev:server       # Backend only (Hono API)

# Production
bun run build            # Build frontend to dist/
bun run preview          # Preview production build
bun run server           # Run backend server

# Cloudflare Workers
bun run deploy           # Build + deploy to Workers
bun run cf:dev           # Test with Workers runtime
bun run cf:tail          # View live deployment logs

# Utilities
bun run generate-links   # Generate personalized guest links
bun run lint             # ESLint code validation
```
