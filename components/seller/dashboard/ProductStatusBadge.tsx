"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductStatusBadgeProps {
  status: number;
  statusText: string;
}

export default function ProductStatusBadge({
  status,
  statusText,
}: ProductStatusBadgeProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 1: // Pending
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
        };
      case 2: // Active
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
        };
      case 3: // Banned
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
