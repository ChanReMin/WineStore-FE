"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OrderStatusBadgeProps {
  status: number;
  statusText: string;
}

export default function OrderStatusBadge({
  status,
  statusText,
}: OrderStatusBadgeProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 1: // Chờ xác nhận
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
        };
      case 2: // Đang xử lý
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
        };
      case 3: // Đang giao
        return {
          bg: "bg-purple-50",
          text: "text-purple-700",
          border: "border-purple-200",
        };
      case 4: // Hoàn thành
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
        };
      case 5: // Đã hủy
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
        };
    }
  };

  const style = getStatusStyle();

  return (
    <Badge
      className={cn(
        "font-medium px-3 py-1",
        style.bg,
        style.text,
        style.border,
        "border"
      )}
    >
      {statusText}
    </Badge>
  );
}
