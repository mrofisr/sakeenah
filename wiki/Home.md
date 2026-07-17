# Sakeenah

Modern Islamic wedding invitation platform with multi-tenant architecture.

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Version](https://img.shields.io/badge/version-2.1.0-orange)

## Quick Links

- [[Getting Started]] — Set up your first wedding invitation
- [[Architecture]] — System design and technology choices
- [[API Reference]] — REST API endpoints and schemas
- [[Deployment]] — Deploy to Cloudflare Workers or other platforms

## Core Features

- Personalized invitation links with guest name encoding
- Multi-tenant system — one deployment, unlimited weddings
- Real-time wishes with PostgreSQL persistence
- Background music, countdown, Google Maps integration
- Digital envelope with bank account details

## Technical Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Bun 1.3.5 | Package management and server execution |
| Frontend | React 19 + Vite | Fast build tooling and reactive UI |
| Backend | Hono | Lightweight edge-compatible API framework |
| Database | PostgreSQL | Multi-tenant data storage |
| Styling | Tailwind CSS v4 | Utility-first responsive design |
| Deployment | Cloudflare Workers | Global edge network distribution |
