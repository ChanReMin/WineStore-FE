"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Wallet, CreditCard, Smartphone } from "lucide-react";

interface PaymentMethodsChartProps {
  paymentMethods: {
    [key: string]: {
      total: number;
      percentage: number;
      orders: number;
    };
  };
}

const COLORS = {
  COD: "#3b4417",
  MOMO: "#7a8451",
};

const ICONS = {
  COD: Wallet,
  MOMO: Smartphone,
};

export default function PaymentMethodsChart({
  paymentMethods,
}: PaymentMethodsChartProps) {
  const t = useTranslations("admin.dashboard.charts");

  const chartData = Object.entries(paymentMethods).map(([key, value]) => ({
    name: key,
    value: value.total,
    percentage: value.percentage,
    orders: value.orders,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Card className="border-neutral-200">
        <CardHeader>
          <CardTitle className="text-[#3b4417]">
            {t("paymentMethods")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ percentage }) => `${percentage}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name as keyof typeof COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(value)
                }
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Payment Methods List */}
          <div className="mt-6 space-y-3">
            {Object.entries(paymentMethods).map(([key, value], index) => {
              const Icon = ICONS[key as keyof typeof ICONS];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: `${COLORS[key as keyof typeof COLORS]}20`,
                      }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: COLORS[key as keyof typeof COLORS] }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        {key}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {value.orders} {t("orders")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#3b4417]">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        notation: "compact",
                      }).format(value.total)}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {value.percentage}%
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
