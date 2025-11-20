const nextConfig = {
  // Tắt export mode để support dynamic routes [id]
  // output: 'export',
  // distDir: 'dist',
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

export default nextConfig;
