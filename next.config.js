/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' }
    ],
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Allows iframes on same domain (e.g., admin), block elsewhere
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            // Permissive CSP to allow external scripts/images (Cloudinary, Google, Unsplash) while blocking basic XSS
            value: "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; object-src 'none';",
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|png|webp|avif|mp4|woff2|ico|gif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/methodology-and-learning',
        destination: '/academics',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/why-study-at-sia',
        destination: '/life-at-sia',
        permanent: true,
      },
      {
        source: '/welcome-from-principal',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/school-administration',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/creative-convergence',
        destination: '/beyond-school',
        permanent: true,
      },
      {
        source: '/book-list',
        destination: '/academics',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
