"use client";

import { Search, Filter, Warehouse } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface InventoryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  warehouseFilter: string;
  onWarehouseChange: (value: string) => void;
  warehouses: Array<{ id: number; name: string }>;
}

export default function InventoryFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  warehouseFilter,
  onWarehouseChange,
  warehouses,
}: InventoryFiltersProps) {
  const t = useTranslations("seller.inventory.filters");
  
  const statusOptions = [
    { value: "all", label: t("all") },
    { value: "in_stock", label: t("inStock") },
    { value: "low_stock", label: t("lowStock") },
    { value: "out_of_stock", label: t("outOfStock") },
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

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-[#7a8451]" />
              <span className="text-sm font-medium text-[#3b4417]">
                {t("inventoryStatus")}
              </span>
            </div>
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
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Warehouse Filter */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Warehouse className="w-4 h-4 text-[#7a8451]" />
              <span className="text-sm font-medium text-[#3b4417]">{t("warehouse")}</span>
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
                  onClick={() => onWarehouseChange(warehouse.id.toString())}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    warehouseFilter === warehouse.id.toString()
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
