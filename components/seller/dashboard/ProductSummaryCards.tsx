"use client";

import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

interface ProductSummaryCardsProps {
  summary: {
    total: number;
    pending: number;
    active: number;
    banned: number;
  };
}

export default function ProductSummaryCards({
  summary,
}: ProductSummaryCardsProps) {
  const t = useTranslations("seller.products.summary");

  const cards = [
    {
      titleKey: "totalProducts",
      value: summary.total,
      icon: Package,
      color: "text-[#3b4417]",
      bgColor: "bg-[#f5f3e8]",
      descriptionKey: "allProductsListed",
    },
    {
      titleKey: "pending",
      value: summary.pending,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      descriptionKey: "waitingForAdmin",
    },
    {
      titleKey: "active",
      value: summary.active,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      descriptionKey: "approved",
    },
    {
      titleKey: "banned",
      value: summary.banned,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      descriptionKey: "notAllowedToSell",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.titleKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-[#d4d6b4] hover:border-[#3b4417]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#3b4417]">
                    {card.value}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#3b4417] mb-1">
                  {t(card.titleKey)}
                </p>
                <p className="text-xs text-[#7a8451]">
                  {t(card.descriptionKey)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
