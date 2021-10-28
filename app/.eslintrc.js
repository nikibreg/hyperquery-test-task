module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
    }
  ],
  extends: [
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "@typescript-eslint/indent": [
      "error",
      2
    ],
    "@typescript-eslint/no-unused-vars": "error"
  },
};
