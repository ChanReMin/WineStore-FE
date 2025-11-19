"use client";

import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Quản lý sản phẩm
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Quản lý tất cả sản phẩm của cửa hàng
          </p>
        </div>
        <Link
          href="/seller/products/new"
          className="flex items-center gap-2 rounded-lg bg-[#33391d] px-4 py-2 text-sm font-medium text-amber-50 transition-all hover:bg-[#2a2f18]"
        >
          <Plus size={18} />
          Thêm sản phẩm mới
        </Link>
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
              placeholder="Tìm kiếm sản phẩm..."
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
            Danh sách sản phẩm sẽ hiển thị ở đây
          </p>
        </div>
      </div>
    </div>
  );
}
