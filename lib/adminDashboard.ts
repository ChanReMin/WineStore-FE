// Admin Dashboard API integration
import axiosInstance from "@/lib/axios";

// API Response Types based on Swagger documentation
export interface SystemOverviewResponse {
  success: boolean;
  message?: string;
  data: {
    period: {
      startDate: string;
      endDate: string;
    };
    businessMetrics: {
      totalRevenue: number;
      grossProfit: number;
      profitMarginPercent: number;
      totalOrders: number;
      averageOrderValue: number;
      conversionRate: number;
    };
    users: {
      totalUsers: number;
      customers: number;
      sellers: number;
      admins: number;
      newThisMonth: number;
      activeUsers: number;
      pendingSellerRequests: number;
    };
    products: {
      total: number;
      active: number;
      pendingApproval: number;
      rejected: number;
      outOfStock: number;
    };
    orders: {
      total: number;
      byStatus: {
        [key: string]: number;
      };
      cancellationRate: number;
    };
    inventory: {
      totalValue: number;
      totalQuantity: number;
      totalWarehouses: number;
      lowStockProducts: number;
      outOfStockProducts: number;
    };
  };
}

export interface RevenueAnalyticsResponse {
  success: boolean;
  message?: string;
  data: {
    revenueChart: Array<{
      date: string;
      revenue: number;
      orders: number;
      profit: number;
      customers: number;
    }>;
    paymentMethods: {
      [key: string]: {
        total: number;
        percentage: number;
        orders: number;
      };
    };
    categoriesPerformance: Array<{
      categoryId: number;
      categoryName: string;
      revenue: number;
      orders: number;
      percentage: number;
    }>;
    regionsPerformance: Array<{
      region: string;
      revenue: number;
      orders: number;
      percentage: number;
    }>;
  };
}

export interface UserAnalyticsResponse {
  success: boolean;
  message?: string;
  data: {
    userGrowth: Array<{
      date: string;
      newUsers: number;
      totalUsers: number;
    }>;
    userSegments: {
      [key: string]: {
        count: number;
        totalSpent: number;
        averageOrderValue: number;
      };
    };
  };
}

// Real API calls
export const fetchSystemOverview = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<SystemOverviewResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append("startDate", params.startDate);
  if (params?.endDate) queryParams.append("endDate", params.endDate);

  const response = await axiosInstance.get<SystemOverviewResponse>(
    `/api/v1/admin/dashboard/overview${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
  );

  return response.data;
};

export const fetchRevenueAnalytics = async (params?: {
  startDate?: string;
  endDate?: string;
  groupBy?: "day" | "week" | "month";
}): Promise<RevenueAnalyticsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append("startDate", params.startDate);
  if (params?.endDate) queryParams.append("endDate", params.endDate);
  if (params?.groupBy) queryParams.append("groupBy", params.groupBy);

  const response = await axiosInstance.get<RevenueAnalyticsResponse>(
    `/api/v1/admin/dashboard/revenue-analytics${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
  );

  return response.data;
};

export const fetchUserAnalytics = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<UserAnalyticsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append("startDate", params.startDate);
  if (params?.endDate) queryParams.append("endDate", params.endDate);

  const response = await axiosInstance.get<UserAnalyticsResponse>(
    `/api/v1/admin/dashboard/user-analytics${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
  );

  return response.data;
};
