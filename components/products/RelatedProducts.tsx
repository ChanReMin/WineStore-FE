"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";
import { Sparkles } from "lucide-react";

interface RelatedProductsProps {
  products: Product[];
  isLoading?: boolean;
}

export default function RelatedProducts({
  products,
  isLoading,
}: RelatedProductsProps) {
  if (isLoading) {
    return (
      <section className="bg-[#fdfbf5] py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#3b4417] border-r-transparent"></div>
            <p className="mt-4 text-sm text-neutral-600">
              Đang tải sản phẩm liên quan...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#fdfbf5] py-20 border-t border-neutral-200/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#d4af37]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#3b4417] tracking-wide">
              Sản Phẩm Liên Quan
            </h2>
            <Sparkles className="w-6 h-6 text-[#d4af37]" />
          </div>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Khám phá thêm những sản phẩm tương tự có thể bạn quan tâm
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
