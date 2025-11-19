"use client";

import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Quản lý đơn hàng
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Theo dõi và xử lý tất cả đơn hàng
        </p>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm transition-all focus:border-[#33391d] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50"
          >
            <Filter size={18} />
            Lọc
          </button>
        </div>

        <div className="mt-6">
          <p className="text-center text-sm text-neutral-500">
            Danh sách đơn hàng sẽ hiển thị ở đây
          </p>
        </div>
      </div>
    </div>
  );
}
