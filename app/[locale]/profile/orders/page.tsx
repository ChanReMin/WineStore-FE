"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/routing";
import orderService from "@/services/orderService";
import type { OrderListItem } from "@/types/order";
import OrderCard from "@/components/orders/OrderCard";
import OrderFilters from "@/components/orders/OrderFilters";
import OrderSkeleton from "@/components/orders/OrderSkeleton";
import EmptyOrders from "@/components/orders/EmptyOrders";
import OrderStats from "@/components/orders/OrderStats";

export default function OrdersPage() {
  const t = useTranslations("orders");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [allOrders, setAllOrders] = useState<OrderListItem[]>([]);

  useEffect(() => {
    setIsCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (isCheckingAuth) return;

    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    loadOrders();
  }, [isAuthenticated, router, isCheckingAuth, selectedStatus, currentPage]);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const [response, allOrdersResponse] = await Promise.all([
        orderService.getOrders({
          page: currentPage,
          limit: 10,
          status: selectedStatus || undefined,
        }),
        orderService.getOrders({ limit: 1000 }), // Get all orders for stats
      ]);
      setOrders(response.orders);
      setTotalPages(response.pagination.totalPages);
      setTotalItems(response.pagination.totalItems);
      setAllOrders(allOrdersResponse.orders);
    } catch (error) {
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (status: number | null) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isCheckingAuth || (isLoading && orders.length === 0)) {
    return (
      <div className="min-h-screen bg-amber-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <div className="h-10 w-64 animate-pulse rounded bg-neutral-200" />
            <div className="mt-2 h-6 w-96 animate-pulse rounded bg-neutral-200" />
          </div>
          <OrderSkeleton />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[#33391d]">{t("title")}</h1>
          <p className="mt-2 text-neutral-600">{t("subtitle")}</p>
        </motion.div>

        {/* Payment Reminder Banner */}
        {(() => {
          const unpaidOrders = allOrders.filter(
            (order) => order.status === 2 && order.paymentStatus === 0
          );

          if (unpaidOrders.length === 0) return null;

          return (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 overflow-hidden rounded-lg border-l-4 border-amber-500 bg-amber-50 shadow-md"
            >
              <div className="flex items-start gap-4 p-5">
                <div className="shrink-0">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"
                  >
                    <svg
                      className="h-6 w-6 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </motion.div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-amber-900 mb-1">
                    Bạn có {unpaidOrders.length} đơn hàng cần thanh toán
                  </h3>
                  <p className="text-sm text-amber-700 mb-3">
                    Vui lòng thanh toán trong vòng 24h để tránh đơn hàng bị hủy
                    tự động
                  </p>

                  {/* Show first unpaid order */}
                  <div className="flex items-center gap-2 text-sm text-amber-800 mb-3">
                    <span className="font-medium">Đơn hàng gần nhất:</span>
                    <span className="font-mono bg-amber-100 px-2 py-1 rounded">
                      {unpaidOrders[0].orderCode}
                    </span>
                    <span>•</span>
                    <span className="font-semibold">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(unpaidOrders[0].finalAmount)}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      router.push(`/profile/orders/${unpaidOrders[0].id}`)
                    }
                    className="inline-flex items-center gap-2 rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
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
                    Thanh toán ngay
                  </motion.button>

                  {unpaidOrders.length > 1 && (
                    <button
                      onClick={() => setSelectedStatus(2)}
                      className="ml-3 text-sm font-medium text-amber-700 hover:text-amber-900 underline"
                    >
                      Xem tất cả {unpaidOrders.length} đơn hàng
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    // You can add a dismiss functionality here if needed
                  }}
                  className="shrink-0 text-amber-400 hover:text-amber-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          );
        })()}

        {/* Stats */}
        {allOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <OrderStats
              stats={{
                total: allOrders.length,
                pending: allOrders.filter((o) => o.status === 1).length,
                confirmed: allOrders.filter((o) => o.status === 2).length,
                paid: allOrders.filter((o) => o.status === 3).length,
                cancelled: allOrders.filter((o) => o.status === 5).length,
              }}
            />
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <OrderFilters
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
          />
        </motion.div>

        {/* Result Count */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 rounded-lg bg-white p-4 shadow-sm"
        >
          <p className="text-sm text-neutral-600">
            {t("found")}{" "}
            <span className="font-semibold text-[#33391d]">{totalItems}</span>{" "}
            {t("order")}
          </p>
        </motion.div>

        {/* Orders List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OrderSkeleton />
            </motion.div>
          ) : orders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyOrders />
            </motion.div>
          ) : (
            <motion.div
              key="orders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  onClick={() => router.push(`/profile/orders/${order.id}`)}
                  className="cursor-pointer"
                >
                  <OrderCard order={order} index={index} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex justify-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("previous")}
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(page)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#33391d] text-white"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("next")}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
