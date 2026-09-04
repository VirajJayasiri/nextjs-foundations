import type { NextConfig } from 'next';

const blogUrl = process.env.BLOG_URL || 'http://localhost:3001';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: blogUrl,
      },
      {
        source: '/blog/:path*',
        destination: `${blogUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
