import js from "@eslint/js";
import globals from "globals";
import node from "eslint-plugin-node";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.node,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      node,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...node.configs.recommended.rules,
      "node/no-unsupported-features/es-syntax": [
        "error",
        { ignores: ["modules"] },
      ],
    },
  },
];
