"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckoutProvider, useCheckout } from "@/contexts/CheckoutContext";
import CheckoutProgress from "@/components/checkout/CheckoutProgress";
import CartStep from "@/components/checkout/CartStep";
import AddressStep from "@/components/checkout/AddressStep";
import PaymentStep from "@/components/checkout/PaymentStep";
import OrderReviewStep from "@/components/checkout/OrderReviewStep";
import CheckoutSuccessStep from "@/components/checkout/CheckoutSuccessStep";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_ADDRESSES, MOCK_paymentMethodS } from "@/lib/mockCheckoutData";
import type { CartItem as CheckoutCartItem } from "@/contexts/CheckoutContext";

function CheckoutContent() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { cart: storeCart, fetchCart } = useCartStore();
  const checkoutContext = useCheckout() as any;
  const { currentStep, cart } = checkoutContext;

  // Check authentication and fetch cart
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchCart();
  }, [isAuthenticated, router, fetchCart]);

  // Initialize checkout with real cart data
  useEffect(() => {
    if (storeCart && cart.length === 0 && checkoutContext.initializeData) {
      // Convert cart store items to checkout format
      const checkoutItems: CheckoutCartItem[] = storeCart.items.map((item) => ({
        id: item.id,
        productId: item.product.id,
        productName: item.product.name,
        productSlug: item.product.slug,
        productImage: item.product.image,
        sku: item.product.sku || "",
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
        stockAvailable: item.product.maxQuantity,
        isAvailable: item.product.inStock,
      }));

      checkoutContext.initializeData(
        checkoutItems,
        MOCK_ADDRESSES,
        MOCK_paymentMethodS
      );
    }
  }, [storeCart, cart.length, checkoutContext]);

  // Redirect if cart is empty
  useEffect(() => {
    if (storeCart && storeCart.items.length === 0 && currentStep === "cart") {
      router.push("/cart");
    }
  }, [storeCart, currentStep, router]);

  if (!isAuthenticated) return null;

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-[#fdfbf5] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <CheckoutProgress currentStep={currentStep} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            {currentStep === "cart" && <CartStep />}
            {currentStep === "address" && <AddressStep />}
            {currentStep === "payment" && <PaymentStep />}
            {currentStep === "review" && <OrderReviewStep />}
            {currentStep === "success" && <CheckoutSuccessStep />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  );
}
