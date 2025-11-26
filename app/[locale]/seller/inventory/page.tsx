"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Upload, Package } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockInventoryList } from "@/lib/inventory.mock";
import InventoryFilters from "@/components/seller/inventory/InventoryFilters";
import InventoryTable from "@/components/seller/inventory/InventoryTable";
import InventoryPagination from "@/components/seller/inventory/InventoryPagination";
import UpdateInventoryModal from "@/components/seller/inventory/UpdateInventoryModal";
import type { InventoryItem } from "@/types/inventory";
import { toast } from "react-toastify";

export default function InventoryPage() {
  const t = useTranslations("seller.inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Get unique warehouses
  const warehouses = useMemo(() => {
    const uniqueWarehouses = new Map();
    mockInventoryList.data.forEach((item) => {
      if (!uniqueWarehouses.has(item.warehouse.id)) {
        uniqueWarehouses.set(item.warehouse.id, {
          id: item.warehouse.id,
          name: item.warehouse.name,
        });
      }
    });
    return Array.from(uniqueWarehouses.values());
  }, []);

  // Filter inventory
  const filteredItems = useMemo(() => {
    let filtered = mockInventoryList.data;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Filter by warehouse
    if (warehouseFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.warehouse.id === Number.parseInt(warehouseFilter)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.product.name.toLowerCase().includes(query) ||
          item.warehouse.name.toLowerCase().includes(query) ||
          item.warehouse.location.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, statusFilter, warehouseFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, warehouseFilter]);

  // Handlers
  const handleUpdateStock = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (
    itemId: number,
    type: "in" | "out",
    quantity: number,
    note: string
  ) => {
    // TODO: Call API
    toast.success(
      `${type === "in" ? "Stock In" : "Stock Out"} ${quantity} products #${itemId}${note ? ` - ${note}` : ""} (Mock)`
    );
  };

  // Calculate summary
  const summary = useMemo(() => {
    const items = mockInventoryList.data;
    return {
      total: items.length,
      inStock: items.filter((i) => i.status === "in_stock").length,
      lowStock: items.filter((i) => i.status === "low_stock").length,
      outOfStock: items.filter((i) => i.status === "out_of_stock").length,
      totalValue: items.reduce(
        (sum, item) => sum + item.product.price * item.quantity_on_hand,
        0
      ),
    };
  }, []);

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
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
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
        ].map((stat, index) => (
          <motion.div
            key={stat.labelKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`${stat.color} border border-[#e8e6dc] rounded-lg p-4`}
          >
            <p className="text-sm text-[#7a8451] mb-1">{t(stat.labelKey)}</p>
            <p
              className={`${stat.isPrice ? "text-xl" : "text-2xl"} font-bold text-[#3b4417]`}
            >
              {stat.value}
            </p>
          </motion.div>
        ))}
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
      <InventoryTable
        items={paginatedItems}
        onUpdateStock={handleUpdateStock}
      />

      {/* Pagination */}
      {filteredItems.length > 0 && (
        <InventoryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredItems.length}
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
    </div>
  );
}
