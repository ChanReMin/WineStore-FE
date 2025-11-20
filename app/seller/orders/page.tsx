"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { mockOrderList } from "@/lib/orders.mock";
import OrderFilters from "@/components/seller/order/OrderFilters";
import OrdersTable from "@/components/seller/order/OrdersTable";
import OrderPagination from "@/components/seller/order/OrderPagination";
import UpdateOrderStatusModal from "@/components/seller/order/UpdateOrderStatusModal";
import OrderDetailModal from "@/components/seller/order/OrderDetailModal";
import type { Order } from "@/types/order";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter orders
  const filteredOrders = useMemo(() => {
    let filtered = mockOrderList.data.orders;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status === Number.parseInt(statusFilter)
      );
    }

    // Filter by payment status
    if (paymentFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.payment_status === Number.parseInt(paymentFilter)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.order_code.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.customer.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, statusFilter, paymentFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, paymentFilter]);

  // Handlers
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatusSubmit = async (
    orderId: number,
    status: number,
    note: string
  ) => {
    console.log("Update order status:", { orderId, status, note });
    // TODO: Call API PUT /seller/orders/{orderId}/status
    alert(
      `Cập nhật trạng thái đơn #${orderId} thành ${status}${note ? ` - Ghi chú: ${note}` : ""} (Mock)`
    );
  };

  // Calculate summary stats
  const summary = useMemo(() => {
    const orders = mockOrderList.data.orders;
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 1).length,
      processing: orders.filter((o) => o.status === 2).length,
      shipping: orders.filter((o) => o.status === 3).length,
      completed: orders.filter((o) => o.status === 4).length,
      cancelled: orders.filter((o) => o.status === 5).length,
    };
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3b4417] tracking-wide mb-2">
            Quản lý đơn hàng
          </h1>
          <p className="text-[#7a8451]">
            Theo dõi và xử lý đơn hàng của khách hàng
          </p>
        </div>
        
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Tổng đơn", value: summary.total, color: "bg-[#f5f3e8]" },
          {
            label: "Chờ xác nhận",
            value: summary.pending,
            color: "bg-amber-50",
          },
          {
            label: "Đang xử lý",
            value: summary.processing,
            color: "bg-blue-50",
          },
          {
            label: "Đang giao",
            value: summary.shipping,
            color: "bg-purple-50",
          },
          {
            label: "Hoàn thành",
            value: summary.completed,
            color: "bg-emerald-50",
          },
          { label: "Đã hủy", value: summary.cancelled, color: "bg-red-50" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`${stat.color} border border-[#e8e6dc] rounded-lg p-4`}
          >
            <p className="text-sm text-[#7a8451] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#3b4417]">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <OrderFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        paymentFilter={paymentFilter}
        onPaymentChange={setPaymentFilter}
      />

      {/* Orders Table */}
      <OrdersTable
        orders={paginatedOrders}
        onViewDetails={handleViewDetails}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredOrders.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
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
