import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images uploadées dans Sanity
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
