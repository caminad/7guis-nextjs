/** @type {import('eslint').Linter.Config} */
const eslintrc = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'next/core-web-vitals',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
}

module.exports = eslintrc
