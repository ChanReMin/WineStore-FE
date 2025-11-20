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
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, DollarSign, Users, Percent } from "lucide-react";

interface PromotionAnalyticsChartsProps {
  usageData: Array<{
    date: string;
    usage_count: number;
    discount_amount: number;
  }>;
  promotions: Array<{
    id: number;
    code: string;
    name: string;
    used_count: number;
    max_usage: number;
    discount_value: number;
  }>;
}

export default function PromotionAnalyticsCharts({
  usageData,
  promotions,
}: PromotionAnalyticsChartsProps) {
  // Prepare data for pie chart - top 5 promotions by usage
  const topPromotions = promotions
    .sort((a, b) => b.used_count - a.used_count)
    .slice(0, 5)
    .map((promo, index) => ({
      name: promo.code,
      value: promo.used_count,
      fill: COLORS[index % COLORS.length],
    }));

  // Prepare data for comparison chart
  const comparisonData = promotions.slice(0, 5).map((promo) => ({
    name: promo.code,
    used: promo.used_count,
    remaining: promo.max_usage - promo.used_count,
  }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Area Chart - Usage Trend */}
      <Card className="border-[#d4d6b4] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#3b4417] flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Xu hướng sử dụng
            </h3>
            <p className="text-sm text-[#7a8451] mt-1">
              Biểu đồ diện tích theo thời gian
            </p>
          </div>
        </div>

        <ChartContainer
          config={{
            usage_count: {
              label: "Lượt sử dụng",
              color: "#3b4417",
            },
          }}
          className="h-[300px] w-full"
        >
          <AreaChart data={usageData}>
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b4417" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b4417" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e6dc" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
              stroke="#7a8451"
              fontSize={12}
            />
            <YAxis stroke="#7a8451" fontSize={12} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value as string);
                    return date.toLocaleDateString("vi-VN");
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="usage_count"
              stroke="#3b4417"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsage)"
            />
          </AreaChart>
        </ChartContainer>
      </Card>

      {/* Pie Chart - Top Promotions */}
      <Card className="border-[#d4d6b4] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#3b4417] flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Top 5 khuyến mãi
            </h3>
            <p className="text-sm text-[#7a8451] mt-1">
              Phân bố theo lượt sử dụng
            </p>
          </div>
        </div>

        <ChartContainer
          config={{
            value: {
              label: "Lượt sử dụng",
            },
          }}
          className="h-[300px] w-full"
        >
          <PieChart>
            <Pie
              data={topPromotions}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {topPromotions.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </Card>

      {/* Stacked Bar Chart - Used vs Remaining */}
      <Card className="border-[#d4d6b4] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#3b4417] flex items-center gap-2">
              <Users className="h-5 w-5" />
              So sánh sử dụng
            </h3>
            <p className="text-sm text-[#7a8451] mt-1">
              Đã dùng vs Còn lại
            </p>
          </div>
        </div>

        <ChartContainer
          config={{
            used: {
              label: "Đã sử dụng",
              color: "#3b4417",
            },
            remaining: {
              label: "Còn lại",
              color: "#d4af37",
            },
          }}
          className="h-[300px] w-full"
        >
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e6dc" />
            <XAxis dataKey="name" stroke="#7a8451" fontSize={12} />
            <YAxis stroke="#7a8451" fontSize={12} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="used" stackId="a" fill="#3b4417" radius={[0, 0, 0, 0]} />
            <Bar dataKey="remaining" stackId="a" fill="#d4af37" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </Card>

      {/* Line Chart - Discount Amount Trend */}
      <Card className="border-[#d4d6b4] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[#3b4417] flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Xu hướng giảm giá
            </h3>
            <p className="text-sm text-[#7a8451] mt-1">
              Tổng tiền giảm theo ngày
            </p>
          </div>
        </div>

        <ChartContainer
          config={{
            discount_amount: {
              label: "Giảm giá",
              color: "#d4af37",
            },
          }}
          className="h-[300px] w-full"
        >
          <LineChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e6dc" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
              stroke="#7a8451"
              fontSize={12}
            />
            <YAxis
              stroke="#7a8451"
              fontSize={12}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value as string);
                    return date.toLocaleDateString("vi-VN");
                  }}
                  formatter={(value) => formatCurrency(value as number)}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="discount_amount"
              stroke="#d4af37"
              strokeWidth={3}
              dot={{ fill: "#d4af37", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ChartContainer>
      </Card>
    </div>
  );
}

const COLORS = ["#3b4417", "#d4af37", "#7a8451", "#f59e0b", "#ef4444"];
