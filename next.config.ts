import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images uploadées dans Sanity
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      {
        // Clic sur le Studio depuis sanity.io/manage : Sanity n'ouvre que l'adresse
        // du site (sans /studio). On renvoie alors directement vers le Studio.
        // Les visiteurs normaux (qui ne viennent pas de sanity.io) ne sont pas concernés.
        source: "/",
        has: [{ type: "header", key: "referer", value: "https://(www\\.)?sanity\\.io(/.*)?" }],
        destination: "/studio",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
