"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
} from "recharts";

interface ChartDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

interface RevenueChartProps {
  data: ChartDataPoint[];
  totalRevenue: number;
  totalOrders: number;
}

export default function RevenueChart({
  data,
  totalRevenue,
  totalOrders,
}: RevenueChartProps) {
  const t = useTranslations("seller.dashboard.revenue");

  const chartConfig = {
    revenue: {
      label: t("revenueLabel"),
      color: "#3b4417",
    },
    orders: {
      label: t("ordersLabel"),
      color: "#d4af37",
    },
  } satisfies ChartConfig;
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("vi-VN", {
      month: "short",
      day: "numeric",
    }),
    revenueInMillions: item.revenue / 1000000,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border-[#d4d6b4]">
        <CardHeader>
          <CardTitle className="text-[#3b4417] tracking-wide">
            {t("title")}
          </CardTitle>
          <CardDescription className="flex gap-6 text-sm text-[#7a8451]">
            <span>
              {t("totalRevenue")}{" "}
              <span className="font-semibold text-[#3b4417]">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalRevenue)}
              </span>
            </span>
            <span>
              {t("totalOrders")}{" "}
              <span className="font-semibold text-[#3b4417]">
                {totalOrders}
              </span>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ComposedChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d4d6b4" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                style={{ fontSize: "12px", fill: "#7a8451" }}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                style={{ fontSize: "12px", fill: "#7a8451" }}
                tickFormatter={(value: number) => `${value}tr`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                style={{ fontSize: "12px", fill: "#7a8451" }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                yAxisId="left"
                dataKey="revenueInMillions"
                fill="#3b4417"
                radius={[8, 8, 0, 0]}
                name="Revenue (million VND)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#d4af37"
                strokeWidth={3}
                dot={{ fill: "#d4af37", r: 4 }}
                name="Orders"
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
