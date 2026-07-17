# Getting Started with Sakeenah

This tutorial walks you through setting up your first wedding invitation with Sakeenah.

## Prerequisites

- Bun v1.3.5 or later
- PostgreSQL v14+ (local or cloud-hosted)
- Git

## Installation

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/mrofisr/sakeenah.git
cd sakeenah
bun install
```

### 2. Set Up PostgreSQL Database

```bash
# Create database
createdb sakeenah

# Apply schema
psql -d sakeenah -f src/server/db/schema.sql.example
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Frontend
VITE_API_URL=http://localhost:3000

# Backend
DATABASE_URL=postgresql://username:password@localhost:5432/sakeenah
PORT=3000
```

### 4. Add Your Wedding Data

```bash
# Copy the SQL template
cp src/server/db/add-wedding.sql.example my-wedding.sql

# Edit my-wedding.sql with your wedding details
# Then insert into database
psql -d sakeenah -f my-wedding.sql
```

This creates your wedding invitation with a unique UID (e.g., `ahmad-fatimah-2025`).

### 5. Start Development Servers

```bash
bun run dev
```

This runs both frontend (Vite on port 5173) and backend (Hono API on port 3000) concurrently.

### 6. Access Your Invitation

- **Frontend**: `http://localhost:5173/your-wedding-uid`
- **API endpoint**: `http://localhost:3000/api/invitation/your-wedding-uid`

Replace `your-wedding-uid` with the UID you defined in your SQL file.

## Next Steps

- [[Personalized Links]]
- [[Deployment]]
- [[API Reference]]
