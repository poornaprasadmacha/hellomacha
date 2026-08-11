import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For development we avoid forcing static export so dynamic features work.
  // Keep `export` only in production builds so dev server can use dynamic rendering.
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  images: {
    unoptimized: true, 
  },
  // Allows you to view the dev server on your local network IP
  // Add any development hosts you test from (e.g. other devices on LAN)
  allowedDevOrigins: ["192.168.1.56", "10.70.103.95"],
};

export default nextConfig;