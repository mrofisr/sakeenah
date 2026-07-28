# Changelog

All notable changes to Sakeenah will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.1] - 2026-07-28

### Fixed

- Audio button positioning: changed from `relative` to `absolute` so it stays pinned top-right in the phone frame (0601967)
- Audio toast popup: use `fixed` positioning with centered transform so it appears correctly in the viewport (0601967)

## [2.2.0] - 2026-07-17

### Added

- **Docker dev environment**: `Dockerfile` (oven/bun:1) + `docker-compose.yaml` with PostgreSQL 16, healthcheck, persistent volume, auto-init migrations, watch mode
- **Custom `useMeta` hook**: Replaces `react-helmet-async` — manages title, meta tags, OG/Twitter cards, favicon via native DOM API
- **Custom `Confetti` component**: Replaces `react-confetti` — uses `motion` animations, lightweight (60 particles)
- **Plain git hooks**: `.githooks/pre-commit` (lint+format staged files) and `.githooks/pre-push` (lint+format:check+test:coverage+build) via `scripts/install-hooks.sh`

### Changed

- **`framer-motion` → `motion`**: Same API, lighter package. All imports updated to `motion/react`
- **Tailwind v4**: Removed legacy `tailwind.config.js` — all theme in `src/index.css` `@theme` block; removed `autoprefixer`
- **`concurrently` → shell backgrounding**: `dev` script now uses `bun run dev:client & bun run server & wait`
- **`clsx` + `tailwind-merge` → inline `cn()`**: Simplified `filter(Boolean).join(" ")` in `src/lib/utils.js`
- **`vitest` + `@vitest/coverage-v8` reinstated**: Bun test runner doesn't support `vi.mock("pg")`, so vitest kept for test compatibility
- **`generate-links-example.js` → `generate-links.js`**: Renamed as default generation script
- **Docs migrated to GitHub Wiki**: `docs/` directory pushed to `template.wiki.git` and removed from main repo

### Removed

- **Dependencies**: `concurrently`, `clsx`, `class-variance-authority`, `tailwind-merge`, `react-helmet-async`, `react-confetti`, `lint-staged`, `caniuse-lite`, `terser`, `autoprefixer`
- **Husky**: Replaced with plain `.githooks/` (version-controlled, copied via `bun install`)
- **File**: `tailwind.config.js`, `vitest.config.js` (recreated), `docs/superpowers/`
- **Religious quotes**: Removed hadith from `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `README.md`

### Fixed

- Repository URL in `CONTRIBUTING.md` and `package.json` (`mrofisr/sakeenah` → `sakeenah-wedding/template`)
- `scripts/install-hooks.sh` compatibility with Bun shell (replaced `for` loop with explicit `cp`)

## [2.1.0] - 2026-02-05

### Added

- Comprehensive Zod validation schemas in src/server/schemas.js for all API endpoints (23c87eb)
- Automatic input sanitization and transformation through Zod middleware (23c87eb)
- Regex validation for wedding UID format enforcement (lowercase, numbers, hyphens only) (23c87eb)
- Detailed validation error messages for better debugging and user feedback (23c87eb)
- Click-outside detection for attendance dropdown in Wishes form for better UX
- Guest name persistence in Wishes form after submission for improved user experience
- **Spam prevention**: Unique constraint preventing duplicate wishes from same guest name per invitation
- **Database migration**: Migration script (001-add-unique-wish-constraint.sql) for adding unique wish constraint to existing databases
- **UX improvement**: Thank you message displayed after successful wish submission preventing re-submission
- **Auto-update invitations**: System automatically updates localStorage when guest opens different invitation link (0b104ad)
- **Console logging**: Debug logs when switching between different wedding UIDs or guest names (0b104ad)

### Changed

- Refactored all API endpoints to use zValidator middleware for type-safe request validation (23c87eb)
- Replaced manual validation code with declarative Zod schemas across invitation and wishes endpoints (23c87eb)
- Enhanced pagination validation with automatic string-to-number transformation (23c87eb)
- Wish creation endpoint now checks for duplicate submissions before inserting
- Error messages improved to clearly indicate when a guest has already submitted a wish
- **Invitation context priority**: URL parameters now take precedence over localStorage for invitation data (0b104ad)
- **Automatic data override**: Opening new invitation link updates stored wedding UID and guest name (0b104ad)
- **BREAKING**: All source filenames converted to kebab-case for consistency (4a24aa2)
  - Components: BottomBar.jsx → bottom-bar.jsx, EventsCard.jsx → events-card.jsx, Layout.jsx → layout.jsx
  - Pages: Hero.jsx → hero.jsx, Events.jsx → events.jsx, Wishes.jsx → wishes.jsx, etc.
  - Context: InvitationContext.jsx → invitation-context.jsx
  - Hooks: useConfig.js → use-config.js
  - Lib: formatEventDate.js → format-event-date.js, invitationStorage.js → invitation-storage.js
  - Utils: generateInvitationLink.js → generate-invitation-link.js
  - Root: App.jsx → app.jsx
  - All import statements automatically updated

### Fixed

- **CRITICAL**: Fixed dynamic Tailwind class generation in hero.jsx FloatingHearts component that would fail at build time (hero.jsx:89-95)
- **CRITICAL**: Fixed SSR crash caused by accessing window.innerWidth before component mount in hero.jsx (hero.jsx:71)
- **CRITICAL**: Fixed invalid CSS grid class `md:grid-row-2` to `md:grid-cols-2` in location.jsx (location.jsx:56) - Later reverted per user request
- Fixed missing `calculateTimeLeft` function in useEffect dependency array causing stale closure in hero.jsx countdown timer (hero.jsx:41)
- Fixed misleading helper text in wishes.jsx form that showed "detected from invitation" for manually typed names (wishes.jsx:281-286)
- Fixed attendance dropdown not closing when clicking outside the dropdown area (wishes.jsx:300-354)

### Security

- Implemented one-wish-per-guest limit to prevent spam and duplicate submissions
- Added database-level constraint ensuring data integrity for wish uniqueness
- Enhanced error handling for duplicate wish attempts with proper HTTP 409 status codes

### Dependencies

- Added zod@4.3.6 for schema validation (23c87eb)
- Added @hono/zod-validator@0.7.6 for Hono integration (23c87eb)
- Updated wrangler from 4.51.0 to 4.62.0 (09a761a)

## [2.0.0] - 2026-02-04

### Added

- localStorage utility for secure wedding UID and guest name storage with automatic 30-day expiration (bc8b4ee)
- Automatic URL sanitization that cleans sensitive parameters after data extraction (bc8b4ee)
- Comprehensive anti-scraping meta tags in App.jsx to prevent Wayback Machine and search engine archiving (bc8b4ee)
- Enhanced robots.txt with specific directives to block web crawlers and archive bots (bc8b4ee)
- Detailed security and privacy documentation in README.md explaining new URL behavior (bc8b4ee)
- Data persistence mechanism that maintains invitation state across browser sessions for 30 days (bc8b4ee)

### Changed

- **BREAKING**: URLs now automatically clean to root path (/) after initial load, hiding wedding UID and guest parameters (bc8b4ee)
- InvitationContext now prioritizes localStorage over URL parameters for data retrieval (bc8b4ee)
- Hero page updated to retrieve guest names from localStorage instead of URL query parameters (bc8b4ee)
- Wishes page updated to retrieve guest names from localStorage instead of URL query parameters (bc8b4ee)
- README.md personalized invitations section completely rewritten with new security-focused workflow (bc8b4ee)
- Security & Compliance section enhanced with localStorage security, URL sanitization, and anti-scraping details (bc8b4ee)

### Security

- Wedding UIDs and guest names now hidden from URL history and browser bookmarks after initial load (bc8b4ee)
- Prevents URL injection attacks by removing sensitive data from visible URL (bc8b4ee)
- Blocks Wayback Machine and web archive services from scraping invitation data (bc8b4ee)
- Implements automatic data expiration to limit privacy exposure (bc8b4ee)
- Adds cache-control and no-archive meta directives for enhanced privacy protection (bc8b4ee)

### Migration Guide

For users upgrading from v1.x:

1. **URL Behavior Change**: After guests open their personalized invitation link, the URL will automatically clean to `https://yourdomain.com`. This is expected behavior.

2. **Bookmarks**: Previous bookmarks with full paths will still work on first load, but URLs will clean automatically.

3. **Data Persistence**: Invitation data now persists in browser localStorage for 30 days. Clearing browser data will require guests to click their original link again.

4. **No Server Changes**: This is entirely a client-side change. No backend or database modifications required.

## [1.1.0] - 2026-02-04

### Added

- Comprehensive contribution guidelines in CONTRIBUTING.md covering development workflow, coding standards, database migrations, and cultural guidelines for Islamic content (a442235)
- Community Code of Conduct establishing behavioral standards and Islamic values for contributors (a442235)
- GitHub pull request template with extensive checklist for code quality, testing, database changes, and cultural considerations (a442235)
- GitHub issue templates for bug reports, feature requests, documentation improvements, and questions (a442235)
- Preview image display in README.md showcasing the platform interface (9810fec)

### Changed

- Updated README.md contributing section to reference detailed CONTRIBUTING.md guide (a442235)
- Enhanced package.json with proper project metadata, description, keywords, and repository information (93c9e06)
- Improved installation guide with clearer step-by-step instructions and accurate implementation details (1240d9d)
- Upgraded README.md to enterprise-grade SaaS documentation with comprehensive feature descriptions, architecture diagrams, and deployment guides (834f41a)

### Removed

- Broken link to non-existent PERSONALIZED-INVITATIONS.md documentation file (f2c33e5)

## [1.0.0] - 2025-12-01

### Added

- Backend API server using Hono framework for lightweight, edge-compatible request handling (1ae15a4)
- PostgreSQL database integration with connection pooling for multi-tenant wedding data storage (1ae15a4)
- REST API endpoints for wedding invitations, wishes, and attendance statistics (1ae15a4)
- Multi-tenant architecture supporting unlimited wedding invitations from single deployment (1ae15a4)
- Database schema with invitations, agenda, banks, and wishes tables (1ae15a4)
- SQL templates for database schema creation and wedding data insertion (1ae15a4)
- Zod schema validation for API request validation and type safety (ae62dd9)
- CORS configuration for cross-origin API access from frontend (ac4c677)
- Asia/Jakarta timezone standardization for event date handling (d4549f3)
- Conditional rendering for gifts section when bank account data is unavailable (12e07fa)

### Changed

- Migrated from static configuration to database-driven wedding data management (1ae15a4)
- Updated API routes to support UID-based wedding routing for multi-tenancy (7ddfc36)
- Improved error handling and response formatting in API endpoints (2be1fd0)
- Enhanced database connection management with proper pooling (a8ce3ab)

## [0.9.0] - 2025-08-29

### Changed

- General updates to codebase and dependencies (cc639c9)

## [0.8.0] - 2025-06-29

### Changed

- Updated README.md documentation (7a861c1)

## [0.7.0] - 2025-05-05

### Removed

- Vercel deployment configuration and related files (02f59af)

## [0.6.0] - 2025-05-02

### Added

- New audio files and assets for wedding invitation experience (c689704)

### Changed

- Updated static configuration in config.js (cea022d)

## [0.5.0] - 2025-04-01

### Removed

- Deprecated nature sound audio file (f12b3f7)

### Changed

- Updated Vercel deployment configuration (2e6a135)
- Improved robots.txt for SEO (6212966)
- Enhanced Vercel button deployment setup (9d27a21)
- Optimized GitHub Actions workflows (593113f)
- Updated README.md with better documentation (bf5a9de)

## [0.4.0] - 2025-03-15

### Added

- Custom GitHub Actions workflows for deployment automation (f702e93)
- Comprehensive JSDoc documentation for configuration and components (d552836, b5147b7)

### Fixed

- Event date formatting and display issues (93573f2)

### Changed

- Updated README.md documentation (0328b35, c71b0af)

## [0.3.0] - 2025-02-20

### Changed

- Updated wedding couple information and data (9692004, b2abfd3, 9506fbf)
- Converted interface language to Bahasa Indonesia (29b79a0)

### Added

- GitHub Sponsors funding configuration (4138948, 05420c1)

## [0.2.0] - 2025-01-10

### Changed

- Complete page revamp for all components using modern design patterns (c461a25, 8fcfaea, 2dd7984, 0638b4d, 58d49aa, 09b5c82, e046326, a78f508, db91826, 6ef79f3, bf35c84, 2ca91f1, 8e01923, 48455a5)
- Improved UI/UX across Hero, Events, Wishes, Location, and Gifts pages
- Enhanced responsive design for mobile devices
- Updated animation transitions using Framer Motion

### Added

- README.md documentation updates (b147ea4, a3f8e5b, 537b384, bb8c256)

## [0.1.0] - 2024-12-01

### Added

- Initial project setup and foundation (b121746)
- React 18 frontend with Vite build tooling
- Tailwind CSS for utility-first styling
- Framer Motion for animations and transitions
- React Router v7 for client-side navigation
- TanStack Query for server state management
- Lucide React icons
- Landing page with personalized guest greetings
- Hero section with countdown timer
- Events page with wedding agenda display
- Wishes page with message submission and attendance tracking
- Location page with Google Maps integration
- Gifts page with digital envelope and bank account details
- Background music controls with autoplay support
- Confetti effects for celebration moments
- Mobile-first responsive design
- Base64 URL encoding for personalized guest invitations

---

## Version Numbering Scheme

This project uses [Semantic Versioning](https://semver.org/):

- MAJOR version (X.0.0): Incompatible API changes or major architectural changes
- MINOR version (0.X.0): New features added in backward-compatible manner
- PATCH version (0.0.X): Backward-compatible bug fixes

## Types of Changes

- **Added**: New features or functionality
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features or files
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes

## Commit Reference Format

Each change entry includes the short commit hash in parentheses (e.g., a442235) for traceability. Full commit details can be viewed using:

```bash
git show <commit-hash>
```

## Links

- [Repository](https://github.com/sakeenah-wedding/template)
- [Issues](https://github.com/sakeenah-wedding/template/issues)
- [Pull Requests](https://github.com/sakeenah-wedding/template/pulls)
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

[Unreleased]: https://github.com/sakeenah-wedding/template/compare/v2.2.1...HEAD
[2.2.1]: https://github.com/sakeenah-wedding/template/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/sakeenah-wedding/template/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/sakeenah-wedding/template/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/mrofisr/sakeenah/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/mrofisr/sakeenah/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/mrofisr/sakeenah/compare/v0.9.0...v1.0.0
[0.9.0]: https://github.com/mrofisr/sakeenah/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/mrofisr/sakeenah/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/mrofisr/sakeenah/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/mrofisr/sakeenah/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/mrofisr/sakeenah/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/mrofisr/sakeenah/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/mrofisr/sakeenah/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/mrofisr/sakeenah/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/mrofisr/sakeenah/releases/tag/v0.1.0
