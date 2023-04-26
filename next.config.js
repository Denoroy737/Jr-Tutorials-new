/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['bit.ly', 'cdn.sanity.io', 'chat.openai.com', 'lh3.googleusercontent.com'],
  },

}

module.exports = nextConfig
