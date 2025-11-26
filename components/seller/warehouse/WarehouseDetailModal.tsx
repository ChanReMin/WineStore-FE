"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Calendar,
  Package,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  getWarehouseDetail,
  type WarehouseDetail,
} from "@/lib/sellerWarehouse";
import { useTranslations } from "next-intl";

interface WarehouseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  warehouseId: number | null;
}

export default function WarehouseDetailModal({
  isOpen,
  onClose,
  warehouseId,
}: WarehouseDetailModalProps) {
  const t = useTranslations("seller.warehouses");
  const [warehouse, setWarehouse] = useState<WarehouseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            {t("status.pending")}
          </Badge>
        );
      case 1:
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {t("status.active")}
          </Badge>
        );
      case 2:
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            {t("status.banned")}
          </Badge>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isOpen && warehouseId) {
      loadWarehouseDetail();
    }
  }, [isOpen, warehouseId]);

  const loadWarehouseDetail = async () => {
    if (!warehouseId) return;

    setIsLoading(true);
    try {
      const result = await getWarehouseDetail(warehouseId);
      setWarehouse(result.data);
    } catch (error) {
      console.error("Error loading warehouse detail:", error);
    } finally {
      setIsLoading(false);
    }
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
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-[#f5f3e8]">
                <div>
                  <h2 className="text-xl font-bold text-[#3b4417]">
                    {t("detail.title")}
                  </h2>
                  {warehouse && (
                    <p className="text-sm text-[#7a8451] mt-1">
                      {t("detail.id")} {warehouse.id}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#3b4417]" />
                  </div>
                ) : warehouse ? (
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-[#3b4417]">
                            {warehouse.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-[#7a8451]">
                            <MapPin size={16} />
                            <span>{warehouse.location}</span>
                          </div>
                        </div>
                        {getStatusBadge(warehouse.status)}
                      </div>

                      {warehouse.description && (
                        <p className="text-neutral-600">
                          {warehouse.description}
                        </p>
                      )}

                      <div className="flex gap-4 text-sm text-[#7a8451]">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            {t("detail.created")}{" "}
                            {new Date(warehouse.created_at).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            {t("detail.updated")}{" "}
                            {new Date(warehouse.updated_at).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Inventory Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-[#f5f3e8] rounded-lg p-4">
                        <p className="text-xs text-[#7a8451] uppercase tracking-wide mb-1">
                          {t("detail.totalProducts")}
                        </p>
                        <p className="text-2xl font-bold text-[#3b4417]">
                          {warehouse.inventory.total_products}
                        </p>
                      </div>
                      <div className="bg-[#f5f3e8] rounded-lg p-4">
                        <p className="text-xs text-[#7a8451] uppercase tracking-wide mb-1">
                          {t("detail.totalQuantity")}
                        </p>
                        <p className="text-2xl font-bold text-[#3b4417]">
                          {warehouse.inventory.total_quantity.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-[#f5f3e8] rounded-lg p-4">
                        <p className="text-xs text-[#7a8451] uppercase tracking-wide mb-1">
                          {t("detail.inventoryValue")}
                        </p>
                        <p className="text-2xl font-bold text-[#3b4417]">
                          {(
                            warehouse.inventory.total_value / 1000000000
                          ).toFixed(1)}
                          B
                        </p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <p className="text-xs text-orange-600 uppercase tracking-wide mb-1">
                          {t("detail.lowStockProducts")}
                        </p>
                        <p className="text-2xl font-bold text-orange-600">
                          {warehouse.inventory.low_stock_products}
                        </p>
                      </div>
                    </div>

                    {/* Recent Logs */}
                    <div>
                      <h4 className="text-lg font-semibold text-[#3b4417] mb-4">
                        {t("detail.recentActivity")}
                      </h4>
                      <div className="space-y-3">
                        {warehouse.recent_logs.map((log) => (
                          <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                          >
                            <div
                              className={`p-2 rounded-full ${
                                log.type === "IN"
                                  ? "bg-green-100"
                                  : "bg-red-100"
                              }`}
                            >
                              {log.type === "IN" ? (
                                <TrendingUp
                                  size={20}
                                  className="text-green-600"
                                />
                              ) : (
                                <TrendingDown
                                  size={20}
                                  className="text-red-600"
                                />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-[#3b4417]">
                                {log.product_name}
                              </p>
                              <p className="text-sm text-[#7a8451]">
                                {new Date(log.created_at).toLocaleString(
                                  "vi-VN"
                                )}
                              </p>
                            </div>
                            <div
                              className={`text-lg font-bold ${
                                log.type === "IN"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {log.type === "IN" ? "+" : ""}
                              {log.quantity}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-neutral-500">
                    {t("detail.notFound")}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
