/**
 * Image Optimization Utilities
 * Các hàm hỗ trợ tối ưu hóa hình ảnh trong dự án
 */

/**
 * Tạo blur placeholder SVG với màu tùy chỉnh
 * @param width - Chiều rộng SVG
 * @param height - Chiều cao SVG
 * @param color - Màu nền (hex format)
 * @returns Base64 encoded SVG data URL
 */
export function getBlurDataURL(
  width: number = 700,
  height: number = 475,
  color: string = "#f3f4f6"
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <rect width="${width}" height="${height}" fill="${color}"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Tạo gradient blur placeholder cho wine images
 * @param width - Chiều rộng
 * @param height - Chiều cao
 * @returns Base64 encoded gradient SVG
 */
export function getWineBlurPlaceholder(
  width: number = 400,
  height: number = 600
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#fdfbf5;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#f5f3e8;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e8e6d8;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#wineGradient)"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Tạo shimmer effect placeholder
 * @param width - Chiều rộng
 * @param height - Chiều cao
 * @returns Base64 encoded shimmer SVG
 */
export function getShimmerPlaceholder(
  width: number = 700,
  height: number = 475
): string {
  const shimmer = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#e5e7eb;stop-opacity:1">
            <animate attributeName="offset" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shimmer)"/>
    </svg>
  `;

  const base64 = Buffer.from(shimmer).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Optimize image sizes cho responsive breakpoints
 * @param type - Loại component (card, hero, thumbnail, etc.)
 * @returns sizes string cho Next.js Image component
 */
export function getOptimizedSizes(
  type: "card" | "hero" | "thumbnail" | "detail" | "full"
): string {
  const sizesMap = {
    // Product cards trong grid
    card: "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",

    // Hero banners
    hero: "100vw",

    // Thumbnails nhỏ
    thumbnail: "(max-width: 640px) 20vw, (max-width: 1024px) 15vw, 10vw",

    // Product detail page
    detail: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw",

    // Full width images
    full: "100vw",
  };

  return sizesMap[type];
}

/**
 * Determine priority based on index in list
 * @param index - Vị trí của item trong danh sách
 * @param threshold - Số item được ưu tiên (mặc định: 4)
 * @returns boolean
 */
export function shouldPrioritize(
  index: number,
  threshold: number = 4
): boolean {
  return index < threshold;
}

/**
 * Get quality setting based on image importance
 * @param isPriority - Có phải ảnh ưu tiên không
 * @param isHero - Có phải hero image không
 * @returns Quality number (1-100)
 */
export function getImageQuality(
  isPriority: boolean = false,
  isHero: boolean = false
): number {
  if (isHero) return 95; // Hero images cần quality cao nhất
  if (isPriority) return 85; // Priority images dùng quality cao
  return 75; // Normal images dùng quality trung bình
}

/**
 * Preload critical images
 * @param imageUrls - Array of image URLs to preload
 * @param priority - Priority level ('high' | 'low')
 */
export function preloadImages(
  imageUrls: string[],
  priority: "high" | "low" = "low"
): void {
  if (typeof window === "undefined") return;

  imageUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    link.setAttribute("fetchPriority", priority);
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images when they enter viewport
 * @param imageUrls - Array of image URLs to lazy load
 * @param delay - Delay in ms before loading (mặc định: 2000)
 */
export function lazyPreloadImages(
  imageUrls: string[],
  delay: number = 2000
): void {
  if (typeof window === "undefined") return;

  setTimeout(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, delay);
}

/**
 * Check if image URL is external
 * @param url - Image URL
 * @returns boolean
 */
export function isExternalImage(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Get optimal image format based on browser support
 * @returns 'avif' | 'webp' | 'jpeg'
 */
export function getOptimalImageFormat(): "avif" | "webp" | "jpeg" {
  if (typeof window === "undefined") return "jpeg";

  // Check AVIF support
  const avifSupport =
    document
      .createElement("canvas")
      .toDataURL("image/avif")
      .indexOf("data:image/avif") === 0;

  if (avifSupport) return "avif";

  // Check WebP support
  const webpSupport =
    document
      .createElement("canvas")
      .toDataURL("image/webp")
      .indexOf("data:image/webp") === 0;

  if (webpSupport) return "webp";

  return "jpeg";
}
