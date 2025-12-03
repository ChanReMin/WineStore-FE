"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ORDER_STATUS } from "@/types/order";

interface OrderFiltersProps {
  selectedStatus: number | null;
  onStatusChange: (status: number | null) => void;
}

export default function OrderFilters({
  selectedStatus,
  onStatusChange,
}: OrderFiltersProps) {
  const t = useTranslations("orders.filters");

  const statusOptions = [
    { value: null, label: t("all") },
    { value: ORDER_STATUS.PENDING, label: t("pending") },
    { value: ORDER_STATUS.CONFIRMED, label: t("confirmed") },
    { value: ORDER_STATUS.PAID, label: t("paid") },
    { value: ORDER_STATUS.CANCELLED, label: t("cancelled") },
  ];
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
