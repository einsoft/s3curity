/* eslint-disable import/no-anonymous-default-export */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Extensões recomendadas do Next.js e Prettier
  ...compat.extends("next", "next/core-web-vitals", "prettier"),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      prettier,
    },
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "prettier/prettier": "error",
      camelcase: "off",
      "import/prefer-default-export": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      "react/jsx-props-no-spreading": "off",
      "react/no-unused-prop-types": "off",
      "react/require-default-props": "off",
      "react/no-unescaped-entities": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  // Configurações recomendadas do TypeScript e Prettier
  ...compat.extends("plugin:@typescript-eslint/recommended", "prettier").map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...config.rules,
      "@typescript-eslint/no-explicit-any": "off",
    },
  })),
];
