"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Package,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Truck,
  FileText,
  DollarSign,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any | null;
  onUpdateStatus?: (order: any) => void;
}

export default function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
}: OrderDetailModalProps) {
  const t = useTranslations("seller.orders");

  if (!order) return null;

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

  // Get data from API response with safe fallbacks
  const orderItems = order.items || [];
  const shippingAddress = order.shipping_address || null;

  const totalAmount = order.total_amount || 0;
  const discountAmount = order.discount_amount || 0;
  const finalAmount = order.final_amount || 0;
  const totalProfit = order.total_profit || 0;

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
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl z-50"
          >
            <Card className="h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col border-[#d4d6b4] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e8e6dc] bg-[#f5f3e8]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#3b4417] rounded-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#3b4417]">
                      {t("detail.title")}
                    </h2>
                    <p className="text-sm text-[#7a8451]">{order.order_code}</p>
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
                {/* Status & Payment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4">
                    <p className="text-sm text-[#7a8451] mb-2 font-medium">
                      {t("detail.orderStatus")}
                    </p>
                    <OrderStatusBadge
                      status={order.status}
                      statusText={order.status_text}
                    />
                  </div>
                  <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4">
                    <p className="text-sm text-[#7a8451] mb-2 font-medium">
                      {t("detail.customerInfo")}
                    </p>
                    <div className="space-y-1">
                      <p className="text-[#3b4417] font-medium">
                        {order.customer?.name || "N/A"}
                      </p>
                      <p className="text-sm text-[#7a8451]">
                        {order.customer?.email || "N/A"}
                      </p>
                      <p className="text-sm text-[#7a8451]">
                        {order.customer?.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {shippingAddress && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {t("detail.shippingAddress")}
                    </h3>
                    <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4 space-y-2">
                      <p className="font-medium text-[#3b4417]">
                        {shippingAddress.fullName}
                      </p>
                      <p className="text-[#7a8451] flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {shippingAddress.phoneNumber}
                      </p>
                      <p className="text-[#3b4417]">
                        {shippingAddress.addressLine}
                        {shippingAddress.city && `, ${shippingAddress.city}`}
                        {shippingAddress.state && `, ${shippingAddress.state}`}
                        {shippingAddress.country && `, ${shippingAddress.country}`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    {t("detail.products")} ({orderItems.length})
                  </h3>
                  <div className="border border-[#e8e6dc] rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead className="bg-[#f5f3e8]">
                          <tr>
                            <th className="text-left p-4 text-sm font-semibold text-[#3b4417]">
                              {t("detail.product")}
                            </th>
                            <th className="text-center p-4 text-sm font-semibold text-[#3b4417]">
                              {t("detail.quantity")}
                            </th>
                            <th className="text-right p-4 text-sm font-semibold text-[#3b4417]">
                              {t("detail.unitPrice")}
                            </th>
                            <th className="text-right p-4 text-sm font-semibold text-[#3b4417]">
                              {t("detail.total")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {orderItems.map((item: any, index: number) => (
                            <tr
                              key={item.id}
                              className={`${
                                index !== orderItems.length - 1
                                  ? "border-b border-[#e8e6dc]"
                                  : ""
                              }`}
                            >
                              <td className="p-4">
                                <div className="flex flex-col gap-1">
                                  <span className="font-medium text-[#3b4417]">
                                    {item.productName}
                                  </span>
                                  {item.productSku && (
                                    <span className="text-xs text-[#7a8451]">
                                      SKU: {item.productSku}
                                    </span>
                                  )}
                                  {item.warehouseId && (
                                    <span className="text-xs text-blue-600">
                                      Kho: #{item.warehouseId}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-4 text-center text-[#3b4417]">
                                x{item.quantity}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[#3b4417]">
                                    {formatPrice(item.unitPrice)}
                                  </span>
                                  {item.costPrice !== undefined && (
                                    <span className="text-xs text-[#7a8451]">
                                      Giá vốn: {formatPrice(item.costPrice)}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex flex-col gap-1">
                                  <span className="font-semibold text-[#3b4417]">
                                    {formatPrice(item.lineTotal)}
                                  </span>
                                  {item.profit !== undefined && (
                                    <span className="text-xs text-emerald-600 font-medium">
                                      +{formatPrice(item.profit)}
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-[#fdfbf5] border-t border-[#e8e6dc] p-4 space-y-2">
                      <div className="flex justify-between text-[#3b4417]">
                        <span>{t("detail.subtotal")}:</span>
                        <span className="font-medium">
                          {formatPrice(totalAmount)}
                        </span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>{t("detail.discount")}:</span>
                          <span className="font-medium">
                            -{formatPrice(discountAmount)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold text-[#3b4417] pt-2 border-t border-[#e8e6dc]">
                        <span>{t("detail.total")}:</span>
                        <span className="text-[#d4af37]">
                          {formatPrice(finalAmount)}
                        </span>
                      </div>
                      {totalProfit > 0 && (
                        <div className="flex justify-between text-emerald-600 pt-2 border-t border-[#e8e6dc]">
                          <span className="font-semibold">Lợi nhuận:</span>
                          <span className="font-bold">
                            {formatPrice(totalProfit)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {(order.note || order.internal_note) && (
                  <div className="space-y-4">
                    {order.note && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Ghi chú khách hàng
                        </h3>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <p className="text-[#3b4417]">{order.note}</p>
                        </div>
                      </div>
                    )}
                    {order.internal_note && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Ghi chú nội bộ
                        </h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-[#3b4417]">
                            {order.internal_note}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium"
                >
                  {t("detail.close")}
                </button>
                {onUpdateStatus && order.status !== 6 && (
                  <button
                    onClick={() => {
                      onUpdateStatus(order);
                      onClose();
                    }}
                    className="px-6 py-2.5 bg-[#3b4417] text-white rounded-lg hover:bg-[#2a2f18] transition-colors font-medium"
                  >
                    {t("detail.updateStatus")}
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
