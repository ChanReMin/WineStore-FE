"use client";

import { Search, Filter, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { DateRange } from "react-day-picker";
import DateRangePicker from "./DateRangePicker";

interface InventoryLogsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  warehouseFilter: string;
  onWarehouseChange: (value: string) => void;
  warehouses: Array<{ id: number; name: string }>;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export default function InventoryLogsFilters({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeChange,
  warehouseFilter,
  onWarehouseChange,
  warehouses,
  dateRange,
  onDateRangeChange,
}: InventoryLogsFiltersProps) {
  const t = useTranslations("seller.inventory.logs.filters");

  const typeOptions = [
    { value: "all", label: t("all") },
    { value: "IN", label: t("in") },
    { value: "OUT", label: t("out") },
    { value: "ADJUST", label: t("adjust") },
    { value: "RETURN", label: t("return") },
  ];

  return (
    <Card className="p-4 md:p-6 border-[#d4d6b4] bg-white">
      <div className="space-y-4">
        {/* Search */}
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

        {/* Date Range Filter */}
        {onDateRangeChange && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#7a8451]" />
              <span className="text-sm font-medium text-[#3b4417]">
                {t("dateRange")}
              </span>
            </div>
            <DateRangePicker value={dateRange} onChange={onDateRangeChange} />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Type Filter */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-[#7a8451]" />
              <span className="text-sm font-medium text-[#3b4417]">
                {t("transactionType")}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onTypeChange(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    typeFilter === option.value
                      ? "bg-[#3b4417] text-white shadow-md"
                      : "bg-[#f5f3e8] text-[#3b4417] hover:bg-[#e8e6dc]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Warehouse Filter */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#7a8451]" />
              <span className="text-sm font-medium text-[#3b4417]">
                {t("warehouse")}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => onWarehouseChange("all")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  warehouseFilter === "all"
                    ? "bg-[#3b4417] text-white shadow-md"
                    : "bg-[#f5f3e8] text-[#3b4417] hover:bg-[#e8e6dc]"
                }`}
              >
                {t("all")}
              </button>
              {warehouses.map((warehouse) => (
                <button
                  key={warehouse.id}
                  onClick={() => onWarehouseChange(warehouse.name)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    warehouseFilter === warehouse.name
                      ? "bg-[#3b4417] text-white shadow-md"
                      : "bg-[#f5f3e8] text-[#3b4417] hover:bg-[#e8e6dc]"
                  }`}
                >
                  {warehouse.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
