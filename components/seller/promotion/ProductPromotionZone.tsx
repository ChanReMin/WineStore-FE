"use client";

import { useState, useMemo, useCallback } from "react";
import { DroppableProductItem } from "./DroppableProductItem";
import type { Promotion } from "@/types/promotion";
import { useTranslations } from "next-intl";
import { Search, Package, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  promotions: Promotion[];
}

interface ProductPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

interface ProductPromotionZoneProps {
  products: Product[];
  onRemovePromotion: (productId: number, promotionId: number) => void;
  productPagination?: ProductPagination;
}

export function ProductPromotionZone({
  products,
  onRemovePromotion,
  productPagination,
}: ProductPromotionZoneProps) {
  const t = useTranslations("seller.promotions.assignment.productZone");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "assigned" | "unassigned"
  >("all");

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterType === "all" ||
        (filterType === "assigned" && product.promotions.length > 0) ||
        (filterType === "unassigned" && product.promotions.length === 0);
      return matchesSearch && matchesFilter;
    });
  }, [products, searchQuery, filterType]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const setFilterAll = useCallback(() => setFilterType("all"), []);
  const setFilterAssigned = useCallback(() => setFilterType("assigned"), []);
  const setFilterUnassigned = useCallback(
    () => setFilterType("unassigned"),
    []
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-green-500 p-1.5 rounded-lg">
            <Package className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">{t("title")}</h2>
          <span className="ml-auto bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
            {filteredProducts.length}/{products.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={setFilterAll}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === "all"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t("filterAll")}
          </button>
          <button
            type="button"
            onClick={setFilterAssigned}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === "assigned"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t("filterAssigned")}
          </button>
          <button
            type="button"
            onClick={setFilterUnassigned}
            className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === "unassigned"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t("filterUnassigned")}
          </button>
        </div>
      </div>

      {/* Products List */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-2 scroll-smooth"
        data-scroll-container="products"
        style={{ scrollBehavior: "smooth" }}
      >
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Package className="w-12 h-12 mb-2" />
            <p className="text-sm">{t("noProducts")}</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <DroppableProductItem
              key={product.id}
              product={product}
              onRemovePromotion={onRemovePromotion}
            />
          ))
        )}
      </div>
      
      {/* Product Pagination */}
      {productPagination && productPagination.totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">
              Showing {products.length} of {productPagination.totalItems} products
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => productPagination.onPageChange(productPagination.currentPage - 1)}
                disabled={productPagination.currentPage === 1}
                className="h-7 px-2"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <span className="text-xs font-medium">
                {productPagination.currentPage} / {productPagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => productPagination.onPageChange(productPagination.currentPage + 1)}
                disabled={productPagination.currentPage === productPagination.totalPages}
                className="h-7 px-2"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
