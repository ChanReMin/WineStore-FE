"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface OrderStatusBadgeProps {
  status: number;
  statusText?: string;
}

export default function OrderStatusBadge({
  status,
  statusText,
}: OrderStatusBadgeProps) {
  const t = useTranslations("seller.orders.status");

  const getStatusConfig = () => {
    switch (status) {
      case 1: // Pending Confirmation
        return {
          textKey: "pending",
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
        };
      case 2: // Confirmed
        return {
          textKey: "confirmed",
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
        };
      case 3: // Paid
        return {
          textKey: "paid",
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
        };
      case 6: // Cancelled
        return {
          textKey: "cancelled",
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
        };
      default:
        return {
          textKey: "pending",
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge
      className={cn(
        "font-medium px-3 py-1",
        config.bg,
        config.text,
        config.border,
        "border"
      )}
    >
      {t(config.textKey)}
    </Badge>
  );
}
