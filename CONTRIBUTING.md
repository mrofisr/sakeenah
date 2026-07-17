# Contributing

Thanks for helping with Sakeenah!

## Quick Start

```bash
git clone https://github.com/YOUR-USERNAME/sakeenah.git
cd sakeenah
bun install
cp .env.example .env     # edit DATABASE_URL
createdb sakeenah
psql -d sakeenah -f src/server/db/schema.sql.example
bun run dev               # http://localhost:5173
```

## What We Need

- Bug fixes and reports
- Features (themes, i18n, accessibility, performance)
- Documentation and tutorials
- UI/UX improvements
- Tests

## How to Contribute

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-thing`
3. Make focused changes
4. Commit with clear messages: `feat(scope): description`
5. Push and open a Pull Request

## Code Guidelines

- **Files**: kebab-case (`wish-card.jsx`)
- **Components**: PascalCase (`WishCard`)
- **Functions**: camelCase (`formatDate`)
- Use functional components with hooks
- Validate API input with Zod
- Filter DB queries by wedding UID (multi-tenant)
- `bun run lint` before committing

## PR Checklist

- [ ] Code follows style guidelines
- [ ] Tested your changes
- [ ] Updated docs if needed
- [ ] No console.log left in code
- [ ] PR title: `type(scope): description`

## Questions?

Open a GitHub issue with label "question".

---

**Jazakallah Khair** for contributing!
