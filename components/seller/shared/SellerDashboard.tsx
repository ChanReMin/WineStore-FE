"use client";

import {
  mockOverview,
  mockRevenue,
  mockOrders,
  mockInventory,
} from "@/lib/sellerDashboard";
import OverviewCards from "../dashboard/OverviewCards";
import RevenueChart from "../dashboard/RevenueChart";
import LatestOrdersTable from "../dashboard/LatestOrdersTable";
import InventoryAlerts from "../dashboard/InventoryAlerts";

export default function SellerDashboard() {
  const totalProducts = mockInventory.data.length;
  const stockAlerts = mockInventory.data.filter(
    (item) => item.status === "lowStock" || item.status === "outOfStock"
  ).length;

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#3b4417] tracking-wide">
          Dashboard
        </h1>
        <p className="text-[#7a8451]">Overview of business activities</p>
      </div>

      <OverviewCards
        totalRevenue={mockOverview.data.totalRevenue}
        totalOrders={mockOverview.data.totalOrders}
        totalProducts={totalProducts}
        stockAlerts={stockAlerts}
      />

      <RevenueChart
        data={mockRevenue.data.chart_data}
        totalRevenue={mockRevenue.data.totalRevenue}
        totalOrders={mockRevenue.data.totalOrders}
      />

      <LatestOrdersTable orders={mockOrders.data.orders} />

      <InventoryAlerts inventory={mockInventory.data} />
    </div>
  );
}
