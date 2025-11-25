"use client";

import { Search, Filter, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

// Mock data - sẽ thay thế bằng API sau
const mockCategories = [
  { id: 1, name: "Red Wine" },
  { id: 2, name: "White Wine" },
  { id: 3, name: "Rosé Wine" },
  { id: 4, name: "Champagne" },
  { id: 5, name: "Sweet Wine" },
];

const mockBrands = [
  { id: 1, name: "Château Margaux" },
  { id: 2, name: "Penfolds" },
  { id: 3, name: "Opus One" },
  { id: 4, name: "Dom Pérignon" },
  { id: 5, name: "Screaming Eagle" },
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
  
  const statusOptions = [
    { value: "all", labelKey: "filters.all", count: summary.total },
    { value: "1", labelKey: "summary.pending", count: summary.pending },
    { value: "2", labelKey: "filters.onSale", count: summary.active },
    { value: "3", labelKey: "summary.banned", count: summary.banned },
  ];

  const hasActiveFilters =
    categoryFilter !== "all" ||
    brandFilter !== "all" ||
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#d4d6b4]">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-[#3b4417] mb-2">
              {t("filters.category")}
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white"
            >
              <option value="all">{t("filters.allCategories")}</option>
              {mockCategories.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.name}
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
              className="w-full px-3 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white"
            >
              <option value="all">{t("filters.allBrands")}</option>
              {mockBrands.map((brand) => (
                <option key={brand.id} value={brand.id.toString()}>
                  {brand.name}
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
          <div>
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
