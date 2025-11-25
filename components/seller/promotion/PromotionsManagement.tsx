"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { mockGetPromotions } from "@/lib/promotions.mock";
import PromotionsTable from "./PromotionsTable";
import PromotionFormModal from "./PromotionFormModal";
import PromotionDetailModal from "./PromotionDetailModal";
import PromotionAnalyticsCharts from "./PromotionAnalyticsCharts";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { mockPromotionStatistics } from "@/lib/promotions.mock";
import type { Promotion } from "@/types/promotion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PromotionsManagement() {
  const t = useTranslations("seller.promotions");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPromotion, setSelectedPromotion] = useState<number | null>(null);
  const [promotionToDelete, setPromotionToDelete] = useState<Promotion | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const promotions = mockGetPromotions.data.promotions;

  // Filter promotions
  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch =
      promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || promo.status.toString() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (promo: Promotion) => {
    setSelectedPromotion(promo.id);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (promo: Promotion) => {
    setSelectedPromotion(promo.id);
    setIsModalOpen(true);
  };

  const handleDelete = (promo: Promotion) => {
    setPromotionToDelete(promo);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!promotionToDelete) return;

    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      // TODO: Call API to delete
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setPromotionToDelete(null);
    }, 1500);
  };

  const handleCreate = () => {
    setSelectedPromotion(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPromotion(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPromotion(null);
  };

  const handleCloseDeleteModal = () => {
    if (!isDeleting) {
      setIsDeleteModalOpen(false);
      setPromotionToDelete(null);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3b4417] tracking-wide">
            {t("title")}
          </h1>
          <p className="text-[#7a8451] mt-1">
            {t("subtitle")}
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-[#3b4417] hover:bg-[#2a2f18] text-amber-50 shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("addPromotion")}
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-[#d4d6b4] p-4"
      >
        <div className="flex gap-4">
          {/* Search */}
          <div className="relative flex-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8451]" />
            <Input
              placeholder={t("filters.searchPlaceholder")}
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#d4d6b4] focus:border-[#3b4417] focus:ring-[#3b4417]"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="flex flex-1 border-[#d4d6b4] focus:border-[#3b4417] focus:ring-[#3b4417]">
              <Filter className="w-4 h-4 mr-2 text-[#7a8451]" />
              <SelectValue placeholder={t("filters.statusPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.all")}</SelectItem>
              <SelectItem value="1">{t("filters.active")}</SelectItem>
              <SelectItem value="0">{t("filters.inactive")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg shadow-sm border border-[#d4d6b4] p-4">
          <p className="text-xs text-[#7a8451] uppercase tracking-wide mb-1">
            {t("summary.total")}
          </p>
          <p className="text-2xl font-bold text-[#3b4417]">{promotions.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#d4d6b4] p-4">
          <p className="text-xs text-[#7a8451] uppercase tracking-wide mb-1">
            {t("summary.active")}
          </p>
          <p className="text-2xl font-bold text-green-600">
            {promotions.filter((p) => p.status === 1).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#d4d6b4] p-4">
          <p className="text-xs text-[#7a8451] uppercase tracking-wide mb-1">
            {t("summary.totalUsage")}
          </p>
          <p className="text-2xl font-bold text-[#3b4417]">
            {promotions.reduce((sum, p) => sum + p.used_count, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-[#d4d6b4] p-4">
          <p className="text-xs text-[#7a8451] uppercase tracking-wide mb-1">
            {t("summary.remaining")}
          </p>
          <p className="text-2xl font-bold text-orange-600">
            {promotions.reduce((sum, p) => sum + (p.max_usage - p.used_count), 0)}
          </p>
        </div>
      </motion.div>

      {/* Analytics Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <PromotionAnalyticsCharts
          usageData={mockPromotionStatistics.data.usage_by_date}
          promotions={promotions}
        />
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <PromotionsTable
          promotions={filteredPromotions}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <PromotionFormModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            promotionId={selectedPromotion}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDetailModalOpen && selectedPromotion && (
          <PromotionDetailModal
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            promotionId={selectedPromotion}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && promotionToDelete && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onConfirm={handleConfirmDelete}
            title="Xóa khuyến mãi"
            description="Bạn có chắc chắn muốn xóa khuyến mãi này? Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn."
            itemName={`${promotionToDelete.code} - ${promotionToDelete.name}`}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
