"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function EmptyOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-neutral-200 bg-white p-12 text-center shadow-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-neutral-200 opacity-20 blur-2xl" />
        <svg
          className="relative mx-auto h-24 w-24 text-neutral-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-xl font-semibold text-neutral-900"
      >
        Chưa có đơn hàng nào
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-neutral-600"
      >
        Hãy khám phá bộ sưu tập rượu vang cao cấp của chúng tôi
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <Link href="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-md bg-[#33391d] px-8 py-3 font-medium text-white transition-colors hover:bg-[#2a2f18]"
          >
            Khám phá ngay
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
