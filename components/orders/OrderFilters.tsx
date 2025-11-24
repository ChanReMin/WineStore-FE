"use client";

import { motion } from "framer-motion";
import { ORDER_STATUS } from "@/types/order";

interface OrderFiltersProps {
  selectedStatus: number | null;
  onStatusChange: (status: number | null) => void;
}

const statusOptions = [
  { value: null, label: "Tất cả" },
  { value: ORDER_STATUS.PENDING, label: "Chờ xác nhận" },
  { value: ORDER_STATUS.PROCESSING, label: "Đang xử lý" },
  { value: ORDER_STATUS.SHIPPING, label: "Đang giao" },
  { value: ORDER_STATUS.DELIVERED, label: "Đã giao" },
  { value: ORDER_STATUS.CANCELLED, label: "Đã hủy" },
];

export default function OrderFilters({ selectedStatus, onStatusChange }: OrderFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2"
    >
      {statusOptions.map((option, index) => (
        <motion.button
          key={option.value ?? "all"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onStatusChange(option.value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            selectedStatus === option.value
              ? "bg-[#33391d] text-white shadow-md"
              : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
          }`}
        >
          {option.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
