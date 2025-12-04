"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ImageIcon } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  placeholderSrc?: string;
  onError?: () => void;
  showLoadingState?: boolean;
  quality?: number;
}

/**
 * Optimized Image component with:
 * - Next.js Image optimization
 * - Lazy loading with Intersection Observer
 * - Automatic fallback handling
 * - Loading states and blur placeholder
 * - Support for external URLs
 */
export default function ImageWithFallback({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  placeholderSrc = "/placeholder-wine.jpg",
  onError,
  showLoadingState = true,
  quality = 85,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Reset when src changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setShowFallback(false);
    setIsLoading(true);
  }, [src]);

  // Intersection Observer for lazy loading (only for non-priority images)
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before image enters viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleError = () => {
    setIsLoading(false);
    if (!hasError) {
      setHasError(true);
      if (imgSrc === placeholderSrc) {
        // Placeholder also failed, show icon
        setShowFallback(true);
      } else {
        // Try placeholder
        setImgSrc(placeholderSrc);
      }
      onError?.();
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show fallback icon if everything failed
  if (showFallback) {
    return (
      <div
        ref={imgRef}
        className={`flex items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200 ${className}`}
      >
        <div className="text-center">
          <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-2 opacity-50" />
          <p className="text-xs text-neutral-500">No Image</p>
        </div>
      </div>
    );
  }

  // Check if URL is external
  const isExternal = imgSrc.startsWith("http");

  // For external URLs with fill, use regular img tag with native lazy loading
  if (isExternal && fill) {
    return (
      <div ref={imgRef} className="relative w-full h-full">
        {/* Loading skeleton */}
        {showLoadingState && isLoading && (
          <div className="absolute inset-0 bg-linear-to-br from-neutral-100 to-neutral-200 animate-pulse" />
        )}
        {/* Image - Native lazy loading */}
        {isInView && (
          // biome-ignore lint/a11y/useAltText: alt is provided via props
          <img
            src={imgSrc}
            alt={alt}
            className={`${className} absolute inset-0 w-full h-full transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onError={handleError}
            onLoad={handleLoadingComplete}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        )}
      </div>
    );
  }

  // Use Next.js Image component for optimal performance
  return (
    <div ref={imgRef} className="relative w-full h-full">
      {/* Loading skeleton */}
      {showLoadingState && isLoading && (
        <div className="absolute inset-0 bg-linear-to-br from-neutral-100 to-neutral-200 animate-pulse z-10" />
      )}
      {/* Image - only render when in view or priority */}
      {isInView && (
        <Image
          src={imgSrc}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          sizes={sizes}
          quality={quality}
          className={`${className} transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          priority={priority}
          onError={handleError}
          onLoad={handleLoadingComplete}
          unoptimized={isExternal}
          loading={priority ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
        />
      )}
    </div>
  );
}
