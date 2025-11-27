"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CategoryPerformanceProps {
  categories: Array<{
    categoryname: string;
    revenue: number;
    orders: number;
    percentage: number;
  }>;
}

export default function CategoryPerformance({
  categories,
}: CategoryPerformanceProps) {
  const t = useTranslations("admin.dashboard.charts");

  const chartData = categories.map((cat) => ({
    name: cat.categoryname,
    revenue: cat.revenue / 1000000,
    orders: cat.orders,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <Card className="border-neutral-200">
        <CardHeader>
          <CardTitle className="text-[#3b4417]">
            {t("categoryPerformance")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
                tickFormatter={(value) => `${value}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => `${value.toFixed(1)}M VND`}
              />
              <Bar dataKey="revenue" fill="#3b4417" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Category List */}
          <div className="mt-6 space-y-3">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.categoryname}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-2 h-2 rounded-full bg-[#3b4417]" />
                  <span className="text-sm text-neutral-700">
                    {cat.categoryname}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-medium text-[#3b4417]">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      notation: "compact",
                    }).format(cat.revenue)}
                  </span>
                  <span className="text-xs text-neutral-500 w-16 text-right">
                    {cat.percentage}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
