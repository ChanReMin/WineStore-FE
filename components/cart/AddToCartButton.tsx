"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { toast } from "react-toastify";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  productSlug?: string;
  productImage?: string;
  productPrice?: number;
  maxQuantity?: number;
  variant?: "default" | "compact";
  className?: string;
}

export default function AddToCartButton({
  productId,
  productName,
  productSlug = "",
  productImage = "",
  productPrice = 0,
  maxQuantity = 99,
  variant = "default",
  className = "",
}: AddToCartButtonProps) {
  const t = useTranslations("addToCart");
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { addToCart, isLoading } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info(t("loginRequired"));
      router.push("/login");
      return;
    }

    try {
      await addToCart(productId, quantity, {
        name: productName,
        slug: productSlug,
        image: productImage,
        price: productPrice,
        maxQuantity: maxQuantity,
      });
      setIsAdded(true);
      toast.success(t("success", { quantity, productName }));

      // Reset after animation
      setTimeout(() => {
        setIsAdded(false);
        setQuantity(1);
      }, 2000);
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
        onClick={handleAddToCart}
        disabled={isLoading || isAdded}
        className={`flex items-center justify-center gap-2 rounded-lg bg-[#33391d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2a2f18] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isAdded ? (
          <>
            <Check className="h-4 w-4" />
            <span>{t("added")}</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            <span>{t("addToCart")}</span>
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

        <span className="min-w-[2rem] text-center font-medium text-neutral-900">
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

      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={isLoading || isAdded}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#33391d] px-6 py-3 font-medium text-white transition-colors hover:bg-[#2a2f18] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>{t("adding")}</span>
          </>
        ) : isAdded ? (
          <>
            <Check className="h-5 w-5" />
            <span>{t("addedToCart")}</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>{t("addToCartFull")}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
