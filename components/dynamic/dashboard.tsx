"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import {
  DashboardSkeleton,
  ChartSkeleton,
  AnalyticsSkeleton,
  AdminModalSkeleton
} from '../skeletons';

// Dashboard Components
export const DynamicSellerDashboard = dynamic(
  () => import('../seller/Dashboard').then(mod => ({ default: mod.default })),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

export const DynamicAdminDashboard = dynamic(
  () => import('../admin/dashboard/AdminDashboard').then(mod => ({ default: mod.default })),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

// Chart Components
export const DynamicRevenueChart = dynamic(
  () => import('../charts/RevenueChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

export const DynamicSalesChart = dynamic(
  () => import('../charts/SalesChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

export const DynamicOrderAnalytics = dynamic(
  () => import('../analytics/OrderAnalytics'),
  {
    loading: () => <AnalyticsSkeleton />,
    ssr: false
  }
);

export const DynamicInventoryChart = dynamic(
  () => import('../charts/InventoryChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

// Admin Management Components
export const DynamicUserManagement = dynamic(
  () => import('../admin/user-management/UserManagement'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

export const DynamicSellerManagement = dynamic(
  () => import('../admin/seller-management/SellerManagement'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

export const DynamicProductApproval = dynamic(
  () => import('../admin/product-approval/ProductApproval'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

export const DynamicWarehouseApproval = dynamic(
  () => import('../admin/warehouse-approval/WarehouseApproval'),
  {
    loading: () => <DashboardSkeleton />,
    ssr: false
  }
);

// Modal Components
export const DynamicAdminModal = dynamic(
  () => import('../admin/shared/AdminModal'),
  {
    loading: () => <AdminModalSkeleton />,
    ssr: false
  }
);

export const DynamicSellerRequestModal = dynamic(
  () => import('../admin/seller-requests/SellerRequestModal'),
  {
    loading: () => <AdminModalSkeleton />,
    ssr: false
  }
);

// Performance tracking utility
export const withPerformanceTracking = <T extends Record<string, any>>(
  componentName: string,
  Component: React.ComponentType<T>
) => {
  return (props: T) => {
    if (typeof window !== 'undefined' && window.performance) {
      const startMark = `${componentName}-render-start`;
      const endMark = `${componentName}-render-end`;
      const measureName = `${componentName}-render-duration`;

      performance.mark(startMark);
      
      React.useEffect(() => {
        performance.mark(endMark);
        try {
          performance.measure(measureName, startMark, endMark);
          const measure = performance.getEntriesByName(measureName)[0];
        } catch (error) {
          console.warn('Performance measurement failed:', error);
        }
        
        // Cleanup marks
        performance.clearMarks(startMark);
        performance.clearMarks(endMark);
        performance.clearMeasures(measureName);
      });
    }

    return <Component {...props} />;
  };
};