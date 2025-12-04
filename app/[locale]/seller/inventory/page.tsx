"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Upload, Package, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { inventoryService } from "@/services/inventoryService";
import { warehouseService } from "@/services/warehouseService";
import InventoryFilters from "@/components/seller/inventory/InventoryFilters";
import InventoryTable from "@/components/seller/inventory/InventoryTable";
import InventoryPagination from "@/components/seller/inventory/InventoryPagination";
import UpdateInventoryModal from "@/components/seller/inventory/UpdateInventoryModal";
import ExportModal from "@/components/seller/inventory/ExportModal";
import TransferModal from "@/components/seller/inventory/TransferModal";
import InventoryDetailModal from "@/components/seller/inventory/InventoryDetailModal";
import AddProductToWarehouseModal from "@/components/seller/inventory/AddProductToWarehouseModal";
import { Button } from "@/components/ui/button";
import type { InventoryItem } from "@/types/inventory";
import { toast } from "react-toastify";
import { LoaderOne } from "@/components/ui/loader";

export default function InventoryPage() {
  const t = useTranslations("seller.inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // API data states
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [warehouses, setWarehouses] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [summary, setSummary] = useState({
    total: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
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

  // Fetch inventory data
  useEffect(() => {
    const fetchInventory = async () => {
      setIsLoading(true);
      try {
        const response = await inventoryService.getInventoryList({
          page: currentPage,
          limit: itemsPerPage,
          warehouseId:
            warehouseFilter !== "all" ? Number(warehouseFilter) : undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
          search: searchQuery || undefined,
        });

        setInventoryData(response.data.inventory);
        setSummary({
          total: response.data.summary.totalProducts,
          inStock: response.data.summary.inStock,
          lowStock: response.data.summary.lowStock,
          outOfStock: response.data.summary.outOfStock,
          totalValue: response.data.summary.totalValue,
        });
        setPagination(response.data.pagination);
      } catch (error) {
        toast.error("Không thể tải dữ liệu inventory");
        setInventoryData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInventory();
  }, [currentPage, itemsPerPage, warehouseFilter, statusFilter, searchQuery]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, warehouseFilter]);

  // Handlers
  const handleUpdateStock = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsUpdateModalOpen(true);
  };

  const handleTransfer = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsTransferModalOpen(true);
  };

  const handleViewDetails = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleUpdateSubmit = async (
    itemId: number,
    type: "in" | "out",
    quantity: number,
    note: string
  ) => {
    try {
      const item = inventoryData.find((i) => i.id === itemId);
      if (!item) {
        toast.error("Không tìm thấy sản phẩm");
        return;
      }

      await inventoryService.updateInventory(itemId, {
        warehouseId: item.warehouse.id,
        productId: item.product.id,
        type,
        quantity,
        note,
        referenceCode: "",
        typeEnum: type === "in" ? "0" : "1",
      });
      toast.success(
        `${type === "in" ? "Nhập kho" : "Xuất kho"} ${quantity} sản phẩm thành công`
      );
      // Refresh data
      const response = await inventoryService.getInventoryList({
        page: currentPage,
        limit: itemsPerPage,
        warehouseId:
          warehouseFilter !== "all" ? Number(warehouseFilter) : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        search: searchQuery || undefined,
      });
      setInventoryData(response.data.inventory);
      setSummary({
        total: response.data.summary.totalProducts,
        inStock: response.data.summary.inStock,
        lowStock: response.data.summary.lowStock,
        outOfStock: response.data.summary.outOfStock,
        totalValue: response.data.summary.totalValue,
      });
    } catch (error) {
      toast.error("Không thể cập nhật inventory");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
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
        <div className="flex gap-3">
          <Button
            onClick={() => setIsAddProductModalOpen(true)}
            className="bg-[#d4af37] hover:bg-[#b8941f] text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            {t("addProductModal.addButton")}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {(
          [
            {
              labelKey: "summary.totalProducts",
              value: summary.total,
              color: "bg-[#f5f3e8]",
              icon: Package,
            },
            {
              labelKey: "summary.inStock",
              value: summary.inStock,
              color: "bg-emerald-50",
              icon: Package,
            },
            {
              labelKey: "summary.lowStock",
              value: summary.lowStock,
              color: "bg-amber-50",
              icon: Package,
            },
            {
              labelKey: "summary.outOfStock",
              value: summary.outOfStock,
              color: "bg-red-50",
              icon: Package,
            },
            {
              labelKey: "summary.inventoryValue",
              value: formatPrice(summary.totalValue),
              color: "bg-blue-50",
              icon: Package,
              isPrice: true,
            },
          ] as Array<{
            labelKey: string;
            value: number | string;
            color: string;
            icon: LucideIcon;
            isPrice?: boolean;
          }>
        ).map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`${stat.color} border border-[#e8e6dc] rounded-lg p-4`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[#7a8451]">{t(stat.labelKey)}</p>
                {Icon && <Icon className="w-5 h-5 text-[#7a8451]" />}
              </div>
              <p
                className={`${stat.isPrice ? "text-xl" : "text-2xl"} font-bold text-[#3b4417]`}
              >
                {stat.value}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <InventoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        warehouseFilter={warehouseFilter}
        onWarehouseChange={setWarehouseFilter}
        warehouses={warehouses}
      />

      {/* Inventory Table */}
      {isLoading ? (
        <div className="flex h-screen items-center justify-center bg-neutral-50">
          <LoaderOne />
        </div>
      ) : (
        <InventoryTable
          items={inventoryData}
          onUpdateStock={handleUpdateStock}
          onTransfer={handleTransfer}
          onViewDetails={handleViewDetails}
        />
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

      {/* Update Inventory Modal */}
      <UpdateInventoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdateSubmit}
        item={selectedItem}
      />

      {/* Transfer Modal */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        item={selectedItem}
        warehouses={warehouses}
        onTransfer={async (config) => {
          try {
            await inventoryService.transferInventory({
              productId: config.productId,
              fromWarehouseId: config.fromWarehouseId,
              toWarehouseId: config.toWarehouseId,
              quantity: config.quantity,
              note: config.note,
            });
            toast.success(`Đã chuyển ${config.quantity} sản phẩm thành công!`);
            // Refresh data
            const response = await inventoryService.getInventoryList({
              page: currentPage,
              limit: itemsPerPage,
              warehouseId:
                warehouseFilter !== "all" ? Number(warehouseFilter) : undefined,
              status: statusFilter !== "all" ? statusFilter : undefined,
              search: searchQuery || undefined,
            });
            setInventoryData(response.data.inventory);
            setSummary({
              total: response.data.summary.totalProducts,
              inStock: response.data.summary.inStock,
              lowStock: response.data.summary.lowStock,
              outOfStock: response.data.summary.outOfStock,
              totalValue: response.data.summary.totalValue,
            });
          } catch (error) {
            toast.error("Không thể chuyển kho");
          }
        }}
      />

      {/* Detail Modal */}
      <InventoryDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        item={selectedItem}
        onStockIn={handleUpdateStock}
        onStockOut={handleUpdateStock}
        onTransfer={handleTransfer}
      />

      {/* Add Product to Warehouse Modal */}
      <AddProductToWarehouseModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        warehouses={warehouses}
        onSubmit={async (data) => {
          try {
            await inventoryService.addProductToWarehouse(data);
            toast.success(
              `Đã thêm ${data.quantity} sản phẩm vào kho thành công!`
            );
            // Refresh data
            const response = await inventoryService.getInventoryList({
              page: currentPage,
              limit: itemsPerPage,
              warehouseId:
                warehouseFilter !== "all" ? Number(warehouseFilter) : undefined,
              status: statusFilter !== "all" ? statusFilter : undefined,
              search: searchQuery || undefined,
            });
            setInventoryData(response.data.inventory);
            setSummary({
              total: response.data.summary.totalProducts,
              inStock: response.data.summary.inStock,
              lowStock: response.data.summary.lowStock,
              outOfStock: response.data.summary.outOfStock,
              totalValue: response.data.summary.totalValue,
            });
          } catch (error) {
            toast.error("Không thể thêm sản phẩm vào kho");
            throw error;
          }
        }}
      />
    </div>
  );
}
