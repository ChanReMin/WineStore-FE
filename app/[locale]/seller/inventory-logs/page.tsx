"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, FileText, TrendingUp, TrendingDown, RefreshCw, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockInventoryLogs } from "@/lib/inventoryLogs.mock";
import InventoryLogsFilters from "@/components/seller/inventory/InventoryLogsFilters";
import InventoryLogsTable from "@/components/seller/inventory/InventoryLogsTable";
import InventoryPagination from "@/components/seller/inventory/InventoryPagination";

export default function InventoryLogsPage() {
  const t = useTranslations("seller.inventory.logs");
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
    const stockIn = logs.filter((l) => l.type === "IN");
    const stockOut = logs.filter((l) => l.type === "OUT");
    const adjustments = logs.filter((l) => l.type === "ADJUST");
    const returns = logs.filter((l) => l.type === "RETURN");

    const totalStockIn = stockIn.reduce((sum, log) => sum + log.quantity, 0);
    const totalStockOut = stockOut.reduce((sum, log) => sum + Math.abs(log.quantity), 0);

    return {
      total: logs.length,
      stockIn: stockIn.length,
      stockOut: stockOut.length,
      adjustments: adjustments.length,
      returns: returns.length,
      totalStockIn,
      totalStockOut,
      netChange: totalStockIn - totalStockOut,
    };
  }, []);

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
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium">
            <Download className="w-4 h-4" />
            {t("exportReport")}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f5f3e8] border border-[#e8e6dc] rounded-lg p-4"
        >
          <p className="text-sm text-[#7a8451] mb-1">{t("summary.totalTransactions")}</p>
          <p className="text-2xl font-bold text-[#3b4417]">{summary.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-emerald-50 border border-emerald-200 rounded-lg p-4"
        >
          <p className="text-sm text-emerald-700 mb-1">{t("summary.stockIn")}</p>
          <p className="text-2xl font-bold text-emerald-600">{summary.stockIn}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <p className="text-sm text-red-700 mb-1">{t("summary.stockOut")}</p>
          <p className="text-2xl font-bold text-red-600">{summary.stockOut}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <p className="text-sm text-blue-700 mb-1">{t("summary.adjustments")}</p>
          <p className="text-2xl font-bold text-blue-600">{summary.adjustments}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-purple-50 border border-purple-200 rounded-lg p-4"
        >
          <p className="text-sm text-purple-700 mb-1">{t("summary.returns")}</p>
          <p className="text-2xl font-bold text-purple-600">{summary.returns}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`${
            summary.netChange >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
          } border rounded-lg p-4`}
        >
          <p className={`text-sm mb-1 ${summary.netChange >= 0 ? "text-emerald-700" : "text-red-700"}`}>
            {t("summary.totalStockIn")}
          </p>
          <p className={`text-2xl font-bold ${summary.netChange >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {summary.netChange >= 0 ? "+" : ""}
            {summary.netChange}
          </p>
        </motion.div>
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
