"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/hooks/useDashboard";
import OverviewCards from "./OverviewCards";
import RevenueChart from "./RevenueChart";
import LatestOrdersTable from "./LatestOrdersTable";
import InventoryAlerts from "./InventoryAlerts";
import PeriodSelector from "./PeriodSelector";

export default function SellerDashboard() {
  const t = useTranslations("seller.dashboard");
  const [period, setPeriod] = useState("week");
  const { overview, revenue, inventoryAlerts, orders, loading, refresh } = useDashboard(period);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfbf5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b4417] mx-auto mb-4"></div>
          <p className="text-[#7a8451]">{t("loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (!overview || !revenue) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfbf5]">
        <p className="text-[#7a8451]">{t("noData") || "No data available"}</p>
      </div>
    );
  }



  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#3b4417] tracking-wide">
            {t("title")}
          </h1>
          <p className="text-[#7a8451]">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <PeriodSelector value={period} onChange={setPeriod} />
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className="border-[#3b4417] text-[#3b4417] hover:bg-[#3b4417] hover:text-white"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            {t("refresh") || "Refresh"}
          </Button>
        </div>
      </div>

      <OverviewCards
        totalRevenue={overview.totalRevenue}
        totalOrders={overview.totalOrders}
        completedOrders={overview.completedOrders}
        pendingOrders={overview.pending_orders}
        cancelledOrders={overview.cancelledOrders}
        lowStockProducts={overview.lowStockProducts}
        outOfStockProducts={overview.outOfStock_products}
      />

      <RevenueChart
        data={revenue.chart_data}
        totalRevenue={revenue.totalRevenue}
        totalOrders={revenue.totalOrders}
        period={revenue.period}
      />

      <LatestOrdersTable orders={orders} />

      <InventoryAlerts alerts={inventoryAlerts} />
    </div>
  );
}
