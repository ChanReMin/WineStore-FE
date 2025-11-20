"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, MapPin } from "lucide-react";

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
  const discount = Math.round(
    ((product.base_price - product.price) / product.base_price) * 100
  );

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -8 }}
        className="group relative bg-white cursor-pointer"
      >
        {/* Badge */}
        {discount > 0 && (
          <div className="absolute left-4 top-4 z-10">
            <span className="bg-[#3b4417] px-3 py-1 text-[10px] tracking-[0.2em] text-white uppercase">
              -{discount}%
            </span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={index < 6}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />

          {/* Quick Add Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
                absolute bottom-4 left-1/2 
                flex -translate-x-1/2 items-center gap-2 
                bg-white px-6 py-5 
                text-[11px] tracking-[0.25em] 
                text-[#3b4417] opacity-0 
                transition-all duration-500 
                group-hover:opacity-100 uppercase
                whitespace-nowrap"
            >
            Add to Cart
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Brand */}
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
            {product.brand.name}
          </p>

          {/* Name */}
          <h3 className="mt-3 line-clamp-2 min-h-[3rem] text-[18px] font-semibold tracking-wide text-[#3b4417] transition-colors group-hover:text-[#5a6b2a]">
            {product.name}
          </h3>

          {/* Country & Concentration */}
          <div className="mt-2 flex items-center gap-2 text-[13px] italic text-neutral-500">
            <MapPin size={14} strokeWidth={1.5} />
            <span>{product.country_of_production}</span>
            <span className="text-neutral-400">•</span>
            <span>{product.concentration}% ABV</span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-[22px] font-semibold tracking-wider text-[#3b4417]">
              {product.price.toLocaleString("vi-VN")}₫
            </span>
            {discount > 0 && (
              <span className="text-[14px] text-neutral-400 line-through">
                {product.base_price.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
