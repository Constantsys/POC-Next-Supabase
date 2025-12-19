/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost', '*.supabase.co']
    }
  }
}

module.exports = nextConfig

