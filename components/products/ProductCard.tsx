"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ShoppingBag, MapPin, Star, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

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

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const t = useTranslations("shop.product");
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { addToCart } = useCartStore();
  const discount = Math.round(
    ((product.base_price - product.price) / product.base_price) * 100
  );

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.info("Vui lòng đăng nhập để thêm vào giỏ hàng");
      router.push("/login");
      return;
    }

    try {
      await addToCart(product.id, 1, {
        name: product.name,
        slug: product.slug,
        image: product.thumbnail,
        price: product.price,
        max_quantity: 99,
      });
      toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Không thể thêm vào giỏ hàng"
      );
    }
  };

  return (
    <Link href={`/shop/${product.id}/${product.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.6,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -12 }}
        className="group relative bg-white cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500"
      >
        {/* Decorative Corner Accents */}
        <div className="absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-[#d4af37]/0 transition-all duration-500 group-hover:border-[#d4af37]/60 z-10" />
        <div className="absolute right-0 bottom-0 h-12 w-12 border-r-2 border-b-2 border-[#d4af37]/0 transition-all duration-500 group-hover:border-[#d4af37]/60 z-10" />

        {/* Badge */}
        {discount > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.3 }}
            className="absolute left-4 top-4 z-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#d4af37] blur-sm" />
              <span className="relative block bg-linear-to-br from-[#3b4417] to-[#2a2f18] px-4 py-2 text-[10px] tracking-[0.25em] text-white uppercase shadow-lg">
                -{discount}% {t("save")}
              </span>
            </div>
          </motion.div>
        )}

        {/* Image Container */}
        <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-neutral-100 to-neutral-50">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-700 group-hover:scale-110"
            priority={index < 6}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

          {/* Shimmer Effect on Hover */}
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
          />

          {/* Quick Add Button */}
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              absolute bottom-6 left-1/2 
              flex -translate-x-1/2 items-center gap-2 
              bg-white px-8 py-4
              text-[11px] tracking-[0.25em] 
              text-[#3b4417] opacity-0 
              transition-all duration-500 
              group-hover:opacity-100 uppercase
              whitespace-nowrap shadow-xl
              border border-[#d4af37]/20
              hover:bg-[#3b4417] hover:text-white"
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
            {t("addToCart")}
          </motion.button>
        </div>

        {/* Content */}
        <div className="relative p-6 bg-linear-to-b from-white to-[#fdfbf5]">
          {/* Brand with Icon */}
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7b5b2c]">
              {product.brand.name}
            </p>
            {/* Rating Stars */}
          </div>

          {/* Decorative Divider */}
          <div className="mt-3 flex items-center gap-2">
            <span className="h-px flex-1 bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          </div>

          {/* Name */}
          <h3 className="mt-4 line-clamp-2 min-h-14 text-[18px] font-semibold tracking-wide text-[#3b4417] transition-colors group-hover:text-[#d4af37] leading-snug">
            {product.name}
          </h3>

          {/* Country & Concentration */}
          <div className="mt-3 flex items-center gap-2 text-[12px] text-neutral-600">
            <MapPin size={13} strokeWidth={1.5} className="text-[#7b5b2c]" />
            <span className="italic">{product.country_of_production}</span>
            <span className="text-[#d4af37]">•</span>
            <span className="font-medium">{product.concentration}% ABV</span>
          </div>

          {/* Price Section */}
          <div className="mt-5 flex items-center justify-between border-t border-[#d4af37]/10 pt-4">
            <div className="flex flex-col">
              <span className="text-[24px] font-bold tracking-wide text-[#3b4417]">
                {product.price.toLocaleString("vi-VN")}₫
              </span>
              {discount > 0 && (
                <span className="text-[13px] text-neutral-400 line-through">
                  {product.base_price.toLocaleString("vi-VN")}₫
                </span>
              )}
            </div>

            {/* View Details Link */}
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#7b5b2c] group-hover:text-[#d4af37] transition-colors"
            >
              <span>{t("view")}</span>
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
