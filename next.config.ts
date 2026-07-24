import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.105", "192.168.0.41"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/uz-latn-uz", destination: "/uz", permanent: true },
      { source: "/uz-latn-uz/:path*", destination: "/uz/:path*", permanent: true },
      { source: "/ru-ru", destination: "/ru", permanent: true },
      { source: "/ru-ru/:path*", destination: "/ru/:path*", permanent: true },
      { source: "/en-gb", destination: "/en", permanent: true },
      { source: "/en-gb/:path*", destination: "/en/:path*", permanent: true },
      { source: "/en-gb/guest-account", destination: "/en", permanent: true },
      { source: "/:lang/guest-account", destination: "/:lang", permanent: true },
      // BE booking temporarily disabled: keep the search/booking modules visible
      // in the UI, but block navigation to the booking page (bounce back home).
      { source: "/booking", destination: "/", permanent: false },
      { source: "/:lang/booking", destination: "/:lang", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
