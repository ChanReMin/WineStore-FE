import { useState, useEffect, useRef } from "react";

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for lazy loading with Intersection Observer
 * 
 * @param options Configuration for intersection observer
 * @returns Object with ref, isInView state, and hasBeenInView flag
 * 
 * @example
 * const { ref, isInView } = useLazyLoad({ rootMargin: "100px" });
 * 
 * <div ref={ref}>
 *   {isInView && <img src="..." />}
 * </div>
 */
export function useLazyLoad<T extends HTMLElement = HTMLDivElement>(
  options: UseLazyLoadOptions = {}
) {
  const {
    threshold = 0,
    rootMargin = "50px",
    triggerOnce = true,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already been in view and triggerOnce is true, don't observe again
    if (hasBeenInView && triggerOnce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting;
          setIsInView(inView);

          if (inView) {
            setHasBeenInView(true);
            if (triggerOnce) {
              observer.disconnect();
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasBeenInView]);

  return {
    ref,
    isInView: triggerOnce ? hasBeenInView : isInView,
    hasBeenInView,
  };
}

/**
 * Hook to preload an image
 * 
 * @param src Image source URL
 * @returns Loading state and error state
 * 
 * @example
 * const { isLoading, hasError } = useImagePreload("/image.jpg");
 */
export function useImagePreload(src: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const img = new Image();

    img.onload = () => {
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoading, hasError };
}

/**
 * Hook to lazy load multiple images with priority
 * 
 * @param images Array of image URLs
 * @param priorityCount Number of images to load with priority
 * @returns Map of image URLs to their loading states
 * 
 * @example
 * const loadingStates = useLazyLoadImages([img1, img2, img3], 1);
 * 
 * loadingStates.get(img1) // { isLoading: false, hasError: false, priority: true }
 */
export function useLazyLoadImages(
  images: string[],
  priorityCount: number = 3
) {
  const [loadingStates, setLoadingStates] = useState(
    () => new Map(
      images.map((src, index) => [
        src,
        {
          isLoading: true,
          hasError: false,
          priority: index < priorityCount,
        },
      ])
    )
  );

  useEffect(() => {
    images.forEach((src, index) => {
      const isPriority = index < priorityCount;

      if (isPriority) {
        const img = new Image();
        img.onload = () => {
          setLoadingStates((prev) => {
            const next = new Map(prev);
            const current = next.get(src);
            if (current) {
              next.set(src, { ...current, isLoading: false });
            }
            return next;
          });
        };
        img.onerror = () => {
          setLoadingStates((prev) => {
            const next = new Map(prev);
            const current = next.get(src);
            if (current) {
              next.set(src, { ...current, isLoading: false, hasError: true });
            }
            return next;
          });
        };
        img.src = src;
      }
    });
  }, [images, priorityCount]);

  return loadingStates;
}
