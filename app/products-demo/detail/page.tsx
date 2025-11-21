"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MOCK_PRODUCT_DETAIL } from "@/lib/mockData";

export default function ProductDetailDemoPage() {
  const product = MOCK_PRODUCT_DETAIL;

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 text-sm text-neutral-600"
        >
          <Link href="/" className="hover:text-[#33391d]">
            Home Page
          </Link>
          <span>/</span>
          <Link href="/products-demo" className="hover:text-[#33391d]">
            Products Demo
          </Link>
          <span>/</span>
          <span className="text-neutral-800">{product.name}</span>
        </motion.nav>

        {/* Product Detail */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square overflow-hidden bg-white">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden bg-white"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="mb-2 text-sm uppercase tracking-wider text-neutral-500">
                {product.brand.name}
              </p>
              <h1 className="mb-4 font-serif text-4xl font-bold text-neutral-800">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#33391d]">
                  {product.price.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <p className="text-neutral-700">{product.description}</p>
            </div>

            {/* Specs */}
            <div className="space-y-3 border-t border-neutral-200 pt-6">
              <h3 className="font-semibold uppercase tracking-wider text-neutral-800">
                Thông tin sản phẩm
              </h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Loại:</span>
                  <span className="font-medium text-neutral-800">
                    {product.wine_type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Xuất xứ:</span>
                  <span className="font-medium text-neutral-800">
                    {product.country_of_production}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Giống nho:</span>
                  <span className="font-medium text-neutral-800">
                    {product.grape_variety}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Nồng độ:</span>
                  <span className="font-medium text-neutral-800">
                    {product.concentration}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Dung tích:</span>
                  <span className="font-medium text-neutral-800">
                    {product.capacity}ml
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Nhiệt độ lý tưởng:</span>
                  <span className="font-medium text-neutral-800">
                    {product.ideal_temperature}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 border-t border-neutral-200 pt-6">
              {product.inventory.available ? (
                <>
                  <button className="w-full border border-[#33391d] bg-[#33391d] py-4 text-sm uppercase tracking-wider text-amber-50 transition-all hover:bg-[#2a2f18]">
                    Thêm vào giỏ hàng
                  </button>
                  <button className="w-full border border-neutral-300 bg-white py-4 text-sm uppercase tracking-wider text-neutral-800 transition-all hover:bg-neutral-50">
                    Mua ngay
                  </button>
                </>
              ) : (
                <div className="rounded-sm bg-red-50 p-4 text-center text-red-600">
                  Sản phẩm tạm hết hàng
                </div>
              )}
            </div>

            {/* Storage Instructions */}
            <div className="space-y-3 border-t border-neutral-200 pt-6">
              <h3 className="font-semibold uppercase tracking-wider text-neutral-800">
                Hướng dẫn bảo quản
              </h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>• {product.avoid_light}</li>
                <li>• {product.place_the_bottle_horizontally}</li>
                <li>• {product.avoid_vibration}</li>
                <li>• {product.use_wine_cabinet}</li>
                <li>• {product.opened_wine}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
