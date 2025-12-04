import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // Tắt export mode để support dynamic routes [id]
  // output: 'export',
  // distDir: 'dist',

  // Enable standalone output for Docker
  output: "standalone",

  // Disable source maps in development to avoid parsing errors
  productionBrowserSourceMaps: false,

  images: {
    unoptimized: false, // ✅ Bật tối ưu hóa hình ảnh
    formats: ["image/avif", "image/webp"], // Sử dụng format hiện đại (AVIF nhẹ hơn 20-50% so với WebP)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // Cache ảnh 24 giờ (tăng từ 60s để giảm tải server)
    dangerouslyAllowSVG: true, // Cho phép SVG từ external sources
    contentDispositionType: 'attachment', // Bảo mật cho SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // CSP cho SVG
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
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
    ],
  },

  // ✅ React Compiler - Tự động memoization (Next.js 16+)
  reactCompiler: true,

  // ✅ EXPERIMENTAL FEATURES - Performance optimizations
  experimental: {
    // Optimize specific packages - Better tree-shaking
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-select",
      "recharts",
      "react-toastify",
      "@tanstack/react-query"
    ],

    // Enable webpack build worker for faster builds
    webpackBuildWorker: true,

    // Optimize CSS
    optimizeCss: true,

    // Enable turbo for faster development
    // Temporarily disabled due to next-intl conflicts
    // turbo: {
    //   rules: {
    //     '*.tsx?': ['typescript'],
    //     '*.jsx?': ['babel'],
    //   }
    // }
  },

  // ✅ WEBPACK CONFIG - Advanced optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize for production client build
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            // React and related
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 20,
            },
            // Charts library
            charts: {
              test: /[\\/]node_modules[\\/](recharts)[\\/]/,
              name: 'charts',
              chunks: 'all',
              priority: 15,
            },
            // UI libraries
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|framer-motion|lucide-react)[\\/]/,
              name: 'ui',
              chunks: 'all',
              priority: 15,
            },
            // Common chunks
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 5,
            }
          }
        }
      };
    }

    return config;
  },

  // ✅ COMPILER OPTIONS - Production optimizations
  compiler: {
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
          exclude: ["error", "warn"], // Keep error and warn
        }
        : false,
  },
};

export default withNextIntl(nextConfig);
