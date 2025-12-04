"use client";

import { useState, useEffect, useCallback } from "react";
import React from "react";
import dynamic from "next/dynamic";

export interface DynamicImportConfig {
  component: () => Promise<{ default: React.ComponentType<any> }>;
  loading?: React.ComponentType;
  ssr?: boolean;
  errorBoundary?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export interface DynamicImportState {
  isLoading: boolean;
  error: Error | null;
  Component: React.ComponentType<any> | null;
}

/**
 * Hook để quản lý dynamic imports với error handling và retry logic
 */
export function useDynamicImport<T = any>(config: DynamicImportConfig) {
  const [state, setState] = useState<DynamicImportState>({
    isLoading: true,
    error: null,
    Component: null,
  });

  const loadComponent = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const module = await config.component();
      const DynamicComponent = dynamic(() => Promise.resolve(module), {
        loading: config.loading as any,
        ssr: config.ssr ?? false,
      });

      setState({
        isLoading: false,
        error: null,
        Component: DynamicComponent,
      });
    } catch (error) {
      setState({
        isLoading: false,
        error: error as Error,
        Component: null,
      });
    }
  }, [config]);

  const retry = useCallback(() => {
    loadComponent();
  }, [loadComponent]);

  useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  return {
    ...state,
    retry,
  };
}

/**
 * Hook để track performance của dynamic components
 */
export function useDynamicComponentPerformance(componentName: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const startTime = performance.now();
    const startMark = `${componentName}-dynamic-start`;

    performance.mark(startMark);

    return () => {
      const endTime = performance.now();
      const endMark = `${componentName}-dynamic-end`;
      const measureName = `${componentName}-dynamic-load`;

      try {
        performance.mark(endMark);
        performance.measure(measureName, startMark, endMark);

        const measure = performance.getEntriesByName(measureName)[0];
        const loadTime = endTime - startTime;

        // Log performance metrics
        console.group(`🚀 Dynamic Component Performance: ${componentName}`);
        console.log(`Load Time: ${loadTime.toFixed(2)}ms`);
        console.log(`Render Duration: ${measure?.duration?.toFixed(2)}ms`);
        console.groupEnd();

        // Send to analytics if needed
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "dynamic_component_load", {
            component_name: componentName,
            load_time: Math.round(loadTime),
            render_duration: Math.round(measure?.duration || 0),
          });
        }

        // Cleanup
        performance.clearMarks(startMark);
        performance.clearMarks(endMark);
        performance.clearMeasures(measureName);
      } catch (error) {
        console.warn("Performance measurement failed:", error);
      }
    };
  }, [componentName]);
}

/**
 * Utility để preload dynamic components
 */
export function preloadDynamicComponent(importFn: () => Promise<any>) {
  if (typeof window !== "undefined") {
    // Preload on browser idle time
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        importFn().catch(console.warn);
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        importFn().catch(console.warn);
      }, 0);
    }
  }
}

/**
 * Hook để preload components khi user hover vào trigger element
 */
export function usePreloadOnHover(importFn: () => Promise<any>) {
  const [isPreloaded, setIsPreloaded] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!isPreloaded) {
      preloadDynamicComponent(importFn);
      setIsPreloaded(true);
    }
  }, [importFn, isPreloaded]);

  return { handleMouseEnter, isPreloaded };
}
