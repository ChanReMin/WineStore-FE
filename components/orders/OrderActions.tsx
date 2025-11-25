"use client";

import { motion } from "framer-motion";

interface OrderActionsProps {
  orderId: number;
  status: number;
  onViewDetail: () => void;
  onCancel?: () => void;
  onReorder?: () => void;
}

export default function OrderActions({
  orderId,
  status,
  onViewDetail,
  onCancel,
  onReorder,
}: OrderActionsProps) {
  const canCancel = status < 3 && status !== 5;
  const canReorder = status === 4 || status === 5;

  return (
    <div className="flex flex-wrap gap-2">
      {/* View Detail */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onViewDetail}
        className="flex items-center gap-2 rounded-md bg-[#33391d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2a2f18]"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Xem chi tiết
      </motion.button>

      {/* Cancel Order */}
      {canCancel && onCancel && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="flex items-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Hủy đơn
        </motion.button>
      )}

      {/* Reorder */}
      {canReorder && onReorder && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReorder}
          className="flex items-center gap-2 rounded-md border border-[#33391d] bg-white px-4 py-2 text-sm font-medium text-[#33391d] transition-colors hover:bg-amber-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Đặt lại
        </motion.button>
      )}
    </div>
  );
}
