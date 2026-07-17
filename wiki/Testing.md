# Testing Guide

This guide explains how to write and run tests for the Sakeenah server.

## Test Framework

Sakeenah uses **Vitest** for testing, chosen for its:

- Native ES modules support
- Fast execution with Bun runtime
- Built-in mocking capabilities
- Compatible with Vite configuration

## Running Tests

```bash
# Run all tests once
bun run test

# Run tests in watch mode (development)
bun run test:watch

# Run only unit tests
bun run test:unit

# Run only E2E tests
bun run test:e2e

# Run tests with coverage report
bun run test:coverage

# Run a specific test file
bunx vitest run src/server/schemas.spec.js
```

## Test Structure

```
src/server/
├── features/
│   ├── invitation/
│   │   ├── routes.js           # Implementation
│   │   └── routes.spec.js      # Unit tests (mocked DB)
│   └── wishes/
│       ├── routes.js
│       └── routes.spec.js
├── schemas.js                  # Validation schemas
├── schemas.spec.js             # Schema unit tests
└── test-utils.js               # Mock factories and helpers
e2e/
└── api.e2e.spec.js             # End-to-end API tests
```

## Test Types

### 1. Unit Tests (Pure Functions)

For code with no external dependencies (schemas, utilities):

```javascript
// src/server/schemas.spec.js
import { describe, it, expect } from "vitest";
import { createWishSchema } from "./schemas.js";

describe("createWishSchema", () => {
  it("should validate a valid wish", () => {
    const result = createWishSchema.safeParse({
      name: "Guest",
      message: "Congratulations!",
      attendance: "ATTENDING",
    });

    expect(result.success).toBe(true);
  });
});
```

### 2. Unit Tests (Mocked Dependencies)

For route handlers that depend on the database:

```javascript
// src/server/features/wishes/routes.spec.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Hono } from "hono";
import wishesRoutes from "./routes.js";
import { createMockPool } from "../../test-utils.js";

// Mock the database client
vi.mock("../../lib/db-client.js", () => ({
  getDbClient: vi.fn(),
}));

import { getDbClient } from "../../lib/db-client.js";

describe("wishes routes", () => {
  let app;

  beforeEach(() => {
    vi.clearAllMocks();
    app = new Hono();
    app.route("/:uid/wishes", wishesRoutes);
  });

  it("should return wishes", async () => {
    const mockPool = createMockPool({
      "SELECT uid FROM invitations": { rows: [{ uid: "test" }] },
      "SELECT id, name, message": { rows: [{ id: 1, name: "Guest" }] },
      "SELECT COUNT": { rows: [{ count: "1" }] },
    });

    getDbClient.mockResolvedValue(mockPool);

    const res = await app.request("/test/wishes");
    expect(res.status).toBe(200);
  });
});
```

### 3. E2E Tests

Test the full API through the Hono app:

```javascript
// e2e/api.e2e.spec.js
import { describe, it, expect } from "vitest";
import app from "../src/server/index.js";

describe("E2E: API", () => {
  it("should return invitation data", async () => {
    const res = await app.request("/api/invitation/test-wedding");
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
  });
});
```

## Test Utilities

### createMockPool(queryResponses)

Creates a mock database pool that returns specified responses based on SQL patterns:

```javascript
import { createMockPool } from "../../test-utils.js";

const mockPool = createMockPool({
  "SELECT * FROM invitations": { rows: [mockInvitation] },
  "SELECT COUNT": { rows: [{ count: "10" }] },
});
```

### Mock Data Factories

```javascript
import {
  createMockInvitation,
  createMockWish,
  createMockAgenda,
  createMockBank,
  createMockStats,
} from "../../test-utils.js";

const invitation = createMockInvitation({ groom_name: "Custom" });
const wish = createMockWish({ attendance: "ATTENDING" });
```

## Writing New Tests

### Adding Unit Tests for a New Feature

1. Create the test file next to the implementation:

   ```
   src/server/features/new-feature/
   ├── routes.js
   └── routes.spec.js
   ```

2. Use the mock utilities:

   ```javascript
   import { createMockPool } from "../../test-utils.js";

   vi.mock("../../lib/db-client.js", () => ({
     getDbClient: vi.fn(),
   }));
   ```

3. Test success and error cases:
   ```javascript
   it("should handle success case", async () => { ... });
   it("should return 404 when not found", async () => { ... });
   it("should handle database errors", async () => { ... });
   ```

### Testing Validation

```javascript
describe("input validation", () => {
  it("should reject invalid input", async () => {
    const res = await app.request("/api/test/wishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "", message: "" }),
    });

    expect(res.status).toBe(400);
  });
});
```

## Integration Tests with Real Database

For tests that need a real database:

1. Create `*.integration.spec.js` files
2. Set up test database with fixtures
3. Use environment variable for test DB URL:

```javascript
// routes.integration.spec.js
import { beforeAll, afterAll } from "vitest";
import { Pool } from "pg";

let pool;

beforeAll(async () => {
  pool = new Pool({
    connectionString: process.env.TEST_DATABASE_URL,
  });
  // Seed test data
});

afterAll(async () => {
  // Cleanup
  await pool.end();
});
```

## Coverage

Run coverage report:

```bash
bun run test:coverage
```

Coverage reports are generated in:

- `coverage/` - HTML report
- Terminal output - Summary

Target coverage: 70% unit, 20% integration, 10% E2E

## CI/CD Integration

Add to your CI pipeline:

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: oven-sh/setup-bun@v1
    - run: bun install
    - run: bun run test
    - run: bun run test:coverage
```
