"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Warehouse,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  User,
  Package,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchWarehouseRequests,
  type WarehouseRequest,
} from "@/services/warehouseApprovalService";
import WarehouseDetailModal from "./WarehouseDetailModal";
import ApproveWarehouseModal from "./ApproveWarehouseModal";
import RejectWarehouseModal from "./RejectWarehouseModal";

export default function WarehouseApprovalList() {
  const t = useTranslations("admin.warehouseApproval");
  const [loading, setLoading] = useState(true);
  const [warehouses, setWarehouses] = useState<WarehouseRequest[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | "all">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Modals
  const [selectedWarehouse, setSelectedWarehouse] =
    useState<WarehouseRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const loadData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetchWarehouseRequests({
        page,
        limit: 10,
        status: statusFilter === "all" ? undefined : statusFilter,
        search: searchQuery,
        sortorder: sortOrder,
      });
      setWarehouses(response.data.requests);
      setPagination({
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
        totalItems: response.data.pagination.totalItems,
      });
    } catch (error) {
      console.error("Error loading warehouse requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, sortOrder]);

  const handleSearch = () => {
    loadData(1);
  };

  const handlePageChange = (newPage: number) => {
    loadData(newPage);
  };

  const handleViewDetail = (warehouse: WarehouseRequest) => {
    setSelectedWarehouse(warehouse);
    setShowDetailModal(true);
  };

  const handleApprove = (warehouse: WarehouseRequest) => {
    setSelectedWarehouse(warehouse);
    setShowApproveModal(true);
  };

  const handleReject = (warehouse: WarehouseRequest) => {
    setSelectedWarehouse(warehouse);
    setShowRejectModal(true);
  };

  const handleActionComplete = () => {
    loadData(pagination.currentPage);
  };

  const getStatusBadge = (status: number) => {
    const badges = {
      0: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: Clock,
        label: t("status.pending"),
      },
      1: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: CheckCircle,
        label: t("status.active"),
      },
      2: {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: XCircle,
        label: t("status.banned"),
      },
    };

    const badge = badges[status as keyof typeof badges] || badges[0];
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fdfbf5]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#3b4417] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-[#7a8451]">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#3b4417] tracking-wide">
          {t("title")}
        </h1>
        <p className="text-[#7a8451]">{t("subtitle")}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-amber-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.totalPending")}
                  </p>
                  <p className="text-3xl font-bold text-amber-600">
                    {warehouses.filter((w) => w.status === 0).length}
                  </p>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-emerald-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.totalActive")}
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {warehouses.filter((w) => w.status === 1).length}
                  </p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-[#3b4417] hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.totalRequests")}
                  </p>
                  <p className="text-3xl font-bold text-[#3b4417]">
                    {pagination.totalItems}
                  </p>
                </div>
                <div className="bg-[#f5f3e8] p-3 rounded-xl">
                  <Warehouse className="w-6 h-6 text-[#3b4417]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>

            <Select
              value={statusFilter.toString()}
              onValueChange={(value) =>
                setStatusFilter(
                  value === "all" ? "all" : Number.parseInt(value)
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.all")}</SelectItem>
                <SelectItem value="0">{t("filters.pending")}</SelectItem>
                <SelectItem value="1">{t("filters.active")}</SelectItem>
                <SelectItem value="2">{t("filters.banned")}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortOrder}
              onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">{t("filters.newest")}</SelectItem>
                <SelectItem value="asc">{t("filters.oldest")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Warehouses Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.warehouse")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.location")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.manager")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.status")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.createdAt")}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                <AnimatePresence mode="popLayout">
                  {warehouses.map((warehouse, index) => (
                    <motion.tr
                      key={warehouse.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#f5f3e8] p-2 rounded-lg">
                            <Warehouse className="w-5 h-5 text-[#3b4417]" />
                          </div>
                          <div>
                            <p className="font-medium text-[#3b4417]">
                              {warehouse.name}
                            </p>
                            {warehouse.manager.totalProducts !== undefined && (
                              <p className="text-sm text-neutral-500">
                                {warehouse.manager.totalProducts}{" "}
                                {t("products")} ·{" "}
                                {warehouse.manager.approvedProducts}{" "}
                                {t("approved")}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2 max-w-xs">
                          <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                          <span className="text-sm text-neutral-600 line-clamp-2">
                            {warehouse.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-neutral-900">
                            {warehouse.manager.firstName}{" "}
                            {warehouse.manager.lastName}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {warehouse.manager.email}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {warehouse.manager.phoneNumber}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(warehouse.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {new Date(warehouse.createdAt).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewDetail(warehouse)}
                            className="p-2 text-[#3b4417] hover:bg-[#f5f3e8] rounded-lg transition-colors"
                            title={t("actions.viewDetail")}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          {warehouse.status === 0 && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleApprove(warehouse)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title={t("actions.approve")}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleReject(warehouse)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title={t("actions.reject")}
                              >
                                <XCircle className="w-4 h-4" />
                              </motion.button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {warehouses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-neutral-100 p-4 rounded-full mb-4">
                <Warehouse className="w-8 h-8 text-neutral-400" />
              </div>
              <p className="text-neutral-600 font-medium mb-1">
                {t("table.noWarehouses")}
              </p>
              <p className="text-sm text-neutral-500">
                {t("table.noWarehousesDesc")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">
                {t("pagination.showing")}{" "}
                {(pagination.currentPage - 1) * 10 + 1} -{" "}
                {Math.min(pagination.currentPage * 10, pagination.totalItems)}{" "}
                {t("pagination.of")} {pagination.totalItems}
              </p>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                <span className="text-sm text-neutral-600">
                  {pagination.currentPage} / {pagination.totalPages}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      {selectedWarehouse && (
        <>
          <WarehouseDetailModal
            warehouse={selectedWarehouse}
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            onApprove={() => {
              setShowDetailModal(false);
              handleApprove(selectedWarehouse);
            }}
            onReject={() => {
              setShowDetailModal(false);
              handleReject(selectedWarehouse);
            }}
          />
          <ApproveWarehouseModal
            warehouse={selectedWarehouse}
            isOpen={showApproveModal}
            onClose={() => setShowApproveModal(false)}
            onSuccess={handleActionComplete}
          />
          <RejectWarehouseModal
            warehouse={selectedWarehouse}
            isOpen={showRejectModal}
            onClose={() => setShowRejectModal(false)}
            onSuccess={handleActionComplete}
          />
        </>
      )}
    </div>
  );
}
