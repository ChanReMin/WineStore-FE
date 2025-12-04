"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WarehouseStatCards from "./WarehouseStatCards";
import WarehouseList from "./WarehouseList";

// ✅ Dynamic import cho Modals (không cần SSR)
const CreateWarehouseModal = dynamic(() => import("./CreateWarehouseModal"), {
  ssr: false,
});

const EditWarehouseModal = dynamic(() => import("./EditWarehouseModal"), {
  ssr: false,
});

const WarehouseDetailModal = dynamic(() => import("./WarehouseDetailModal"), {
  ssr: false,
});

import { warehouseService, type Warehouse } from "@/services/warehouseService";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { LoaderOne } from "@/components/ui/loader";

export default function WarehouseManagement() {
  const t = useTranslations("seller.warehouses");
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [statistics, setStatistics] = useState({
    totalWarehouses: 0,
    activeWarehouses: 0,
    pendingWarehouses: 0,
    bannedWarehouses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(
    null
  );

  useEffect(() => {
    loadData();
  }, [statusFilter, searchQuery]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [warehousesResult, statsResult] = await Promise.all([
        warehouseService.getWarehouses({
          status: statusFilter === "all" ? undefined : Number(statusFilter),
          search: searchQuery || undefined,
        }),
        warehouseService.getWarehouseStatistics(),
      ]);

      setWarehouses(warehousesResult.data.warehouses);
      setStatistics({
        totalWarehouses: statsResult.data.totalWarehouses,
        activeWarehouses: statsResult.data.activeWarehouses,
        pendingWarehouses: statsResult.data.pendingWarehouses,
        bannedWarehouses: statsResult.data.bannedWarehouses,
      });
    } catch (error) {
      console.error("Error loading warehouses:", error);
      toast.error("Không thể tải dữ liệu kho hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = (id: number) => {
    setSelectedWarehouseId(id);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsEditModalOpen(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#3b4417] tracking-wide">
            {t("title")}
          </h1>
          <p className="text-[#7a8451]">{t("subtitle")}</p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#3b4417] hover:bg-[#2d3312] text-white"
        >
          <Plus size={20} className="mr-2" />
          {t("addWarehouse")}
        </Button>
      </div>

      {/* Statistics Cards */}
      <WarehouseStatCards
        totalWarehouses={statistics.totalWarehouses}
        activeWarehouses={statistics.activeWarehouses}
        pendingWarehouses={statistics.pendingWarehouses}
        bannedWarehouses={statistics.bannedWarehouses}
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7a8451]"
            size={20}
          />
          <Input
            placeholder={t("filters.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 border-[#d4d6b4] focus:border-[#3b4417]"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[200px] border-[#d4d6b4]">
            <Filter size={16} className="mr-2" />
            <SelectValue placeholder={t("filters.allStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.allStatus")}</SelectItem>
            <SelectItem value="1">{t("filters.active")}</SelectItem>
            <SelectItem value="0">{t("filters.pending")}</SelectItem>
            <SelectItem value="2">{t("filters.banned")}</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Warehouse List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isLoading ? (
          <div className="flex h-screen items-center justify-center bg-neutral-50">
            <LoaderOne />
          </div>
        ) : (
          <WarehouseList
            warehouses={warehouses}
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            onRefresh={loadData}
          />
        )}
      </motion.div>

      {/* Modals */}
      <CreateWarehouseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={loadData}
      />

      <EditWarehouseModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedWarehouse(null);
        }}
        onSuccess={loadData}
        warehouse={selectedWarehouse}
      />

      <WarehouseDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedWarehouseId(null);
        }}
        warehouseId={selectedWarehouseId}
      />
    </div>
  );
}
