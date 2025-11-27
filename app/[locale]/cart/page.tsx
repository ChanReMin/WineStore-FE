"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "react-toastify";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function CartPage() {
  const t = useTranslations("cart");
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const {
    cart,
    fetchCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    isLoading,
  } = useCartStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchCart();
  }, [isAuthenticated, router, fetchCart]);

  const handleUpdateQuantity = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    try {
      await updateCartItem(cartItemId, newQuantity);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("errors.cannotUpdate")
      );
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      toast.success(t("success.itemRemoved"));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("errors.cannotRemove")
      );
    }
  };

  const handleClearCart = async () => {
    if (!confirm(t("confirmClearCart"))) return;

    try {
      await clearCart();
      toast.success(t("success.cartCleared"));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("errors.cannotClearCart")
      );
    }
  };

  const cartItems = cart?.items || [];
  const isEmpty = cartItems.length === 0;

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/shop"
            className="mb-4 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-[#33391d]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("continueShopping")}
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#33391d]">
                {t("title")}
              </h1>
              <p className="mt-2 text-neutral-600">
                {cart?.summary.totalItems || 0} {t("items")}
              </p>
            </div>

            {!isEmpty && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCart}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                {t("clearAll")}
              </motion.button>
            )}
          </div>
        </motion.div>

        {isEmpty ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-lg bg-white p-16 text-center shadow-sm"
          >
            <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-amber-100">
              <ShoppingBag className="h-16 w-16 text-[#33391d]" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-[#33391d]">
              {t("empty.title")}
            </h2>
            <p className="mb-6 text-neutral-600">{t("empty.description")}</p>
            <Link
              href="/shop"
              className="inline-block bg-[#33391d] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#2a2f18]"
            >
              {t("empty.button")}
            </Link>
          </motion.div>
        ) : (
          /* Cart Content */
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative flex gap-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:border-[#33391d]/30 hover:shadow-md"
                  >
                    {/* Product Image */}
                    <div className="relative h-40 w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col">
                      {/* Name & Remove */}
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="mb-1 text-lg font-semibold text-[#33391d]">
                            {item.product.name}
                          </h3>
                          {item.product.sku && (
                            <p className="text-sm text-neutral-500">
                              SKU: {item.product.sku}
                            </p>
                          )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isLoading}
                          className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                          title={t("removeItem")}
                        >
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>

                      {/* Price */}
                      <p className="mb-4 text-base font-medium text-neutral-700">
                        {item.unitPrice.toLocaleString("vi-VN")}₫{" "}
                        {t("perBottle")}
                      </p>

                      {/* Quantity & Total */}
                      <div className="mt-auto flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-neutral-600">
                            {t("quantity")}:
                          </span>
                          <div className="flex items-center gap-2 rounded-lg border-2 border-neutral-300 bg-white">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1 || isLoading}
                              className="p-2 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-[#33391d] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Minus className="h-4 w-4" />
                            </motion.button>

                            <span className="min-w-[3rem] text-center text-base font-semibold text-neutral-900">
                              {item.quantity}
                            </span>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={
                                item.quantity >= item.product.maxQuantity ||
                                isLoading
                              }
                              className="p-2 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-[#33391d] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Plus className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Line Total */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#33391d]">
                            {item.lineTotal.toLocaleString("vi-VN")}₫
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-neutral-500">
                              {item.quantity} ×{" "}
                              {item.unitPrice.toLocaleString("vi-VN")}₫
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Stock Warning */}
                      {item.quantity >= item.product.maxQuantity && (
                        <p className="mt-2 text-sm text-amber-600">
                          {t("maxQuantityReached")}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h2 className="mb-6 text-xl font-bold text-[#33391d]">
                  {t("orderSummary")}
                </h2>

                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">
                      {t("subtotal")} ({cart?.summary.totalquantity}{" "}
                      {t("items")})
                    </span>
                    <span className="font-semibold text-neutral-900">
                      {cart?.summary.subtotal.toLocaleString("vi-VN")}₫
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">{t("shipping")}</span>
                    {cart && cart.summary.estimatedshipping > 0 ? (
                      <span className="font-semibold text-neutral-900">
                        {cart.summary.estimatedshipping.toLocaleString("vi-VN")}
                        ₫
                      </span>
                    ) : (
                      <span className="font-semibold text-green-600">
                        {t("freeShipping")}
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-neutral-200" />

                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-neutral-900">
                      {t("total")}
                    </span>
                    <span className="text-3xl font-bold text-[#33391d]">
                      {cart?.summary.estimatedtotal.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full bg-[#33391d] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#2a2f18] hover:shadow-lg"
                  >
                    {t("checkoutNow")}
                  </motion.button>
                </Link>

                {/* Continue Shopping */}
                <Link
                  href="/shop"
                  className="mt-3 block w-full border-2 border-[#33391d] bg-white py-4 text-center text-sm font-bold uppercase tracking-wider text-[#33391d] transition-all hover:bg-amber-50"
                >
                  {t("continueShopping")}
                </Link>

                {/* Note */}
                <p className="mt-4 text-center text-xs text-neutral-500">
                  {t("shippingNote")}
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
