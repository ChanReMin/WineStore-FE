"use client";

import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

interface PromotionStatisticsCardProps {
  data: Array<{
    date: string;
    usage_count: number;
    discount_amount: number;
  }>;
}

export default function PromotionStatisticsCard({
  data,
}: PromotionStatisticsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <Card className="border-[#d4d6b4] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#3b4417] flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Xu hướng sử dụng khuyến mãi
          </h3>
          <p className="text-sm text-[#7a8451] mt-1">
            Thống kê 5 ngày gần nhất
          </p>
        </div>
        <Calendar className="h-8 w-8 text-[#7a8451] opacity-50" />
      </div>

      <ChartContainer
        config={{
          usage_count: {
            label: "Lượt sử dụng",
            color: "#3b4417",
          },
          discount_amount: {
            label: "Giảm giá",
            color: "#d4af37",
          },
        }}
        className="h-[350px] w-full"
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8e6dc" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#7a8451"
            fontSize={12}
          />
          <YAxis stroke="#7a8451" fontSize={12} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  const date = new Date(value as string);
                  return date.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                }}
                formatter={(value, name) => {
                  if (name === "discount_amount") {
                    return formatCurrency(value as number);
                  }
                  return value;
                }}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="usage_count"
            stroke="#3b4417"
            strokeWidth={2}
            dot={{ fill: "#3b4417", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </Card>
  );
}
