"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MOCK_PRODUCT_DETAIL } from "@/lib/mockData";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { fetchProductDetail, fetchRelatedProducts } from "@/services/productService";
import type { Product } from "@/types/product";
import RelatedProducts from "@/components/products/RelatedProducts";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function ProductDetailPage() {
  const t = useTranslations("productDetail");
  const params = useParams();

  // Get ID and slug from URL params
  // URL: /shop/12/chateau-margaux-2015
  const productId = params.id as string; // "12"
  const productSlug = params.slug as string; // "chateau-margaux-2015"

  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "storage" 
  >("description");
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to get product image
  const getProductImage = (product: Product | null): string => {
    if (!product) return "/placeholder-wine.jpg";
    // API returns string, but mock might return array
    if (typeof product.images === "string") {
      return product.images || product.thumbnail || "/placeholder-wine.jpg";
    }
    return (product.images as any)[0] || product.thumbnail || "/placeholder-wine.jpg";
  };

  // Fetch product by ID from API
  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchProductDetail(Number(productId));
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Không thể tải thông tin sản phẩm");
        // Fallback to mock data
        setProduct(MOCK_PRODUCT_DETAIL as any);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // Fetch related products
  useEffect(() => {
    if (!productId || !product) return;

    const loadRelatedProducts = async () => {
      setIsLoadingRelated(true);
      try {
        const response = await fetchRelatedProducts(Number(productId));
        setRelatedProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setRelatedProducts([]);
      } finally {
        setIsLoadingRelated(false);
      }
    };

    loadRelatedProducts();
  }, [productId, product]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#3b4417] border-r-transparent"></div>
          <p className="mt-4 text-sm text-neutral-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Error or no product
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-neutral-600 mb-4">{error || "Không tìm thấy sản phẩm"}</p>
          <Link href="/shop" className="text-[#3b4417] underline">
            Quay lại cửa hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Elegant Breadcrumb */}
      <div className="border-b border-neutral-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500"
          >
            <Link href="/" className="transition-colors hover:text-[#8b7355]">
              {t("breadcrumb.home")}
            </Link>
            <span className="text-neutral-300">/</span>
            <Link
              href="/shop"
              className="transition-colors hover:text-[#8b7355]"
            >
              {t("breadcrumb.collection")}
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-800">{product.brand.name}</span>
          </motion.nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Luxury Product Layout */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Single Premium Image - Compact */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Single Image - Elegant & Compact */}
            <div className="group relative aspect-3/4 overflow-hidden bg-linear-to-br from-neutral-100 to-neutral-50 shadow-lg">
              <Image
                src={getProductImage(product)}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Subtle Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right: Luxury Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="space-y-10"
          >
            {/* Luxury Header */}
            <div className="space-y-6 border-b border-neutral-200/50 pb-8">
              {/* Brand Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm"
              >
                <div className="h-2 w-2 rounded-full bg-[#8b7355]" />
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-700">
                  {product.brand.name}
                </span>
                <span className="text-neutral-300">·</span>
                <span className="text-xs uppercase tracking-wider text-neutral-500">
                  {product.originCountry || product.countryOfProduction || "Unknown"}
                </span>
              </motion.div>

              {/* Product Name - Serif Elegance */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`${playfair.className} text-5xl font-light leading-[1.1] tracking-tight text-neutral-900 lg:text-6xl`}
              >
                {product.name}
              </motion.h1>

              {/* Vintage & Type */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 text-sm text-neutral-600"
              >
                <span className="font-medium">{product.wineType || product.winetype || "N/A"}</span>
                <span className="text-neutral-300">|</span>
                <span>{product.productionArea || "N/A"}</span>
                <span className="text-neutral-300">|</span>
                <span>{product.concentration ? `${product.concentration}% ABV` : "N/A"}</span>
              </motion.div>

              {/* Price - Premium Display with Original Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                {/* Original Price - Strikethrough */}
                {product.basePrice && product.price < product.basePrice && (
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-neutral-400 line-through">
                      {product.basePrice.toLocaleString("vi-VN")}₫
                    </span>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                      SAVE{" "}
                      {Math.round(
                        ((product.basePrice - product.price) /
                          product.basePrice) *
                          100
                      )}
                      %
                    </span>
                  </div>
                )}
                {/* Current Price */}
                <div className="flex items-end gap-4">
                  <span
                    className={`${playfair.className} text-6xl font-light text-[#8b7355]`}
                  >
                    {product.price.toLocaleString("vi-VN")}
                  </span>
                  <span className="mb-2 text-2xl text-neutral-400">₫</span>
                </div>
              </motion.div>

              {/* Availability Badge */}
              {(product.totalInventory ?? 0) > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="inline-flex items-center gap-2 text-sm text-emerald-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">{t("inStock")}</span>
                </motion.div>
              )}

              {/* Seller Information */}
              {product.seller && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  className="rounded-lg border border-neutral-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                        Người bán
                      </p>
                      <p className="text-base font-semibold text-neutral-900">
                        {product.seller.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-neutral-900">
                        {product.seller.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Elegant Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              {/* Tab Navigation */}
              <div className="flex gap-8 border-b border-neutral-200 overflow-x-auto">
                {[
                  { id: "description", label: t("tabs.description") },
                  { id: "specs", label: t("tabs.specs") },
                  { id: "storage", label: t("tabs.storage") },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative pb-4 text-sm font-medium uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "text-neutral-900"
                        : "text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b7355]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[200px]"
                >
                  {activeTab === "description" && (
                    <div className="prose prose-neutral max-w-none">
                      <p className="text-base leading-relaxed text-neutral-600">
                        {product.description || product.fullDescription || "Chưa có mô tả"}
                      </p>
                      
                      {/* Food Pairing */}
                      {product.foodPairing && product.foodPairing.length > 0 && (
                        <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
                          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Kết hợp món ăn
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.foodPairing.map((food, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm text-amber-800 border border-amber-300"
                              >
                                {food}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-neutral-50 p-4">
                          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-900">
                            {t("specs.grapeVariety")}
                          </h4>
                          <p className="text-neutral-600">
                            {product.grapeVariety || "N/A"}
                          </p>
                        </div>
                        <div className="rounded-lg bg-neutral-50 p-4">
                          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-900">
                            {t("specs.region")}
                          </h4>
                          <p className="text-neutral-600">
                            {product.productionArea || "N/A"},{" "}
                            {product.originCountry || product.countryOfProduction || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "specs" && (
                    <div className="grid gap-4">
                      {[
                        {
                          label: t("specs.wineType"),
                          value: product.wineType || product.winetype || "N/A",
                        },
                        {
                          label: t("specs.alcoholContent"),
                          value: product.concentration ? `${product.concentration}%` : "N/A",
                        },
                        {
                          label: t("specs.volume"),
                          value: product.volume || product.capacity ? `${product.volume || product.capacity}ml` : "N/A",
                        },
                        {
                          label: t("specs.servingTemp"),
                          value: product.servingTemperature || product.idealtemperature || product.temperature || "N/A",
                        },
                        {
                          label: t("specs.origin"),
                          value: `${product.productionArea || "N/A"}, ${product.originCountry || product.countryOfProduction || "N/A"}`,
                        },
                        {
                          label: t("specs.grapeVariety"),
                          value: product.grapeVariety || "N/A",
                        },
                        {
                          label: "SKU",
                          value: product.sku || "N/A",
                        },
                        {
                          label: "Profit Margin",
                          value: product.profitMargin ? `${product.profitMargin}%` : "N/A",
                        },
                      ].map((spec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center justify-between border-b border-neutral-100 pb-3"
                        >
                          <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">
                            {spec.label}
                          </span>
                          <span className="text-base font-medium text-neutral-900">
                            {spec.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "storage" && (
                    <div className="space-y-4">
                      {[
                        {
                          icon: (
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                          ),
                          title: t("storage.temperature"),
                          text: product.servingTemperature || product.idealtemperature || product.temperature || "N/A",
                        },
                        {
                          icon: (
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                              />
                            </svg>
                          ),
                          title: t("storage.humidity"),
                          text: product.humidity || "N/A",
                        },
                        {
                          icon: (
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                          ),
                          title: t("storage.light"),
                          text: product.light || product.avoidLight || "N/A",
                        },
                        {
                          icon: (
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                              />
                            </svg>
                          ),
                          title: t("storage.position"),
                          text: product.position || product.placeTheBottleHorizontally || "N/A",
                        },
                        {
                          icon: (
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                              />
                            </svg>
                          ),
                          title: t("storage.vibration"),
                          text: product.vibration || product.avoidVibration || "N/A",
                        },
                        {
                          icon: (
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          ),
                          title: t("storage.afterOpening"),
                          text: product.afterOpening || product.openedWine || "N/A",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex gap-4 rounded-lg bg-neutral-50 p-4"
                        >
                          <div className="shrink-0 text-[#8b7355]">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="mb-1 text-sm font-semibold text-neutral-900">
                              {item.title}
                            </h4>
                            <p className="text-sm text-neutral-600">
                              {item.text}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Luxury Quantity & Purchase Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="space-y-6 border-t border-neutral-200/50 pt-8"
            >
              {/* Premium Action Buttons */}
              {(product.totalInventory ?? 0) > 0 ? (
                <div className="space-y-4">
                  {/* Add to Cart with Quantity */}
                  <AddToCartButton
                    productId={product.id}
                    productName={product.name}
                    productSlug={product.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}
                    productImage={getProductImage(product)}
                    productPrice={product.price}
                    maxQuantity={product.totalInventory || 99}
                  />

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="border border-neutral-300 bg-white py-4 text-sm font-medium uppercase tracking-[0.15em] text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50"
                    >
                      {t("buyNow")}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-center justify-center gap-2 border border-neutral-300 bg-white py-4 text-sm font-medium uppercase tracking-[0.15em] text-neutral-700 transition-all hover:border-neutral-400 hover:text-rose-600"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {t("save")}
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="border border-rose-200 bg-rose-50 p-4 text-center text-sm font-medium text-rose-700">
                  {t("unavailable")}
                </div>
              )}

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-200/50 pt-6">
                {[
                  { icon: "✓", text: t("trust.authentic") },
                  { icon: "🚚", text: t("trust.freeShipping") },
                  { icon: "↺", text: t("trust.returns") },
                  { icon: "🔒", text: t("trust.securePayment") },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-neutral-600"
                  >
                    <span className="text-sm text-[#8b7355]">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        
      </div>

      {/* Related Products Section */}
      <RelatedProducts 
        products={relatedProducts} 
        isLoading={isLoadingRelated} 
      />

      {/* Elegant Divider */}
        <div className="my-20 border-t border-neutral-200/50" />

        {/* Back to Collection - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("backToCollection")}
          </Link>
        </motion.div>

        <div className="mt-20 border-t border-neutral-200/50" />
    </div>
  );
}
