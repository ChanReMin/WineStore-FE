"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UserCheck,
  Package,
  AlertCircle,
  Warehouse,
  Clock,
  CheckCircle,
} from "lucide-react";

interface QuickStatsProps {
  users: {
    new_this_month: number;
    active_users: number;
    pending_seller_requests: number;
  };
  products: {
    pending_approval: number;
    out_of_stock: number;
  };
  orders: {
    by_status: {
      pending: number;
      confirmed: number;
      shipping: number;
      delivered: number;
    };
  };
  inventory: {
    total_warehouses: number;
    low_stock_products: number;
  };
}

export default function QuickStats({
  users,
  products,
  orders,
  inventory,
}: QuickStatsProps) {
  const t = useTranslations("admin.dashboard.quickStats");

  const stats = [
    {
      title: t("pendingActions"),
      items: [
        {
          label: t("sellerRequests"),
          value: users.pending_seller_requests,
          icon: UserCheck,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          label: t("productApprovals"),
          value: products.pending_approval,
          icon: Package,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          label: t("pendingOrders"),
          value: orders.by_status.pending,
          icon: Clock,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
        },
      ],
    },
    {
      title: t("inventoryAlerts"),
      items: [
        {
          label: t("outOfStock"),
          value: products.out_of_stock,
          icon: AlertCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
        },
        {
          label: t("lowStock"),
          value: inventory.low_stock_products,
          icon: AlertCircle,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          label: t("totalWarehouses"),
          value: inventory.total_warehouses,
          icon: Warehouse,
          color: "text-[#3b4417]",
          bgColor: "bg-[#f5f3e8]",
        },
      ],
    },
    {
      title: t("orderStatus"),
      items: [
        {
          label: t("confirmed"),
          value: orders.by_status.confirmed,
          icon: CheckCircle,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
        },
        {
          label: t("shipping"),
          value: orders.by_status.shipping,
          icon: Package,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          label: t("delivered"),
          value: orders.by_status.delivered,
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + sectionIndex * 0.1 }}
        >
          <Card className="border-neutral-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-[#3b4417]">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.6 + sectionIndex * 0.1 + itemIndex * 0.05,
                  }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${item.bgColor} p-2 rounded-lg`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-sm text-neutral-700">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-[#3b4417]">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
