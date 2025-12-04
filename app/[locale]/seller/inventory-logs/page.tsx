"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { DateRange } from "react-day-picker";
import {
  inventoryLogService,
  type InventoryLog,
} from "@/services/inventoryLogService";
import { warehouseService } from "@/services/warehouseService";
import InventoryLogsFilters from "@/components/seller/inventory/InventoryLogsFilters";
import InventoryLogsTable from "@/components/seller/inventory/InventoryLogsTable";
import InventoryPagination from "@/components/seller/inventory/InventoryPagination";
import ExportModal from "@/components/seller/inventory/ExportModal";
import { toast } from "react-toastify";
import { LoaderOne } from "@/components/ui/loader";

export default function InventoryLogsPage() {
  const t = useTranslations("seller.inventory.logs");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // API data states
  const [logsData, setLogsData] = useState<InventoryLog[]>([]);
  const [warehouses, setWarehouses] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [summary, setSummary] = useState({
    total: 0,
    stockIn: 0,
    stockOut: 0,
    adjustments: 0,
    returns: 0,
    totalStockIn: 0,
    totalStockOut: 0,
    netChange: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch warehouses
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await warehouseService.getWarehouses({ status: 1 });
        const warehouseList = response.data.warehouses.map((w) => ({
          id: w.id,
          name: w.name,
        }));
        setWarehouses(warehouseList);
      } catch (error) {
        toast.error("Không thể tải danh sách kho hàng");
      }
    };
    fetchWarehouses();
  }, []);

  // Fetch inventory logs
  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      try {
        const response = await inventoryLogService.getInventoryLogs({
          page: currentPage,
          limit: itemsPerPage,
          warehouseId:
            warehouseFilter !== "all" ? Number(warehouseFilter) : undefined,
          type: typeFilter !== "all" ? typeFilter : undefined,
          from_date: dateRange?.from?.toISOString(),
          to_date: dateRange?.to?.toISOString(),
        });

        setLogsData(response.data.logs);
        setPagination(response.data.pagination);

        // Set summary if provided by API, otherwise calculate
        if (response.data.summary) {
          setSummary(response.data.summary);
        }
      } catch (error) {
        toast.error("Không thể tải dữ liệu logs");
        setLogsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [currentPage, itemsPerPage, warehouseFilter, typeFilter, dateRange]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter, warehouseFilter, dateRange]);

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

      {/* Filters */}
      <InventoryLogsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        warehouseFilter={warehouseFilter}
        onWarehouseChange={setWarehouseFilter}
        warehouses={warehouses}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* Logs Table */}
      {isLoading ? (
        <div className="flex h-screen items-center justify-center bg-neutral-50">
          <LoaderOne />
        </div>
      ) : (
        <InventoryLogsTable logs={logsData} />
      )}

      {/* Pagination */}
      {pagination.totalItems > 0 && (
        <InventoryPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Xuất báo cáo Inventory Logs"
        totalItems={pagination.totalItems}
        filteredItems={pagination.totalItems}
        availableColumns={[
          { key: "date", label: "Ngày giờ", defaultChecked: true },
          { key: "type", label: "Loại giao dịch", defaultChecked: true },
          { key: "product", label: "Sản phẩm", defaultChecked: true },
          { key: "warehouse", label: "Kho hàng", defaultChecked: true },
          { key: "quantity", label: "Số lượng", defaultChecked: true },
          { key: "user", label: "Người thực hiện", defaultChecked: true },
          { key: "note", label: "Ghi chú", defaultChecked: false },
        ]}
        onExport={async (config) => {
          // TODO: Implement actual export API
          toast.success(`Đã xuất ${config.format.toUpperCase()} thành công!`);
        }}
      />
    </div>
  );
}
