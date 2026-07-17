import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Global ignores
  {
    ignores: ["dist", "node_modules", ".wrangler", "coverage"],
  },

  // Frontend: React components and browser code
  {
    files: ["src/**/*.{js,jsx}"],
    ignores: ["src/server/**"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "19.2" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      // Disable prop-types (modern React doesn't require it)
      "react/prop-types": "off",

      // Allow target="_blank" without noreferrer
      "react/jsx-no-target-blank": "off",

      // Fast refresh - error on non-component exports
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true },
      ],

      // Keep hook dependency warnings (errors for strictness)
      "react-hooks/exhaustive-deps": "error",
      // Disable new strict rules from react-hooks v7 (enable and fix later)
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
      "react-hooks/purity": "off",
    },
  },

  // Backend: Hono server and Node.js code
  {
    files: ["src/server/**/*.js"],
    ignores: ["src/server/**/*.spec.js"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Disable new strict rules from ESLint 10
      "preserve-caught-error": "off",
    },
  },

  // Test files: Vitest globals
  {
    files: ["**/*.spec.js", "**/*.test.js", "e2e/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2021,
        // Vitest globals
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        vi: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Config files: Node.js globals (vite.config.js, vitest.config.js, etc.)
  {
    files: ["*.config.js", "*.config.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // Utility scripts (generate-links, etc.)
  {
    files: ["*.js"],
    ignores: ["*.config.js", "src/**"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2021,
        Buffer: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
