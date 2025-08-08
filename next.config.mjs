/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost', // for development (when you use localhost)
      'images.unsplash.com',
      'tailwindcss.com' // Unsplash images support
      // Add any other domains here, e.g.
      // 'yourdomain.com',
      // 'another.domain.com',
    ],
  },
};

export default nextConfig;
