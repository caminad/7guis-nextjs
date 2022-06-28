/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false,
    newNextLinkBehavior: true,
  },
}

module.exports = nextConfig
