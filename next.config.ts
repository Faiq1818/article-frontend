import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard/article",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
