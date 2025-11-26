"use client";

import { DraggablePromotionItem } from "./DraggablePromotionItem";
import type { Promotion } from "@/types/promotion";
import { useTranslations } from "next-intl";
import { Gift } from "lucide-react";

interface PromotionListProps {
  promotions: Promotion[];
  assignedPromotionIds: Set<number>;
}

export function PromotionList({
  promotions,
  assignedPromotionIds,
}: PromotionListProps) {
  const t = useTranslations("seller.promotions.assignment.promotionList");

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-blue-500 p-1.5 rounded-lg">
            <Gift className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">{t("title")}</h2>
          <span className="ml-auto bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
            {promotions.length}
          </span>
        </div>
        <p className="text-xs text-gray-600">{t("subtitle")}</p>
      </div>

      {/* Promotions List */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-2 scroll-smooth"
        data-scroll-container="promotions"
        style={{ scrollBehavior: "smooth" }}
      >
        {promotions.map((promotion) => (
          <DraggablePromotionItem
            key={promotion.id}
            promotion={promotion}
            isAssigned={assignedPromotionIds.has(promotion.id)}
          />
        ))}
      </div>
    </div>
  );
}
