import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import dashboardService from "@/services/dashboardService";
import orderService from "@/services/orderService";
import type {
  DashboardOverview,
  DashboardRevenue,
  InventoryAlert,
} from "@/types/dashboard";
import type { SellerOrder } from "@/types/sellerOrder";

interface UseDashboardReturn {
  overview: DashboardOverview | null;
  revenue: DashboardRevenue | null;
  inventoryAlerts: InventoryAlert[];
  orders: SellerOrder[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useDashboard(period: string = "week"): UseDashboardReturn {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [revenue, setRevenue] = useState<DashboardRevenue | null>(null);
  const [inventoryAlerts, setInventoryAlerts] = useState<InventoryAlert[]>([]);
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all dashboard data in parallel with error handling for each
      const results = await Promise.allSettled([
        dashboardService.getOverview(),
        dashboardService.getRevenue({ period }),
        dashboardService.getInventoryAlerts(),
        orderService.seller.getOrders({ limit: 5, page: 1 }),
      ]);

      // Handle overview
      if (results[0].status === "fulfilled") {
        setOverview(results[0].value);
      } else {
        console.error("Error fetching overview:", results[0].reason);
      }

      // Handle revenue
      if (results[1].status === "fulfilled") {
        setRevenue(results[1].value);
      } else {
        console.error("Error fetching revenue:", results[1].reason);
        // Set default revenue data if API fails
        setRevenue({
          period,
          totalRevenue: 0,
          totalOrders: 0,
          chart_data: [],
        });
      }

      // Handle inventory alerts
      if (results[2].status === "fulfilled") {
        // Lấy 10 items đầu tiên bằng slice
        setInventoryAlerts(results[2].value.slice(0, 10));
      } else {
        console.error("Error fetching inventory alerts:", results[2].reason);
      }

      // Handle orders
      if (results[3].status === "fulfilled") {
        setOrders(results[3].value.orders || []);
      } else {
        console.error("Error fetching orders:", results[3].reason);
      }

      // Show error only if all requests failed
      const allFailed = results.every((result) => result.status === "rejected");
      if (allFailed) {
        const errorMessage = "Failed to load dashboard data";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err: any) {
      const errorMessage = err.message || "Failed to load dashboard data";
      setError(errorMessage);
      console.error("Error fetching dashboard data:", err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    overview,
    revenue,
    inventoryAlerts,
    orders,
    loading,
    error,
    refresh: fetchDashboardData,
  };
}
