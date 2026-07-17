import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    include: ["src/**/*.spec.js", "src/**/*.test.js", "e2e/**/*.e2e.spec.js"],
    exclude: ["node_modules", "dist"],
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/server/**/*.js"],
      exclude: [
        "src/server/**/*.spec.js",
        "src/server/**/*.test.js",
        "src/server/db/**",
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
    },
    testTimeout: 10000,
    reporters: ["verbose"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
