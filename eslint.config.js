module.exports = [
  {
    ignores: ["node_modules", "**/*.test.ts", "**/*.spec.ts"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "prettier/prettier": ["error", { singleQuote: true, semi: false }],
    },
  },
];