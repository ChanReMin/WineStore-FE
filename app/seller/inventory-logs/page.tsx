"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { mockInventoryLogs } from "@/lib/inventoryLogs.mock";
import InventoryLogsFilters from "@/components/seller/inventory/InventoryLogsFilters";
import InventoryLogsTable from "@/components/seller/inventory/InventoryLogsTable";
import InventoryPagination from "@/components/seller/inventory/InventoryPagination";

export default function InventoryLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Get unique warehouses
  const warehouses = useMemo(() => {
    const uniqueWarehouses = new Map();
    mockInventoryLogs.data.forEach((log) => {
      if (!uniqueWarehouses.has(log.warehouse)) {
        uniqueWarehouses.set(log.warehouse, {
          id: uniqueWarehouses.size + 1,
          name: log.warehouse,
        });
      }
    });
    return Array.from(uniqueWarehouses.values());
  }, []);

  // Filter logs
  const filteredLogs = useMemo(() => {
    let filtered = mockInventoryLogs.data;

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((log) => log.type === typeFilter);
    }

    // Filter by warehouse
    if (warehouseFilter !== "all") {
      filtered = filtered.filter((log) => log.warehouse === warehouseFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (log) =>
          log.product.toLowerCase().includes(query) ||
          log.user.toLowerCase().includes(query) ||
          log.note?.toLowerCase().includes(query) ||
          log.warehouse.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, typeFilter, warehouseFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, warehouseFilter]);

  // Calculate summary
  const summary = useMemo(() => {
    const logs = mockInventoryLogs.data;
    const totalIn = logs
      .filter((l) => l.type === "IN" || l.type === "RETURN")
      .reduce((sum, l) => sum + l.quantity, 0);
    const totalOut = logs
      .filter((l) => l.type === "OUT")
      .reduce((sum, l) => sum + Math.abs(l.quantity), 0);

    return {
      total: logs.length,
      in: logs.filter((l) => l.type === "IN").length,
      out: logs.filter((l) => l.type === "OUT").length,
      adjust: logs.filter((l) => l.type === "ADJUST").length,
      return: logs.filter((l) => l.type === "RETURN").length,
      totalIn,
      totalOut,
    };
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3b4417] tracking-wide mb-2">
            Lịch sử xuất nhập kho
          </h1>
          <p className="text-[#7a8451]">
            Theo dõi tất cả giao dịch xuất nhập kho
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium"
          >
            <FileText className="w-4 h-4" />
            In báo cáo
          </motion.button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: "Tổng giao dịch",
            value: summary.total,
            color: "bg-[#f5f3e8]",
            icon: FileText,
          },
          {
            label: "Nhập kho",
            value: summary.in,
            color: "bg-emerald-50",
            icon: TrendingUp,
          },
          {
            label: "Xuất kho",
            value: summary.out,
            color: "bg-red-50",
            icon: TrendingDown,
          },
          {
            label: "Điều chỉnh",
            value: summary.adjust,
            color: "bg-blue-50",
            icon: FileText,
          },
          {
            label: "Trả hàng",
            value: summary.return,
            color: "bg-amber-50",
            icon: FileText,
          },
          {
            label: "Tổng nhập",
            value: `+${summary.totalIn}`,
            color: "bg-emerald-100",
            icon: TrendingUp,
            isQuantity: true,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`${stat.color} border border-[#e8e6dc] rounded-lg p-4`}
          >
            <p className="text-sm text-[#7a8451] mb-1">{stat.label}</p>
            <p
              className={`text-2xl font-bold ${stat.isQuantity ? "text-emerald-600" : "text-[#3b4417]"}`}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <InventoryLogsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        warehouseFilter={warehouseFilter}
        onWarehouseChange={setWarehouseFilter}
        warehouses={warehouses}
      />

      {/* Logs Table */}
      <InventoryLogsTable logs={paginatedLogs} />

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <InventoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredLogs.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
}
