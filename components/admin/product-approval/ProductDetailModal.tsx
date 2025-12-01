"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  CheckCircle,
  XCircle,
  Package,
  Tag,
  BarChart3,
  Star,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import type { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: ProductDetailModalProps) {
  const t = useTranslations("admin.productApproval.detail");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="bg-linear-to-r from-[#3b4417] to-[#5d6c2e] p-6 text-white flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
                  <p className="text-amber-100 text-sm">{product.slug}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-[#fdfbf5]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="aspect-square relative bg-neutral-100">
                          <img
                            src={product.images}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    {/* Product ID & Status */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border-neutral-200">
                        <CardContent className="p-4">
                          <p className="text-xs text-neutral-600 uppercase mb-1">ID</p>
                          <p className="text-2xl font-bold text-neutral-900">#{product.id}</p>
                        </CardContent>
                      </Card>
                      <Card className={`border-2 ${
                        product.status === 0 ? 'border-amber-300 bg-amber-50' :
                        product.status === 1 ? 'border-emerald-300 bg-emerald-50' :
                        'border-red-300 bg-red-50'
                      }`}>
                        <CardContent className="p-4">
                          <p className="text-xs text-neutral-600 uppercase mb-1">Trạng thái</p>
                          <p className={`text-lg font-bold ${
                            product.status === 0 ? 'text-amber-700' :
                            product.status === 1 ? 'text-emerald-700' :
                            'text-red-700'
                          }`}>
                            {product.statusText}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Category & Brand */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border-purple-200 bg-purple-50">
                        <CardContent className="p-4">
                          <p className="text-xs text-purple-700 uppercase mb-1">Danh mục</p>
                          <p className="text-lg font-bold text-purple-900">{product.category.name}</p>
                          <p className="text-xs text-purple-600 mt-1">ID: {product.category.id}</p>
                        </CardContent>
                      </Card>
                      <Card className="border-indigo-200 bg-indigo-50">
                        <CardContent className="p-4">
                          <p className="text-xs text-indigo-700 uppercase mb-1">Thương hiệu</p>
                          <p className="text-lg font-bold text-indigo-900">{product.brand.name}</p>
                          <p className="text-xs text-indigo-600 mt-1">ID: {product.brand.id}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Price */}
                    <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Tag className="w-5 h-5 text-emerald-600" />
                          <h3 className="font-bold text-emerald-900">Giá bán</h3>
                        </div>
                        <p className="text-3xl font-bold text-emerald-600">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Package className="w-4 h-4 text-blue-600" />
                            <p className="text-xs text-neutral-600 uppercase">Tồn kho</p>
                          </div>
                          <p className="text-2xl font-bold text-neutral-900">
                            {product.totalInventory}
                          </p>
                          <p className={`text-xs mt-1 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock ? '✓ Còn hàng' : '✗ Hết hàng'}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <ShoppingCart className="w-4 h-4 text-purple-600" />
                            <p className="text-xs text-neutral-600 uppercase">Đã bán</p>
                          </div>
                          <p className="text-2xl font-bold text-neutral-900">
                            {product.soldCount}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-amber-600" />
                            <p className="text-xs text-neutral-600 uppercase">Đánh giá</p>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-amber-900">
                              {product.ratingAverage.toFixed(1)}
                            </p>
                            <p className="text-xs text-neutral-600">
                              ({product.ratingCount} đánh giá)
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-4 h-4 text-indigo-600" />
                            <p className="text-xs text-neutral-600 uppercase">Lợi nhuận</p>
                          </div>
                          <p className="text-2xl font-bold text-neutral-900">
                            {product.profitMargin}%
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {product.description && (
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-neutral-900 mb-3">
                            {t("description")}
                          </h3>
                          <p className="text-neutral-700 leading-relaxed">
                            {product.description}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <h3 className="font-bold text-blue-900">
                            {t("timeline")}
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-blue-700 uppercase mb-1">
                              {t("createdAt")}
                            </p>
                            <p className="text-sm font-semibold text-blue-900">
                              {product.createdAt ? new Date(product.createdAt).toLocaleString("vi-VN") : '-'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-blue-700 uppercase mb-1">
                              {t("updatedAt")}
                            </p>
                            <p className="text-sm font-semibold text-blue-900">
                              {product.updatedAt ? new Date(product.updatedAt).toLocaleString("vi-VN") : '-'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-t border-neutral-200 bg-white p-4">
                <div className="flex items-center justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all font-semibold"
                  >
                    {t("close")}
                  </motion.button>

                  {product.status === 0 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onReject}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 font-semibold flex items-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        {t("ban")}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onApprove}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 font-semibold flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        {t("approve")}
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
