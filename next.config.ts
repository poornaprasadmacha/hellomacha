import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  // Allows you to view the dev server on your local network IP
  allowedDevOrigins: ["192.168.1.56", "10.70.103.95"],
};

export default nextConfig;