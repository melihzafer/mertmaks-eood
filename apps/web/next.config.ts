import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  transpilePackages: ["@mertmaks/content"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Enable SCSS modules
  sassOptions: {
    includePaths: ["./styles", "./src/styles"],
  },
  // Optimize for static generation
  output: "standalone",
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
};

export default nextConfig;
