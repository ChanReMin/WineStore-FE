"use client";

import { motion } from "framer-motion";
import { MapPin, CreditCard, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/contexts/CheckoutContext";
import { formatCurrency } from "@/lib/utils";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function OrderReviewStep() {
  const t = useTranslations("checkout.review");
  const {
    cart,
    selectedAddress,
    selectedPaymentMethod,
    submitOrder,
    setCurrentStep,
    isCreatingOrder,
  } = useCheckout();

  const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const total = subtotal; // No discount, no shipping fee

  return (
    <div className="space-y-3 md:space-y-4 lg:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-[#e8e6dc] pb-2 md:pb-3 lg:pb-4"
      >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#3b4417] tracking-wide uppercase">
          {t("title")}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-3 md:space-y-4 lg:space-y-6">
          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-3 md:p-4 lg:p-6 border border-[#e8e6dc]"
          >
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#3b4417] mb-2 md:mb-3 lg:mb-4 uppercase tracking-wide">
              {t("products")} ({cart.length})
            </h3>
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-2 md:gap-3 lg:gap-4 pb-2 md:pb-3 lg:pb-4 border-b border-[#f5f3e8] last:border-0"
                >
                  <div className="relative w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 shrink-0 bg-neutral-100">
                    <ImageWithFallback
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-semibold text-[#3b4417] mb-0.5 md:mb-1">
                      {item.productName}
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-500">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm md:text-base font-semibold text-[#3b4417]">
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
            className="bg-white p-3 md:p-4 lg:p-6 border border-[#e8e6dc]"
          >
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 lg:mb-4">
              <MapPin size={16} className="md:w-5 md:h-5 text-[#3b4417]" />
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#3b4417] uppercase tracking-wide">
                {t("shippingAddress")}
              </h3>
            </div>
            {selectedAddress && (
              <div>
                <p className="text-sm md:text-base font-semibold text-[#3b4417] mb-0.5 md:mb-1">
                  {selectedAddress.fullName}
                </p>
                <p className="text-xs md:text-sm text-neutral-600 mb-0.5 md:mb-1">
                  {selectedAddress.phoneNumber}
                </p>
                <p className="text-xs md:text-sm text-neutral-700">
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
            className="bg-white p-3 md:p-4 lg:p-6 border border-[#e8e6dc]"
          >
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 lg:mb-4">
              <CreditCard size={16} className="md:w-5 md:h-5 text-[#3b4417]" />
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#3b4417] uppercase tracking-wide">
                {t("paymentMethod")}
              </h3>
            </div>
            {selectedPaymentMethod && (
              <div>
                <p className="text-sm md:text-base font-semibold text-[#3b4417] mb-0.5 md:mb-1">
                  {selectedPaymentMethod.name}
                </p>
                <p className="text-xs md:text-sm text-neutral-600">
                  {selectedPaymentMethod.description}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#f5f3e8] p-3 md:p-4 lg:p-6 border border-[#d4d6b4]"
          >
            <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#3b4417] mb-2 md:mb-3 lg:mb-4 uppercase tracking-wide">
              {t("summary.title")}
            </h3>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-neutral-600">
                  {t("summary.subtotal")}
                </span>
                <span className="font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm text-green-600">
                <span>{t("summary.shippingFee")}</span>
                <span className="font-semibold">Miễn phí</span>
              </div>
              <div className="border-t border-[#d4d6b4] pt-2 md:pt-3 flex justify-between">
                <span className="text-sm md:text-base lg:text-lg font-semibold text-[#3b4417]">
                  {t("summary.total")}
                </span>
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-[#3b4417]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <div className="mt-3 md:mt-4 lg:mt-6 space-y-2 md:space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={submitOrder}
                disabled={isCreatingOrder}
                className="w-full bg-[#3b4417] text-white py-2.5 md:py-3 lg:py-4 text-xs md:text-sm tracking-widest uppercase hover:bg-[#2a2f18] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {isCreatingOrder ? (
                  <>
                    <Loader2 size={16} className="md:w-[18px] md:h-[18px] animate-spin" />
                    {t("processing")}
                  </>
                ) : (
                  t("placeOrder")
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentStep("payment")}
                className="w-full border-2 border-[#d4d6b4] text-[#3b4417] py-2 md:py-2.5 lg:py-3 text-xs md:text-sm tracking-wide uppercase hover:border-[#3b4417] transition-colors"
              >
                {t("back")}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
