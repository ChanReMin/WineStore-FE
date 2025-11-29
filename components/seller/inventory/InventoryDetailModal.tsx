"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Package,
  MapPin,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  Calendar,
  User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InventoryStatusBadge from "./InventoryStatusBadge";
import type { InventoryItem } from "@/types/inventory";


interface InventoryDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onStockIn?: (item: InventoryItem) => void;
  onStockOut?: (item: InventoryItem) => void;
  onTransfer?: (item: InventoryItem) => void;
}

export default function InventoryDetailModal({
  isOpen,
  onClose,
  item,
  onStockIn,
  onStockOut,
  onTransfer,
}: InventoryDetailModalProps) {
  if (!item) return null;

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

  // Mock data for recent logs
  const recentLogs = [
    {
      id: 1,
      type: "IN",
      quantity: 30,
      date: "2024-11-25T10:30:00",
      note: "Nhập hàng từ nhà cung cấp",
    },
    {
      id: 2,
      type: "OUT",
      quantity: -20,
      date: "2024-11-24T14:15:00",
      note: "Xuất hàng cho đơn #12345",
    },
  ];

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
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <Card className="border-[#d4d6b4] shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-[#e8e6dc] bg-[#fdfbf5] sticky top-0 z-10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#3b4417]">
                      Chi tiết tồn kho
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-neutral-500" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Product Info */}
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-neutral-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <Package className="w-12 h-12 text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#3b4417] mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-2">
                        SKU: {item.product.id}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-neutral-600">Giá bán: </span>
                          <span className="font-semibold text-[#3b4417]">
                            {formatPrice(item.product.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warehouse Info */}
                  <div className="p-4 bg-[#f5f3e8] rounded-lg border border-[#e8e6dc]">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-[#7a8451]" />
                      <h4 className="font-semibold text-[#3b4417]">
                        Thông tin kho
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Kho:</span>
                        <span className="text-sm font-medium text-[#3b4417]">
                          {item.warehouse.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Địa chỉ:</span>
                        <span className="text-sm text-[#3b4417]">
                          {item.warehouse.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-5 h-5 text-[#7a8451]" />
                      <h4 className="font-semibold text-[#3b4417]">
                        Thông tin số lượng
                      </h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-white rounded-lg border border-[#e8e6dc] text-center">
                        <p className="text-xs text-neutral-500 mb-1">Tồn kho</p>
                        <p className="text-3xl font-bold text-[#3b4417]">
                          {item.quantityOnHand}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-[#e8e6dc] text-center">
                        <p className="text-xs text-neutral-500 mb-1">
                          Mức an toàn
                        </p>
                        <p className="text-3xl font-bold text-amber-600">
                          {item.safetyStock}
                        </p>
                      </div>
                      <div className="p-4 bg-white rounded-lg border border-[#e8e6dc] text-center">
                        <p className="text-xs text-neutral-500 mb-1">Giá trị</p>
                        <p className="text-lg font-bold text-emerald-600">
                          {formatPrice(item.product.price * item.quantityOnHand)}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mt-4 flex items-center justify-between p-3 bg-white rounded-lg border border-[#e8e6dc]">
                      <span className="text-sm font-medium text-neutral-600">
                        Trạng thái:
                      </span>
                      <InventoryStatusBadge
                        status={item.status}
                        quantity={item.quantityOnHand}
                        safetyStock={item.safetyStock}
                      />
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-[#7a8451]" />
                      <h4 className="font-semibold text-[#3b4417]">
                        Hoạt động gần đây
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {recentLogs.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#e8e6dc]"
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              log.type === "IN"
                                ? "bg-emerald-100"
                                : "bg-red-100"
                            }`}
                          >
                            {log.type === "IN" ? (
                              <TrendingUp className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#3b4417]">
                              {log.type === "IN" ? "Nhập kho" : "Xuất kho"}:{" "}
                              <span
                                className={
                                  log.type === "IN"
                                    ? "text-emerald-600"
                                    : "text-red-600"
                                }
                              >
                                {log.quantity > 0 ? "+" : ""}
                                {log.quantity}
                              </span>
                            </p>
                            <p className="text-xs text-neutral-500">{log.note}</p>
                          </div>
                          <span className="text-xs text-neutral-400">
                            {formatDate(log.date)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm text-neutral-600">
                        Cập nhật lần cuối:
                      </span>
                    </div>
                    <span className="text-sm font-medium text-[#3b4417]">
                      {formatDate(item.lastUpdatedAt)}
                    </span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        onStockIn?.(item);
                        onClose();
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Nhập kho
                    </Button>
                    <Button
                      onClick={() => {
                        onStockOut?.(item);
                        onClose();
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <TrendingDown className="w-4 h-4 mr-2" />
                      Xuất kho
                    </Button>
                    <Button
                      onClick={() => {
                        onTransfer?.(item);
                        onClose();
                      }}
                      className="flex-1 bg-[#3b4417] hover:bg-[#2a2f18] text-white"
                    >
                      <ArrowRightLeft className="w-4 h-4 mr-2" />
                      Chuyển kho
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
