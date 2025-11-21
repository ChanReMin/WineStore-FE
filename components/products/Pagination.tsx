"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6"
    >
      {/* Page Info */}
      <div className="text-[12px] text-neutral-600">
        <span className="text-[#7b5b2c] font-semibold">Page {currentPage}</span>
        <span className="mx-2 text-[#d4af37]">of</span>
        <span className="text-[#7b5b2c] font-semibold">{totalPages}</span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: currentPage === 1 ? 1 : 1.05, x: currentPage === 1 ? 0 : -2 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="group relative flex h-12 w-12 items-center justify-center border-2 border-neutral-300 bg-white text-neutral-600 transition-all hover:border-[#d4af37] hover:bg-gradient-to-br hover:from-[#3b4417] hover:to-[#2a2f18] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600 shadow-sm hover:shadow-md"
        >
          <ChevronLeft size={20} strokeWidth={2} />
          
          {/* Decorative corners on hover */}
          <div className="absolute -left-1 -top-1 h-2 w-2 border-l-2 border-t-2 border-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute -right-1 -bottom-1 h-2 w-2 border-r-2 border-b-2 border-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{
              scale: page === "..." || page === currentPage ? 1 : 1.08,
              y: page === "..." || page === currentPage ? 0 : -2,
            }}
            whileTap={{
              scale: page === "..." || page === currentPage ? 1 : 0.95,
            }}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`group relative flex h-12 min-w-[48px] items-center justify-center border-2 px-4 text-[14px] font-semibold transition-all shadow-sm ${
              page === currentPage
                ? "border-[#d4af37] bg-gradient-to-br from-[#3b4417] to-[#2a2f18] text-white shadow-lg shadow-[#3b4417]/30"
                : "border-neutral-300 bg-white text-neutral-600 hover:border-[#d4af37] hover:bg-gradient-to-br hover:from-[#fdfbf5] hover:to-white hover:text-[#3b4417] hover:shadow-md"
            } ${page === "..." ? "cursor-default hover:border-neutral-300 hover:bg-white hover:text-neutral-600 hover:shadow-sm" : ""}`}
          >
            {page}
            
            {/* Active page indicator */}
            {page === currentPage && (
              <motion.div
                layoutId="activePage"
                className="absolute inset-0 border-2 border-[#d4af37]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Decorative corners on hover for non-active pages */}
            {page !== currentPage && page !== "..." && (
              <>
                <div className="absolute -left-1 -top-1 h-2 w-2 border-l-2 border-t-2 border-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute -right-1 -bottom-1 h-2 w-2 border-r-2 border-b-2 border-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
              </>
            )}
          </motion.button>
        ))}

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: currentPage === totalPages ? 1 : 1.05, x: currentPage === totalPages ? 0 : 2 }}
          whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="group relative flex h-12 w-12 items-center justify-center border-2 border-neutral-300 bg-white text-neutral-600 transition-all hover:border-[#d4af37] hover:bg-gradient-to-br hover:from-[#3b4417] hover:to-[#2a2f18] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600 shadow-sm hover:shadow-md"
        >
          <ChevronRight size={20} strokeWidth={2} />
          
          {/* Decorative corners on hover */}
          <div className="absolute -left-1 -top-1 h-2 w-2 border-l-2 border-t-2 border-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute -right-1 -bottom-1 h-2 w-2 border-r-2 border-b-2 border-[#d4af37] opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.button>
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#7b5b2c]">•</span>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      </div>
    </motion.div>
  );
}
