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
  perPage?: number;
  onPageChange: (page: number) => void;
}

interface ProductPromotionZoneProps {
  products: Product[];
  onRemovePromotion: (productId: number, promotionId: number) => void;
  productPagination?: ProductPagination;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function ProductPromotionZone({
  products,
  onRemovePromotion,
  productPagination,
  searchQuery = "",
  onSearchChange,
}: ProductPromotionZoneProps) {
  const t = useTranslations("seller.promotions.assignment.productZone");
  const [filterType, setFilterType] = useState<
    "all" | "assigned" | "unassigned"
  >("all");

  // Debug log
  console.log("ProductPromotionZone - productPagination:", productPagination);

  // Memoize filtered products (only filter by assignment status, search is handled by API)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesFilter =
        filterType === "all" ||
        (filterType === "assigned" && product.promotions.length > 0) ||
        (filterType === "unassigned" && product.promotions.length === 0);
      return matchesFilter;
    });
  }, [products, filterType]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onSearchChange) {
        onSearchChange(e.target.value);
      }
    },
    [onSearchChange]
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
      <div className="px-4 py-3 border-b-2 border-green-400 bg-linear-to-r from-green-50 to-emerald-50 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-green-500 p-1.5 rounded-lg">
            <Package className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">{t("title")}</h2>

          {/* Top Pagination Controls */}
          {productPagination && (
            <div className="ml-auto flex items-center gap-1 bg-white rounded-md border border-green-200 p-0.5 shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  productPagination.onPageChange(
                    productPagination.currentPage - 1
                  )
                }
                disabled={productPagination.currentPage === 1}
                className="h-6 w-6 hover:bg-green-50 text-green-700 disabled:opacity-30"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <span className="text-xs font-bold text-green-700 min-w-[3rem] text-center px-1">
                {productPagination.currentPage}/{productPagination.totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  productPagination.onPageChange(
                    productPagination.currentPage + 1
                  )
                }
                disabled={
                  productPagination.currentPage === productPagination.totalPages
                }
                className="h-6 w-6 hover:bg-green-50 text-green-700 disabled:opacity-30"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          )}
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
            <span className="ml-1 opacity-80 text-[10px]">
              (
              {productPagination
                ? productPagination.totalItems
                : products.length}
              )
            </span>
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

      {/* Product Pagination - Always show if productPagination exists */}
      {productPagination && (
        <div className="shrink-0 px-4 py-4 border-t-2 border-green-400 bg-linear-to-r from-green-50 to-emerald-50 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-800">
              {(() => {
                if (productPagination.totalItems === 0) {
                  return "Không có sản phẩm";
                }
                const perPage = productPagination.perPage || 10;
                const start = (productPagination.currentPage - 1) * perPage + 1;
                const end = Math.min(
                  productPagination.currentPage * perPage,
                  productPagination.totalItems
                );
                return `📦 Hiển thị ${start}-${end} / ${productPagination.totalItems} sản phẩm`;
              })()}
            </span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log("Previous page clicked");
                  productPagination.onPageChange(
                    productPagination.currentPage - 1
                  );
                }}
                disabled={productPagination.currentPage === 1}
                className="h-8 px-3 border-green-300 hover:bg-green-100 hover:border-green-400 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-bold text-green-700 bg-white px-3 py-1 rounded-md border-2 border-green-400 shadow-sm">
                {productPagination.currentPage} / {productPagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log("Next page clicked");
                  productPagination.onPageChange(
                    productPagination.currentPage + 1
                  );
                }}
                disabled={
                  productPagination.currentPage === productPagination.totalPages
                }
                className="h-8 px-3 border-green-300 hover:bg-green-100 hover:border-green-400 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
