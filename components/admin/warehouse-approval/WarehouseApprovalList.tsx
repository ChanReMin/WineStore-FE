"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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
  Ban,
  ShieldCheck,
  AlertCircle,
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

// ✅ Dynamic import cho Modals (không cần SSR)
const WarehouseDetailModal = dynamic(() => import("./WarehouseDetailModal"), {
  ssr: false,
});

const ApproveWarehouseModal = dynamic(() => import("./ApproveWarehouseModal"), {
  ssr: false,
});

const RejectWarehouseModal = dynamic(() => import("./RejectWarehouseModal"), {
  ssr: false,
});

const BanWarehouseModal = dynamic(() => import("./BanWarehouseModal"), {
  ssr: false,
});

const UnbanWarehouseModal = dynamic(() => import("./UnbanWarehouseModal"), {
  ssr: false,
});
import { LoaderOne } from "@/components/ui/loader";

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
  const [showBanModal, setShowBanModal] = useState(false);
  const [showUnbanModal, setShowUnbanModal] = useState(false);

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

  // Debounce search query - automatically call API after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  const handleBan = (warehouse: WarehouseRequest) => {
    setSelectedWarehouse(warehouse);
    setShowBanModal(true);
  };

  const handleUnban = (warehouse: WarehouseRequest) => {
    setSelectedWarehouse(warehouse);
    setShowUnbanModal(true);
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
        label: t("status.approved"),
      },
      2: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        icon: AlertCircle,
        label: t("status.rejected"),
      },
      3: {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: Ban,
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
      <div className="flex h-screen items-center justify-center bg-neutral-50">
        <LoaderOne />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    {t("summary.totalApproved")}
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
          <Card className="border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.totalRejected")}
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {warehouses.filter((w) => w.status === 2).length}
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-red-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.totalBanned")}
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {warehouses.filter((w) => w.status === 3).length}
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-xl">
                  <Ban className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-row gap-4">
            <div className="flex-3 relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex-1">
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
                  <SelectItem value="1">{t("filters.approved")}</SelectItem>
                  <SelectItem value="2">{t("filters.rejected")}</SelectItem>
                  <SelectItem value="3">{t("filters.banned")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
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
          </div>
        </CardContent>
      </Card>

      {/* Warehouses Table */}
      <Card>
        <CardContent className="p-0">
          {warehouses.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-neutral-100 p-6 rounded-full mb-4">
                <Warehouse className="w-12 h-12 text-neutral-400" />
              </div>
              <p className="text-lg text-neutral-600 font-medium mb-2">
                {t("table.noWarehouses")}
              </p>
              <p className="text-sm text-neutral-500">
                {t("table.noWarehousesDesc")}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-linear-to-r from-neutral-50 to-neutral-100 border-b-2 border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      {t("table.warehouse")}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      {t("table.location")}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      {t("table.manager")}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      {t("table.status")}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      {t("table.createdAt")}
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      {t("table.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-100">
                  <AnimatePresence mode="popLayout">
                    {warehouses.map((warehouse, index) => (
                      <motion.tr
                        key={warehouse.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-linear-to-r hover:from-neutral-50 hover:to-transparent transition-all duration-200"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="bg-linear-to-br from-[#f5f3e8] to-[#e8e6d8] p-3 rounded-xl shadow-sm">
                              <Warehouse className="w-5 h-5 text-[#3b4417]" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#3b4417] text-base">
                                {warehouse.name}
                              </p>
                              {warehouse.manager.totalProducts !==
                                undefined && (
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="inline-flex items-center gap-1 text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full">
                                    <Package className="w-3 h-3" />
                                    {warehouse.manager.totalProducts}{" "}
                                    {t("products")}
                                  </span>
                                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    <CheckCircle className="w-3 h-3" />
                                    {warehouse.manager.approvedProducts}{" "}
                                    {t("approved")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-start gap-2 max-w-xs">
                            <MapPin className="w-4 h-4 text-[#7a8451] mt-0.5 shrink-0" />
                            <span className="text-sm text-neutral-700 line-clamp-2 leading-relaxed">
                              {warehouse.location}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-2 rounded-full">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-neutral-900">
                                {warehouse.manager.firstName}{" "}
                                {warehouse.manager.lastName}
                              </p>
                              <p className="text-xs text-neutral-500 mt-0.5">
                                {warehouse.manager.email}
                              </p>
                              <p className="text-xs text-neutral-500">
                                {warehouse.manager.phoneNumber}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          {getStatusBadge(warehouse.status)}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="inline-flex flex-col items-center">
                            <p className="text-sm font-medium text-neutral-900">
                              {new Date(warehouse.createdAt).toLocaleDateString(
                                "vi-VN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {new Date(warehouse.createdAt).toLocaleTimeString(
                                "vi-VN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleViewDetail(warehouse)}
                              className="p-2.5 text-[#3b4417] hover:bg-[#f5f3e8] rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                              title={t("actions.viewDetail")}
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>

                            {/* Pending: Approve, Reject, Ban */}
                            {warehouse.status === 0 && (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleApprove(warehouse)}
                                  className="p-2.5 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                  title={t("actions.approve")}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleReject(warehouse)}
                                  className="p-2.5 text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                  title={t("actions.reject")}
                                >
                                  <XCircle className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleBan(warehouse)}
                                  className="p-2.5 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                  title={t("actions.ban")}
                                >
                                  <Ban className="w-4 h-4" />
                                </motion.button>
                              </>
                            )}

                            {/* Approved: Ban */}
                            {warehouse.status === 1 && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleBan(warehouse)}
                                className="p-2.5 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                title={t("actions.ban")}
                              >
                                <Ban className="w-4 h-4" />
                              </motion.button>
                            )}

                            {/* Rejected: Approve, Ban */}
                            {warehouse.status === 2 && (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleApprove(warehouse)}
                                  className="p-2.5 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                  title={t("actions.approve")}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleBan(warehouse)}
                                  className="p-2.5 text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                  title={t("actions.ban")}
                                >
                                  <Ban className="w-4 h-4" />
                                </motion.button>
                              </>
                            )}

                            {/* Banned: Unban */}
                            {warehouse.status === 3 && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleUnban(warehouse)}
                                className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                                title={t("actions.unban")}
                              >
                                <ShieldCheck className="w-4 h-4" />
                              </motion.button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
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
            onBan={() => {
              setShowDetailModal(false);
              handleBan(selectedWarehouse);
            }}
            onUnban={() => {
              setShowDetailModal(false);
              handleUnban(selectedWarehouse);
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
          <BanWarehouseModal
            warehouse={selectedWarehouse}
            isOpen={showBanModal}
            onClose={() => setShowBanModal(false)}
            onSuccess={handleActionComplete}
          />
          <UnbanWarehouseModal
            warehouse={selectedWarehouse}
            isOpen={showUnbanModal}
            onClose={() => setShowUnbanModal(false)}
            onSuccess={handleActionComplete}
          />
        </>
      )}
    </div>
  );
}
