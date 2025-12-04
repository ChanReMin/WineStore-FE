"use client";

import React from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { getWineBlurPlaceholder, getOptimizedSizes, getImageQuality } from "@/lib/imageOptimization";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  type?: 'card' | 'hero' | 'thumbnail' | 'detail' | 'full';
  placeholderColor?: string;
  onError?: () => void;
  quality?: number;
}

/**
 * OptimizedImage Component
 * 
 * Component tối ưu hóa hình ảnh với:
 * - Tự động blur placeholder
 * - Responsive sizes
 * - Lazy loading
 * - Fallback handling
 * - Quality optimization
 * 
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/product.jpg"
 *   alt="Wine Product"
 *   type="card"
 *   priority={index < 4}
 * />
 * ```
 */
const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  fill = true,
  width,
  height,
  className = "",
  priority = false,
  type = 'card',
  placeholderColor,
  onError,
  quality,
}: OptimizedImageProps) {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  // Reset error state when src changes
  React.useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show fallback if image failed to load
  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200 ${className}`}>
        <div className="text-center">
          <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-2 opacity-50" />
          <p className="text-xs text-neutral-500">Image unavailable</p>
        </div>
      </div>
    );
  }

  // Get optimized settings
  const sizes = getOptimizedSizes(type);
  const imageQuality = quality || getImageQuality(priority, type === 'hero');
  const blurDataURL = getWineBlurPlaceholder(width || 400, height || 600);

  return (
    <div className="relative w-full h-full">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-linear-to-br from-neutral-100 to-neutral-200 animate-pulse z-10" />
      )}
      
      {/* Optimized Image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        quality={imageQuality}
        className={`${className} transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onError={handleError}
        onLoad={handleLoadingComplete}
      />
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
