"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: ProductPaginationProps) {
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
    <Card className="p-4 border-[#d4d6b4] bg-white">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left: Items per page selector */}
        {onItemsPerPageChange && (
          <div className="flex items-center gap-3 bg-[#fdfbf5] px-4 py-2 rounded-lg border border-[#e8e6dc]">
            <span className="text-sm text-[#7a8451] whitespace-nowrap font-medium">
              Display:
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                onItemsPerPageChange(Number(e.target.value));
                onPageChange(1); // Reset to first page
              }}
              className="px-3 py-1.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white font-semibold text-sm cursor-pointer hover:border-[#3b4417]"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-sm text-[#7a8451] whitespace-nowrap">
              / trang
            </span>
          </div>
        )}

        {/* Center: Info */}
        <div className="text-sm text-[#7a8451] text-center">
          Display{" "}
          <span className="font-semibold text-[#3b4417]">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          -{" "}
          <span className="font-semibold text-[#3b4417]">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          of <span className="font-semibold text-[#3b4417]">{totalItems}</span>{" "}
          products
        </div>

        {/* Right: Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-[#d4d6b4] hover:bg-[#f5f3e8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#3b4417]" />
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`min-w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                page === currentPage
                  ? "bg-[#3b4417] text-white shadow-md"
                  : page === "..."
                    ? "cursor-default text-[#7a8451]"
                    : "border border-[#d4d6b4] text-[#3b4417] hover:bg-[#f5f3e8]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-[#d4d6b4] hover:bg-[#f5f3e8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#3b4417]" />
          </button>
        </div>
      </div>
    </Card>
  );
}
