"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Tag,
  Wine,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import ProductStatusBadge from "./ProductStatusBadge";
import type { Product } from "@/types/product";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onEdit,
}: ProductDetailModalProps) {
  const t = useTranslations("seller.products.detail");

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl z-50"
          >
            <Card className="h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col border-[#d4d6b4] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e8e6dc] bg-[#f5f3e8]">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#3b4417] mb-2">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <ProductStatusBadge
                      status={product.status}
                      statusText={product.status_text}
                    />
                    <span className="text-sm text-[#7a8451]">
                      ID: #{product.id}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[#e8e6dc] transition-colors"
                >
                  <X className="w-6 h-6 text-[#3b4417]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#f5f3e8] rounded-lg">
                        <DollarSign className="w-5 h-5 text-[#3b4417]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#7a8451] mb-1">
                          {t("price")}
                        </p>
                        <p className="text-xl font-bold text-[#3b4417]">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#f5f3e8] rounded-lg">
                        <Package className="w-5 h-5 text-[#3b4417]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#7a8451] mb-1">
                          {t("inventory")}
                        </p>
                        <p className="text-lg font-semibold text-[#3b4417]">
                          {product.total_inventory} {t("products")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#f5f3e8] rounded-lg">
                        <Tag className="w-5 h-5 text-[#3b4417]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#7a8451] mb-1">
                          {t("category")}
                        </p>
                        <p className="text-lg font-semibold text-[#3b4417]">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#f5f3e8] rounded-lg">
                        <Wine className="w-5 h-5 text-[#3b4417]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#7a8451] mb-1">
                          {t("brand")}
                        </p>
                        <p className="text-lg font-semibold text-[#3b4417]">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t border-[#e8e6dc] pt-6">
                  <h3 className="text-lg font-semibold text-[#3b4417] mb-4">
                    {t("history")}
                  </h3>
                  <div className="space-y-4">
                    {/* Created */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-[#3b4417]">
                          {t("productCreated")}
                        </p>
                        <p className="text-sm text-[#7a8451]">
                          {formatDate(product.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Approval Status */}
                    {product.status === 1 && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg">
                          <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#3b4417]">
                            {t("pendingApproval")}
                          </p>
                          <p className="text-sm text-[#7a8451]">
                            {t("awaitingAdmin")}
                          </p>
                        </div>
                      </div>
                    )}

                    {product.status === 2 && product.approved_at && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#3b4417]">
                            {t("approved")}
                          </p>
                          <p className="text-sm text-[#7a8451]">
                            {formatDate(product.approved_at)}
                            {product.approved_by &&
                              ` ${t("by")} ${product.approved_by}`}
                          </p>
                        </div>
                      </div>
                    )}

                    {product.status === 3 && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-50 rounded-lg">
                          <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[#3b4417]">
                            {t("productBanned")}
                          </p>
                          <p className="text-sm text-[#7a8451]">
                            {t("notAllowedToSell")}
                            {product.approved_by &&
                              ` ${t("by")} ${product.approved_by}`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Info */}
                {product.status === 1 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-900 mb-1">
                          {t("pendingNote")}
                        </p>
                        <p className="text-sm text-amber-700">
                          {t("pendingDescription")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {product.status === 2 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-emerald-900 mb-1">
                          {t("productLive")}
                        </p>
                        <p className="text-sm text-emerald-700">
                          {t("liveDescription")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium"
                >
                  {t("close")}
                </button>
                {onEdit && (
                  <button
                    onClick={() => {
                      onEdit(product);
                      onClose();
                    }}
                    className="px-6 py-2.5 bg-[#3b4417] text-white rounded-lg hover:bg-[#2a2f18] transition-colors font-medium"
                  >
                    {t("edit")}
                  </button>
                )}
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
