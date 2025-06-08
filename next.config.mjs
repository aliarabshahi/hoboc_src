/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // For development
    // For production, add your actual domain:
    // domains: ['yourdomain.com', 'localhost'],
  },
};

export default nextConfig;