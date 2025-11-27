"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  Warehouse,
  MapPin,
  User,
  Mail,
  Phone,
  Package,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { WarehouseRequest } from "@/lib/adminWarehouseApprovals";

interface WarehouseDetailModalProps {
  warehouse: WarehouseRequest;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function WarehouseDetailModal({
  warehouse,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: WarehouseDetailModalProps) {
  const t = useTranslations("admin.warehouseApproval.detail");

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-[#3b4417] to-[#5a6622] p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Warehouse className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        {warehouse.name}
                      </h2>
                      <p className="text-white/80 text-sm">
                        {t("requestId")}: #{warehouse.id}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-6">
                  {/* Location */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#3b4417] mb-1">
                            {t("location")}
                          </h3>
                          <p className="text-neutral-600">
                            {warehouse.location}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-50 p-2 rounded-lg">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#3b4417] mb-1">
                            {t("description")}
                          </h3>
                          <p className="text-neutral-600">
                            {warehouse.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Manager Information */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-emerald-50 p-2 rounded-lg">
                          <User className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#3b4417] mb-3">
                            {t("managerInfo")}
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-neutral-400" />
                              <span className="text-neutral-900 font-medium">
                                {warehouse.manager.firstName}{" "}
                                {warehouse.manager.lastName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-neutral-400" />
                              <span className="text-neutral-600">
                                {warehouse.manager.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-neutral-400" />
                              <span className="text-neutral-600">
                                {warehouse.manager.phoneNumber}
                              </span>
                            </div>
                            {warehouse.manager.totalProducts !== undefined && (
                              <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-neutral-400" />
                                <span className="text-neutral-600">
                                  {warehouse.manager.totalProducts}{" "}
                                  {t("totalProducts")} (
                                  {warehouse.manager.approvedProducts}{" "}
                                  {t("approved")})
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Timestamps */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-50 p-2 rounded-lg">
                          <Calendar className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#3b4417] mb-3">
                            {t("timeline")}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">
                                {t("createdAt")}:
                              </span>
                              <span className="text-neutral-900 font-medium">
                                {new Date(warehouse.createdAt).toLocaleString(
                                  "vi-VN"
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">
                                {t("updatedAt")}:
                              </span>
                              <span className="text-neutral-900 font-medium">
                                {new Date(warehouse.updatedAt).toLocaleString(
                                  "vi-VN"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Inventory Summary (if available) */}
                  {warehouse.inventory_summary && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-indigo-50 p-2 rounded-lg">
                            <Package className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#3b4417] mb-3">
                              {t("inventorySummary")}
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-xs text-neutral-500 mb-1">
                                  {t("totalProducts")}
                                </p>
                                <p className="text-lg font-bold text-[#3b4417]">
                                  {warehouse.inventory_summary.totalProducts}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-neutral-500 mb-1">
                                  {t("totalQuantity")}
                                </p>
                                <p className="text-lg font-bold text-[#3b4417]">
                                  {warehouse.inventory_summary.totalquantity.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-neutral-500 mb-1">
                                  {t("totalValue")}
                                </p>
                                <p className="text-lg font-bold text-[#3b4417]">
                                  {new Intl.NumberFormat("vi-VN", {
                                    notation: "compact",
                                    compactDisplay: "short",
                                  }).format(
                                    warehouse.inventory_summary.total_value
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              {warehouse.status === 0 && (
                <div className="border-t border-neutral-200 p-6 bg-neutral-50">
                  <div className="flex items-center justify-end gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors font-medium"
                    >
                      {t("cancel")}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onReject}
                      className="px-6 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      {t("reject")}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onApprove}
                      className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {t("approve")}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
