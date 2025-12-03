"use client";

import { motion, Variants } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { fetchShopProducts } from "@/services/productService";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { Product } from "@/types/product";

// ✅ OPTIMIZED: Giảm complexity và thời gian animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Giảm từ 0.15
      delayChildren: 0.1, // Giảm từ 0.2
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 }, // Giảm từ 40px xuống 20px
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Giảm từ 0.6s xuống 0.4s
      ease: "easeOut", // Đơn giản hóa easing
    },
  },
};

export default function FeaturedProducts() {
  const t = useTranslations("home.featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchShopProducts({ page: 1, limit: 4 });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getBadgeText = (index: number) => {
    const badges = [
      t("badges.bestSeller"),
      t("badges.limited"),
      t("badges.awardWinner"),
      t("badges.newArrival"),
    ];
    return badges[index % badges.length];
  };

  const getProductImage = (product: Product): string => {
    return product.images || product.thumbnail || "/placeholder-wine.jpg";
  };

  return (
    <section className="w-full bg-[#fdfbf5] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-semibold tracking-[0.3em] text-[#3b4417] uppercase">
            {t("title")}
          </h2>

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] italic text-[#7a8451]">
            <span className="h-px w-16 bg-[#d4d6b4]" />
            <span>{t("subtitle")}</span>
            <span className="h-px w-16 bg-[#d4d6b4]" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-neutral-600">
            {t("description")}
          </p>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="mt-16 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#3b4417] border-r-transparent"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white"
              >
                {/* Badge */}
                <div className="absolute left-4 top-4 z-10">
                  <span className="bg-[#3b4417] px-3 py-1 text-[10px] tracking-[0.2em] text-white uppercase">
                    {getBadgeText(index)}
                  </span>
                </div>

                {/* Link to Product Detail */}
                <Link href={`/shop/${product.id}/${product.slug}`}>
                  {/* Image */}
                  <div className="relative aspect-3/4 overflow-hidden bg-neutral-100">
                    <ImageWithFallback
                      src={getProductImage(product)}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />

                    {/* Quick Add Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        // TODO: Add to cart functionality
                      }}
                      className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-white px-6 py-3 text-[11px] tracking-[0.25em] text-[#3b4417] opacity-0 transition-all duration-500 group-hover:opacity-100 uppercase"
                    >
                      <ShoppingBag size={14} />
                      {t("addToCart")}
                    </motion.button>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    {/* Name */}
                    <h3 className="mt-3 text-[18px] font-semibold tracking-wide text-[#3b4417] transition-colors group-hover:text-[#5a6b2a]">
                      {product.name}
                    </h3>

                    {/* Region */}
                    <p className="mt-1 text-[13px] italic text-neutral-500">
                      {product.productionArea || product.originCountry || "N/A"}
                    </p>

                    {/* Price */}
                    <div className="mt-4">
                      {product.basePrice &&
                      product.price < product.basePrice ? (
                        <div className="flex items-center gap-2">
                          <p className="text-[18px] font-semibold tracking-wider text-[#3b4417]">
                            {product.price.toLocaleString("vi-VN")}₫
                          </p>
                          <p className="text-[14px] text-neutral-400 line-through">
                            {product.basePrice.toLocaleString("vi-VN")}₫
                          </p>
                        </div>
                      ) : (
                        <p className="text-[22px] font-semibold tracking-wider text-[#3b4417]">
                          {product.price.toLocaleString("vi-VN")}₫
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-[11px] tracking-[0.3em] uppercase text-[#3b4417]"
            >
              <span className="absolute inset-0 border border-[#c8c8a3] transition-colors group-hover:border-[#3b4417]" />
              <span className="pointer-events-none absolute left-0 bottom-0 h-px w-20 bg-[#fdfbf5] transition-all duration-300 group-hover:w-0" />
              <span className="pointer-events-none absolute right-0 top-0 h-px w-20 bg-[#fdfbf5] transition-all duration-300 group-hover:w-0" />
              <span className="relative bg-[#fdfbf5] px-6 py-2">
                {t("exploreAll")}
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
