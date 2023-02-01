module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
  ],
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
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["src/types/*.ts", "**/*.d.ts"],
      rules: {
        "no-undef": "off",
        "no-unused-vars": "off",
        "no-var": "off",
      },
    },
  ],
};
