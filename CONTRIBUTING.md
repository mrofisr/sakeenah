# Contributing to Sakeenah

First off, thank you for considering contributing to Sakeenah! It's people like you who help make this platform a beautiful tool for Muslim couples worldwide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [What We're Looking For](#what-were-looking-for)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Cultural & Content Guidelines](#cultural--content-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to maintaining a respectful, inclusive environment that honors Islamic values while welcoming contributors of all backgrounds. By participating, you are expected to uphold these standards:

- **Be Respectful**: Treat all contributors with dignity and respect
- **Be Constructive**: Provide helpful feedback and accept criticism gracefully
- **Be Inclusive**: Welcome newcomers and help them learn
- **Be Professional**: Keep discussions focused on technical matters
- **Honor Islamic Values**: Respect the religious nature of this platform

Unacceptable behavior will not be tolerated. Report issues to [@mrofisr](https://github.com/mrofisr).

## What We're Looking For

We welcome various types of contributions:

### 🐛 Bug Reports & Fixes

- Report bugs with clear reproduction steps
- Fix existing issues in the issue tracker
- Improve error handling and edge cases

### ✨ Feature Enhancements

- New wedding themes or customization options
- Additional languages (i18n/l10n)
- Accessibility improvements
- Performance optimizations
- Mobile experience enhancements

### 📚 Documentation

- Improve setup instructions
- Add code examples
- Create tutorials or guides
- Translate documentation

### 🎨 Design & UX

- UI/UX improvements
- Animation enhancements
- Responsive design fixes
- Islamic-appropriate design patterns

### 🧪 Testing

- Write unit tests (currently no test framework - we need help here!)
- Integration tests for API endpoints
- E2E tests for critical user flows

### 🌍 Internationalization

- Arabic language support
- Urdu, Indonesian, Turkish, etc.
- RTL (right-to-left) layout support
- Locale-specific date/time formatting

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Bun** v1.3.5 or later ([install guide](https://bun.sh/))
- **PostgreSQL** v14+ (local or cloud-hosted)
- **Git** for version control
- Basic knowledge of React, JavaScript, and SQL

### Fork & Clone

1. **Fork the repository** on GitHub by clicking the "Fork" button

2. **Clone your fork locally:**

   ```bash
   git clone https://github.com/YOUR-USERNAME/sakeenah.git
   cd sakeenah
   ```

3. **Add upstream remote** to sync with the main repository:

   ```bash
   git remote add upstream https://github.com/sakeenah-wedding/template.git
   ```

### Environment Setup

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Set up PostgreSQL database:**

   ```bash
   # Create database
   createdb sakeenah

   # Apply schema
   psql -d sakeenah -f src/server/db/schema.sql.example
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your PostgreSQL credentials:

   ```env
   VITE_API_URL=http://localhost:3000
   DATABASE_URL=postgresql://username:password@localhost:5432/sakeenah
   PORT=3000
   ```

4. **Add test wedding data:**

   ```bash
   cp src/server/db/add-wedding.sql.example test-wedding.sql
   # Edit test-wedding.sql with test data
   psql -d sakeenah -f test-wedding.sql
   ```

5. **Start development servers:**

   ```bash
   bun run dev
   ```

   - Frontend: http://localhost:5173/your-wedding-uid
   - API: http://localhost:3000/api/invitation/your-wedding-uid

### Project Structure Overview

```
sakeenah/
├── src/
│   ├── components/        # React UI components
│   │   ├── ui/           # Reusable UI components
│   │   ├── bottom-bar.jsx # Navigation component
│   │   └── events-card.jsx
│   ├── pages/            # Page components (hero.jsx, wishes.jsx, etc.)
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── services/         # API service layer
│   ├── server/           # Backend API (Hono)
│   │   ├── server.js     # API server entry point
│   │   └── db/           # Database schemas and SQL
│   └── main.jsx          # React app entry point
├── public/               # Static assets
├── dist/                 # Production build output
└── vite.config.js        # Vite configuration
```

**File Naming Convention:**

All source files use **kebab-case** naming:

- Components: `bottom-bar.jsx`, `events-card.jsx`, `layout.jsx`
- Pages: `hero.jsx`, `events.jsx`, `wishes.jsx`, `landing-page.jsx`
- Hooks: `use-config.js`
- Utils: `format-event-date.js`, `invitation-storage.js`
- Context: `invitation-context.jsx`

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with prefixes:

```bash
feature/add-prayer-times      # New features
fix/wish-submission-error     # Bug fixes
docs/api-documentation        # Documentation
refactor/optimize-queries     # Code refactoring
chore/update-dependencies     # Maintenance tasks
```

**Create a new branch:**

```bash
git checkout -b feature/your-feature-name
```

### Making Changes

1. **Keep changes focused**: One feature or fix per pull request
2. **Write clear code**: Use meaningful variable names and add comments for complex logic
3. **Follow existing patterns**: Maintain consistency with the codebase
4. **Test your changes**: Manually test all affected functionality
5. **Update documentation**: If you change APIs or add features, update relevant docs

### Commit Message Convention

We use **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(wishes): add pagination to wishes list

Add infinite scroll pagination for better performance
when displaying large numbers of wedding wishes.

Closes #123

---

fix(api): resolve timezone inconsistency in event dates

Events were displaying in UTC instead of Asia/Jakarta timezone.
Updated date formatting to use configured timezone.

---

docs(readme): add cloudflare workers deployment guide
```

**Commit your changes:**

```bash
git add .
git commit -m "feat(component): add your feature description"
```

### Keeping Your Fork Updated

Regularly sync with the upstream repository:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Coding Standards

### JavaScript/React Best Practices

1. **Use functional components** with hooks (no class components)
2. **Follow React hooks rules** (dependencies, conditional calls)
3. **Destructure props** for clarity
4. **Use PropTypes or JSDoc** for component documentation
5. **Avoid inline styles** - use Tailwind CSS classes
6. **Extract reusable logic** into custom hooks

**Good Example:**

```jsx
// components/wish-card.jsx
import { formatDistanceToNow } from "date-fns";

export function WishCard({ name, message, attendance, createdAt }) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{name}</h3>
        <span className="text-sm text-muted-foreground">{timeAgo}</span>
      </div>
      <p className="mt-2 text-sm">{message}</p>
      {attendance && (
        <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
          {attendance}
        </span>
      )}
    </div>
  );
}
```

**Naming Convention:**

- All filenames use **kebab-case**: `wish-card.jsx`, `use-wishes.js`, `format-date.js`
- Component names use **PascalCase**: `WishCard`, `EventsList`, `HeroSection`
- Functions/variables use **camelCase**: `formatDate`, `handleSubmit`, `isLoading`

### Code Style

**Run ESLint before committing:**

```bash
bun run lint
```

**Format with Prettier (recommended):**

```bash
bunx prettier --write "src/**/*.{js,jsx}"
```

**Key style rules:**

- Use single quotes for strings
- 2 spaces for indentation
- Semicolons required
- Trailing commas in objects/arrays
- Max line length: 100 characters

### API Development

When adding or modifying API endpoints:

1. **Use Hono framework conventions**
2. **Validate input with Zod schemas**
3. **Return consistent JSON responses**
4. **Include proper HTTP status codes**
5. **Handle errors gracefully**

**Example API endpoint:**

```javascript
// src/server/routes/wishes.js
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const wishSchema = z.object({
  name: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  attendance: z.enum(["attending", "not_attending", "undecided"]),
});

app.post("/api/:uid/wishes", zValidator("json", wishSchema), async (c) => {
  try {
    const { uid } = c.req.param();
    const { name, message, attendance } = c.req.valid("json");

    // Insert wish into database
    const result = await db.insertWish(uid, { name, message, attendance });

    return c.json({ success: true, data: result }, 201);
  } catch (error) {
    console.error("Error creating wish:", error);
    return c.json({ success: false, error: "Failed to create wish" }, 500);
  }
});
```

### Database Guidelines

**Multi-tenant data isolation:**

```sql
-- Always filter by invitation_id or wedding UID
SELECT * FROM wishes
WHERE invitation_id = (
  SELECT id FROM invitations WHERE uid = $1
);

-- NEVER query across tenants
-- BAD: SELECT * FROM wishes;
```

**Creating migrations:**

1. Add new `.sql` files to `src/server/db/`
2. Use descriptive filenames: `YYYY-MM-DD-description.sql`
3. Include both `UP` and `DOWN` migrations
4. Test migrations on a local database first

**Example migration:**

```sql
-- migrations/2025-02-04-add-wish-likes.sql

-- UP Migration
ALTER TABLE wishes
ADD COLUMN likes_count INTEGER DEFAULT 0 NOT NULL;

CREATE INDEX idx_wishes_likes ON wishes(likes_count DESC);

-- DOWN Migration (rollback)
-- DROP INDEX idx_wishes_likes;
-- ALTER TABLE wishes DROP COLUMN likes_count;
```

### Component Structure

Organize components with clear separation of concerns:

```jsx
// 1. Imports
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

// 2. Component definition
export function MyComponent({ prop1, prop2 }) {
  // 3. Hooks
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects
  }, []);

  // 4. Event handlers
  const handleClick = () => {
    setState(newValue);
  };

  // 5. Render helpers (if needed)
  const renderContent = () => {
    // Complex rendering logic
  };

  // 6. Return JSX
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto"
    >
      {/* Component content */}
    </motion.div>
  );
}
```

### Accessibility Requirements

Make the platform accessible to all users:

- ✅ **Semantic HTML**: Use `<button>`, `<nav>`, `<main>`, etc.
- ✅ **ARIA labels**: Add `aria-label` for icon-only buttons
- ✅ **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- ✅ **Color contrast**: Minimum 4.5:1 ratio for text
- ✅ **Focus indicators**: Visible focus states for all interactive elements
- ✅ **Screen reader support**: Test with VoiceOver/NVDA

**Example:**

```jsx
<button
  onClick={handleSubmit}
  aria-label="Submit wedding wish"
  className="focus:ring-2 focus:ring-offset-2 focus:ring-primary"
>
  <Send className="h-4 w-4" aria-hidden="true" />
</button>
```

## Submitting Changes

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review of your code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] No console.log statements left in code
- [ ] All new features manually tested
- [ ] No new ESLint warnings
- [ ] Git commits follow conventional commit format
- [ ] Branch is up to date with main

### Pull Request Process

1. **Push your branch to your fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub:

   - Click "New Pull Request" from your fork
   - Select `base: main` ← `compare: your-branch`
   - Fill out the PR template with detailed information

3. **PR Title Format:**

   ```
   feat(wishes): add real-time wish updates via WebSocket
   fix(api): resolve CORS issue for Cloudflare Workers
   docs(contributing): add database migration guidelines
   ```

4. **PR Description should include:**
   - **What**: What changes does this PR introduce?
   - **Why**: Why is this change needed?
   - **How**: How does it work (for complex changes)?
   - **Testing**: How did you test this?
   - **Screenshots**: For UI changes, include before/after images
   - **Related Issues**: Closes #123, Fixes #456

### PR Review Process

1. **Automated checks**: Must pass ESLint and build
2. **Code review**: At least one maintainer approval required
3. **Testing**: Reviewer may test functionality locally
4. **Feedback**: Address review comments by pushing new commits
5. **Merge**: Maintainer will merge once approved

**Responding to feedback:**

```bash
# Make requested changes
git add .
git commit -m "refactor: address review feedback"
git push origin feature/your-feature-name
```

### After Your PR is Merged

1. **Delete your branch:**

   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Sync your fork:**

   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

3. **Celebrate!** 🎉 Your contribution is now part of Sakeenah!

## Cultural & Content Guidelines

### Islamic Values Preservation

Sakeenah is designed for Muslim weddings. Please ensure contributions:

- **Maintain modesty**: Imagery and design should reflect Islamic values
- **Use appropriate language**: Respectful, professional tone
- **Include Islamic elements**: Quranic verses, duas, Islamic patterns are encouraged
- **Respect diversity**: Support various Islamic cultures and traditions
- **Avoid haram content**: No music files, inappropriate imagery, or gambling features

### Content Appropriateness

**Acceptable additions:**

- Quranic verses and Hadith (with proper attribution)
- Islamic geometric patterns and calligraphy
- Halal color schemes (golds, greens, whites, earth tones)
- Prayer time integration
- Qibla direction features
- Halal/vegetarian meal indicators

**Not acceptable:**

- Background music files (replace with nasheed or nature sounds)
- Images depicting animate beings inappropriately
- Mixed-gender event suggestions
- Alcohol-related features (e.g., bar location)

### Inclusive Design

While maintaining Islamic values, be inclusive:

- Support multiple languages and RTL layouts
- Accommodate various cultural traditions (Arab, South Asian, Southeast Asian, etc.)
- Consider different wedding customs (Walima, Nikah, etc.)
- Accessibility for users with disabilities
- Mobile-first design for global reach

## Community

### Getting Help

- **GitHub Issues**: Ask questions, report bugs
- **Pull Request Comments**: Discuss specific code changes
- **README**: Check documentation first
- **Email**: [@mrofisr](https://github.com/mrofisr) for private concerns

### Recognition

Contributors will be recognized in several ways:

- **GitHub Contributors page**: Automatically listed
- **Release notes**: Major contributions highlighted
- **README acknowledgments**: Significant contributors mentioned

### Commercial Use & Donations

Per the Apache 2.0 license, you may use Sakeenah commercially. However:

- If providing commercial wedding invitation services, consider donating a portion to Islamic charities
- Attribution to the original project is appreciated
- Share improvements back with the community

## Additional Resources

### Documentation

- [README.md](./README.md) - Project overview and setup
- [LICENSE](./LICENSE) - Apache 2.0 license terms
- API Documentation - Coming soon
- Architecture Guide - Coming soon

### External Resources

- [React Documentation](https://react.dev/)
- [Hono Framework](https://hono.dev/)
- [Vite Guide](https://vite.dev/guide/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Common Issues & Troubleshooting

**Problem: Database connection fails**

```bash
# Check PostgreSQL is running
pg_isready

# Verify DATABASE_URL in .env
echo $DATABASE_URL
```

**Problem: Port already in use**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

**Problem: Bun install fails**

```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install
```

**Problem: ESLint errors**

```bash
# Auto-fix where possible
bun run lint --fix
```

## Questions?

Don't hesitate to ask! We were all beginners once. Open an issue with the "question" label or reach out to [@mrofisr](https://github.com/mrofisr).

---

**Jazakallah Khair** (May Allah reward you with goodness) for contributing to Sakeenah! Together, we're building a tool that brings joy to Muslim couples worldwide.

**"And among His signs is that He created for you spouses from among yourselves so that you may find comfort in them."** - Quran 30:21
