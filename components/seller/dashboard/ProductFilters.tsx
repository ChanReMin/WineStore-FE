"use client";

import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { fetchCategories, type Category } from "@/services/categoryService";
import { fetchBrands, type Brand } from "@/services/brandService";

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
  priceFrom: string;
  onPriceFromChange: (value: string) => void;
  priceTo: string;
  onPriceToChange: (value: string) => void;
  concentrationFrom: string;
  onConcentrationFromChange: (value: string) => void;
  concentrationTo: string;
  onConcentrationToChange: (value: string) => void;
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
  priceFrom,
  onPriceFromChange,
  priceTo,
  onPriceToChange,
  concentrationFrom,
  onConcentrationFromChange,
  concentrationTo,
  onConcentrationToChange,
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
    priceFrom !== "" ||
    priceTo !== "" ||
    concentrationFrom !== "" ||
    concentrationTo !== "";

  return (
    <Card className="p-4 md:p-6 border-[#d4d6b4] bg-white">
      <div className="space-y-4">
        {/* Search & Status Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a8451]" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] placeholder:text-[#7a8451]/50"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#7a8451] hidden lg:block" />
            <div className="flex gap-2 flex-wrap">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onStatusChange(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    statusFilter === option.value
                      ? "bg-[#3b4417] text-white shadow-md"
                      : "bg-[#f5f3e8] text-[#3b4417] hover:bg-[#e8e6dc]"
                  }`}
                >
                  {t(option.labelKey)}
                  <span className="ml-2 opacity-75">({option.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[#d4d6b4]">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-[#3b4417] mb-2">
              {t("filters.category")}
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              disabled={isLoadingCategories}
              className="w-full px-3 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-[#3b4417] mb-2">
              {t("filters.brand")}
            </label>
            <select
              value={brandFilter}
              onChange={(e) => onBrandChange(e.target.value)}
              disabled={isLoadingBrands}
              className="w-full px-3 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>

          {/* Warehouse Filter */}
          <div>
            <label className="block text-sm font-medium text-[#3b4417] mb-2">
              {t("filters.warehouse")}
            </label>
            <select
              value={warehouseFilter}
              onChange={(e) => onWarehouseChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white"
            >
              <option value="all">{t("filters.allWarehouses")}</option>
              {mockWarehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id.toString()}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-[#3b4417] mb-2">
              {t("filters.price")}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={t("filters.from")}
                value={priceFrom}
                onChange={(e) => onPriceFromChange(e.target.value)}
                className="w-full px-3 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] placeholder:text-[#7a8451]/50"
              />
              <input
                type="number"
                placeholder={t("filters.to")}
                value={priceTo}
                onChange={(e) => onPriceToChange(e.target.value)}
                className="w-full px-3 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] placeholder:text-[#7a8451]/50"
              />
            </div>
          </div>

          {/* Concentration Range */}
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-[#3b4417] mb-2">
              {t("filters.concentration")}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={t("filters.from")}
                value={concentrationFrom}
                onChange={(e) => onConcentrationFromChange(e.target.value)}
                step="0.1"
                min="0"
                max="100"
                className="w-full px-3 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] placeholder:text-[#7a8451]/50"
              />
              <input
                type="number"
                placeholder={t("filters.to")}
                value={concentrationTo}
                onChange={(e) => onConcentrationToChange(e.target.value)}
                step="0.1"
                min="0"
                max="100"
                className="w-full px-3 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] placeholder:text-[#7a8451]/50"
              />
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex justify-end pt-2">
            <button
              onClick={onClearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#7a8451] hover:text-[#3b4417] hover:bg-[#f5f3e8] rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
              {t("filters.clearFilters")}
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
