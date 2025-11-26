"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Statistics & Reporting
        </h1>
        <p className="mt-1 text-sm text-neutral-600"></p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Revenue This Month",
            value: "125,500,000₫",
            icon: DollarSign,
            color: "green",
          },
          { label: "Orders", value: "342", icon: ShoppingBag, color: "blue" },
          {
            label: "Products Sold",
            value: "1,245",
            icon: TrendingUp,
            color: "purple",
          },
          { label: "Customers", value: "89", icon: Users, color: "orange" },
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
          Revenue Chart
        </h2>
        <div className="mt-6 flex h-64 items-center justify-center text-neutral-500">
          Chart will be displayed here
        </div>
      </div>
    </div>
  );
}
