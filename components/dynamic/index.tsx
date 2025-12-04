"use client";

import React from "react";

// Export all dynamic components for easy importing
export * from "./dashboard";
export * from "./modals";

// Re-export skeletons for convenience
export {
  DashboardSkeleton,
  ChartSkeleton,
  ModalSkeleton,
  AdminModalSkeleton,
  AnalyticsSkeleton,
  FilterSkeleton,
  PaymentSkeleton,
  RecommendationSkeleton,
} from "../skeletons";

// Utility types for dynamic imports
export interface DynamicComponentProps {
  loading?: React.ComponentType;
  ssr?: boolean;
}

export interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  loadTime: number;
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.performance) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name.includes(componentName)) {
            console.log(`${entry.name}: ${entry.duration}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ["measure"] });

      return () => observer.disconnect();
    }
  }, [componentName]);
}

// Bundle size analyzer helper
export function analyzeBundleSize() {
  if (typeof window !== "undefined" && "performance" in window) {
    const entries = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];
    const jsEntries = entries.filter(
      (entry) =>
        entry.name.includes(".js") && !entry.name.includes("node_modules")
    );

    const totalSize = jsEntries.reduce(
      (total, entry) => total + (entry.transferSize || 0),
      0
    );
  }
}
