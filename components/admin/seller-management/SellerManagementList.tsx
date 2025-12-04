"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Lock,
  Unlock,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  Warehouse,
  TrendingUp,
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
import { fetchSellers, type Seller } from "@/lib/adminSellerManagement";
import SellerDetailModal from "./SellerDetailModal";
import CreateSellerModal from "./CreateSellerModal";
import EditSellerModal from "./EditSellerModal";
import ChangeStatusModal from "./ChangeStatusModal";
import { LoaderOne } from "@/components/ui/loader";

export default function SellerManagementList() {
  const t = useTranslations("admin.sellerManagement");
  const [loading, setLoading] = useState(true);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [summary, setSummary] = useState({
    totalSellers: 0,
    activeSellers: 0,
    inactiveSellers: 0,
    lockedSellers: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modals
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const loadData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetchSellers({
        page,
        limit: 10,
        search: searchQuery,
        status: statusFilter === "all" ? undefined : statusFilter,
      });

      const sellers = response.data.users || [];
      setSellers(sellers);

      // Map pagination from API response
      const paginationData = response.data.pagination;
      setPagination({
        currentPage: paginationData?.currentPage || 1,
        totalPages: paginationData?.totalPages || 1,
        totalRecords: paginationData?.totalUsers || 0,
      });

      // Calculate summary from sellers data
      const totalSellers = paginationData?.totalUsers || sellers.length;
      const activeSellers = sellers.filter((s) => s.status === "active").length;
      const inactiveSellers = sellers.filter(
        (s) => s.status === "inactive"
      ).length;
      const lockedSellers = sellers.filter((s) => s.status === "locked").length;

      setSummary({
        totalSellers,
        activeSellers,
        inactiveSellers,
        lockedSellers,
      });
    } catch (error) {
      console.error("Error loading sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter]);

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

  const handleViewDetail = (seller: Seller) => {
    setSelectedSeller(seller);
    setShowDetailModal(true);
  };

  const handleEdit = (seller: Seller) => {
    setSelectedSeller(seller);
    setShowEditModal(true);
  };

  const handleChangeStatus = (seller: Seller) => {
    setSelectedSeller(seller);
    setShowStatusModal(true);
  };

  const handleActionComplete = () => {
    loadData(pagination.currentPage);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: CheckCircle,
        label: t("status.active"),
      },
      inactive: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: AlertCircle,
        label: t("status.inactive"),
      },
      locked: {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: XCircle,
        label: t("status.locked"),
      },
    };

    const badge = badges[status as keyof typeof badges] || badges.inactive;
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#3b4417] tracking-wide">
            {t("title")}
          </h1>
          <p className="text-[#7a8451]">{t("subtitle")}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-[#3b4417]/20 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.totalSellers")}
                  </p>
                  <p className="text-3xl font-bold text-[#3b4417]">
                    {summary.totalSellers}
                  </p>
                </div>
                <div className="bg-[#f5f3e8] p-3 rounded-xl">
                  <Users className="w-6 h-6 text-[#3b4417]" />
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
                    {t("summary.activeSellers")}
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {summary.activeSellers}
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
          <Card className="border-amber-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.inactiveSellers")}
                  </p>
                  <p className="text-3xl font-bold text-amber-600">
                    {summary.inactiveSellers}
                  </p>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
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
                    {t("summary.lockedSellers")}
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {summary.lockedSellers}
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-xl">
                  <XCircle className="w-6 h-6 text-red-600" />
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
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("filters.all")}</SelectItem>
                <SelectItem value="active">{t("filters.active")}</SelectItem>
                <SelectItem value="inactive">
                  {t("filters.inactive")}
                </SelectItem>
                <SelectItem value="locked">{t("filters.locked")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sellers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.seller")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.contact")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.orders")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.revenue")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.status")}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                <AnimatePresence mode="popLayout">
                  {sellers.map((seller, index) => (
                    <motion.tr
                      key={seller.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      {/* Seller Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {seller.avatar ? (
                            <img
                              src={seller.avatar}
                              alt={seller.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#3b4417] to-[#7a8451] flex items-center justify-center text-white font-semibold">
                              {seller.name
                                ? seller.name.charAt(0).toUpperCase()
                                : "S"}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-[#3b4417]">
                              {seller.name}
                            </p>
                            <p className="text-xs text-neutral-500">
                              ID: {seller.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-neutral-900">
                            <Mail className="w-3.5 h-3.5 text-neutral-400" />
                            <span className="truncate max-w-[200px]">
                              {seller.email}
                            </span>
                          </div>
                          {seller.phone && (
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                              <Phone className="w-3.5 h-3.5 text-neutral-400" />
                              <span>{seller.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Orders */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-neutral-900">
                          {seller.totalOrders} {t("table.orders")}
                        </div>
                      </td>

                      {/* Revenue */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-emerald-600">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            notation: "compact",
                          }).format(seller.totalSpent)}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {getStatusBadge(seller.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewDetail(seller)}
                            className="p-2 text-[#3b4417] hover:bg-[#f5f3e8] rounded-lg transition-colors"
                            title={t("actions.view")}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleChangeStatus(seller)}
                            className={`p-2 rounded-lg transition-colors ${
                              seller.status === "active"
                                ? "text-amber-600 hover:bg-amber-50"
                                : "text-emerald-600 hover:bg-emerald-50"
                            }`}
                            title={
                              seller.status === "active"
                                ? t("actions.deactivate")
                                : t("actions.activate")
                            }
                          >
                            {seller.status === "active" ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              <Unlock className="w-4 h-4" />
                            )}
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {sellers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Users className="w-16 h-16 text-neutral-300 mb-4" />
              <p className="text-lg font-medium text-neutral-900 mb-2">
                {t("table.noSellers")}
              </p>
              <p className="text-sm text-neutral-500">
                {t("table.noSellersDesc")}
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
                {Math.min(pagination.currentPage * 10, pagination.totalRecords)}{" "}
                {t("pagination.of")} {pagination.totalRecords}
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
      {selectedSeller && (
        <>
          <SellerDetailModal
            seller={selectedSeller}
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            onEdit={() => {
              setShowDetailModal(false);
              handleEdit(selectedSeller);
            }}
          />
          <EditSellerModal
            seller={selectedSeller}
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSuccess={handleActionComplete}
          />
          <ChangeStatusModal
            seller={selectedSeller}
            isOpen={showStatusModal}
            onClose={() => setShowStatusModal(false)}
            onSuccess={handleActionComplete}
          />
        </>
      )}

      <CreateSellerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleActionComplete}
      />
    </div>
  );
}
