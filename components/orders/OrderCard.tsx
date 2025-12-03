"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { OrderListItem } from "@/types/order";
import { formatCurrency } from "@/lib/utils";
import { ORDER_STATUS } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderCardProps {
  order: OrderListItem;
  index: number;
}

const getPaymentStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return "text-orange-600";
    case 1:
      return "text-green-600";
    case 2:
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

export default function OrderCard({ order, index }: OrderCardProps) {
  const t = useTranslations("orders.card");

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
              {order.orderCode}
            </motion.h3>
          </Link>

          {/* Date */}
          <p className="mt-1 text-sm text-neutral-500">
            {new Date(order.createdAt).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Status Badge */}
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-neutral-200" />

      {/* Order Info */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">{t("itemsCount")}</span>
          <span className="font-medium text-neutral-900">
            {order.itemCount} {t("products")}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">{t("total")}</span>
          <span className="font-medium text-neutral-900">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>

        <div className="flex justify-between border-t border-neutral-200 pt-2">
          <span className="font-medium text-neutral-900">
            {t("finalAmount")}
          </span>
          <span className="text-lg font-bold text-[#33391d]">
            {formatCurrency(order.finalAmount)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {order.paymentStatus === 1 ? (
            <svg
              className={`h-5 w-5 ${getPaymentStatusColor(order.paymentStatus)}`}
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
              className={`h-5 w-5 ${getPaymentStatusColor(order.paymentStatus)}`}
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
          <span
            className={`text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}
          >
            {order.paymentStatusText}
          </span>
        </div>

        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Payment Button for Confirmed Orders */}
          {order.status === ORDER_STATUS.CONFIRMED &&
            order.paymentStatus === 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium transition-all hover:bg-blue-600 animate-pulse"
              >
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                {t("payment")}
              </motion.button>
            )}

          {/* View Detail Button */}
          <Link href={`/profile/orders/${order.id}`}>
            <motion.button
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-sm font-medium text-[#33391d] transition-colors hover:text-[#5a6332]"
            >
              {t("viewDetail")}
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
      </div>
    </motion.div>
  );
}
