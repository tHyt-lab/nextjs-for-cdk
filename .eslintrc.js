module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "import",
    "unused-imports",
    "jest",
    "jest-dom",
    "testing-library",
  ],
  ignorePatterns: ["next.config.js", ".eslintrc.js"],
  rules: {
    // Reactの明示的なインポートを不要にする(Reactv17で対応)
    "react/react-in-jsx-scope": "off",
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "{react,react-dom/**,react-router-dom, next/**}",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
  },
  overrides: [
    {
      files: ["*.@(tsx|jsx)"],
      rules: {
        "@typescript-eslint/no-misused-promises": "off",
      },
    },
  ],
};
