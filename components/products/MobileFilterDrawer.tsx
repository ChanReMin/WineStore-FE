"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { MOCK_BRANDS, MOCK_CATEGORIES } from "@/lib/mockData";

interface ProductFilters {
  q?: string;
  brand_id?: string;
  category_id?: string;
  price_min?: number;
  price_max?: number;
  concentration_min?: number;
  concentration_max?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
  onReset: () => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: MobileFilterDrawerProps) {
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
                Filters
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
                  Brand
                </label>
                <select
                  value={filters.brand_id || ""}
                  onChange={(e) => onFilterChange({ brand_id: e.target.value })}
                  className="w-full border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-800 transition-all focus:border-[#3b4417] focus:outline-none focus:ring-2 focus:ring-[#3b4417]/10"
                >
                  <option value="">All Brands</option>
                  {MOCK_BRANDS.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                  Category
                </label>
                <select
                  value={filters.category_id || ""}
                  onChange={(e) =>
                    onFilterChange({ category_id: e.target.value })
                  }
                  className="w-full border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-800 transition-all focus:border-[#3b4417] focus:outline-none focus:ring-2 focus:ring-[#3b4417]/10"
                >
                  <option value="">All Categories</option>
                  {MOCK_CATEGORIES.map((category) => (
                    <optgroup key={category.id} label={category.name}>
                      <option value={category.id}>{category.name}</option>
                      {category.children?.map((child) => (
                        <option key={child.id} value={child.id}>
                          &nbsp;&nbsp;{child.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.price_min || ""}
                    onChange={(e) =>
                      onFilterChange({
                        price_min: Number(e.target.value) || undefined,
                      })
                    }
                    className="w-full border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-800 transition-all focus:border-[#3b4417] focus:outline-none focus:ring-2 focus:ring-[#3b4417]/10"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.price_max || ""}
                    onChange={(e) =>
                      onFilterChange({
                        price_max: Number(e.target.value) || undefined,
                      })
                    }
                    className="w-full border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-800 transition-all focus:border-[#3b4417] focus:outline-none focus:ring-2 focus:ring-[#3b4417]/10"
                  />
                </div>
              </div>

              {/* Concentration Range */}
              <div className="space-y-3">
                <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                  ABV (Alcohol %)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Min"
                    value={filters.concentration_min || ""}
                    onChange={(e) =>
                      onFilterChange({
                        concentration_min: Number(e.target.value) || undefined,
                      })
                    }
                    className="w-full border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-800 transition-all focus:border-[#3b4417] focus:outline-none focus:ring-2 focus:ring-[#3b4417]/10"
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Max"
                    value={filters.concentration_max || ""}
                    onChange={(e) =>
                      onFilterChange({
                        concentration_max: Number(e.target.value) || undefined,
                      })
                    }
                    className="w-full border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-800 transition-all focus:border-[#3b4417] focus:outline-none focus:ring-2 focus:ring-[#3b4417]/10"
                  />
                </div>
              </div>

              <button
                onClick={onReset}
                className="w-full bg-[#3b4417] px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-white transition-all hover:bg-[#2a2f18]"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
