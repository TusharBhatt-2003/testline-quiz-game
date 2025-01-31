import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React Strict Mode
  async rewrites() {
    return [
      {
        source: "/api/quizdata", // Proxy API requests
        destination: "https://api.jsonserve.com/Uw5CrX", // Your target API URL
      },
    ];
  },
};

export default nextConfig;
