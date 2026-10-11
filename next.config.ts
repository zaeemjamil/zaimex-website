import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents the site from being framed by another origin (clickjacking protection).
  { key: "X-Frame-Options", value: "DENY" },
  // Stops browsers guessing content types away from what the server declares.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Sends the referring page's origin only (not full URL/path) to other sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disables browser features this site never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // /solutions duplicated /services and was removed; send any existing
      // links/bookmarks/search results on permanently rather than 404.
      { source: "/solutions", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
