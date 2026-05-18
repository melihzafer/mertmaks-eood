import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Enable SCSS modules
  sassOptions: {
    includePaths: ["./styles"],
  },
  // Optimize for static generation
  output: "standalone",
};

export default nextConfig;
