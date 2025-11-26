"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricsCardsProps {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  conversionRate: number;
  profitMargin: number;
}

export default function MetricsCards({
  totalRevenue,
  totalOrders,
  totalUsers,
  totalProducts,
  conversionRate,
  profitMargin,
}: MetricsCardsProps) {
  const t = useTranslations("admin.dashboard.metrics");

  const cards = [
    {
      title: t("totalRevenue"),
      value: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(totalRevenue),
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: t("totalOrders"),
      value: totalOrders.toString(),
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: t("totalUsers"),
      value: totalUsers.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+15.3%",
      trendUp: true,
    },
    {
      title: t("totalProducts"),
      value: totalProducts.toString(),
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "+5.1%",
      trendUp: true,
    },
    {
      title: t("conversionRate"),
      value: `${conversionRate}%`,
      icon: TrendingUp,
      color: "text-[#3b4417]",
      bgColor: "bg-[#f5f3e8]",
      trend: "+0.8%",
      trendUp: true,
    },
    {
      title: t("profitMargin"),
      value: `${profitMargin}%`,
      icon: DollarSign,
      color: "text-[#d4af37]",
      bgColor: "bg-[#fdfbf5]",
      trend: "-2.1%",
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-neutral-200 hover:border-[#3b4417] overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs text-neutral-600 mb-1 tracking-wide uppercase font-medium">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-[#3b4417] mb-2">
                    {card.value}
                  </p>
                  <div className="flex items-center gap-1">
                    {card.trendUp ? (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        card.trendUp ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {card.trend}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {t("vsLastMonth")}
                    </span>
                  </div>
                </div>
                <div
                  className={`${card.bgColor} p-3 rounded-xl transition-all duration-300 group-hover:scale-110`}
                >
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                  className={`h-full ${card.bgColor} opacity-60`}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
