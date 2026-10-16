import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve images as-is: the Vercel plan's Image Optimization quota is used
    // up (new images return 402), and our assets are small logos anyway.
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
