"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  Mail,
  Phone,
  Calendar,
  User,
  Warehouse,
  TrendingUp,
  Clock,
  Edit,
} from "lucide-react";
import { type Seller } from "@/lib/adminSellerManagement";

interface SellerDetailModalProps {
  seller: Seller;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export default function SellerDetailModal({
  seller,
  isOpen,
  onClose,
  onEdit,
}: SellerDetailModalProps) {
  const t = useTranslations("admin.sellerManagement");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-[#fdfbf5]">
              <h2 className="text-2xl font-bold text-[#3b4417]">
                {t("detailModal.title")}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Profile Section */}
              <div className="flex items-start gap-6 mb-6 p-6 bg-[#fdfbf5] rounded-xl">
                <img
                  src={seller.avatar}
                  alt={`${seller.first_name} ${seller.last_name}`}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#3b4417] mb-2">
                    {seller.first_name} {seller.last_name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        seller.status === 1
                          ? "bg-emerald-50 text-emerald-700"
                          : seller.status === 0
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {seller.status === 1
                        ? t("status.active")
                        : seller.status === 0
                          ? t("status.inactive")
                          : t("status.locked")}
                    </span>
                    <span className="text-sm text-neutral-500">
                      ID: {seller.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#3b4417] mb-4">
                  {t("detailModal.contactInfo")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                    <Mail className="w-5 h-5 text-[#7a8451]" />
                    <div>
                      <p className="text-xs text-neutral-500">Email</p>
                      <p className="font-medium text-neutral-900">
                        {seller.email}
                      </p>
                    </div>
                  </div>
                  {seller.phone_number && (
                    <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                      <Phone className="w-5 h-5 text-[#7a8451]" />
                      <div>
                        <p className="text-xs text-neutral-500">
                          {t("detailModal.phone")}
                        </p>
                        <p className="font-medium text-neutral-900">
                          {seller.phone_number}
                        </p>
                      </div>
                    </div>
                  )}
                  {seller.date_of_birth && (
                    <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-[#7a8451]" />
                      <div>
                        <p className="text-xs text-neutral-500">
                          {t("detailModal.dob")}
                        </p>
                        <p className="font-medium text-neutral-900">
                          {new Date(seller.date_of_birth).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                    <User className="w-5 h-5 text-[#7a8451]" />
                    <div>
                      <p className="text-xs text-neutral-500">
                        {t("detailModal.gender")}
                      </p>
                      <p className="font-medium text-neutral-900">
                        {seller.gender === 1
                          ? t("gender.male")
                          : t("gender.female")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              {seller.statistics && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#3b4417] mb-4">
                    {t("detailModal.statistics")}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-blue-600 font-medium">
                          {t("stats.orders")}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-blue-700">
                        {seller.statistics.total_orders_handled}
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        <p className="text-sm text-emerald-600 font-medium">
                          {t("stats.revenue")}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-emerald-700">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          notation: "compact",
                        }).format(seller.statistics.total_revenue)}
                      </p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">⭐</span>
                        <p className="text-sm text-amber-600 font-medium">
                          {t("stats.rating")}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-amber-700">
                        {seller.statistics.average_rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Managed Warehouses */}
              {seller.managed_warehouses.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-[#3b4417] mb-4">
                    {t("detailModal.warehouses")}
                  </h4>
                  <div className="space-y-3">
                    {seller.managed_warehouses.map((warehouse) => (
                      <div
                        key={warehouse.warehouse_id}
                        className="flex items-center gap-3 p-4 bg-[#f5f3e8] rounded-lg"
                      >
                        <Warehouse className="w-5 h-5 text-[#3b4417]" />
                        <div>
                          <p className="font-medium text-[#3b4417]">
                            {warehouse.warehouse_name}
                          </p>
                          {warehouse.location && (
                            <p className="text-sm text-neutral-600">
                              {warehouse.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity Info */}
              <div>
                <h4 className="text-lg font-semibold text-[#3b4417] mb-4">
                  {t("detailModal.activity")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                    <Clock className="w-5 h-5 text-[#7a8451]" />
                    <div>
                      <p className="text-xs text-neutral-500">
                        {t("detailModal.lastLogin")}
                      </p>
                      <p className="font-medium text-neutral-900">
                        {new Date(seller.last_login_at).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#7a8451]" />
                    <div>
                      <p className="text-xs text-neutral-500">
                        {t("detailModal.createdAt")}
                      </p>
                      <p className="font-medium text-neutral-900">
                        {new Date(seller.created_at).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 bg-neutral-50">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                {t("detailModal.close")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onEdit}
                className="flex items-center gap-2 px-6 py-2 bg-[#3b4417] text-amber-50 rounded-lg hover:bg-[#4c5b23] transition-colors"
              >
                <Edit className="w-4 h-4" />
                {t("detailModal.edit")}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
