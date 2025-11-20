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
      className="flex items-center justify-center gap-2"
    >
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-12 w-12 items-center justify-center border border-neutral-300 bg-white text-neutral-600 transition-all hover:border-[#3b4417] hover:bg-[#3b4417] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </motion.button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <motion.button
          key={index}
          whileHover={{
            scale: page === "..." || page === currentPage ? 1 : 1.05,
          }}
          whileTap={{
            scale: page === "..." || page === currentPage ? 1 : 0.95,
          }}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`flex h-12 min-w-[48px] items-center justify-center border px-4 text-[14px] font-medium transition-all ${
            page === currentPage
              ? "border-[#3b4417] bg-[#3b4417] text-white"
              : "border-neutral-300 bg-white text-neutral-600 hover:border-[#3b4417] hover:bg-[#3b4417] hover:text-white"
          } ${page === "..." ? "cursor-default hover:border-neutral-300 hover:bg-white hover:text-neutral-600" : ""}`}
        >
          {page}
        </motion.button>
      ))}

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-12 w-12 items-center justify-center border border-neutral-300 bg-white text-neutral-600 transition-all hover:border-[#3b4417] hover:bg-[#3b4417] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </motion.button>
    </motion.div>
  );
}
