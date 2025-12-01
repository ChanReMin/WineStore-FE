"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Package, DollarSign } from "lucide-react";
import { SortablePromotionItem } from "./SortablePromotionItem";
import type { Promotion } from "@/types/promotion";
import { useTranslations } from "next-intl";

interface Product {
  id: number;
  name: string;
  price: number;
  promotions: Promotion[];
}

interface DroppableProductItemSortableProps {
  product: Product;
  onRemovePromotion: (productId: number, promotionId: number) => void;
}

export function DroppableProductItemSortable({
  product,
  onRemovePromotion,
}: DroppableProductItemSortableProps) {
  const t = useTranslations("seller.promotions.assignment.productZone");

  // Droppable chỉ cho drop zone nhỏ
  const { setNodeRef: setDropZoneRef, isOver } = useDroppable({
    id: `product-dropzone-${product.id}`,
    data: { product },
  });

  const promotionIds = product.promotions.map((p) => `assigned-${p.id}`);

  return (
    <div className="bg-white border-2 rounded-lg p-5 transition-all duration-300 border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-gray-100 p-2 rounded">
            <Package className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
              <DollarSign className="w-4 h-4" />
              <span>{(product.price || 0).toLocaleString()}đ</span>
            </div>
          </div>
        </div>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
          {product.promotions.length} KM
        </div>
      </div>

      <div className="min-h-[100px] border-2 border-dashed rounded-lg p-3 border-gray-300 bg-gray-50 relative">
        {product.promotions.length === 0 ? (
          <div
            ref={setDropZoneRef}
            className={`
              flex items-center justify-center h-full text-sm transition-all duration-300
              ${isOver ? "text-blue-700 font-semibold scale-110" : "text-gray-400"}
            `}
          >
            {isOver ? "✓ Thả khuyến mãi vào đây" : "Kéo khuyến mãi vào đây"}
          </div>
        ) : (
          <>
            {/* Drop Target - Vùng nhỏ ở giữa để drop */}
            <div
              ref={setDropZoneRef}
              className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
                w-24 h-24 rounded-full transition-all duration-200
                ${
                  isOver
                    ? "bg-blue-500/20 ring-4 ring-blue-500 ring-opacity-50 scale-110"
                    : "bg-transparent hover:bg-blue-50/30 hover:ring-2 hover:ring-blue-300 hover:ring-opacity-30"
                }
              `}
            >
              {isOver && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs font-bold text-blue-700 bg-white/90 px-2 py-1 rounded shadow-lg">
                    ✓ {t("dropHereActive")}
                  </p>
                </div>
              )}
            </div>

            {/* Promotions List */}
            <SortableContext
              items={promotionIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {product.promotions.map((promotion) => (
                  <SortablePromotionItem
                    key={promotion.id}
                    promotion={promotion}
                    onRemove={() => onRemovePromotion(product.id, promotion.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </>
        )}
      </div>
    </div>
  );
}
