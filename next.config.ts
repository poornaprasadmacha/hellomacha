import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.1.56", "10.70.103.95"],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://fonts.gstatic.com; frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self' mailto:; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },

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