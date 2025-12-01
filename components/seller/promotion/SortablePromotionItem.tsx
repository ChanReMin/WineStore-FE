"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical } from "lucide-react";
import type { Promotion } from "@/types/promotion";

interface SortablePromotionItemProps {
  promotion: Promotion;
  onRemove: () => void;
}

export function SortablePromotionItem({
  promotion,
  onRemove,
}: SortablePromotionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `assigned-${promotion.id}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded p-3 flex items-center justify-between group hover:border-blue-300 transition-all"
    >
      <div className="flex items-center gap-2 flex-1">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-gray-900">
              {promotion.name}
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
              {promotion.discount_type === 1
                ? `${promotion.discount_value || 0}%`
                : `${(promotion.discount_value || 0).toLocaleString()}đ`}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            {promotion.code}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
        title="Xóa khuyến mãi"
      >
        <X className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
}
