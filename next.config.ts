import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)", // Match all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // Prevents your site from being embedded in iframes on different origins
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self';", // Allows only the same origin to embed the app
          },
        ],
      },
    ];
  },
};

export default nextConfig;
