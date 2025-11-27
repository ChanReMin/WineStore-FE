"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { OrderDetail } from "@/types/order";
import { orderService } from "@/services/orderService";
import { formatCurrency } from "@/lib/utils";
import OrderTimeline from "./OrderTimeline";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  onOrderUpdated?: () => void;
}

export default function OrderDetailModal({
  isOpen,
  onClose,
  orderId,
  onOrderUpdated,
}: OrderDetailModalProps) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    if (isOpen && orderId) {
      loadOrderDetail();
    }
  }, [isOpen, orderId]);

  const loadOrderDetail = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getOrderDetail(orderId);
      setOrder(data);
    } catch (error) {
      toast.error("Không thể tải chi tiết đơn hàng");
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      toast.error("Vui lòng nhập lý do hủy đơn");
      return;
    }

    if (!confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;

    setIsCancelling(true);
    try {
      await orderService.cancelOrder(orderId, cancelReason);
      toast.success("Hủy đơn hàng thành công!");
      onOrderUpdated?.();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return "bg-yellow-100 text-yellow-800";
      case 2:
        return "bg-blue-100 text-blue-800";
      case 3:
        return "bg-purple-100 text-purple-800";
      case 4:
        return "bg-green-100 text-green-800";
      case 5:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-[#33391d]">
                  Chi tiết đơn hàng
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-20 animate-pulse rounded bg-neutral-200"
                      />
                    ))}
                  </div>
                ) : order ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Order Info */}
                    <div className="rounded-lg bg-amber-50 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-neutral-600">
                            Mã đơn hàng
                          </p>
                          <p className="text-lg font-bold text-[#33391d]">
                            {order.orderCode}
                          </p>
                          <p className="mt-1 text-sm text-neutral-500">
                            {new Date(order.createdAt).toLocaleString("vi-VN")}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}
                        >
                          {order.statusText}
                        </span>
                      </div>
                    </div>

                    {/* Order Timeline */}
                    <OrderTimeline status={order.status} />

                    {/* Shipping Address */}
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 font-semibold text-[#33391d]">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Địa chỉ giao hàng
                      </h3>
                      <div className="rounded-lg border border-neutral-200 p-4">
                        <p className="font-medium text-neutral-900">
                          {order.shippingAddress.fullName}
                        </p>
                        <p className="mt-1 text-sm text-neutral-600">
                          {order.shippingAddress.phoneNumber}
                        </p>
                        <p className="mt-1 text-sm text-neutral-600">
                          {order.shippingAddress.addressLine},{" "}
                          {order.shippingAddress.city}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 font-semibold text-[#33391d]">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                        Sản phẩm
                      </h3>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 rounded-lg border border-neutral-200 p-4"
                          >
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="h-20 w-20 rounded object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-neutral-900">
                                {item.productName}
                              </h4>
                              <p className="mt-1 text-sm text-neutral-600">
                                {formatCurrency(item.unitPrice)} x{" "}
                                {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-[#33391d]">
                                {formatCurrency(item.lineTotal)}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="rounded-lg border border-neutral-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">
                            Tổng tiền hàng:
                          </span>
                          <span className="font-medium">
                            {formatCurrency(order.totalAmount)}
                          </span>
                        </div>
                        {order.discountAmount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-600">Giảm giá:</span>
                            <span className="font-medium text-green-600">
                              -{formatCurrency(order.discountAmount)}
                            </span>
                          </div>
                        )}
                        <div className="border-t border-neutral-200 pt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold text-neutral-900">
                              Tổng thanh toán:
                            </span>
                            <span className="text-xl font-bold text-[#33391d]">
                              {formatCurrency(order.finalAmount)}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">
                            Phương thức thanh toán:
                          </span>
                          <span className="font-medium">
                            {order.paymentMethod.name}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-neutral-600">
                            Trạng thái thanh toán:
                          </span>
                          <span
                            className={`font-medium ${order.paymentStatus === 1 ? "text-green-600" : "text-orange-600"}`}
                          >
                            {order.paymentstatusText}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Note */}
                    {order.note && (
                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-2">
                          <svg
                            className="h-5 w-5 text-blue-600 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              Ghi chú:
                            </p>
                            <p className="mt-1 text-sm text-blue-700">
                              {order.note}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cancel Order Section */}
                    {order.status < 3 && order.status !== 5 && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <svg
                            className="h-5 w-5 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          <h4 className="font-medium text-red-900">
                            Hủy đơn hàng
                          </h4>
                        </div>
                        <textarea
                          value={cancelReason}
                          onChange={(e) => setCancelReason(e.target.value)}
                          placeholder="Nhập lý do hủy đơn..."
                          className="w-full rounded border border-red-200 p-2 text-sm focus:border-red-400 focus:outline-none"
                          rows={3}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCancelOrder}
                          disabled={isCancelling}
                          className="mt-2 w-full rounded bg-red-600 py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                        >
                          {isCancelling ? "Đang xử lý..." : "Xác nhận hủy đơn"}
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
