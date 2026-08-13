import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Required for Cloudflare/OpenNext to build correctly
  output: "standalone",

  // 2. Tells OpenNext to bundle these markdown packages instead of copying them
  outputFileTracingExcludes: {
    "*": [
      "node_modules/estree-util-*/**/*",
      "node_modules/hast-util-*/**/*",
      "node_modules/mdast-util-*/**/*",
      "node_modules/micromark-*/**/*",
      "node_modules/recma-*/**/*",
      "node_modules/rehype-*/**/*",
      "node_modules/remark-*/**/*",
      "node_modules/trough/**/*",
      "node_modules/unified/**/*",
      "node_modules/unist-util-*/**/*",
      "node_modules/vfile*/**/*",
      "node_modules/is-plain-obj/**/*",
      "node_modules/property-information/**/*"
    ]
  },

  // 3. Your existing image settings
  images: {
    unoptimized: true,
  },

  // 4. Your existing dev server network settings
  allowedDevOrigins: ["192.168.1.56", "10.70.103.95"],
};

export default nextConfig;