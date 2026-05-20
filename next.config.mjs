/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image Optimization for SEO
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers for SEO & Security
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ];
  },

  // Redirects
  redirects: async () => {
    return [
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },

  // Rewrite for sitemap
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap',
        },
      ],
    };
  },
};

export default nextConfig;

