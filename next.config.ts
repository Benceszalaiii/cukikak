import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "vercel.com",
      },
      {
        hostname: "cloud.appwrite.io",
      },
      {
        hostname: "picsum.photos",
      },
    ],
  },
};

export default withNextVideo(nextConfig);
