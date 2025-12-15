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
  async headers() {
    return [
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
