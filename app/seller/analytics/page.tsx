"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Thống kê & Báo cáo
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Phân tích chi tiết về hiệu suất kinh doanh
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Doanh thu tháng này",
            value: "125,500,000₫",
            icon: DollarSign,
            color: "green",
          },
          { label: "Đơn hàng", value: "342", icon: ShoppingBag, color: "blue" },
          {
            label: "Sản phẩm đã bán",
            value: "1,245",
            icon: TrendingUp,
            color: "purple",
          },
          { label: "Khách hàng", value: "89", icon: Users, color: "orange" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">{stat.label}</p>
                  <p className="mt-2 text-2xl font-bold text-neutral-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-lg bg-${stat.color}-50 p-3`}>
                  <Icon size={24} className={`text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-900">
          Biểu đồ doanh thu
        </h2>
        <div className="mt-6 flex h-64 items-center justify-center text-neutral-500">
          Biểu đồ sẽ được hiển thị ở đây
        </div>
      </div>
    </div>
  );
}
