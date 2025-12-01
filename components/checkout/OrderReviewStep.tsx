"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, CreditCard, Tag, Truck, Loader2 } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";
import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function OrderReviewStep() {
  const {
    cart,
    selectedAddress,
    selectedPaymentMethod,
    promotion,
    promotionCode,
    shippingFee,
    setPromotionCode,
    validatePromotion,
    calculateShipping,
    submitOrder,
    setCurrentStep,
    isValidatingPromotion,
    isCalculatingShipping,
    isCreatingOrder,
  } = useCheckout();

  const [localPromoCode, setLocalPromoCode] = useState(promotionCode);

  useEffect(() => {
    if (selectedAddress) {
      calculateShipping();
    }
  }, [selectedAddress, calculateShipping]);

  const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const discountAmount = promotion
    ? (subtotal * promotion.discount_value) / 100
    : 0;
  const shippingCost = shippingFee?.shippingFee || 0;
  const total = subtotal - discountAmount + shippingCost;

  const handleApplyPromotion = () => {
    setPromotionCode(localPromoCode);
    validatePromotion();
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-[#e8e6dc] pb-4"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-[#3b4417] tracking-wide uppercase">
          Xác nhận đơn hàng
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 border border-[#e8e6dc]"
          >
            <h3 className="text-lg font-semibold text-[#3b4417] mb-4 uppercase tracking-wide">
              Sản phẩm ({cart.length})
            </h3>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-[#f5f3e8] last:border-0"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 bg-neutral-100">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#3b4417] mb-1">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-neutral-500">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#3b4417]">
                      {formatCurrency(item.lineTotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 border border-[#e8e6dc]"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-[#3b4417]" />
              <h3 className="text-lg font-semibold text-[#3b4417] uppercase tracking-wide">
                Địa chỉ giao hàng
              </h3>
            </div>
            {selectedAddress && (
              <div>
                <p className="font-semibold text-[#3b4417] mb-1">
                  {selectedAddress.fullName}
                </p>
                <p className="text-sm text-neutral-600 mb-1">
                  {selectedAddress.phoneNumber}
                </p>
                <p className="text-sm text-neutral-700">
                  {selectedAddress.addressLine}
                  {selectedAddress.ward && `, ${selectedAddress.ward}`}
                  {selectedAddress.district && `, ${selectedAddress.district}`},{" "}
                  {selectedAddress.city}
                </p>
              </div>
            )}
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 border border-[#e8e6dc]"
          >
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={20} className="text-[#3b4417]" />
              <h3 className="text-lg font-semibold text-[#3b4417] uppercase tracking-wide">
                Phương thức thanh toán
              </h3>
            </div>
            {selectedPaymentMethod && (
              <div>
                <p className="font-semibold text-[#3b4417] mb-1">
                  {selectedPaymentMethod.name}
                </p>
                <p className="text-sm text-neutral-600">
                  {selectedPaymentMethod.description}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          {/* Promotion Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 border border-[#e8e6dc]"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag size={20} className="text-[#3b4417]" />
              <h3 className="text-lg font-semibold text-[#3b4417] uppercase tracking-wide">
                Mã giảm giá
              </h3>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={localPromoCode}
                onChange={(e) =>
                  setLocalPromoCode(e.target.value.toUpperCase())
                }
                placeholder="Nhập mã"
                className="flex-1 px-4 py-2 border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApplyPromotion}
                disabled={isValidatingPromotion || !localPromoCode.trim()}
                className="bg-[#3b4417] text-white px-4 py-2 text-sm uppercase tracking-wide hover:bg-[#2a2f18] disabled:opacity-50 transition-colors"
              >
                {isValidatingPromotion ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Áp dụng"
                )}
              </motion.button>
            </div>
            {promotion && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 p-3 bg-green-50 border border-green-200"
              >
                <p className="text-sm font-semibold text-green-700">
                  {promotion.name}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {promotion.description}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Shipping Fee */}
          {shippingFee && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 border border-[#e8e6dc]"
            >
              <div className="flex items-center gap-2 mb-4">
                <Truck size={20} className="text-[#3b4417]" />
                <h3 className="text-lg font-semibold text-[#3b4417] uppercase tracking-wide">
                  Vận chuyển
                </h3>
              </div>
              {isCalculatingShipping ? (
                <div className="flex items-center gap-2 text-neutral-500">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Đang tính phí...</span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-neutral-600">
                      Phí vận chuyển:
                    </span>
                    <span className="font-semibold text-[#3b4417]">
                      {formatCurrency(shippingFee.shippingFee)}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Dự kiến giao: {shippingFee.estimatedDeliveryDays} ngày
                  </p>
                  <p className="text-xs text-[#d4af37] mt-2">
                    {shippingFee.note}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#f5f3e8] p-6 border border-[#d4d6b4]"
          >
            <h3 className="text-lg font-semibold text-[#3b4417] mb-4 uppercase tracking-wide">
              Tổng cộng
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Tạm tính:</span>
                <span className="font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Giảm giá:</span>
                  <span className="font-semibold">
                    -{formatCurrency(discountAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Phí vận chuyển:</span>
                <span className="font-semibold">
                  {formatCurrency(shippingCost)}
                </span>
              </div>
              <div className="border-t border-[#d4d6b4] pt-3 flex justify-between">
                <span className="text-lg font-semibold text-[#3b4417]">
                  Tổng:
                </span>
                <span className="text-2xl font-bold text-[#3b4417]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={submitOrder}
                disabled={isCreatingOrder}
                className="w-full bg-[#3b4417] text-white py-4 text-sm tracking-widest uppercase hover:bg-[#2a2f18] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {isCreatingOrder ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Đặt hàng"
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep("payment")}
                className="w-full border-2 border-[#d4d6b4] text-[#3b4417] py-3 text-sm tracking-wide uppercase hover:border-[#3b4417] transition-colors"
              >
                Quay lại
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
