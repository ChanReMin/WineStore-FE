"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";
import { formatCurrency } from "@/lib/utils";

export default function CartStep() {
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
          Giỏ hàng trống
        </h3>
        <p className="text-neutral-500 mb-8">
          Hãy thêm sản phẩm vào giỏ hàng của bạn
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => (window.location.href = "/products")}
          className="bg-[#3b4417] text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#2a2f18] transition-colors"
        >
          Tiếp tục mua sắm
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-[#e8e6dc] pb-4"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-[#3b4417] tracking-wide uppercase">
          Giỏ hàng của bạn
        </h2>
        <span className="text-sm text-neutral-500">{cart.length} sản phẩm</span>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {cart.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100, height: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex gap-4 bg-white p-4 border border-[#e8e6dc] hover:border-[#d4d6b4] transition-colors"
          >
            <div className="relative w-24 h-24 flex-shrink-0 bg-neutral-100">
              <Image
                src={item.productImage}
                alt={item.productName}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[#3b4417] mb-1 truncate">
                {item.productName}
              </h3>
              <p className="text-sm text-neutral-500 mb-2">SKU: {item.sku}</p>
              <p className="text-lg font-semibold text-[#3b4417]">
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
                <Trash2 size={18} />
              </motion.button>

              <div className="flex items-center gap-2 border border-[#d4d6b4]">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="p-2 hover:bg-[#f5f3e8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={14} />
                </motion.button>
                <span className="w-12 text-center font-semibold">
                  {item.quantity}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.stockAvailable}
                  className="p-2 hover:bg-[#f5f3e8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={14} />
                </motion.button>
              </div>

              <p className="text-lg font-bold text-[#3b4417]">
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
        className="bg-[#f5f3e8] p-6 border border-[#d4d6b4]"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg text-neutral-600">Tạm tính:</span>
          <span className="text-2xl font-bold text-[#3b4417]">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentStep("address")}
          className="w-full bg-[#3b4417] text-white py-4 text-sm tracking-widest uppercase hover:bg-[#2a2f18] transition-colors"
        >
          Tiếp tục
        </motion.button>
      </motion.div>
    </div>
  );
}
