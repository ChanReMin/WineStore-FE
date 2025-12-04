"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import OrderFilters from "@/components/seller/order/OrderFilters";
import OrdersTable from "@/components/seller/order/OrdersTable";
import OrderPagination from "@/components/seller/order/OrderPagination";
import { toast } from "react-toastify";
import orderService from "@/services/orderService";
import { OrderStatus } from "@/types/order";
import { LoaderOne } from "@/components/ui/loader";

// ✅ Dynamic import cho Modals (không cần SSR)
const UpdateOrderStatusModal = dynamic(
  () => import("@/components/seller/order/UpdateOrderStatusModal"),
  { ssr: false }
);

const OrderDetailModal = dynamic(
  () => import("@/components/seller/order/OrderDetailModal"),
  { ssr: false }
);

export default function OrdersPage() {
  const t = useTranslations("seller.orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    perPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    paid: 0,
    cancelled: 0,
  });

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (statusFilter !== "all") {
        params.status = Number.parseInt(statusFilter);
      }

      if (fromDate) {
        params.fromDate = fromDate;
      }

      if (toDate) {
        params.toDate = toDate;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await orderService.seller.getOrders(params);
      setOrders(response.orders);
      setPagination(response.pagination);

      // Use summary from API response
      if (response.summary) {
        setSummary({
          total: response.pagination.totalItems,
          pending: response.summary.pending,
          confirmed: response.summary.confirmed,
          paid: response.summary.paid,
          cancelled: response.summary.cancelled,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when filters or pagination change
  useEffect(() => {
    fetchOrders();
  }, [currentPage, itemsPerPage, statusFilter, fromDate, toDate]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchOrders();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handlers
  const handleViewDetails = async (order: any) => {
    try {
      const orderDetail = await orderService.seller.getOrderDetail(order.id);
      setSelectedOrder(orderDetail);
      setIsDetailModalOpen(true);
    } catch (error: any) {
      toast.error(error.message || "Không thể tải chi tiết đơn hàng");
    }
  };

  const handleUpdateStatus = (order: any) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatusSubmit = async (
    orderId: number,
    status: number,
    note: string
  ) => {
    try {
      await orderService.seller.updateOrderStatus(orderId, status, note);
      toast.success("Cập nhật trạng thái đơn hàng thành công");
      setIsUpdateModalOpen(false);
      fetchOrders(); // Refresh list
    } catch (error: any) {
      toast.error(error.message || "Không thể cập nhật trạng thái đơn hàng");
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3b4417] tracking-wide mb-2">
            {t("title")}
          </h1>
          <p className="text-[#7a8451]">{t("subtitle")}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            labelKey: "summary.totalOrders",
            value: pagination.totalItems,
            iconColor: "text-[#3b4417]",
            IconComponent: (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            ),
          },
          {
            labelKey: "summary.pending",
            value: summary.pending,
            iconColor: "text-amber-600",
            IconComponent: (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
          },
          {
            labelKey: "summary.confirmed",
            value: summary.confirmed,
            iconColor: "text-blue-600",
            IconComponent: (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
          },
          {
            labelKey: "summary.paid",
            value: summary.paid,
            iconColor: "text-emerald-600",
            IconComponent: (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            ),
          },
        ].map((stat, index) => (
          <div
            key={stat.labelKey}
            className="bg-white border border-[#d4d6b4] rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={stat.iconColor}>{stat.IconComponent}</div>
              <p className={`text-2xl font-bold ${stat.iconColor}`}>
                {stat.value}
              </p>
            </div>
            <p className="text-sm text-[#7a8451]">{t(stat.labelKey)}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <OrderFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        fromDate={fromDate}
        onFromDateChange={setFromDate}
        toDate={toDate}
        onToDateChange={setToDate}
      />

      {/* Loading State */}
      {loading ? (
        <div className="flex h-screen items-center justify-center bg-neutral-50">
          <LoaderOne />
        </div>
      ) : (
        <>
          {/* Orders Table */}
          <OrdersTable
            orders={orders}
            onViewDetails={handleViewDetails}
            onUpdateStatus={handleUpdateStatus}
          />

          {/* Pagination */}
          {pagination.totalItems > 0 && (
            <OrderPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </>
      )}

      {/* Modals */}
      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={selectedOrder}
        onUpdateStatus={(order) => {
          setIsDetailModalOpen(false);
          handleUpdateStatus(order);
        }}
      />

      <UpdateOrderStatusModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateStatusSubmit}
        order={selectedOrder}
      />
    </div>
  );
}
