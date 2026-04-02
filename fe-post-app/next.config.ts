import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // true untuk SEO (308), false untuk sementara (307)
      },
    ];
  },
};

export default nextConfig;
