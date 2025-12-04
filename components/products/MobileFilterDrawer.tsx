"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import RangeSlider from "./RangeSlider";
import type { Brand } from "@/services/brandService";
import type { Category } from "@/services/categoryService";

interface ProductFilters {
  q?: string;
  brandId?: string;
  categoryId?: string;
  priceMin?: number;
  priceMax?: number;
  concentrationMin?: number;
  concentrationMax?: number;
  sortby?: string;
  sortorder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>, apply?: boolean) => void;
  onReset: () => void;
  brands?: Brand[];
  categories?: Category[];
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  brands = [],
  categories = [],
}: MobileFilterDrawerProps) {
  const t = useTranslations("shop.filters");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto bg-[#fdfbf5] p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-8 flex items-center justify-between border-b border-neutral-200 pb-6">
              <h2 className="text-[18px] font-semibold uppercase tracking-[0.3em] text-[#3b4417]">
                {t("title")}
              </h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center text-neutral-600 transition-colors hover:text-[#3b4417]"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Filters */}
            <div className="space-y-6">
              {/* Brand Filter */}
              <div className="space-y-3">
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                  {t("brand")}
                </label>
                <select
                  value={filters.brandId || ""}
                  onChange={(e) => onFilterChange({ brandId: e.target.value })}
                  className="w-full border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-800 transition-all focus:border-[#3b4417] focus:outline-none focus:ring-2 focus:ring-[#3b4417]/10"
                >
                  <option value="">{t("allBrands")}</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                  {t("category")}
                </label>
                <select
                  value={filters.categoryId || ""}
                  onChange={(e) =>
                    onFilterChange({ categoryId: e.target.value })
                  }
                  className="w-full border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-800 transition-all focus:border-[#3b4417] focus:outline-none focus:ring-2 focus:ring-[#3b4417]/10"
                >
                  <option value="">{t("allCategories")}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                  {t("priceRange")}
                </label>
                <RangeSlider
                  min={0}
                  max={2000000}
                  step={100}
                  value={[filters.priceMin || 0, filters.priceMax || 2000000]}
                  onChange={([min, max]) => {
                    onFilterChange(
                      {
                        priceMin: min > 0 ? min : undefined,
                        priceMax: max < 2000000 ? max : undefined,
                      },
                      true
                    );
                  }}
                  unit=""
                  formatValue={(val) => `$${val.toLocaleString()}`}
                />
              </div>

              {/* Concentration Range */}
              <div className="space-y-3">
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                  {t("abv")}
                </label>
                <RangeSlider
                  min={0}
                  max={20}
                  step={0.5}
                  value={[
                    filters.concentrationMin || 0,
                    filters.concentrationMax || 100,
                  ]}
                  onChange={([min, max]) => {
                    onFilterChange(
                      {
                        concentrationMin: min > 0 ? min : undefined,
                        concentrationMax: max < 20 ? max : undefined,
                      },
                      true
                    );
                  }}
                  unit="%"
                />
              </div>

              <button
                onClick={onReset}
                className="w-full bg-[#3b4417] px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-white transition-all hover:bg-[#2a2f18]"
              >
                {t("reset")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
