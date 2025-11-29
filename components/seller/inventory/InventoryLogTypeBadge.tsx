"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, RefreshCw, RotateCcw } from "lucide-react";
interface InventoryLogTypeBadgeProps {
  type: string;
}

export default function InventoryLogTypeBadge({
  type,
}: InventoryLogTypeBadgeProps) {
  const getTypeConfig = () => {
    const typeUpper = type.toUpperCase();
    switch (typeUpper) {
      case "IN":
        return {
          icon: TrendingUp,
          text: "Stock In",
          bg: "bg-emerald-50",
          textColor: "text-emerald-700",
          border: "border-emerald-200",
          iconColor: "text-emerald-600",
        };
      case "OUT":
        return {
          icon: TrendingDown,
          text: "Stock Out",
          bg: "bg-red-50",
          textColor: "text-red-700",
          border: "border-red-200",
          iconColor: "text-red-600",
        };
      case "ADJUST":
        return {
          icon: RefreshCw,
          text: "Adjust",
          bg: "bg-blue-50",
          textColor: "text-blue-700",
          border: "border-blue-200",
          iconColor: "text-blue-600",
        };
      case "RETURN":
        return {
          icon: RotateCcw,
          text: "Return",
          bg: "bg-amber-50",
          textColor: "text-amber-700",
          border: "border-amber-200",
          iconColor: "text-amber-600",
        };
      default:
        return {
          icon: RefreshCw,
          text: type,
          bg: "bg-gray-50",
          textColor: "text-gray-700",
          border: "border-gray-200",
          iconColor: "text-gray-600",
        };
    }
  };

  const config = getTypeConfig();
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
