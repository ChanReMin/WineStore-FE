"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Order } from "@/types/order";
import { formatCurrency } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
  index: number;
}

const getStatusColor = (status: number) => {
  switch (status) {
    case 1: return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case 2: return "bg-blue-100 text-blue-800 border-blue-200";
    case 3: return "bg-purple-100 text-purple-800 border-purple-200";
    case 4: return "bg-green-100 text-green-800 border-green-200";
    case 5: return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getPaymentStatusColor = (status: number) => {
  switch (status) {
    case 0: return "text-orange-600";
    case 1: return "text-green-600";
    case 2: return "text-blue-600";
    default: return "text-gray-600";
  }
};

export default function OrderCard({ order, index }: OrderCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      className="group rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Order Code */}
          <Link href={`/profile/orders/${order.id}`}>
            <motion.h3
              whileHover={{ x: 4 }}
              className="text-lg font-semibold text-[#33391d] transition-colors group-hover:text-[#5a6332]"
            >
              {order.order_code}
            </motion.h3>
          </Link>
          
          {/* Date */}
          <p className="mt-1 text-sm text-neutral-500">
            {new Date(order.created_at).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Status Badge */}
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
        >
          {order.status_text}
        </motion.span>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-neutral-200" />

      {/* Order Info */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Số sản phẩm:</span>
          <span className="font-medium text-neutral-900">{order.items_count} sản phẩm</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Tổng tiền:</span>
          <span className="font-medium text-neutral-900">
            {formatCurrency(order.total_amount)}
          </span>
        </div>
        
        {order.discount_amount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Giảm giá:</span>
            <span className="font-medium text-green-600">
              -{formatCurrency(order.discount_amount)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between border-t border-neutral-200 pt-2">
          <span className="font-medium text-neutral-900">Thành tiền:</span>
          <span className="text-lg font-bold text-[#33391d]">
            {formatCurrency(order.final_amount)}
          </span>
        </div>
      </div>

      {/* Payment Status */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {order.payment_status === 1 ? (
            <svg
              className={`h-5 w-5 ${getPaymentStatusColor(order.payment_status)}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className={`h-5 w-5 ${getPaymentStatusColor(order.payment_status)}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          )}
          <span className={`text-sm font-medium ${getPaymentStatusColor(order.payment_status)}`}>
            {order.payment_status_text}
          </span>
        </div>

        {/* View Detail Button */}
        <Link href={`/profile/orders/${order.id}`}>
          <motion.button
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 text-sm font-medium text-[#33391d] transition-colors hover:text-[#5a6332]"
          >
            Xem chi tiết
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
