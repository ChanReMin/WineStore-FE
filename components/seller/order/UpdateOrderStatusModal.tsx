"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Loader2, Package, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import OrderStatusBadge from "./OrderStatusBadge";
interface UpdateOrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderId: number, status: number, note: string) => Promise<void>;
  order: any | null;
}

export default function UpdateOrderStatusModal({
  isOpen,
  onClose,
  onSubmit,
  order,
}: UpdateOrderStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<number>(
    order?.status || 1
  );
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 1, label: "Chờ xác nhận", disabled: false },
    { value: 2, label: "Đang xử lý", disabled: false },
    { value: 3, label: "Đang giao", disabled: false },
    { value: 4, label: "Hoàn thành", disabled: false },
    { value: 5, label: "Đã hủy", disabled: false },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setIsSubmitting(true);
    try {
      await onSubmit(order.id, selectedStatus, note);
      onClose();
      setNote("");
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!order) return null;

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 p-4"
          >
            <Card className="border-[#d4d6b4] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e8e6dc] bg-[#f5f3e8]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#3b4417] rounded-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#3b4417]">
                      Cập nhật trạng thái đơn hàng
                    </h2>
                    <p className="text-sm text-[#7a8451]">
                      {order.order_code}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="p-2 rounded-lg hover:bg-[#e8e6dc] transition-colors"
                >
                  <X className="w-5 h-5 text-[#3b4417]" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Current Status */}
                <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4">
                  <p className="text-sm text-[#7a8451] mb-2">
                    Trạng thái hiện tại:
                  </p>
                  <OrderStatusBadge
                    status={order.status}
                    statusText={order.status_text}
                  />
                </div>

                {/* New Status */}
                <div>
                  <label className="block text-sm font-medium text-[#3b4417] mb-3">
                    Trạng thái mới <span className="text-red-600">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedStatus(option.value)}
                        disabled={option.disabled}
                        className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                          selectedStatus === option.value
                            ? "border-[#3b4417] bg-[#f5f3e8] text-[#3b4417]"
                            : "border-[#d4d6b4] bg-white text-[#7a8451] hover:border-[#3b4417]"
                        } ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-[#3b4417] mb-2">
                    Ghi chú (tùy chọn)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] resize-none"
                    placeholder="Nhập ghi chú về cập nhật trạng thái..."
                  />
                </div>

                {/* Warning */}
                {selectedStatus === 5 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-red-900 mb-1">
                          Cảnh báo
                        </p>
                        <p className="text-sm text-red-700">
                          Bạn đang hủy đơn hàng này. Hành động này sẽ thông báo
                          cho khách hàng và có thể ảnh hưởng đến đánh giá của
                          bạn.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStatus === 4 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-emerald-900 mb-1">
                          Xác nhận hoàn thành
                        </p>
                        <p className="text-sm text-emerald-700">
                          Đơn hàng sẽ được đánh dấu là hoàn thành. Khách hàng
                          có thể đánh giá sản phẩm sau khi hoàn thành.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting || selectedStatus === order.status}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#3b4417] text-white rounded-lg hover:bg-[#2a2f18] transition-colors font-medium disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang cập nhật...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Cập nhật
                    </>
                  )}
                </button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
