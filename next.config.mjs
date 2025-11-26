import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  // Tắt export mode để support dynamic routes [id]
  // output: 'export',
  // distDir: 'dist',

  // Enable standalone output for Docker
  output: "standalone",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.wine.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
