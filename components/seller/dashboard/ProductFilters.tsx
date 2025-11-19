"use client";

import { Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
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
  summary,
}: ProductFiltersProps) {
  const statusOptions = [
    { value: "all", label: "Tất cả", count: summary.total },
    { value: "1", label: "Chờ duyệt", count: summary.pending },
    { value: "2", label: "Đang bán", count: summary.active },
    { value: "3", label: "Bị cấm", count: summary.banned },
  ];

  return (
    <Card className="p-4 md:p-6 border-[#d4d6b4] bg-white">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a8451]" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
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
                {option.label}
                <span className="ml-2 opacity-75">({option.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
