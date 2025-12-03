import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  // Tắt export mode để support dynamic routes [id]
  // output: 'export',
  // distDir: 'dist',

  // Enable standalone output for Docker
  output: "standalone",

  images: {
    unoptimized: false, // ✅ Bật tối ưu hóa hình ảnh
    formats: ['image/avif', 'image/webp'], // Sử dụng format hiện đại
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache ảnh tối thiểu 60 giây
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.wine.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // ✅ React Compiler - Tự động memoization (Next.js 16+)
  reactCompiler: true,

  // ✅ EXPERIMENTAL FEATURES - Performance optimizations
  experimental: {
    // Optimize specific packages - Better tree-shaking
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-select'],
  },

  // ✅ COMPILER OPTIONS - Production optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Keep error and warn
    } : false,
  },
};

export default withNextIntl(nextConfig);
