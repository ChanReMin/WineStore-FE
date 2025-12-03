"use client";

import { Search, Filter, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

interface OrderFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  fromDate?: string;
  onFromDateChange?: (value: string) => void;
  toDate?: string;
  onToDateChange?: (value: string) => void;
}

export default function OrderFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
}: OrderFiltersProps) {
  const t = useTranslations("seller.orders");

  const orderStatusOptions = [
    {
      value: "all",
      labelKey: "filters.allOrders",
      color: "bg-[#f5f3e8] text-[#3b4417]",
    },
    {
      value: "1",
      labelKey: "status.pending",
      color: "bg-amber-50 text-amber-800",
    },
    {
      value: "2",
      labelKey: "status.confirmed",
      color: "bg-blue-50 text-blue-800",
    },
    {
      value: "3",
      labelKey: "status.paid",
      color: "bg-emerald-50 text-emerald-800",
    },
    {
      value: "6",
      labelKey: "status.cancelled",
      color: "bg-red-50 text-red-800",
    },
  ];

  return (
    <Card className="p-6 border-2 border-[#d4d6b4] bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="space-y-6">
        {/* Search and Date Range in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="lg:col-span-1">
            <label className="text-sm font-semibold text-[#3b4417] mb-2 block tracking-wide">
              {t("filters.search")}
            </label>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a8451] group-focus-within:text-[#3b4417] transition-colors" />
              <input
                type="text"
                placeholder={t("filters.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417]/20 focus:border-[#3b4417] transition-all text-[#3b4417] placeholder:text-[#7a8451]/50 bg-white hover:border-[#7a8451]"
              />
            </div>
          </div>

          {/* Date Range Filter */}
          {onFromDateChange && onToDateChange && (
            <>
              <div>
                <label className="text-sm font-semibold text-[#3b4417] mb-2 block flex items-center gap-2 tracking-wide">
                  <Calendar className="w-4 h-4 text-[#7a8451]" />
                  {t("filters.fromDate")}
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => onFromDateChange(e.target.value)}
                  className="w-full px-3 py-3 border-2 border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417]/20 focus:border-[#3b4417] transition-all text-[#3b4417] bg-white hover:border-[#7a8451]"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#3b4417] mb-2 block flex items-center gap-2 tracking-wide">
                  <Calendar className="w-4 h-4 text-[#7a8451]" />
                  {t("filters.toDate")}
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => onToDateChange(e.target.value)}
                  className="w-full px-3 py-3 border-2 border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417]/20 focus:border-[#3b4417] transition-all text-[#3b4417] bg-white hover:border-[#7a8451]"
                />
              </div>
            </>
          )}
        </div>

        {/* Order Status Filter */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#7a8451]" />
            <span className="text-sm font-semibold text-[#3b4417] tracking-wide">
              {t("filters.orderStatus")}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {orderStatusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onStatusChange(option.value)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 border-2 ${
                  statusFilter === option.value
                    ? "bg-[#3b4417] text-white border-[#3b4417] shadow-lg scale-105 ring-2 ring-[#3b4417]/20"
                    : `${option.color} border-[#d4d6b4] hover:border-[#3b4417] hover:scale-105 hover:shadow-md`
                }`}
              >
                {t(option.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
