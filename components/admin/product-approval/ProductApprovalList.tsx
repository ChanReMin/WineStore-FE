"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Package,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
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
import { fetchProducts } from "@/services/productService";
import type { Product } from "@/types/product";
import ProductDetailModal from "./ProductDetailModal";
import ApproveModal from "./ApproveModal";
import RejectModal from "./RejectModal";


export default function ProductApprovalList() {
  const t = useTranslations("admin.productApproval");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    active: 0,
    banned: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | "all">("all");

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const loadData = async (page = 1) => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit: 10,
      };
      
      // Add status filter to API params
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }
      
      const response = await fetchProducts(params);
      
      setProducts(response.data.products);
      setPagination(response.data.pagination);
      setSummary(response.data.summary);
      console.log(response.data.summary)
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const handlePageChange = (newPage: number) => {
    loadData(newPage);
  };

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleApprove = (product: Product) => {
    setSelectedProduct(product);
    setShowApproveModal(true);
  };

  const handleReject = (product: Product) => {
    setSelectedProduct(product);
    setShowRejectModal(true);
  };

  const handleActionComplete = () => {
    loadData(pagination.currentPage);
  };

  const getStatusBadge = (status: number | undefined, statusText: string | undefined) => {
    const badges = {
      0: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: Clock,
        label: statusText || t("status.pending"),
      },
      1: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: CheckCircle,
        label: statusText || t("status.approved"),
      },
      2: {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: XCircle,
        label: statusText || t("status.banned"),
      },
    };

    const badge = badges[(status ?? 0) as keyof typeof badges] || badges[0];
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

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ),
    [products, debouncedSearchQuery]
  );

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-neutral-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.total")}
                  </p>
                  <p className="text-3xl font-bold text-neutral-900">
                    {summary.total}
                  </p>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl">
                  <Package className="w-6 h-6 text-neutral-600" />
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
          <Card className="border-amber-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.pending")}
                  </p>
                  <p className="text-3xl font-bold text-amber-600">
                    {summary.pending}
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
          transition={{ delay: 0.3 }}
        >
          <Card className="border-emerald-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.active")}
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {summary.active}
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
          transition={{ delay: 0.4 }}
        >
          <Card className="border-red-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {t("summary.banned")}
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {summary.banned}
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
          <div className="flex flex-row gap-4">
            <div className="relative flex-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="w-48 flex-1">
              <Select
                value={String(statusFilter)}
                onValueChange={(value) =>
                  setStatusFilter(value === "all" ? "all" : Number(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("filters.all")}</SelectItem>
                  <SelectItem value="0">{t("filters.pending")}</SelectItem>
                  <SelectItem value="1">{t("filters.approved")}</SelectItem>
                  <SelectItem value="2">{t("filters.banned")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.product")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.category")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.price")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                    {t("table.inventory")}
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
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-[#3b4417]">
                            {product.name}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {product.brand.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-neutral-900">
                          {product.category.name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-neutral-900">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-neutral-900">
                          {product.totalInventory}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(product.status, product.statusText)}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {product.createdAt ? new Date(product.createdAt).toLocaleDateString(
                          "vi-VN"
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewDetail(product)}
                            className="p-2 text-[#3b4417] hover:bg-[#f5f3e8] rounded-lg transition-colors"
                            title={t("actions.viewDetail")}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          {product.status === 0 && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleApprove(product)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title={t("actions.approve")}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleReject(product)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title={t("actions.ban")}
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

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200">
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
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {selectedProduct && (
        <>
          <ProductDetailModal
            product={selectedProduct}
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            onApprove={() => {
              setShowDetailModal(false);
              handleApprove(selectedProduct);
            }}
            onReject={() => {
              setShowDetailModal(false);
              handleReject(selectedProduct);
            }}
          />
          <ApproveModal
            product={selectedProduct}
            isOpen={showApproveModal}
            onClose={() => setShowApproveModal(false)}
            onSuccess={handleActionComplete}
          />
          <RejectModal
            product={selectedProduct}
            isOpen={showRejectModal}
            onClose={() => setShowRejectModal(false)}
            onSuccess={handleActionComplete}
          />

        </>
      )}
    </div>
  );
}
