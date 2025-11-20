"use client";

import { Search, Filter, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface OrderFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  paymentFilter: string;
  onPaymentChange: (value: string) => void;
}

export default function OrderFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  paymentFilter,
  onPaymentChange,
}: OrderFiltersProps) {
  const orderStatusOptions = [
    { value: "all", label: "Tất cả đơn" },
    { value: "1", label: "Chờ xác nhận" },
    { value: "2", label: "Đang xử lý" },
    { value: "3", label: "Đang giao" },
    { value: "4", label: "Hoàn thành" },
    { value: "5", label: "Đã hủy" },
  ];

  const paymentStatusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "1", label: "Chờ thanh toán" },
    { value: "2", label: "Đã thanh toán" },
    { value: "3", label: "Hoàn thành" },
    { value: "4", label: "Đã hoàn tiền" },
  ];

  return (
    <Card className="p-4 md:p-6 border-[#d4d6b4] bg-white">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a8451]" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn, tên khách hàng, email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] placeholder:text-[#7a8451]/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Order Status Filter */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-[#7a8451]" />
              <span className="text-sm font-medium text-[#3b4417]">
                Trạng thái đơn hàng
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {orderStatusOptions.map((option) => (
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

          {/* Payment Status Filter */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-[#7a8451]" />
              <span className="text-sm font-medium text-[#3b4417]">
                Thanh toán
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {paymentStatusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onPaymentChange(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    paymentFilter === option.value
                      ? "bg-[#3b4417] text-white shadow-md"
                      : "bg-[#f5f3e8] text-[#3b4417] hover:bg-[#e8e6dc]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
