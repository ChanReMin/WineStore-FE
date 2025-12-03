"use client";

import { ORDER_STATUS } from "@/types/order";
import { useTranslations } from "next-intl";

interface OrderStatusBadgeProps {
  status: number;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const t = useTranslations("orders.status");

  const statusConfig: Record<
    number,
    {
      labelKey: string;
      color: string;
      icon: string;
      pulse: boolean;
    }
  > = {
    [ORDER_STATUS.PENDING]: {
      labelKey: "pending",
      color: "bg-yellow-50 text-yellow-700 border-yellow-300",
      icon: "⏳",
      pulse: true,
    },
    [ORDER_STATUS.CONFIRMED]: {
      labelKey: "confirmed",
      color: "bg-blue-50 text-blue-700 border-blue-300",
      icon: "✓",
      pulse: false,
    },
    [ORDER_STATUS.PAID]: {
      labelKey: "paid",
      color: "bg-green-50 text-green-700 border-green-300",
      icon: "✓✓",
      pulse: false,
    },
    [ORDER_STATUS.CANCELLED]: {
      labelKey: "cancelled",
      color: "bg-red-50 text-red-700 border-red-300",
      icon: "✕",
      pulse: false,
    },
  };

  const config = statusConfig[status] || statusConfig[ORDER_STATUS.PENDING];

  return (
    <span
      className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border-2
      ${config.color}
      ${config.pulse ? "animate-pulse" : ""}
    `}
    >
      <span className="text-sm">{config.icon}</span>
      {t(config.labelKey)}
    </span>
  );
}
