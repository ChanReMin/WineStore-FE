"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Tag,
  Wine,
  Star,
  TrendingUp,
  Box,
  Layers,
  Image as ImageIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import ProductStatusBadge from "./ProductStatusBadge";
import type { Product } from "@/types/product";
import { useState } from "react";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onEdit,
}: ProductDetailModalProps) {
  const t = useTranslations("seller.products.detail");
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
            className="fixed inset-2 sm:inset-4 md:inset-6 lg:inset-auto lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[95vw] lg:max-w-6xl z-50"
          >
            <Card className="h-full lg:h-auto lg:max-h-[90vh] overflow-hidden flex flex-col bg-white border-[#d4d6b4]/30 shadow-2xl rounded-lg md:rounded-xl">
              {/* Header - Minimalist & Modern */}
              <div className="relative flex items-center justify-between px-4 py-3 border-b border-[#e8e6dc]/50 bg-gradient-to-r from-[#fdfbf5] via-[#f5f3e8] to-[#fdfbf5]">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <div className="p-2 bg-[#3b4417]/10 rounded-lg">
                      <Wine className="w-5 h-5 text-[#3b4417]" />
                    </div>
                    <span className="text-xs font-medium text-[#7a8451] tracking-[0.2em] uppercase">
                      Product Details
                    </span>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-lg md:text-xl lg:text-2xl font-bold text-[#3b4417] mb-1 md:mb-2 tracking-tight line-clamp-2"
                  >
                    {product.name}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 flex-wrap"
                  >
                    <ProductStatusBadge
                      status={product.status}
                      statusText={product.statusText}
                    />
                    <span className="text-xs text-[#7a8451] font-mono bg-[#f5f3e8] px-3 py-1 rounded-full">
                      ID: #{product.id}
                    </span>
                  </motion.div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-3 rounded-full hover:bg-[#3b4417]/10 transition-colors group"
                >
                  <X className="w-6 h-6 text-[#3b4417] group-hover:text-[#2a2f18]" />
                </motion.button>
              </div>

              {/* Content - 2 Column Layout */}
              <div className="flex-1 overflow-y-auto modal-content scrollbar-thin scrollbar-thumb-[#d4d6b4] scrollbar-track-[#f5f3e8]">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Left Column - Image Gallery (2/5) */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-gradient-to-br from-[#fdfbf5] to-[#f5f3e8] p-4 flex flex-col items-center justify-start lg:border-r border-[#e8e6dc]/50"
                  >
                    <div className="w-full max-w-[300px] space-y-4">
                      {/* Main Image */}
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3b4417]/5 to-[#7a8451]/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-500" />
                        {product.images && !imageError ? (
                          <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            src={product.images}
                            alt={product.name}
                            className="relative w-full aspect-square object-contain bg-white rounded-2xl shadow-xl border-4 border-white"
                            onError={() => setImageError(true)}
                          />
                        ) : (
                          <div className="relative w-full aspect-square bg-gradient-to-br from-[#e8e6dc] to-[#d4d6b4] rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                            <div className="text-center">
                              <ImageIcon className="w-20 h-20 text-[#7a8451] mx-auto mb-3 opacity-40" />
                              <p className="text-sm text-[#7a8451] font-medium">
                                No Image
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column - Product Details (3/5) */}
                  <div className="lg:col-span-3 p-4 space-y-4">
                    {/* Price Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="bg-gradient-to-br from-[#3b4417] to-[#4c5b23] rounded-xl p-4 text-white shadow-xl"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-xs md:text-sm opacity-90 mb-1 md:mb-2 tracking-wide">
                            SELLING PRICE
                          </p>
                          <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xs opacity-90 mb-1 tracking-wide">
                            PROFIT MARGIN
                          </p>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            <p className="text-xl md:text-2xl font-bold">
                              {product.profitMargin}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Status Alert */}
                    {product.status === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-l-4 border-amber-500 rounded-xl p-5 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-amber-500 rounded-lg">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-amber-900 mb-1">
                              Đang chờ duyệt
                            </p>
                            <p className="text-sm text-amber-700">
                              Sản phẩm đang chờ admin phê duyệt trước khi có thể
                              bán
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {product.status === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-l-4 border-emerald-500 rounded-xl p-5 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-emerald-500 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-emerald-900 mb-1">
                              Đã được phê duyệt
                            </p>
                            <p className="text-sm text-emerald-700">
                              Sản phẩm đã được admin phê duyệt và có thể bán
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {product.status === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-r from-red-50 to-red-100/50 border-l-4 border-red-500 rounded-xl p-5 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-red-500 rounded-lg">
                            <XCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-red-900 mb-1">
                              Đã bị cấm
                            </p>
                            <p className="text-sm text-red-700">
                              Sản phẩm đã bị admin cấm và không thể bán
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Product Information Grid */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
                    >
                      {/* Category */}
                      <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-[#e8e6dc] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-[#f5f3e8] rounded-lg">
                            <Layers className="w-4 h-4 text-[#3b4417]" />
                          </div>
                          <p className="text-xs font-semibold text-[#7a8451] tracking-wider uppercase">
                            Category
                          </p>
                        </div>
                        <p className="text-lg font-bold text-[#3b4417] mb-1">
                          {product.category.name}
                        </p>
                        <p className="text-xs text-[#7a8451] font-mono">
                          ID: {product.category.id}
                        </p>
                      </div>

                      {/* Brand */}
                      <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 border border-[#e8e6dc] shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-[#f5f3e8] rounded-lg">
                            <Tag className="w-4 h-4 text-[#3b4417]" />
                          </div>
                          <p className="text-xs font-semibold text-[#7a8451] tracking-wider uppercase">
                            Brand
                          </p>
                        </div>
                        <p className="text-lg font-bold text-[#3b4417] mb-1">
                          {product.brand.name}
                        </p>
                        <p className="text-xs text-[#7a8451] font-mono">
                          ID: {product.brand.id}
                        </p>
                      </div>
                    </motion.div>

                    {/* Wine Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white rounded-xl p-6 border border-[#e8e6dc] shadow-sm"
                    >
                      <p className="text-xs font-semibold text-[#7a8451] tracking-wider uppercase mb-4">
                        Wine Details
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(product.countryOfProduction ||
                          product.originCountry) && (
                          <div>
                            <p className="text-xs text-[#7a8451] mb-1 font-medium">
                              Country of Production
                            </p>
                            <p className="text-sm text-[#3b4417] font-semibold">
                              {product.countryOfProduction ||
                                product.originCountry}
                            </p>
                          </div>
                        )}
                        {(product.winetype || product.wineType) && (
                          <div>
                            <p className="text-xs text-[#7a8451] mb-1 font-medium">
                              Wine Type
                            </p>
                            <p className="text-sm text-[#3b4417] font-semibold">
                              {product.winetype || product.wineType}
                            </p>
                          </div>
                        )}
                        {product.concentration !== null &&
                          product.concentration !== undefined && (
                            <div>
                              <p className="text-xs text-[#7a8451] mb-1 font-medium">
                                Concentration
                              </p>
                              <p className="text-sm text-[#3b4417] font-semibold">
                                {product.concentration}%
                              </p>
                            </div>
                          )}
                        {product.grapeVariety && (
                          <div>
                            <p className="text-xs text-[#7a8451] mb-1 font-medium">
                              Grape Variety
                            </p>
                            <p className="text-sm text-[#3b4417] font-semibold">
                              {product.grapeVariety}
                            </p>
                          </div>
                        )}
                        {product.productionArea && (
                          <div>
                            <p className="text-xs text-[#7a8451] mb-1 font-medium">
                              Production Area
                            </p>
                            <p className="text-sm text-[#3b4417] font-semibold">
                              {product.productionArea}
                            </p>
                          </div>
                        )}
                        {product.capacity && (
                          <div>
                            <p className="text-xs text-[#7a8451] mb-1 font-medium">
                              Capacity
                            </p>
                            <p className="text-sm text-[#3b4417] font-semibold">
                              {product.capacity}ml
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Storage Conditions */}
                    {(product.idealtemperature ||
                      product.humidity ||
                      product.avoidLight ||
                      product.placeTheBottleHorizontally ||
                      product.avoidVibration ||
                      product.openedWine ||
                      product.useWineCabinet) && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.42 }}
                        className="bg-white rounded-xl p-6 border border-[#e8e6dc] shadow-sm"
                      >
                        <p className="text-xs font-semibold text-[#7a8451] tracking-wider uppercase mb-4">
                          Storage Conditions
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {product.idealtemperature && (
                            <div>
                              <p className="text-xs text-[#7a8451] mb-1 font-medium">
                                Ideal Temperature
                              </p>
                              <p className="text-sm text-[#3b4417]">
                                {product.idealtemperature}
                              </p>
                            </div>
                          )}
                          {product.humidity && (
                            <div>
                              <p className="text-xs text-[#7a8451] mb-1 font-medium">
                                Humidity
                              </p>
                              <p className="text-sm text-[#3b4417]">
                                {product.humidity}
                              </p>
                            </div>
                          )}
                          {product.avoidLight && (
                            <div>
                              <p className="text-xs text-[#7a8451] mb-1 font-medium">
                                Avoid Light
                              </p>
                              <p className="text-sm text-[#3b4417]">
                                {product.avoidLight}
                              </p>
                            </div>
                          )}
                          {product.placeTheBottleHorizontally && (
                            <div>
                              <p className="text-xs text-[#7a8451] mb-1 font-medium">
                                Bottle Position
                              </p>
                              <p className="text-sm text-[#3b4417]">
                                {product.placeTheBottleHorizontally}
                              </p>
                            </div>
                          )}
                          {product.avoidVibration && (
                            <div>
                              <p className="text-xs text-[#7a8451] mb-1 font-medium">
                                Avoid Vibration
                              </p>
                              <p className="text-sm text-[#3b4417]">
                                {product.avoidVibration}
                              </p>
                            </div>
                          )}
                          {product.openedWine && (
                            <div>
                              <p className="text-xs text-[#7a8451] mb-1 font-medium">
                                After Opening
                              </p>
                              <p className="text-sm text-[#3b4417]">
                                {product.openedWine}
                              </p>
                            </div>
                          )}
                          {product.useWineCabinet && (
                            <div>
                              <p className="text-xs text-[#7a8451] mb-1 font-medium">
                                Wine Cabinet
                              </p>
                              <p className="text-sm text-[#3b4417]">
                                {product.useWineCabinet}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Description */}
                    {product.description && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.44 }}
                        className="bg-white rounded-xl p-6 border border-[#e8e6dc] shadow-sm"
                      >
                        <p className="text-xs font-semibold text-[#7a8451] tracking-wider uppercase mb-4">
                          Product Description
                        </p>
                        <p className="text-sm text-[#3b4417] leading-relaxed whitespace-pre-wrap">
                          {product.description || "Chưa có mô tả"}
                        </p>
                      </motion.div>
                    )}

                    {/* Metadata */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="bg-[#f5f3e8]/50 rounded-lg md:rounded-xl p-4 md:p-5 border border-[#e8e6dc]/50"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm">
                        <div>
                          <p className="text-xs text-[#7a8451] mb-1 font-medium">
                            Slug
                          </p>
                          <p className="text-[#3b4417] font-mono text-xs bg-white px-3 py-2 rounded-lg border border-[#e8e6dc]">
                            {product.slug}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#7a8451] mb-1 font-medium">
                            Product ID
                          </p>
                          <p className="text-[#3b4417] font-mono text-xs bg-white px-3 py-2 rounded-lg border border-[#e8e6dc]">
                            #{product.id}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#7a8451] mb-1 font-medium">
                            Created At
                          </p>
                          <p className="text-[#3b4417] text-xs">
                            {formatDate(product.createdAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#7a8451] mb-1 font-medium">
                            Last Updated
                          </p>
                          <p className="text-[#3b4417] text-xs">
                            {formatDate(product.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Footer - Modern Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 py-3 border-t border-[#e8e6dc]/50 bg-gradient-to-r from-[#fdfbf5] via-white to-[#fdfbf5]"
              >
                <div className="text-xs md:text-sm text-[#7a8451] text-center sm:text-left">
                  <span className="font-medium">Status:</span>{" "}
                  <span className="font-mono">{product.statusText}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-6 md:px-8 py-2.5 md:py-3 border-2 border-[#d4d6b4] text-[#3b4417] rounded-lg md:rounded-xl hover:bg-[#f5f3e8] transition-all font-semibold tracking-wide text-sm md:text-base"
                  >
                    {t("close")}
                  </motion.button>
                  {onEdit && (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        onEdit(product);
                        onClose();
                      }}
                      className="flex-1 sm:flex-none px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-[#3b4417] to-[#4c5b23] text-white rounded-lg md:rounded-xl hover:shadow-lg transition-all font-semibold tracking-wide text-sm md:text-base"
                    >
                      {t("edit")}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
