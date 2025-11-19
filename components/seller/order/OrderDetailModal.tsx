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
import { Card } from "@/components/ui/card";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";
import type { Order } from "@/types/order";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus?: (order: Order) => void;
}

export default function OrderDetailModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
}: OrderDetailModalProps) {
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

  // Mock data for items if not available
  const orderItems = order.items || [
    {
      id: 1,
      product_id: 1,
      product_name: "Château Margaux 2015",
      quantity: 2,
      price: 5_940_000,
      total: 11_880_000,
    },
    {
      id: 2,
      product_id: 2,
      product_name: "Bordeaux 2018",
      quantity: 1,
      price: 3_500_000,
      total: 3_500_000,
    },
  ];

  const shippingAddress = order.shipping_address || {
    full_name: order.customer.name,
    phone: order.customer.phone || "0123456789",
    address: "123 Đường ABC",
    city: "Hà Nội",
    district: "Quận Ba Đình",
    ward: "Phường Điện Biên",
  };

  const subtotal = order.subtotal || order.final_amount;
  const shippingFee = order.shipping_fee || 0;
  const discountAmount = order.discount_amount || 0;

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
                      Chi tiết đơn hàng
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
                      Trạng thái đơn hàng
                    </p>
                    <OrderStatusBadge
                      status={order.status}
                      statusText={order.status_text}
                    />
                  </div>
                  <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4">
                    <p className="text-sm text-[#7a8451] mb-2 font-medium">
                      Trạng thái thanh toán
                    </p>
                    <PaymentStatusBadge status={order.payment_status} />
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Thông tin khách hàng
                  </h3>
                  <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-[#7a8451]" />
                      <span className="text-[#3b4417] font-medium">
                        {order.customer.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#7a8451]" />
                      <span className="text-[#3b4417]">
                        {order.customer.email}
                      </span>
                    </div>
                    {order.customer.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#7a8451]" />
                        <span className="text-[#3b4417]">
                          {order.customer.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Địa chỉ giao hàng
                  </h3>
                  <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4 space-y-2">
                    <p className="font-medium text-[#3b4417]">
                      {shippingAddress.full_name}
                    </p>
                    <p className="text-[#7a8451] flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {shippingAddress.phone}
                    </p>
                    <p className="text-[#3b4417]">
                      {shippingAddress.address}, {shippingAddress.ward},{" "}
                      {shippingAddress.district}, {shippingAddress.city}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Sản phẩm ({orderItems.length})
                  </h3>
                  <div className="border border-[#e8e6dc] rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#f5f3e8]">
                          <tr>
                            <th className="text-left p-4 text-sm font-semibold text-[#3b4417]">
                              Sản phẩm
                            </th>
                            <th className="text-center p-4 text-sm font-semibold text-[#3b4417]">
                              Số lượng
                            </th>
                            <th className="text-right p-4 text-sm font-semibold text-[#3b4417]">
                              Đơn giá
                            </th>
                            <th className="text-right p-4 text-sm font-semibold text-[#3b4417]">
                              Thành tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {orderItems.map((item, index) => (
                            <tr
                              key={item.id}
                              className={`${
                                index !== orderItems.length - 1
                                  ? "border-b border-[#e8e6dc]"
                                  : ""
                              }`}
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  {item.product_image && (
                                    <img
                                      src={item.product_image}
                                      alt={item.product_name}
                                      className="w-12 h-12 object-cover rounded border border-[#e8e6dc]"
                                    />
                                  )}
                                  <span className="font-medium text-[#3b4417]">
                                    {item.product_name}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4 text-center text-[#3b4417]">
                                x{item.quantity}
                              </td>
                              <td className="p-4 text-right text-[#3b4417]">
                                {formatPrice(item.price)}
                              </td>
                              <td className="p-4 text-right font-semibold text-[#3b4417]">
                                {formatPrice(item.total)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-[#fdfbf5] border-t border-[#e8e6dc] p-4 space-y-2">
                      <div className="flex justify-between text-[#3b4417]">
                        <span>Tạm tính:</span>
                        <span className="font-medium">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                      {shippingFee > 0 && (
                        <div className="flex justify-between text-[#3b4417]">
                          <span className="flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            Phí vận chuyển:
                          </span>
                          <span className="font-medium">
                            {formatPrice(shippingFee)}
                          </span>
                        </div>
                      )}
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Giảm giá:</span>
                          <span className="font-medium">
                            -{formatPrice(discountAmount)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold text-[#3b4417] pt-2 border-t border-[#e8e6dc]">
                        <span>Tổng cộng:</span>
                        <span className="text-[#d4af37]">
                          {formatPrice(order.final_amount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment & Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-[#7a8451]" />
                      <span className="text-sm font-medium text-[#7a8451]">
                        Phương thức thanh toán
                      </span>
                    </div>
                    <p className="text-[#3b4417] font-medium">
                      {order.payment_method || "COD - Thanh toán khi nhận hàng"}
                    </p>
                  </div>
                  <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-[#7a8451]" />
                      <span className="text-sm font-medium text-[#7a8451]">
                        Ngày đặt hàng
                      </span>
                    </div>
                    <p className="text-[#3b4417] font-medium">
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>

                {/* Note */}
                {order.note && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Ghi chú
                    </h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-[#3b4417]">{order.note}</p>
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
                  Đóng
                </button>
                {onUpdateStatus &&
                  order.status !== 4 &&
                  order.status !== 5 && (
                    <button
                      onClick={() => {
                        onUpdateStatus(order);
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-[#3b4417] text-white rounded-lg hover:bg-[#2a2f18] transition-colors font-medium"
                    >
                      Cập nhật trạng thái
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
