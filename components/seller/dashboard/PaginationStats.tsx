"use client";

import { motion } from "framer-motion";
import { FileText, Eye, Filter } from "lucide-react";

interface PaginationStatsProps {
  totalItems: number;
  filteredItems: number;
  currentPageItems: number;
  isFiltered: boolean;
}

export default function PaginationStats({
  totalItems,
  filteredItems,
  currentPageItems,
  isFiltered,
}: PaginationStatsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      {/* Total Items */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f3e8] rounded-lg border border-[#e8e6dc]"
      >
        <FileText className="w-4 h-4 text-[#3b4417]" />
        <span className="text-[#7a8451]">Tổng:</span>
        <span className="font-semibold text-[#3b4417]">{totalItems}</span>
      </motion.div>

      {/* Filtered Items (if filtered) */}
      {isFiltered && filteredItems !== totalItems && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200"
        >
          <Filter className="w-4 h-4 text-blue-600" />
          <span className="text-blue-700">Lọc:</span>
          <span className="font-semibold text-blue-900">{filteredItems}</span>
        </motion.div>
      )}

      {/* Current Page Items */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200"
      >
        <Eye className="w-4 h-4 text-emerald-600" />
        <span className="text-emerald-700">Hiển thị:</span>
        <span className="font-semibold text-emerald-900">
          {currentPageItems}
        </span>
      </motion.div>
    </div>
  );
}
