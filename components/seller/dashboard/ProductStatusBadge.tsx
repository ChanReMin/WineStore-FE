"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ProductStatusBadgeProps {
  status: number | undefined;
  statusText?: string;
}

export default function ProductStatusBadge({
  status,
  statusText,
}: ProductStatusBadgeProps) {
  const t = useTranslations("seller.inventory.productStatus");

  const getStatusConfig = () => {
    switch (status ?? 0) {
      case 0: // Pending
        return {
          textKey: "pending",
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
        };
      case 1: // Active
        return {
          textKey: "active",
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
        };
      case 2: // Banned
        return {
          textKey: "banned",
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
