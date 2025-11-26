"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { orderService } from "@/services/orderService";
import type { Order } from "@/types/order";
import OrderCard from "@/components/orders/OrderCard";
import OrderFilters from "@/components/orders/OrderFilters";
import OrderSkeleton from "@/components/orders/OrderSkeleton";
import EmptyOrders from "@/components/orders/EmptyOrders";
import OrderDetailModal from "@/components/orders/OrderDetailModal";
import OrderStats from "@/components/orders/OrderStats";

export default function OrdersPage() {
  const t = useTranslations("orders");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [allOrders, setAllOrders] = useState<Order[]>([]);

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
      setTotalPages(response.pagination.total_pages);
      setTotalItems(response.pagination.total_items);
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
                processing: allOrders.filter((o) => o.status === 2).length,
                shipping: allOrders.filter((o) => o.status === 3).length,
                delivered: allOrders.filter((o) => o.status === 4).length,
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
                  onClick={() => setSelectedOrderId(order.id)}
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

      {/* Order Detail Modal */}
      {selectedOrderId && (
        <OrderDetailModal
          isOpen={!!selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          orderId={selectedOrderId}
          onOrderUpdated={loadOrders}
        />
      )}
    </div>
  );
}
