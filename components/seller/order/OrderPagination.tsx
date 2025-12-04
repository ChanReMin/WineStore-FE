"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface OrderPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export default function OrderPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: OrderPaginationProps) {
  const itemsPerPageOptions = [10, 20, 50, 100];

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-5 border-2 border-[#d4d6b4] bg-linear-to-r from-white via-[#fdfbf5] to-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left: Items per page selector */}
          {onItemsPerPageChange && (
            <div className="flex items-center gap-3 bg-linear-to-br from-[#f5f3e8] to-[#fdfbf5] px-5 py-3 rounded-lg border-2 border-[#d4d6b4] shadow-sm">
              <span className="text-sm text-[#7a8451] whitespace-nowrap font-semibold tracking-wide">
                Hiển thị:
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  onItemsPerPageChange(Number(e.target.value));
                  onPageChange(1); // Reset to first page
                }}
                className="px-4 py-2 border-2 border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417]/20 focus:border-[#3b4417] transition-all text-[#3b4417] bg-white font-bold text-sm cursor-pointer hover:border-[#3b4417] hover:shadow-md"
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="text-sm text-[#7a8451] whitespace-nowrap font-medium">
                / trang
              </span>
            </div>
          )}

          {/* Center: Info */}
          <div className="text-sm text-[#7a8451] text-center tracking-wide">
            Hiển thị{" "}
            <span className="font-bold text-[#3b4417] text-base">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            -{" "}
            <span className="font-bold text-[#3b4417] text-base">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            trong tổng số{" "}
            <span className="font-bold text-[#3b4417] text-base">
              {totalItems}
            </span>{" "}
            đơn hàng
          </div>

          {/* Right: Pagination */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2.5 rounded-lg border-2 border-[#d4d6b4] hover:bg-linear-to-br hover:from-[#3b4417] hover:to-[#5a6b2a] hover:border-[#3b4417] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 group hover:shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-[#3b4417] group-hover:text-white transition-colors" />
            </button>

            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={page === "..."}
                className={`min-w-11 h-11 rounded-lg font-bold text-sm transition-all duration-300 ${
                  page === currentPage
                    ? "bg-linear-to-br from-[#3b4417] to-[#5a6b2a] text-white shadow-lg scale-110 ring-2 ring-[#3b4417]/20"
                    : page === "..."
                      ? "cursor-default text-[#7a8451] font-normal"
                      : "border-2 border-[#d4d6b4] text-[#3b4417] hover:bg-linear-to-br hover:from-[#f5f3e8] hover:to-[#e8e6dc] hover:border-[#3b4417] hover:scale-105 hover:shadow-md"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-lg border-2 border-[#d4d6b4] hover:bg-linear-to-br hover:from-[#3b4417] hover:to-[#5a6b2a] hover:border-[#3b4417] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 group hover:shadow-md"
            >
              <ChevronRight className="w-5 h-5 text-[#3b4417] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
