import api from "@/lib/axios";
import { handleApiError } from "@/lib/errorHandler";
import type {
  DashboardOverviewResponse,
  DashboardRevenueResponse,
  DashboardInventoryAlertsResponse,
  RevenueParams,
} from "@/types/dashboard";

const dashboardService = {
  // Get dashboard overview
  getOverview: async () => {
    try {
      const response = await api.get<DashboardOverviewResponse>(
        "/api/v1/seller/dashboard/overview"
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get revenue data with optional filters
  getRevenue: async (params?: RevenueParams) => {
    try {
      const response = await api.get<DashboardRevenueResponse>(
        "/api/v1/seller/dashboard/revenue",
        { params }
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get inventory alerts
  getInventoryAlerts: async () => {
    try {
      const response = await api.get<DashboardInventoryAlertsResponse>(
        "/api/v1/seller/dashboard/inventory/alerts"
      );
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default dashboardService;
export { dashboardService };
