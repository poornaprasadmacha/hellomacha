import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Next.js to generate pure static HTML instead of a Node/Edge server
  output: "export",

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.1.56", "10.70.103.95"],

  async redirects() {
    return [
      {
        source: "/articles/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/articles",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;