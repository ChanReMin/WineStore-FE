"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Wine, Sparkles } from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  base_price: number;
  country_of_production: string;
  concentration: number;
  brand: {
    id: number;
    name: string;
  };
}

interface ProductsGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductsGrid({
  products,
  isLoading,
}: ProductsGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="overflow-hidden bg-white shadow-sm"
          >
            <div className="relative aspect-3/4 bg-linear-to-br from-neutral-100 to-neutral-200">
              {/* Shimmer Effect */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            <div className="space-y-4 p-6 bg-linear-to-b from-white to-[#fdfbf5]">
              <div className="h-2 w-1/3 bg-neutral-200 rounded" />
              <div className="h-4 w-full bg-neutral-200 rounded" />
              <div className="h-4 w-4/5 bg-neutral-200 rounded" />
              <div className="h-3 w-2/3 bg-neutral-200 rounded" />
              <div className="h-6 w-1/2 bg-neutral-200 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex min-h-[600px] flex-col items-center justify-center text-center relative"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 20px,
                rgba(59, 68, 23, 0.1) 20px,
                rgba(59, 68, 23, 0.1) 40px
              )`,
            }}
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="relative flex h-32 w-32 items-center justify-center">
            {/* Animated Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#d4af37]/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-[#d4af37]/20"
            />

            {/* Icon */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#fdfbf5] to-white shadow-lg">
              <Wine size={40} strokeWidth={1.5} className="text-[#7b5b2c]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="mb-4 text-[24px] font-semibold tracking-[0.15em] text-[#3b4417] uppercase">
            No Wines Found
          </h3>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-linear-to-r from-transparent to-[#d4af37]/50" />
            <Sparkles size={16} className="text-[#d4af37]" />
            <span className="h-px w-12 bg-linear-to-l from-transparent to-[#d4af37]/50" />
          </div>

          <p className="max-w-md text-[15px] leading-relaxed text-neutral-600">
            We couldn't find any wines matching your criteria.
            <span className="block mt-2 text-[#7b5b2c] italic">
              Try adjusting your filters or explore our full collection
            </span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.location.reload()}
            className="mt-8 group relative inline-flex items-center justify-center px-10 py-4 text-[11px] tracking-[0.3em] uppercase text-[#3b4417]"
          >
            <span className="absolute inset-0 border border-[#d4af37] transition-colors group-hover:border-[#3b4417]" />
            <span className="relative bg-[#fdfbf5] px-6 py-2">
              Reset Filters
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </motion.div>
  );
}
