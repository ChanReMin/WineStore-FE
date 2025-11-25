"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { DollarSign, ShoppingCart, Package, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface OverviewCardsProps {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  stockAlerts: number;
}

export default function OverviewCards({
  totalRevenue,
  totalOrders,
  totalProducts,
  stockAlerts,
}: OverviewCardsProps) {
  const t = useTranslations("seller.dashboard.overview");
  const cards = [
    {
      title: t("totalRevenue"),
      value: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(totalRevenue),
      icon: DollarSign,
      color: "text-[#3b4417]",
      bgColor: "bg-[#f5f3e8]",
    },
    {
      title: t("orders"),
      value: totalOrders.toString(),
      icon: ShoppingCart,
      color: "text-[#d4af37]",
      bgColor: "bg-[#fdfbf5]",
    },
    {
      title: t("products"),
      value: totalProducts.toString(),
      icon: Package,
      color: "text-[#7a8451]",
      bgColor: "bg-[#f5f3e8]",
    },
    {
      title: t("stockAlerts"),
      value: stockAlerts.toString(),
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-[#d4d6b4] hover:border-[#3b4417]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7a8451] mb-1 tracking-wide uppercase text-[11px]">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-[#3b4417]">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`${card.bgColor} p-3 rounded-full transition-transform hover:scale-110`}
                >
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
