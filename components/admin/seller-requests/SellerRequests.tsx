"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Search,
  Filter,
  UserCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
} from "lucide-react";
import {
  fetchSellerRequests,
  type SellerRequest,
} from "@/lib/adminSellerRequests";
import SellerRequestDetail from "./SellerRequestDetail";

export default function SellerRequests() {
  const t = useTranslations("admin.sellerRequests");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [requests, setRequests] = useState<SellerRequest[]>([]);
  const [summary, setSummary] = useState({
    total_requests: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Detail modal
  const [selectedRequest, setSelectedRequest] = useState<SellerRequest | null>(
    null
  );

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetchSellerRequests({
        page: pagination.currentPage,
        limit: 10,
        status: statusFilter,
        sort: sortBy,
      });

      setRequests(response.data.requests);
      setSummary(response.data.summary);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error loading seller requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    loadData();
  }, [statusFilter, sortBy, pagination.currentPage]);

  // Filter requests by search query with useMemo for optimization
  const filteredRequests = useMemo(
    () =>
      requests.filter((request) => {
    const searchLower = debouncedSearchQuery.toLowerCase();
    return (
      request.user.fullName.toLowerCase().includes(searchLower) ||
      request.user.email.toLowerCase().includes(searchLower) ||
      request.user.phoneNumber.includes(debouncedSearchQuery) ||
      request.id.toString().includes(debouncedSearchQuery)
    );
      }),
    [requests, debouncedSearchQuery]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle2 className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return t("status.pending");
      case "approved":
        return t("status.approved");
      case "rejected":
        return t("status.rejected");
      default:
        return status;
    }
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
    <>
      <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#3b4417] tracking-wide">
              {t("title")}
            </h1>
            <p className="text-[#7a8451]">{t("subtitle")}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-[#3b4417] text-amber-50 rounded-lg hover:bg-[#4c5b23] transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">{t("refresh")}</span>
          </motion.button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: t("summary.total"),
              value: summary.total_requests,
              icon: UserCheck,
              color: "bg-blue-50 border-blue-200 text-blue-700",
              iconBg: "bg-blue-100",
            },
            {
              label: t("summary.pending"),
              value: summary.pending,
              icon: Clock,
              color: "bg-amber-50 border-amber-200 text-amber-700",
              iconBg: "bg-amber-100",
            },
            {
              label: t("summary.approved"),
              value: summary.approved,
              icon: CheckCircle2,
              color: "bg-green-50 border-green-200 text-green-700",
              iconBg: "bg-green-100",
            },
            {
              label: t("summary.rejected"),
              value: summary.rejected,
              icon: XCircle,
              color: "bg-red-50 border-red-200 text-red-700",
              iconBg: "bg-red-100",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${stat.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-80">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-neutral-200 p-4"
        >
          <div className="flex flex-row gap-4">
            {/* Search */}
            <div className="flex-3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder={t("filters.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex-1 relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | "all"
                      | "pending"
                      | "approved"
                      | "rejected"
                  )
                }
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent appearance-none bg-white"
              >
                <option value="all">{t("filters.all")}</option>
                <option value="pending">{t("filters.pending")}</option>
                <option value="approved">{t("filters.approved")}</option>
                <option value="rejected">{t("filters.rejected")}</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
              className="flex-1 w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent appearance-none bg-white"
            >
              <option value="newest">{t("filters.newest")}</option>
              <option value="oldest">{t("filters.oldest")}</option>
            </select>
          </div>
        </motion.div>

        {/* Requests Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg border border-neutral-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    {t("table.id")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    {t("table.user")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    {t("table.contact")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    {t("table.stats")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    {t("table.status")}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    {t("table.requestDate")}
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                    {t("table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <AnimatePresence mode="popLayout">
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-neutral-500">
                          <UserCheck className="w-12 h-12 mb-3 opacity-30" />
                          <p className="font-medium">{t("table.noRequests")}</p>
                          <p className="text-sm mt-1">
                            {t("table.noRequestsDesc")}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request, index) => (
                      <motion.tr
                        key={request.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-neutral-50 transition-colors"
                      >
                        <td className="px-4 py-4 text-sm font-medium text-neutral-900">
                          #{request.id}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={request.user.avatar}
                              alt={request.user.fullName}
                              className="w-10 h-10 rounded-full bg-neutral-100"
                            />
                            <div>
                              <p className="text-sm font-medium text-neutral-900">
                                {request.user.fullName}
                              </p>
                              <p className="text-xs text-neutral-500">
                                ID: {request.user.userId}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-neutral-900">
                            {request.user.email}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {request.user.phoneNumber}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <p className="text-neutral-900">
                              {request.user.totalOrders || 0}{" "}
                              {t("table.orders")}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {new Intl.NumberFormat("vi-VN").format(
                                request.user.totalSpent || 0
                              )}{" "}
                              đ
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {getStatusIcon(request.status)}
                            {getStatusText(request.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-neutral-600">
                          {new Date(request.createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedRequest(request)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3b4417] text-amber-50 rounded-lg text-sm font-medium hover:bg-[#4c5b23] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            {t("table.view")}
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between">
              <p className="text-sm text-neutral-600">
                {t("pagination.showing")}{" "}
                {(pagination.currentPage - 1) * 10 + 1}-
                {Math.min(pagination.currentPage * 10, pagination.totalItems)}{" "}
                {t("pagination.of")} {pagination.totalItems}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: prev.currentPage - 1,
                    }))
                  }
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("pagination.previous")}
                </button>
                <button
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: prev.currentPage + 1,
                    }))
                  }
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-1 border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("pagination.next")}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <SellerRequestDetail
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onUpdate={loadData}
          />
        )}
      </AnimatePresence>
    </>
  );
}
