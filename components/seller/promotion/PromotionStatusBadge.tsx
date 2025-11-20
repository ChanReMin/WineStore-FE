"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface PromotionStatusBadgeProps {
  status: number;
  startDate: string;
  endDate: string;
}

export default function PromotionStatusBadge({
  status,
  startDate,
  endDate,
}: PromotionStatusBadgeProps) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  const getStatusConfig = () => {
    // Inactive
    if (status === 0) {
      return {
        icon: XCircle,
        text: "Không hoạt động",
        bg: "bg-gray-50",
        textColor: "text-gray-700",
        border: "border-gray-200",
        iconColor: "text-gray-600",
      };
    }

    // Active but not started yet
    if (now < start) {
      return {
        icon: Clock,
        text: "Sắp diễn ra",
        bg: "bg-blue-50",
        textColor: "text-blue-700",
        border: "border-blue-200",
        iconColor: "text-blue-600",
      };
    }

    // Active and expired
    if (now > end) {
      return {
        icon: XCircle,
        text: "Đã hết hạn",
        bg: "bg-red-50",
        textColor: "text-red-700",
        border: "border-red-200",
        iconColor: "text-red-600",
      };
    }

    // Active and running
    return {
      icon: CheckCircle,
      text: "Đang hoạt động",
      bg: "bg-emerald-50",
      textColor: "text-emerald-700",
      border: "border-emerald-200",
      iconColor: "text-emerald-600",
    };
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge
      className={cn(
        "font-medium px-3 py-1 flex items-center gap-1.5 w-fit",
        config.bg,
        config.textColor,
        config.border,
        "border"
      )}
    >
      <Icon className={cn("w-3.5 h-3.5", config.iconColor)} />
      {config.text}
    </Badge>
  );
}
