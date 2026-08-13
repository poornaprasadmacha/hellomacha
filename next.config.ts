import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Next.js to generate pure static HTML instead of a Node/Edge server
  output: "export",

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.1.56", "10.70.103.95"],
};

export default nextConfig;