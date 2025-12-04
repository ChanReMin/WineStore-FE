"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Tag,
  Calendar,
  Percent,
  DollarSign,
  Users,
  TrendingUp,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import PromotionStatusBadge from "./PromotionStatusBadge";
import type { PromotionDetail } from "@/types/promotion";
import {
  fetchPromotionDetail,
  fetchPromotionStatistics,
} from "@/services/promotionService";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

interface PromotionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotionId: number;
}

export default function PromotionDetailModal({
  isOpen,
  onClose,
  promotionId,
}: PromotionDetailModalProps) {
  const t = useTranslations("seller.promotions.detail");
  const [promotion, setPromotion] = useState<PromotionDetail | null>(null);
  const [statistics, setStatistics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && promotionId) {
      loadPromotionData();
    }
  }, [isOpen, promotionId]);

  const loadPromotionData = async () => {
    setIsLoading(true);
    try {
      const [detailResponse, statisticsResponse] = await Promise.all([
        fetchPromotionDetail(promotionId),
        fetchPromotionStatistics(promotionId),
      ]);
      setPromotion(detailResponse.data);
      setStatistics(statisticsResponse.data);
    } catch (error: any) {
      console.error("Error loading promotion detail:", error);
      toast.error(error?.response?.data?.message || t("errors.loadFailed"));
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const formatDiscount = (type: number, value: number) => {
    if (type === 0) return `${value}%`;
    return formatCurrency(value);
  };

  if (!isOpen) return null;

  if (isLoading || !promotion || !statistics) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-2xl shadow-2xl p-8"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b4417]"></div>
              <p className="text-[#7a8451]">{t("loading")}</p>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#d4d6b4] bg-[#f5f3e8] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b4417]">
                <Tag className="h-5 w-5 text-amber-50" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#3b4417]">
                  {t("title")}
                </h2>
                <p className="text-sm text-[#7a8451]">{t("subtitle")}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-[#7a8451] transition-colors hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <Card className="border-[#d4d6b4] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-[#3b4417] font-mono">
                      {promotion.code}
                    </h3>
                    <PromotionStatusBadge
                      status={promotion.status}
                      startDate={promotion.start_date}
                      endDate={promotion.end_date}
                    />
                  </div>
                  <p className="text-lg font-semibold text-[#3b4417]">
                    {promotion.name}
                  </p>
                  <p className="text-[#7a8451] mt-1">{promotion.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#d4af37]">
                    {formatDiscount(
                      promotion.discount_type,
                      promotion.discount_value
                    )}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#d4d6b4]">
                <div>
                  <p className="text-xs text-[#7a8451] uppercase mb-1">
                    {t("startDate")}
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#7a8451]" />
                    <p className="font-semibold text-[#3b4417]">
                      {formatDate(promotion.start_date)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#7a8451] uppercase mb-1">
                    {t("endDate")}
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#7a8451]" />
                    <p className="font-semibold text-[#3b4417]">
                      {formatDate(promotion.end_date)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#7a8451] uppercase mb-1">
                    {t("used")}
                  </p>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#7a8451]" />
                    <p className="font-semibold text-[#3b4417]">
                      {promotion.used_count} / {promotion.max_usage}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#7a8451] uppercase mb-1">
                    {t("remaining")}
                  </p>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-[#7a8451]" />
                    <p className="font-semibold text-orange-600">
                      {promotion.remaining_usage ??
                        promotion.max_usage - promotion.used_count}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-[#d4d6b4] bg-[#f5f3e8] px-6 py-4">
            <Button
              onClick={onClose}
              className="w-full bg-[#3b4417] hover:bg-[#2a2f18] text-amber-50"
            >
              {t("close")}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
