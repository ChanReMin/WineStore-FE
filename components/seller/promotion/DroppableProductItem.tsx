"use client";

import { useDroppable } from "@dnd-kit/core";
import { X, Package, DollarSign } from "lucide-react";
import type { Promotion } from "@/types/promotion";
import { useTranslations } from "next-intl";
import { memo, useCallback } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  promotions: Promotion[];
}

interface DroppableProductItemProps {
  product: Product;
  onRemovePromotion: (productId: number, promotionId: number) => void;
}

export const DroppableProductItem = memo(function DroppableProductItem({
  product,
  onRemovePromotion,
}: DroppableProductItemProps) {
  const t = useTranslations("seller.promotions.assignment.productZone");

  // Droppable chỉ cho drop zone, không phải toàn bộ card
  const { setNodeRef: setDropZoneRef, isOver } = useDroppable({
    id: `product-dropzone-${product.id}`,
    data: { product },
  });

  // Memoize remove handler
  const handleRemovePromotion = useCallback(
    (promotionId: number) => {
      onRemovePromotion(product.id, promotionId);
    },
    [product.id, onRemovePromotion]
  );

  return (
    <div className="group bg-white border rounded-lg transition-all duration-200 border-gray-200 hover:border-gray-300 hover:shadow-sm">
      {/* Product Header */}
      <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-1.5 rounded">
              <Package className="w-3.5 h-3.5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-xs text-gray-900 truncate">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <DollarSign className="w-3 h-3" />
                <span>{product.price.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
          {product.promotions.length > 0 && (
            <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
              {product.promotions.length}
            </div>
          )}
        </div>
      </div>

      {/* Drop Zone */}
      <div className="p-2 min-h-[60px]">
        {product.promotions.length === 0 ? (
          <div
            ref={setDropZoneRef}
            className={`
              flex items-center justify-center h-[56px] border-2 border-dashed rounded-lg transition-all duration-200
              ${
                isOver
                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 scale-[1.02] shadow-lg"
                  : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
              }
            `}
          >
            <p
              className={`text-xs font-medium transition-all ${isOver ? "text-blue-700 scale-110" : "text-gray-400"}`}
            >
              {isOver ? "✓ " + t("dropHereActive") : t("dropHere")}
            </p>
          </div>
        ) : (
          <div className="relative">
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
            <div className="space-y-1.5 rounded-lg">
              {product.promotions.map((promotion) => (
                <div
                  key={promotion.id}
                  className="group/item bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-2 flex items-center gap-2 hover:shadow-sm transition-all animate-in fade-in slide-in-from-top-1 duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-semibold text-xs text-gray-900 truncate">
                        {promotion.name}
                      </span>
                      <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-bold flex-shrink-0">
                        {promotion.discounttype === 1
                          ? `${promotion.discountvalue}%`
                          : `${promotion.discountvalue.toLocaleString()}đ`}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                      {promotion.code}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePromotion(promotion.id)}
                    className="opacity-0 group-hover/item:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded flex-shrink-0"
                    title={t("removePromotion")}
                  >
                    <X className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
