"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Tag,
  Search,
  Check,
  Calendar,
  Percent,
  DollarSign,
} from "lucide-react";
import type { Product } from "@/types/product";
import type { Promotion } from "@/types/promotion";
import { fetchPromotions } from "@/services/promotionService";

interface AddPromotionToProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onConfirm: (productId: number, promotionIds: number[]) => void;
}

export default function AddPromotionToProductModal({
  isOpen,
  onClose,
  product,
  onConfirm,
}: AddPromotionToProductModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPromotionIds, setSelectedPromotionIds] = useState<number[]>(
    []
  );
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load promotions when modal opens
  useState(() => {
    if (isOpen) {
      loadPromotions();
    }
  });

  const loadPromotions = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPromotions({ status: 1, limit: 100 });
      setPromotions(response.data.promotions);
    } catch (error) {
      console.error("Error loading promotions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter active promotions
  const activePromotions = promotions.filter((p: Promotion) => p.status === 1);

  // Filter by search
  const filteredPromotions = useMemo(() => {
    if (!searchQuery) return activePromotions;
    const query = searchQuery.toLowerCase();
    return activePromotions.filter(
      (p: Promotion) =>
        p.code.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }, [searchQuery, activePromotions]);

  const handleTogglePromotion = (promotionId: number) => {
    if (selectedPromotionIds.includes(promotionId)) {
      setSelectedPromotionIds(
        selectedPromotionIds.filter((id) => id !== promotionId)
      );
    } else {
      setSelectedPromotionIds([...selectedPromotionIds, promotionId]);
    }
  };

  const handleConfirm = () => {
    if (product) {
      onConfirm(product.id, selectedPromotionIds);
      handleClose();
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedPromotionIds([]);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDiscountText = (promotion: Promotion) => {
    const discountType = promotion.discountType || promotion.discount_type;
    const discountValue = promotion.discountValue || promotion.discount_value || 0;
    
    const isPercentage = discountType === "PERCENTAGE" || (typeof discountType === "number" && discountType === 0);
    
    if (isPercentage) {
      return `${Math.round(discountValue)}%`;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Math.round(discountValue));
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 border-b border-[#d4d6b4] bg-[#f5f3e8] px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b4417]">
                  <Tag className="h-5 w-5 text-amber-50" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3b4417]">
                    Add promotions
                  </h2>
                  <p className="text-sm text-[#7a8451]">
                    Select promotions to apply to the product
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg p-2 text-[#7a8451] transition-colors hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-3 bg-white rounded-lg border border-[#d4d6b4]">
              <p className="text-sm text-[#7a8451] mb-1">Product:</p>
              <p className="font-semibold text-[#3b4417]">{product.name}</p>
              <p className="text-sm text-[#7a8451] mt-1">
                {product.brand.name} • {product.category.name}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-280px)]">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7a8451]" />
              <input
                type="text"
                placeholder="Search promotions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent text-sm"
              />
            </div>

            {/* Promotions List */}
            <div className="space-y-3">
              {filteredPromotions.length === 0 ? (
                <div className="text-center py-12 text-[#7a8451]">
                  <Tag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    {searchQuery
                      ? "No promotions found"
                      : "No active promotions available"}
                  </p>
                </div>
              ) : (
                filteredPromotions.map((promotion: Promotion) => {
                  const isSelected = selectedPromotionIds.includes(
                    promotion.id
                  );
                  const usagePercent =
                    (promotion.used_count / promotion.max_usage) * 100;

                  return (
                    <motion.button
                      key={promotion.id}
                      type="button"
                      onClick={() => handleTogglePromotion(promotion.id)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`
                        w-full p-4 rounded-xl border-2 transition-all text-left
                        ${
                          isSelected
                            ? "border-[#3b4417] bg-[#3b4417]/5 shadow-md"
                            : "border-[#d4d6b4] bg-white hover:border-[#7a8451] hover:shadow-sm"
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div
                          className={`
                            shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5
                            ${
                              isSelected
                                ? "bg-[#3b4417] border-[#3b4417]"
                                : "border-[#d4d6b4] bg-white"
                            }
                          `}
                        >
                          {isSelected && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>

                        {/* Promotion Info */}
                        <div className="flex-1 min-w-0">
                          {/* Code & Name */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#3b4417] text-white text-xs font-mono font-semibold">
                                  {promotion.code}
                                </span>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded ${
                                    usagePercent > 80
                                      ? "bg-orange-100 text-orange-700"
                                      : "bg-emerald-100 text-emerald-700"
                                  }`}
                                >
                                  {promotion.used_count}/{promotion.max_usage}{" "}
                                  đã dùng
                                </span>
                              </div>
                              <p className="font-semibold text-[#3b4417] mb-1">
                                {promotion.name}
                              </p>
                              <p className="text-sm text-[#7a8451] line-clamp-2">
                                {promotion.description}
                              </p>
                            </div>

                            {/* Discount Badge */}
                            <div className="shrink-0 text-right">
                              <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#d4af37] text-white rounded-lg font-bold">
                                {(promotion.discountType === "PERCENTAGE" || promotion.discount_type === 0) ? (
                                  <Percent className="h-4 w-4" />
                                ) : (
                                  <DollarSign className="h-4 w-4" />
                                )}
                                <span>{getDiscountText(promotion)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Date Range */}
                          <div className="flex items-center gap-2 text-xs text-[#7a8451] mt-2">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {formatDate(promotion.start_date)} -{" "}
                              {formatDate(promotion.end_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-[#d4d6b4] bg-white px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-[#7a8451]">
                Selected {selectedPromotionIds.length} promotions
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={selectedPromotionIds.length === 0}
                  className="px-6 py-2 bg-[#3b4417] text-white rounded-lg hover:bg-[#2a2f18] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
