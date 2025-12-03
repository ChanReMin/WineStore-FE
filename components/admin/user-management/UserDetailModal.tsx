"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  DollarSign,
  User as UserIcon,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Shield,
  Store,
} from "lucide-react";
import type { User } from "@/services/userManagementService";

interface UserDetailModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

export default function UserDetailModal({
  user,
  isOpen,
  onClose,
  onEdit,
}: UserDetailModalProps) {
  const t = useTranslations("admin.userManagement");

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

  const getRoleBadge = (role: string) => {
    const badges = {
      customer: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: ShoppingBag,
        label: t("role.customer"),
      },
      seller: {
        bg: "bg-purple-50",
        text: "text-purple-700",
        icon: Store,
        label: t("role.seller"),
      },
      admin: {
        bg: "bg-orange-50",
        text: "text-orange-700",
        icon: Shield,
        label: t("role.admin"),
      },
    };
    const badge = badges[role as keyof typeof badges] || badges.customer;
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
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            <div className="sticky top-0 bg-linear-to-r from-[#3b4417] to-[#4c5b23] text-white px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {t("detailModal.title")}
                  </h2>
                  <p className="text-sm text-white/80">
                    {user.name.split(" ")[0]}{" "}
                    {user.name.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
              <div className="space-y-6">
                {/* User Info Card */}
                <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-[#f5f3e8] to-white rounded-xl border border-[#3b4417]/10">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3b4417] to-[#7a8451] flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#3b4417] mb-2">
                      {user.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {getStatusBadge(user.status)}
                      {getRoleBadge(user.role)}
                      {user.emailVerified && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          <CheckCircle className="w-3.5 h-3.5" />
                          {t("detailModal.emailVerified")}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {t("detailModal.joined")}:{" "}
                          {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      {user.lastLogin && (
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            {t("detailModal.lastLogin")}:{" "}
                            {new Date(user.lastLogin).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <ShoppingBag className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-blue-900">
                        {t("detailModal.totalOrders")}
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">
                      {user.totalOrders}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      {t("detailModal.ordersPlaced")}
                    </p>
                  </div>

                  <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-emerald-100 rounded-lg">
                        <DollarSign className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="text-sm font-medium text-emerald-900">
                        {t("detailModal.totalSpent")}
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        notation: "compact",
                      }).format(user.totalSpent)}
                    </p>
                    <p className="text-xs text-emerald-600 mt-2">
                      {t("detailModal.lifetimeValue")}
                    </p>
                  </div>
                </div>

                {/* User ID Card */}
                <div className="p-6 bg-white rounded-xl border border-neutral-200">
                  <h4 className="text-lg font-bold text-[#3b4417] mb-4">
                    {t("detailModal.accountInfo")}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        {t("detailModal.userId")}
                      </p>
                      <p className="text-sm font-mono font-medium text-neutral-900">
                        {user.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        {t("detailModal.accountStatus")}
                      </p>
                      <p className="text-sm font-medium text-neutral-900">
                        {getStatusBadge(user.status)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        {t("detailModal.role")}
                      </p>
                      <p className="text-sm font-medium text-neutral-900">
                        {getRoleBadge(user.role)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">
                        {t("detailModal.emailStatus")}
                      </p>
                      <p className="text-sm font-medium text-neutral-900">
                        {user.emailVerified ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            {t("detailModal.verified")}
                          </span>
                        ) : (
                          <span className="text-amber-600 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {t("detailModal.notVerified")}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Avatar Display */}
                {user.avatar && (
                  <div className="p-6 bg-white rounded-xl border border-neutral-200">
                    <h4 className="text-lg font-bold text-[#3b4417] mb-4">
                      {t("detailModal.avatar")}
                    </h4>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-lg object-cover border-2 border-neutral-200"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex items-center justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                {t("detailModal.close")}
              </motion.button>
              {/* Reset Password feature - Coming soon */}
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {}}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Key className="w-4 h-4" />
                {t("detailModal.resetPassword")}
              </motion.button> */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 bg-[#3b4417] text-white rounded-lg hover:bg-[#4c5b23] transition-colors"
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
