"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface InventoryStatusBadgeProps {
  status: "in_stock" | "low_stock" | "out_of_stock";
  quantity?: number;
  safetyStock?: number;
}

export default function InventoryStatusBadge({
  status,
  quantity,
  safetyStock,
}: InventoryStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "in_stock":
        return {
          icon: CheckCircle,
          text: "Còn hàng",
          bg: "bg-emerald-50",
          textColor: "text-emerald-700",
          border: "border-emerald-200",
          iconColor: "text-emerald-600",
        };
      case "low_stock":
        return {
          icon: AlertTriangle,
          text: "Sắp hết",
          bg: "bg-amber-50",
          textColor: "text-amber-700",
          border: "border-amber-200",
          iconColor: "text-amber-600",
        };
      case "out_of_stock":
        return {
          icon: XCircle,
          text: "Hết hàng",
          bg: "bg-red-50",
          textColor: "text-red-700",
          border: "border-red-200",
          iconColor: "text-red-600",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex flex-col gap-1">
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
    </div>
  );
}
