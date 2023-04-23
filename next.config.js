/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['bit.ly', 'cdn.sanity.io', 'chat.openai.com'],
  },

}

module.exports = nextConfig
