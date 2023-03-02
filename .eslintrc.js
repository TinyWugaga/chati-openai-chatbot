module.exports = {
  extends: ["plugin:@next/next/recommended"],
  env: {
    node: true,
    browser: true,
    es2021: true,
    commonjs: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "testing-library"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: [
        "src/types/*.ts",
        "src/types/api/*.ts",
        "src/lib/*.ts",
        "**/*.d.ts",
      ],
      rules: {
        "no-undef": "off",
        "no-unused-vars": "off",
        "no-var": "off",
      },
    },
    // Only uses Testing Library lint rules in test files
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
