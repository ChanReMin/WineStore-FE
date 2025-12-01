"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { fetchCategories, type Category } from "@/services/categoryService";
import { fetchBrands, type Brand } from "@/services/brandService";
import RangeSlider from "@/components/products/RangeSlider";

// Mock data - sẽ thay thế bằng API sau
const mockWarehouses = [
  { id: 1, name: "Warehouse A" },
  { id: 2, name: "Warehouse B" },
  { id: 3, name: "Warehouse C" },
];

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  brandFilter: string;
  onBrandChange: (value: string) => void;
  warehouseFilter: string;
  onWarehouseChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  concentrationRange: [number, number];
  onConcentrationRangeChange: (value: [number, number]) => void;
  onClearFilters: () => void;
  summary: {
    total: number;
    pending: number;
    active: number;
    banned: number;
  };
}

export default function ProductFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  brandFilter,
  onBrandChange,
  warehouseFilter,
  onWarehouseChange,
  priceRange,
  onPriceRangeChange,
  concentrationRange,
  onConcentrationRangeChange,
  onClearFilters,
  summary,
}: ProductFiltersProps) {
  const t = useTranslations("seller.products");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoadingBrands, setIsLoadingBrands] = useState(false);

  // Fetch categories and brands from API
  useEffect(() => {
    const loadData = async () => {
      // Load categories
      setIsLoadingCategories(true);
      try {
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }

      // Load brands
      setIsLoadingBrands(true);
      try {
        const brandsResponse = await fetchBrands();
        setBrands(brandsResponse.data.brands);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrands([]);
      } finally {
        setIsLoadingBrands(false);
      }
    };

    loadData();
  }, []);

  const statusOptions = [
    { value: "all", labelKey: "filters.all", count: summary.total },
    { value: "0", labelKey: "summary.pending", count: summary.pending },
    { value: "1", labelKey: "filters.active", count: summary.active },
    { value: "2", labelKey: "summary.banned", count: summary.banned },
  ];

  const hasActiveFilters =
    categoryFilter !== "all" ||
    brandFilter !== "all" ||
    warehouseFilter !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < 10000 ||
    concentrationRange[0] > 0 ||
    concentrationRange[1] < 20;

  return (
    <Card className="overflow-hidden border-[#d4d6b4] bg-linear-to-br from-white to-[#fdfbf5] shadow-lg">
      {/* Header Section with Decorative Element */}
      <div className="relative bg-linear-to-r from-[#3b4417] to-[#2a2f18] px-6 py-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTIsMTc1LDU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative flex items-center gap-3">
          <div className="p-2 bg-[#d4af37]/20 rounded-lg backdrop-blur-sm">
            <Filter className="w-5 h-5 text-[#d4af37]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Product Filters</h3>
            <p className="text-[#d4af37]/80 text-xs">Refine your product search</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar - Enhanced Design */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#3b4417]">
            <Search className="w-4 h-4 text-[#d4af37]" />
            Search Products
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a8451] transition-colors group-focus-within:text-[#d4af37]" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-[#d4d6b4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all text-[#3b4417] placeholder:text-[#7a8451]/50 bg-white shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Status Filters - Pill Design */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#3b4417]">
            <Filter className="w-4 h-4 text-[#d4af37]" />
            Status Filter
          </label>
          <div className="flex gap-2 flex-wrap">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onStatusChange(option.value)}
                className={`group relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  statusFilter === option.value
                    ? "bg-linear-to-r from-[#3b4417] to-[#2a2f18] text-white shadow-lg shadow-[#3b4417]/30 scale-105"
                    : "bg-white text-[#3b4417] border-2 border-[#d4d6b4] hover:border-[#d4af37] hover:shadow-md hover:scale-105"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t(option.labelKey)}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    statusFilter === option.value
                      ? "bg-[#d4af37]/30 text-[#d4af37]"
                      : "bg-[#f5f3e8] text-[#7a8451]"
                  }`}>
                    {option.count}
                  </span>
                </span>
                {statusFilter === option.value && (
                  <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#d4af37]/20 to-transparent opacity-50"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Section */}
        <div className="space-y-4 pt-6 border-t-2 border-dashed border-[#d4d6b4]">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-[#3b4417] uppercase tracking-wide flex items-center gap-2">
              <div className="w-1 h-4 bg-linear-to-b from-[#d4af37] to-[#3b4417] rounded-full"></div>
              Advanced Filters
            </h4>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7a8451] hover:text-white hover:bg-[#d4af37] rounded-lg transition-all duration-300 border border-[#d4d6b4] hover:border-[#d4af37]"
              >
                <X className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#3b4417] uppercase tracking-wide">
                Category
              </label>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  disabled={isLoadingCategories}
                  className="w-full px-4 py-3 border-2 border-[#d4d6b4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all text-[#3b4417] bg-white disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer font-medium shadow-sm hover:shadow-md"
                >
                  <option value="all">
                    {isLoadingCategories ? "Loading..." : t("filters.allCategories")}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id.toString()}>
                      {cat.name} ({cat.productsCount})
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#7a8451]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#3b4417] uppercase tracking-wide">
                Brand
              </label>
              <div className="relative">
                <select
                  value={brandFilter}
                  onChange={(e) => onBrandChange(e.target.value)}
                  disabled={isLoadingBrands}
                  className="w-full px-4 py-3 border-2 border-[#d4d6b4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all text-[#3b4417] bg-white disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer font-medium shadow-sm hover:shadow-md"
                >
                  <option value="all">
                    {isLoadingBrands ? "Loading..." : t("filters.allBrands")}
                  </option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id.toString()}>
                      {brand.name} - {brand.country} ({brand.productsCount})
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#7a8451]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Warehouse Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#3b4417] uppercase tracking-wide">
                Warehouse
              </label>
              <div className="relative">
                <select
                  value={warehouseFilter}
                  onChange={(e) => onWarehouseChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#d4d6b4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all text-[#3b4417] bg-white appearance-none cursor-pointer font-medium shadow-sm hover:shadow-md"
                >
                  <option value="all">{t("filters.allWarehouses")}</option>
                  {mockWarehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id.toString()}>
                      {warehouse.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#7a8451]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3 lg:col-span-2">
              <label className="block text-xs font-semibold text-[#3b4417] uppercase tracking-wide">
                Price Range
              </label>
              <div className="bg-linear-to-br from-[#f5f3e8] to-white p-4 rounded-xl border border-[#d4d6b4]">
                <RangeSlider
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onChange={onPriceRangeChange}
                  formatValue={(val) => `$${val.toLocaleString()}`}
                />
              </div>
            </div>

            {/* Concentration Range */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#3b4417] uppercase tracking-wide">
                ABV / Alcohol
              </label>
              <div className="bg-linear-to-br from-[#f5f3e8] to-white p-4 rounded-xl border border-[#d4d6b4]">
                <RangeSlider
                  min={0}
                  max={20}
                  step={0.5}
                  value={concentrationRange}
                  onChange={onConcentrationRangeChange}
                  formatValue={(val) => `${val}%`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
