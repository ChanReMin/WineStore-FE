"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCartStore } from "@/stores/cartStore";

interface BuyNowButtonProps {
  productId: number;
  productName: string;
  maxQuantity?: number;
  variant?: "default" | "compact";
  className?: string;
}

export default function BuyNowButton({
  productId,
  productName,
  maxQuantity = 99,
  variant = "default",
  className = "",
}: BuyNowButtonProps) {
  const t = useTranslations("buyNow");
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { addToCart, isLoading } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.info(t("loginRequired"));
      router.push("/");
      return;
    }

    try {
      // Add to cart
      await addToCart(productId, quantity);

      // Navigate to checkout page
      router.push("/checkout");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("error"));
    }
  };

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (variant === "compact") {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBuyNow}
        disabled={isLoading}
        className={`flex items-center justify-center gap-2 rounded-lg border border-[#33391d] bg-white px-4 py-2 text-sm font-medium text-[#33391d] transition-colors hover:bg-[#33391d] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#33391d] border-t-transparent" />
            <span>{t("adding")}</span>
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            <span>{t("buyNow")}</span>
          </>
        )}
      </motion.button>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Quantity Selector */}
      <div className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={decrementQuantity}
          disabled={quantity <= 1}
          className="p-2 text-neutral-600 hover:text-[#33391d] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4" />
        </motion.button>

        <span className="min-w-8 text-center font-medium text-neutral-900">
          {quantity}
        </span>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={incrementQuantity}
          disabled={quantity >= maxQuantity}
          className="p-2 text-neutral-600 hover:text-[#33391d] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Buy Now Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleBuyNow}
        disabled={isLoading}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#33391d] bg-white px-6 py-3 font-medium text-[#33391d] transition-colors hover:bg-[#33391d] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#33391d] border-t-transparent" />
            <span>{t("adding")}</span>
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" />
            <span>{t("buyNowFull")}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
