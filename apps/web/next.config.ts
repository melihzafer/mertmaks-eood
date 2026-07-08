import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  transpilePackages: ["@mertmaks/content"],
  // Dev-сървърът стигаше 18+ GB и умираше с "Fatal process out of memory" при
  // малък фиксиран pagefile (commit limit). Ограничаваме паметта на Turbopack,
  // за да не изчерпва commit charge на системата.
  experimental: {
    turbopackMemoryLimit: 4 * 1024 * 1024 * 1024, // 4 GB
  },
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
  sassOptions: {
    includePaths: ["./styles", "./src/styles"],
  },
  async redirects() {
    return [
      {
        source: "/domashni-potrebi",
        destination: "/industrial",
        permanent: true,
      },
      {
        source: "/stroitelstvo",
        destination: "/construction",
        permanent: true,
      },
      {
        source: "/kontakti",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/chzv",
        destination: "/faq",
        permanent: true,
      },
    ];
  },
  // Optimize for static generation
  output: "standalone",
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
};

export default nextConfig;
