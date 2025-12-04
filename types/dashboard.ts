// Dashboard Types for Seller

export interface DashboardOverview {
  totalOrders: number;
  totalRevenue: number; // API trả về scientific notation (2.087474E7)
  completedOrders: number;
  cancelledOrders: number;
  lowStockProducts: number;
  pending_orders: number;
  outOfStock_products: number;
}

export interface RevenueChartData {
  date: string;
  revenue: number;
  orders: number;
}

export interface DashboardRevenue {
  period: string;
  totalRevenue: number;
  totalOrders: number;
  chart_data: RevenueChartData[];
}

export interface InventoryAlert {
  id: number;
  warehouse: {
    id: number;
    name: string;
    location: string;
  };
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantityOnHand: number;
  safetyStock: number;
  status: string;
  lastUpdatedAt: string;
}

export interface DashboardOverviewResponse {
  success: boolean;
  message: string;
  data: DashboardOverview;
}

export interface DashboardRevenueResponse {
  success: boolean;
  message: string;
  data: DashboardRevenue;
}

export interface DashboardInventoryAlertsResponse {
  success: boolean;
  message: string;
  data: InventoryAlert[];
}

export interface RevenueParams {
  period?: string;
  startDate?: string;
  endDate?: string;
}
