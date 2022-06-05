/** @type {import('prettier').Config} */
const prettierrc = {
  plugins: [require('prettier-plugin-tailwindcss')],
  proseWrap: 'never',
  semi: false,
  singleQuote: true,
}

module.exports = prettierrc
