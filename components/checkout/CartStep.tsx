"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/contexts/CheckoutContext";
import { formatCurrency } from "@/lib/utils";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

export default function CartStep() {
  const t = useTranslations("checkout.cart");
  const { cart, updateCartItemQuantity, removeCartItem, setCurrentStep } =
    useCheckout();

  const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItemQuantity(itemId, newQuantity);
  };

  const handleRemove = async (itemId: number) => {
    await removeCartItem(itemId);
  };

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <ShoppingBag
          size={80}
          className="text-[#d4d6b4] mb-6"
          strokeWidth={1}
        />
        <h3 className="text-2xl font-semibold text-[#3b4417] tracking-wide mb-2">
          {t("empty.title")}
        </h3>
        <p className="text-neutral-500 mb-8">{t("empty.description")}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = "/products")}
          className="bg-[#3b4417] text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#2a2f18] transition-colors"
        >
          {t("empty.button")}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2 md:space-y-2.5 lg:space-y-4 xl:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-[#e8e6dc] pb-1.5 md:pb-2 lg:pb-3 xl:pb-4"
      >
        <h2 className="text-base md:text-lg lg:text-2xl xl:text-3xl font-semibold text-[#3b4417] tracking-wide uppercase">
          {t("title")}
        </h2>
        <span className="text-[11px] md:text-xs lg:text-sm text-neutral-500">
          {cart.length} {t("items")}
        </span>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {cart.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100, height: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex gap-2 md:gap-2.5 lg:gap-3 xl:gap-4 bg-white p-1.5 md:p-2 lg:p-3 xl:p-4 border border-[#e8e6dc] hover:border-[#d4d6b4] transition-colors"
          >
            <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 shrink-0 bg-neutral-100">
              <ImageWithFallback
                src={item.productImage}
                alt={item.productName}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xs md:text-sm lg:text-base xl:text-lg font-semibold text-[#3b4417] mb-0.5 truncate">
                {item.productName}
              </h3>
              <p className="text-[10px] md:text-[11px] lg:text-xs text-neutral-500 mb-0.5 md:mb-1">
                SKU: {item.sku}
              </p>
              <p className="text-xs md:text-sm lg:text-base xl:text-lg font-semibold text-[#3b4417]">
                {formatCurrency(item.unitPrice)}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2
                  size={14}
                  className="md:w-4 md:h-4 lg:w-[18px] lg:h-[18px]"
                />
              </motion.button>

              <div className="flex items-center gap-0.5 md:gap-1 border border-[#d4d6b4]">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="p-0.5 md:p-1 lg:p-1.5 xl:p-2 hover:bg-[#f5f3e8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus
                    size={10}
                    className="md:w-[11px] md:h-[11px] lg:w-[13px] lg:h-[13px]"
                  />
                </motion.button>
                <span className="w-6 md:w-8 lg:w-10 xl:w-12 text-center text-[11px] md:text-xs lg:text-sm font-semibold">
                  {item.quantity}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.stockAvailable}
                  className="p-0.5 md:p-1 lg:p-1.5 xl:p-2 hover:bg-[#f5f3e8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus
                    size={10}
                    className="md:w-[11px] md:h-[11px] lg:w-[13px] lg:h-[13px]"
                  />
                </motion.button>
              </div>

              <p className="text-xs md:text-sm lg:text-base xl:text-lg font-bold text-[#3b4417]">
                {formatCurrency(item.lineTotal)}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-[#f5f3e8] p-2 md:p-2.5 lg:p-4 xl:p-6 border border-[#d4d6b4]"
      >
        <div className="flex justify-between items-center mb-2 md:mb-2.5 lg:mb-3">
          <span className="text-xs md:text-sm lg:text-base xl:text-lg text-neutral-600">
            {t("subtotal")}
          </span>
          <span className="text-sm md:text-base lg:text-lg xl:text-2xl font-bold text-[#3b4417]">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentStep("address")}
          className="w-full bg-[#3b4417] text-white py-1.5 md:py-2 lg:py-3 xl:py-4 text-[11px] md:text-xs lg:text-sm tracking-widest uppercase hover:bg-[#2a2f18] transition-colors"
        >
          {t("continue")}
        </motion.button>
      </motion.div>
    </div>
  );
}
