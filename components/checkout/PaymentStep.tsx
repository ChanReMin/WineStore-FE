"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet, Building2, Banknote, Check } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";

const PAYMENT_ICONS: Record<string, any> = {
  COD: Banknote,
  VNPAY: CreditCard,
  MOMO: Wallet,
  BANK_TRANSFER: Building2,
};

export default function PaymentStep() {
  const {
    paymentMethods,
    selectedPaymentMethod,
    selectPaymentMethod,
    setCurrentStep,
  } = useCheckout();

  const handleContinue = () => {
    if (selectedPaymentMethod) {
      setCurrentStep("review");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-[#e8e6dc] pb-4"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-[#3b4417] tracking-wide uppercase">
          Phương thức thanh toán
        </h2>
      </motion.div>

      <div className="space-y-4">
        {paymentMethods.map((method, index) => {
          const Icon = PAYMENT_ICONS[method.code] || CreditCard;
          const isSelected = selectedPaymentMethod?.id === method.id;

          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => selectPaymentMethod(method)}
              className={`relative p-6 border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-[#3b4417] bg-[#f5f3e8]"
                  : "border-[#e8e6dc] bg-white hover:border-[#d4d6b4]"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                    isSelected
                      ? "border-[#3b4417] bg-[#3b4417]"
                      : "border-[#d4d6b4]"
                  }`}
                >
                  {isSelected && (
                    <Check size={14} className="text-white" strokeWidth={3} />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded ${
                        isSelected
                          ? "bg-[#3b4417] text-white"
                          : "bg-neutral-100 text-[#3b4417]"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-[#3b4417] text-lg">
                      {method.name}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {method.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedPaymentMethod && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentStep("address")}
            className="flex-1 border-2 border-[#d4d6b4] text-[#3b4417] py-4 text-sm tracking-widest uppercase hover:border-[#3b4417] transition-colors"
          >
            Quay lại
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="flex-1 bg-[#3b4417] text-white py-4 text-sm tracking-widest uppercase hover:bg-[#2a2f18] transition-colors"
          >
            Tiếp tục
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
