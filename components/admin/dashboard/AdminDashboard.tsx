"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { RefreshCw } from "lucide-react";
import MetricsCards from "./MetricsCards";
import RevenueChart from "./RevenueChart";
import QuickStats from "./QuickStats";
import CategoryPerformance from "./CategoryPerformance";
import PaymentMethodsChart from "./PaymentMethodsChart";
import {
  fetchSystemOverview,
  fetchRevenueAnalytics,
} from "@/lib/adminDashboard";

export default function AdminDashboard() {
  const t = useTranslations("admin.dashboard");
  const [loading, setLoading] = useState(true);
  const [systemData, setSystemData] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Calculate date range (last 30 days by default)
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const [system, revenue] = await Promise.all([
        fetchSystemOverview({ startDate, endDate }),
        fetchRevenueAnalytics({ startDate, endDate, groupBy: "day" }),
      ]);
      
      setSystemData(system.data);
      setRevenueData(revenue.data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      // Optionally add toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfbf5]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#3b4417] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-[#7a8451]">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!systemData || !revenueData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfbf5]">
        <p className="text-red-600">{t("error")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#3b4417] tracking-wide">
            {t("title")}
          </h1>
          <p className="text-[#7a8451]">{t("subtitle")}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-[#3b4417] text-amber-50 rounded-lg hover:bg-[#4c5b23] transition-colors disabled:opacity-50"
        >
          <RefreshCw
            className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
          />
          <span className="hidden sm:inline">{t("refresh")}</span>
        </motion.button>
      </div>

      {/* Period Info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg"
      >
        <span className="text-sm text-neutral-600">{t("period")}:</span>
        <span className="text-sm font-medium text-[#3b4417]">
          {new Date(systemData.period.startDate).toLocaleDateString("vi-VN")} -{" "}
          {new Date(systemData.period.endDate).toLocaleDateString("vi-VN")}
        </span>
      </motion.div>

      {/* Metrics Cards */}
      <MetricsCards
        totalRevenue={systemData.businessMetrics.totalRevenue}
        totalOrders={systemData.businessMetrics.totalOrders}
        totalUsers={systemData.users.totalUsers}
        totalProducts={systemData.products.total}
        conversionRate={systemData.businessMetrics.conversionRate}
        profitMargin={systemData.businessMetrics.profitMarginPercent}
      />

      {/* Revenue Chart */}
      <RevenueChart data={revenueData.revenueChart} />

      {/* Quick Stats */}
      <QuickStats
        users={systemData.users}
        products={systemData.products}
        orders={systemData.orders}
        inventory={systemData.inventory}
      />

    </div>
  );
}
