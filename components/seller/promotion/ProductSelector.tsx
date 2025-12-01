"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Package, Check } from "lucide-react";
import { fetchProducts } from "@/services/productService";
import type { Product } from "@/types/product";

interface ProductSelectorProps {
  selectedProductIds: number[];
  onChange: (productIds: number[]) => void;
}

export default function ProductSelector({
  selectedProductIds,
  onChange,
}: ProductSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products when component mounts or expands
  useEffect(() => {
    if (isExpanded && availableProducts.length === 0) {
      loadProducts();
    }
  }, [isExpanded]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      // Fetch products with status = 2 (active/selling)
      const response = await fetchProducts({ status: 2, limit: 100 });
      setAvailableProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setAvailableProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter products by search
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return availableProducts;
    const query = searchQuery.toLowerCase();
    return availableProducts.filter(
      (p: Product) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.name.toLowerCase().includes(query) ||
        p.category.name.toLowerCase().includes(query)
    );
  }, [searchQuery, availableProducts]);

  // Get selected products details
  const selectedProducts = availableProducts.filter((p: Product) =>
    selectedProductIds.includes(p.id)
  );

  const handleToggleProduct = (productId: number) => {
    if (selectedProductIds.includes(productId)) {
      onChange(selectedProductIds.filter((id) => id !== productId));
    } else {
      onChange([...selectedProductIds, productId]);
    }
  };

  const handleSelectAll = () => {
    onChange(filteredProducts.map((p: Product) => p.id));
  };

  const handleDeselectAll = () => {
    onChange([]);
  };

  const handleRemoveProduct = (productId: number) => {
    onChange(selectedProductIds.filter((id) => id !== productId));
  };

  return (
    <div className="space-y-3">
      {/* Selected Products Display */}
      {selectedProducts.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#3b4417]">
              Đã chọn {selectedProducts.length} sản phẩm
            </p>
            <button
              type="button"
              onClick={handleDeselectAll}
              className="text-xs text-[#7a8451] hover:text-red-600 transition-colors"
            >
              Xóa tất cả
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map((product: Product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#3b4417] text-white rounded-lg text-sm"
              >
                <Package className="h-3 w-3" />
                <span className="max-w-[200px] truncate">{product.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(product.id)}
                  className="ml-1 hover:bg-white/20 rounded p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 border-2 border-dashed border-[#d4d6b4] rounded-lg hover:border-[#3b4417] hover:bg-[#f5f3e8] transition-all"
      >
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-[#7a8451]" />
          <span className="text-sm font-medium text-[#3b4417]">
            {isExpanded ? "Đóng danh sách sản phẩm" : "Chọn sản phẩm áp dụng"}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <X
            className={`h-5 w-5 text-[#7a8451] ${isExpanded ? "" : "rotate-45"}`}
          />
        </motion.div>
      </button>

      {/* Product List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border border-[#d4d6b4] rounded-lg p-4 space-y-3 bg-[#fdfbf5]">
              {/* Search & Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7a8451]" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="px-3 py-2 text-xs font-medium text-[#3b4417] bg-white border border-[#d4d6b4] rounded-lg hover:bg-[#f5f3e8] transition-colors whitespace-nowrap"
                  >
                    Chọn tất cả
                  </button>
                  <button
                    type="button"
                    onClick={handleDeselectAll}
                    className="px-3 py-2 text-xs font-medium text-[#7a8451] bg-white border border-[#d4d6b4] rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors whitespace-nowrap"
                  >
                    Bỏ chọn
                  </button>
                </div>
              </div>

              {/* Product List */}
              <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b4417] mx-auto"></div>
                    <p className="text-sm text-[#7a8451] mt-2">Đang tải...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-8 text-[#7a8451]">
                    <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Không tìm thấy sản phẩm</p>
                  </div>
                ) : (
                  filteredProducts.map((product: Product) => {
                    const isSelected = selectedProductIds.includes(product.id);
                    return (
                      <motion.button
                        key={product.id}
                        type="button"
                        onClick={() => handleToggleProduct(product.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`
                          w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left
                          ${
                            isSelected
                              ? "border-[#3b4417] bg-[#3b4417]/5"
                              : "border-[#d4d6b4] bg-white hover:border-[#7a8451]"
                          }
                        `}
                      >
                        {/* Checkbox */}
                        <div
                          className={`
                          flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                          ${
                            isSelected
                              ? "bg-[#3b4417] border-[#3b4417]"
                              : "border-[#d4d6b4] bg-white"
                          }
                        `}
                        >
                          {isSelected && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-[#3b4417] truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[#7a8451]">
                              {product.brand.name}
                            </span>
                            <span className="text-xs text-[#7a8451]">•</span>
                            <span className="text-xs text-[#7a8451]">
                              {product.category.name}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex-shrink-0 text-right">
                          <p className="text-sm font-semibold text-[#d4af37]">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.price)}
                          </p>
                          <p className="text-xs text-[#7a8451]">
                            Kho: {product.totalInventory}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })
                )}
              </div>

              {/* Summary */}
              {filteredProducts.length > 0 && (
                <div className="pt-3 border-t border-[#d4d6b4] text-sm text-[#7a8451]">
                  Hiển thị {filteredProducts.length} sản phẩm •{" "}
                  {selectedProductIds.length} đã chọn
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
