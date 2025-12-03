"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Package, Warehouse, Plus, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/services/productService";

import type { Product as ProductType } from "@/types/product";

interface Warehouse {
  id: number;
  name: string;
}

interface AddProductToWarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  warehouses: Warehouse[];
  onSubmit: (data: {
    productId: number;
    warehouseId: number;
    quantity: number;
    note: string;
  }) => Promise<void>;
}

export default function AddProductToWarehouseModal({
  isOpen,
  onClose,
  warehouses,
  onSubmit,
}: AddProductToWarehouseModalProps) {
  const t = useTranslations("seller.inventory");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch products when modal opens
  useEffect(() => {
    if (isOpen) {
      loadProducts();
    }
  }, [isOpen]);

  const loadProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await fetchProducts({
        page: 1,
        limit: 100,
        status: 1, // Only active products
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId || !selectedWarehouseId || quantity <= 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        productId: selectedProductId,
        warehouseId: selectedWarehouseId,
        quantity,
        note,
      });
      handleClose();
    } catch (error) {
      console.error("Error adding product to warehouse:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedProductId(null);
    setSelectedWarehouseId(null);
    setQuantity(1);
    setNote("");
    setSearchQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#3b4417] to-[#2a2f18] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#d4af37]/20 rounded-lg">
                <Plus className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {t("addProductModal.title")}
                </h2>
                <p className="text-sm text-[#d4af37]/80">
                  {t("addProductModal.subtitle")}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-80px)]"
          >
            {/* Product Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[#3b4417]">
                <Package className="w-4 h-4 inline mr-2" />
                {t("addProductModal.selectProduct")}
              </label>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8451]" />
                <input
                  type="text"
                  placeholder={t("addProductModal.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]"
                />
              </div>

              {/* Product List */}
              <div className="border-2 border-[#d4d6b4] rounded-lg max-h-60 overflow-y-auto">
                {isLoadingProducts ? (
                  <div className="p-8 text-center text-[#7a8451]">
                    {t("addProductModal.loadingProducts")}
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-8 text-center text-[#7a8451]">
                    {t("addProductModal.noProducts")}
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setSelectedProductId(product.id)}
                      className={`w-full p-3 flex items-center gap-3 hover:bg-[#f5f3e8] transition-colors border-b border-[#e8e6dc] last:border-b-0 ${
                        selectedProductId === product.id
                          ? "bg-[#f5f3e8] border-l-4 border-l-[#d4af37]"
                          : ""
                      }`}
                    >
                      <img
                        src={
                          product.images ||
                          product.thumbnail ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 text-left">
                        <p className="font-medium text-[#3b4417]">
                          {product.name}
                        </p>
                        <p className="text-sm text-[#7a8451]">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </p>
                      </div>
                      {selectedProductId === product.id && (
                        <div className="w-5 h-5 bg-[#d4af37] rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Warehouse Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[#3b4417]">
                <Warehouse className="w-4 h-4 inline mr-2" />
                {t("addProductModal.selectWarehouse")}
              </label>
              <select
                value={selectedWarehouseId || ""}
                onChange={(e) => setSelectedWarehouseId(Number(e.target.value))}
                required
                className="w-full px-4 py-3 border-2 border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] appearance-none cursor-pointer"
              >
                <option value="">
                  {t("addProductModal.selectWarehousePlaceholder")}
                </option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[#3b4417]">
                {t("addProductModal.quantity")}
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                className="w-full px-4 py-3 border-2 border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]"
              />
            </div>

            {/* Note */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[#3b4417]">
                {t("addProductModal.note")}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder={t("addProductModal.notePlaceholder")}
                className="w-full px-4 py-3 border-2 border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-[#e8e6dc]">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="flex-1"
                disabled={isSubmitting}
              >
                {t("addProductModal.cancel")}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#3b4417] hover:bg-[#2a2f18] text-white"
                disabled={
                  !selectedProductId ||
                  !selectedWarehouseId ||
                  quantity <= 0 ||
                  isSubmitting
                }
              >
                {isSubmitting
                  ? t("addProductModal.submitting")
                  : t("addProductModal.submit")}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
