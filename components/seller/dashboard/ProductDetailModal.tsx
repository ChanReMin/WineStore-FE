"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Tag,
  Wine,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import ProductStatusBadge from "./ProductStatusBadge";
import type { Product } from "@/types/product";

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

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl z-50"
          >
            <Card className="h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col border-[#d4d6b4] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e8e6dc] bg-[#f5f3e8]">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#3b4417] mb-2">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <ProductStatusBadge
                      status={product.status}
                      statusText={product.statusText}
                    />
                    <span className="text-sm text-[#7a8451]">
                      ID: #{product.id}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[#e8e6dc] transition-colors"
                >
                  <X className="w-6 h-6 text-[#3b4417]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Product Image */}
                {product.images && (
                  <div className="flex justify-center">
                    <img
                      src={product.images}
                      alt={product.name}
                      className="w-full max-w-md h-64 object-cover rounded-lg border-2 border-[#d4d6b4]"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                  </div>
                )}

                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    {/* ID */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">ID</p>
                      <p className="text-lg font-bold text-[#3b4417]">#{product.id}</p>
                    </div>

                    {/* Name */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Tên sản phẩm</p>
                      <p className="text-lg font-semibold text-[#3b4417]">{product.name}</p>
                    </div>

                    {/* Slug */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Slug</p>
                      <p className="text-sm text-[#3b4417] font-mono">{product.slug}</p>
                    </div>

                    {/* Price */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Giá bán</p>
                      <p className="text-xl font-bold text-[#3b4417]">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    {/* Profit Margin */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Lợi nhuận (%)</p>
                      <p className="text-lg font-semibold text-[#3b4417]">
                        {product.profitMargin}%
                      </p>
                    </div>

                    {/* Category */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Danh mục</p>
                      <p className="text-lg font-semibold text-[#3b4417]">
                        {product.category.name}
                      </p>
                      <p className="text-xs text-[#7a8451] mt-1">ID: {product.category.id}</p>
                    </div>

                    {/* Brand */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Thương hiệu</p>
                      <p className="text-lg font-semibold text-[#3b4417]">
                        {product.brand.name}
                      </p>
                      <p className="text-xs text-[#7a8451] mt-1">ID: {product.brand.id}</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    {/* Status */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-2">Trạng thái</p>
                      <ProductStatusBadge
                        status={product.status}
                        statusText={product.statusText}
                      />
                      <p className="text-xs text-[#7a8451] mt-2">Status Code: {product.status}</p>
                    </div>

                    {/* Inventory */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Tồn kho</p>
                      <p className="text-xl font-bold text-[#3b4417]">
                        {product.totalInventory}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          product.inStock 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                        </span>
                      </div>
                    </div>

                    {/* Sold Count */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Đã bán</p>
                      <p className="text-lg font-semibold text-[#3b4417]">
                        {product.soldCount} sản phẩm
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Đánh giá</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-[#d4af37]">
                          {product.ratingAverage.toFixed(1)}
                        </p>
                        <span className="text-sm text-[#7a8451]">
                          ({product.ratingCount} đánh giá)
                        </span>
                      </div>
                    </div>

                    {/* Created At */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Ngày tạo</p>
                      <p className="text-sm font-medium text-[#3b4417]">
                        {formatDate(product.createdAt)}
                      </p>
                    </div>

                    {/* Updated At */}
                    <div className="bg-[#f5f3e8] rounded-lg p-4">
                      <p className="text-xs text-[#7a8451] mb-1">Cập nhật lần cuối</p>
                      <p className="text-sm font-medium text-[#3b4417]">
                        {formatDate(product.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <div className="bg-[#f5f3e8] rounded-lg p-4">
                    <p className="text-xs text-[#7a8451] mb-2">Mô tả</p>
                    <p className="text-sm text-[#3b4417] whitespace-pre-wrap">
                      {product.description || 'Chưa có mô tả'}
                    </p>
                  </div>
                )}

                {/* Status Info */}
                {product.status === 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-900 mb-1">
                          Đang chờ duyệt
                        </p>
                        <p className="text-sm text-amber-700">
                          Sản phẩm đang chờ admin phê duyệt trước khi có thể bán
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {product.status === 1 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-emerald-900 mb-1">
                          Đã được phê duyệt
                        </p>
                        <p className="text-sm text-emerald-700">
                          Sản phẩm đã được admin phê duyệt và có thể bán
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {product.status === 2 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-900 mb-1">
                          Đã bị cấm
                        </p>
                        <p className="text-sm text-red-700">
                          Sản phẩm đã bị admin cấm và không thể bán
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium"
                >
                  {t("close")}
                </button>
                {onEdit && (
                  <button
                    onClick={() => {
                      onEdit(product);
                      onClose();
                    }}
                    className="px-6 py-2.5 bg-[#3b4417] text-white rounded-lg hover:bg-[#2a2f18] transition-colors font-medium"
                  >
                    {t("edit")}
                  </button>
                )}
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
