"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("cart");
  const { isAuthenticated } = useAuth();
  const { cart, fetchCart, updateCartItem, removeCartItem, isLoading } =
    useCartStore();

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch cart when authenticated and drawer opens
  useEffect(() => {
    if (isAuthenticated && isOpen && !cart) {
      fetchCart();
    }
  }, [isAuthenticated, isOpen, cart, fetchCart]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleUpdateQuantity = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    try {
      await updateCartItem(cartItemId, newQuantity);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Không thể cập nhật"
      );
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể xóa");
    }
  };

  const cartItems = cart?.items || [];
  const totalItems = cart?.summary.total_quantity || 0;
  const subtotal = cart?.summary.subtotal || 0;

  return (
    <>
      {/* Cart Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 text-neutral-700 transition-all hover:text-[#33391d]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#33391d] text-[10px] font-semibold text-amber-50 shadow-sm"
          >
            {totalItems}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Drawer - Portal to body to escape stacking context */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop with blur */}
                <motion.div
                  className="fixed inset-0 z-9998 bg-black/40 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  onClick={() => setIsOpen(false)}
                />

                {/* Curved Sidebar Panel */}
                <motion.div
                  className="fixed right-0 top-0 z-9999 h-full w-full max-w-[480px] bg-amber-50 shadow-2xl"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 300,
                    mass: 0.8,
                  }}
                >
                  {/* Curved edge decoration */}
                  <div className="absolute left-0 top-0 h-full w-8 -translate-x-full">
                    <svg
                      className="h-full w-full"
                      viewBox="0 0 32 800"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M32 0 Q0 400 32 800 L32 0"
                        fill="#fef3e2"
                        className="drop-shadow-lg"
                      />
                    </svg>
                  </div>

                  {/* Decorative top accent */}
                  <div className="absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-[#33391d] via-amber-700 to-[#33391d]" />

                  {/* Header */}
                  <div className="relative border-b border-neutral-200/60 bg-white/40 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-[22px] font-semibold tracking-wide text-[#33391d]">
                          {t("title")}
                        </h2>
                        <p className="mt-1 text-xs uppercase tracking-widest text-neutral-600">
                          {totalItems}{" "}
                          {totalItems === 1 ? t("item") : t("items")}
                        </p>
                      </div>

                      {/* Close button */}
                      <motion.button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex h-10 w-10 items-center justify-center border border-neutral-300 bg-white text-neutral-700 transition-all hover:border-[#33391d] hover:bg-[#33391d] hover:text-amber-50"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>

                  {/* Cart Content */}
                  <div className="flex h-[calc(100%-240px)] flex-col">
                    {cartItems.length === 0 ? (
                      /* Empty State */
                      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="mb-8"
                        >
                          {/* Animated icon */}
                          <div className="relative mx-auto h-32 w-32">
                            {/* Rotating ring */}
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 20,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }}
                              className="absolute inset-0 rounded-full border-2 border-dashed border-neutral-300"
                            />

                            {/* Inner circle with icon */}
                            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white shadow-lg">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-14 w-14 text-neutral-400"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                              </svg>
                            </div>

                            {/* Decorative dots */}
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                              className="absolute -right-2 top-8 h-3 w-3 rounded-full bg-amber-400"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 2,
                                delay: 0.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                              className="absolute -left-2 bottom-8 h-2 w-2 rounded-full bg-[#33391d]"
                            />
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <h3 className="mb-2 text-lg font-semibold tracking-wide text-[#33391d]">
                            {t("empty.title")}
                          </h3>
                          <p className="mb-1 text-sm text-neutral-600">
                            {t("empty.description")}
                          </p>
                          <p className="text-xs italic text-neutral-500">
                            {t("empty.subtitle")}
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="mt-8"
                        >
                          <Link
                            href="/shop"
                            onClick={() => setIsOpen(false)}
                            className="inline-block border border-[#33391d] bg-[#33391d] px-8 py-3 text-[13px] uppercase tracking-[0.2em] text-amber-50 transition-all hover:bg-[#2a2f18]"
                          >
                            {t("empty.button")}
                          </Link>
                        </motion.div>
                      </div>
                    ) : (
                      /* Cart Items */
                      <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-3 pb-8">
                          {cartItems.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ delay: index * 0.05 }}
                              className="group relative flex gap-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm transition-all hover:border-[#33391d]/30 hover:shadow-md"
                            >
                              {/* Remove Button - Top Right */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={isLoading}
                                className="absolute right-2 top-2 z-10 rounded-full bg-white p-1 text-neutral-400 shadow-sm transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                title={t("removeItem")}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </motion.button>

                              {/* Product Image */}
                              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  fill
                                  sizes="96px"
                                  className="object-cover transition-transform group-hover:scale-105"
                                />
                              </div>

                              {/* Product Info */}
                              <div className="flex min-w-0 flex-1 flex-col pr-6">
                                {/* Product Name */}
                                <h4 className="mb-1.5 line-clamp-2 text-sm font-semibold leading-tight text-[#33391d]">
                                  {item.product.name}
                                </h4>

                                {/* SKU if available */}
                                {item.product.sku && (
                                  <p className="mb-1 text-xs text-neutral-400">
                                    SKU: {item.product.sku}
                                  </p>
                                )}

                                {/* Unit Price */}
                                <p className="mb-2 text-xs font-medium text-neutral-600">
                                  {item.unit_price.toLocaleString("vi-VN")}₫{" "}
                                  {t("perBottle")}
                                </p>

                                {/* Quantity Controls & Line Total */}
                                <div className="mt-auto flex items-center justify-between gap-2">
                                  {/* Quantity Selector */}
                                  <div className="flex items-center gap-1 rounded-md border border-neutral-300 bg-white shadow-sm">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() =>
                                        handleUpdateQuantity(
                                          item.id,
                                          item.quantity - 1
                                        )
                                      }
                                      disabled={item.quantity <= 1 || isLoading}
                                      className="p-1.5 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-[#33391d] disabled:cursor-not-allowed disabled:opacity-30"
                                      title={t("decreaseQuantity")}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </motion.button>

                                    <span className="min-w-8 text-center text-sm font-semibold text-neutral-900">
                                      {item.quantity}
                                    </span>

                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() =>
                                        handleUpdateQuantity(
                                          item.id,
                                          item.quantity + 1
                                        )
                                      }
                                      disabled={
                                        item.quantity >=
                                          item.product.max_quantity || isLoading
                                      }
                                      className="p-1.5 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-[#33391d] disabled:cursor-not-allowed disabled:opacity-30"
                                      title={t("increaseQuantity")}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </motion.button>
                                  </div>

                                  {/* Line Total */}
                                  <div className="text-right">
                                    <p className="text-sm font-bold text-[#33391d]">
                                      {item.line_total.toLocaleString("vi-VN")}₫
                                    </p>
                                    {item.quantity > 1 && (
                                      <p className="text-xs text-neutral-500">
                                        {item.quantity} ×{" "}
                                        {item.unit_price.toLocaleString(
                                          "vi-VN"
                                        )}
                                        ₫
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Stock Warning */}
                                {item.quantity >= item.product.max_quantity && (
                                  <p className="mt-1 text-xs text-amber-600">
                                    {t("maxQuantityReached")}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Continue Shopping Link */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mt-4 pb-4 text-center"
                        >
                          <Link
                            href="/shop"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-[#33391d]"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                              />
                            </svg>
                            {t("continueShopping")}
                          </Link>
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Footer - Checkout Section */}
                  {cartItems.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 border-t-2 border-neutral-200 bg-white p-4 shadow-2xl">
                      {/* Summary */}
                      <div className="mb-3 space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">
                            {t("subtotal")} ({totalItems} {t("items")})
                          </span>
                          <span className="font-semibold text-neutral-900">
                            {subtotal.toLocaleString("vi-VN")}₫
                          </span>
                        </div>
                        {cart && cart.summary.estimated_shipping > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-600">
                              {t("shipping")}
                            </span>
                            <span className="font-semibold text-neutral-900">
                              {cart.summary.estimated_shipping.toLocaleString(
                                "vi-VN"
                              )}
                              ₫
                            </span>
                          </div>
                        )}
                        {cart &&
                          cart.summary.estimated_shipping === 0 &&
                          subtotal > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-green-600">
                                {t("freeShipping")}
                              </span>
                              <span className="font-semibold text-green-600">
                                0₫
                              </span>
                            </div>
                          )}
                        <div className="flex items-center justify-between border-t border-neutral-200 pt-2">
                          <span className="text-base font-bold uppercase tracking-wide text-neutral-900">
                            {t("total")}
                          </span>
                          <span className="text-2xl font-bold text-[#33391d]">
                            {(
                              cart?.summary.estimated_total || 0
                            ).toLocaleString("vi-VN")}
                            ₫
                          </span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <motion.button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          // Navigate to checkout
                        }}
                        className="mb-2 w-full bg-[#33391d] py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#2a2f18] hover:shadow-lg"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {t("checkoutNow")}
                      </motion.button>

                      {/* View Cart Link */}
                      <Link
                        href="/cart"
                        onClick={() => setIsOpen(false)}
                        className="block w-full border-2 border-[#33391d] bg-white py-3 text-center text-sm font-semibold uppercase tracking-wider text-[#33391d] transition-all hover:bg-amber-50"
                      >
                        {t("viewCart")}
                      </Link>
                    </div>
                  )}

                  {/* Decorative bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#33391d] via-amber-700 to-[#33391d]" />
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
