"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import type { Promotion } from "@/types/promotion";
import { useTranslations } from "next-intl";
import { useMemo, memo } from "react";

interface DraggablePromotionItemProps {
  promotion: Promotion;
  isAssigned?: boolean;
}

export const DraggablePromotionItem = memo(function DraggablePromotionItem({
  promotion,
  isAssigned = false,
}: DraggablePromotionItemProps) {
  const t = useTranslations("seller.promotions.assignment.promotionCard");
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `promotion-${promotion.id}`,
      data: { promotion },
    });

  // Memoize các giá trị tính toán
  const usagePercentage = useMemo(
    () => Math.round((promotion.used_count / promotion.max_usage) * 100),
    [promotion.used_count, promotion.max_usage]
  );

  const discountDisplay = useMemo(
    () =>
      promotion.discount_type === 1
        ? `${promotion.discount_value}%`
        : `${promotion.discount_value.toLocaleString()}đ`,
    [promotion.discount_type, promotion.discount_value]
  );

  const dateRange = useMemo(
    () =>
      `${format(new Date(promotion.start_date), "dd/MM")} - ${format(new Date(promotion.end_date), "dd/MM/yy")}`,
    [promotion.start_date, promotion.end_date]
  );

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : 1,
      cursor: isDragging ? "grabbing" : "grab",
    }),
    [transform, isDragging]
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        group relative bg-gradient-to-br from-white to-gray-50 border rounded-lg p-3
        cursor-grab active:cursor-grabbing transition-all duration-200
        ${isDragging ? "shadow-xl scale-105 border-blue-400 ring-2 ring-blue-200" : "border-gray-200 hover:border-blue-300 hover:shadow-md"}
        ${isAssigned ? "opacity-40" : ""}
      `}
    >
      {/* Discount Badge */}
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
        {discountDisplay}
      </div>

      {/* Content */}
      <div className="pr-8">
        <h3 className="font-semibold text-gray-900 text-xs mb-1.5 line-clamp-1">
          {promotion.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
          <Tag className="w-3 h-3 flex-shrink-0" />
          <span className="font-mono text-xs">{promotion.code}</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{dateRange}</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>
              {t("used", {
                used: promotion.used_count,
                max: promotion.max_usage,
              })}
            </span>
            <span className="font-medium">{usagePercentage}%</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
