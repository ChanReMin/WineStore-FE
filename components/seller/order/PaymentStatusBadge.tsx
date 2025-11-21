"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DollarSign, Clock, CheckCircle, RefreshCw } from "lucide-react";

interface PaymentStatusBadgeProps {
  status: number;
}

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const getPaymentStatus = () => {
    switch (status) {
      case 1: // Chờ thanh toán
        return {
          icon: Clock,
          text: "Chờ thanh toán",
          bg: "bg-amber-50",
          textColor: "text-amber-700",
          border: "border-amber-200",
          iconColor: "text-amber-600",
        };
      case 2: // Đã thanh toán
        return {
          icon: DollarSign,
          text: "Đã thanh toán",
          bg: "bg-blue-50",
          textColor: "text-blue-700",
          border: "border-blue-200",
          iconColor: "text-blue-600",
        };
      case 3: // Hoàn thành
        return {
          icon: CheckCircle,
          text: "Hoàn thành",
          bg: "bg-emerald-50",
          textColor: "text-emerald-700",
          border: "border-emerald-200",
          iconColor: "text-emerald-600",
        };
      case 4: // Đã hoàn tiền
        return {
          icon: RefreshCw,
          text: "Đã hoàn tiền",
          bg: "bg-red-50",
          textColor: "text-red-700",
          border: "border-red-200",
          iconColor: "text-red-600",
        };
      default:
        return {
          icon: Clock,
          text: "Không xác định",
          bg: "bg-gray-50",
          textColor: "text-gray-700",
          border: "border-gray-200",
          iconColor: "text-gray-600",
        };
    }
  };

  const paymentStatus = getPaymentStatus();
  const Icon = paymentStatus.icon;

  return (
    <Badge
      className={cn(
        "font-medium px-3 py-1 flex items-center gap-1.5",
        paymentStatus.bg,
        paymentStatus.textColor,
        paymentStatus.border,
        "border"
      )}
    >
      <Icon className={cn("w-3.5 h-3.5", paymentStatus.iconColor)} />
      {paymentStatus.text}
    </Badge>
  );
}
