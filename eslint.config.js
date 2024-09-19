import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import node from "eslint-plugin-node";

export default [
  { ignores: ["dist"] },
  {
    // Загальні правила
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-var": "error",
      "prefer-const": "error"
    }
  },
  {
    // Конфігурація для клієнтської частини
    files: ["client/**/*.{js,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      camelcase: ["error", { properties: "always" }],
      "new-cap": ["error", { newIsCap: true }],
      "max-len": ["error", { code: 80 }]
    }
  },
  {
    // Конфігурація для серверної частини
    files: ["server/**/*.{js,cjs,mjs}"],
    languageOptions: {
      globals: globals.node
    },
    plugins: {
      node
    },
    rules: {
      ...node.configs.recommended.rules,
      "node/no-unsupported-features/es-syntax": [
        "error",
        { ignores: ["modules"] }
      ]
    }
  }
];
