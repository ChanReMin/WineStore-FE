"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/hooks/useProductsQuery";
import { Wine } from "lucide-react";

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
          <div key={i} className="animate-pulse overflow-hidden bg-white">
            <div className="aspect-[3/4] bg-neutral-200" />
            <div className="space-y-4 p-6">
              <div className="h-2 w-1/3 bg-neutral-200" />
              <div className="h-4 w-full bg-neutral-200" />
              <div className="h-4 w-4/5 bg-neutral-200" />
              <div className="h-3 w-2/3 bg-neutral-200" />
              <div className="h-6 w-1/2 bg-neutral-200" />
            </div>
          </div>
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
        className="flex min-h-[500px] flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100"
        >
          <Wine size={40} strokeWidth={1.5} className="text-neutral-400" />
        </motion.div>
        <h3 className="mb-3 text-[20px] font-semibold tracking-wide text-[#3b4417]">
          No Products Found
        </h3>
        <p className="max-w-md text-[14px] leading-relaxed text-neutral-600">
          Please try adjusting your filters or search with different keywords to
          discover more amazing products
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
