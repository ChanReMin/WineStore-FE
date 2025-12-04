"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet, Banknote, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/contexts/CheckoutContext";

const PAYMENT_ICONS: Record<string, any> = {
  COD: Banknote,
  MOMO: Wallet,
};

export default function PaymentStep() {
  const t = useTranslations("checkout.payment");
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

      <div className="space-y-2 md:space-y-3 lg:space-y-4">
        {paymentMethods.map((method: any, index: number) => {
          const Icon = PAYMENT_ICONS[method.code] || CreditCard;
          const isSelected = selectedPaymentMethod?.id === method.id;

          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => selectPaymentMethod(method)}
              className={`relative p-3 md:p-4 lg:p-6 border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-[#3b4417] bg-[#f5f3e8]"
                  : "border-[#e8e6dc] bg-white hover:border-[#d4d6b4]"
              }`}
            >
              <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                <div
                  className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 md:mt-1 ${
                    isSelected
                      ? "border-[#3b4417] bg-[#3b4417]"
                      : "border-[#d4d6b4]"
                  }`}
                >
                  {isSelected && (
                    <Check
                      size={12}
                      className="md:w-3.5 md:h-3.5 text-white"
                      strokeWidth={3}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                    <div
                      className={`p-1.5 md:p-2 rounded ${
                        isSelected
                          ? "bg-[#3b4417] text-white"
                          : "bg-neutral-100 text-[#3b4417]"
                      }`}
                    >
                      <Icon size={16} className="md:w-5 md:h-5" />
                    </div>
                    <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#3b4417]">
                      {method.name}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-neutral-600">
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
          className="flex gap-2 md:gap-3 lg:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentStep("address")}
            className="flex-1 border-2 border-[#d4d6b4] text-[#3b4417] py-2.5 md:py-3 lg:py-4 text-xs md:text-sm tracking-widest uppercase hover:border-[#3b4417] transition-colors"
          >
            {t("back")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="flex-1 bg-[#3b4417] text-white py-2.5 md:py-3 lg:py-4 text-xs md:text-sm tracking-widest uppercase hover:bg-[#2a2f18] transition-colors"
          >
            {t("continue")}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
