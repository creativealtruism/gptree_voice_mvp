import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force cache invalidation
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
