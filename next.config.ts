import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/spoty',
        permanent: false, // Use false so they can change it later without aggressive caching
      },
    ];
  },
};

export default nextConfig;
