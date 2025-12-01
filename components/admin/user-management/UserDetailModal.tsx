"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  User as UserIcon,
  Edit,
  Key,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  fetchUserDetail,
  fetchUserActivities,
} from "@/services/userManagementService";
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
  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, user.id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [detailResponse, activitiesResponse] = await Promise.all([
        fetchUserDetail(user.id),
        fetchUserActivities(user.id, { limit: 5 }),
      ]);
      setUserDetail(detailResponse.data);
      setActivities(activitiesResponse.data.activities);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: number) => {
    const badges = {
      1: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: CheckCircle,
        label: t("status.active"),
      },
      0: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: AlertCircle,
        label: t("status.inactive"),
      },
      "-1": {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: XCircle,
        label: t("status.locked"),
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
                    {user.name.split(" ")[0]} {user.name.split(" ").slice(1).join(" ")}
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
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-12 h-12 border-4 border-[#3b4417] border-t-transparent rounded-full"
                  />
                </div>
              ) : userDetail ? (
                <div className="space-y-6">
                  <div className="flex items-start gap-6 p-6 bg-linear-to-br from-[#f5f3e8] to-white rounded-xl border border-[#3b4417]/10">
                    <img
                      src={userDetail.userInfo.avatar}
                      alt={`${userDetail.userInfo.firstName} ${userDetail.userInfo.lastName}`}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#3b4417] mb-2">
                        {userDetail.userInfo.firstName}{" "}
                        {userDetail.userInfo.lastName}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {getStatusBadge(userDetail.account.status)}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            userDetail.account.role === 0
                              ? "bg-blue-50 text-blue-700"
                              : userDetail.account.role === 1
                                ? "bg-purple-50 text-purple-700"
                                : "bg-orange-50 text-orange-700"
                          }`}
                        >
                          {userDetail.account.role === 0
                            ? t("role.customer")
                            : userDetail.account.role === 1
                              ? t("role.seller")
                              : t("role.admin")}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Mail className="w-4 h-4" />
                          <span>{userDetail.account.email}</span>
                        </div>
                        {userDetail.userInfo.phoneNumber && (
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Phone className="w-4 h-4" />
                            <span>{userDetail.userInfo.phoneNumber}</span>
                          </div>
                        )}
                        {userDetail.userInfo.dateOfBirth && (
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(
                                userDetail.userInfo.dateOfBirth
                              ).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-neutral-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            {t("detailModal.joined")}:{" "}
                            {new Date(
                              userDetail.account.createdAt
                            ).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">
                          {t("detailModal.totalOrders")}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        {userDetail.orderStats.totalOrders}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        {userDetail.orderStats.completedOrders}{" "}
                        {t("detailModal.completed")}
                      </p>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-900">
                          {t("detailModal.totalSpent")}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-emerald-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          notation: "compact",
                        }).format(userDetail.orderStats.totalSpent)}
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">
                          {t("detailModal.avgOrder")}
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          notation: "compact",
                        }).format(userDetail.orderStats.avgOrderValue)}
                      </p>
                    </div>
                  </div>

                  {userDetail.addresses && userDetail.addresses.length > 0 && (
                    <div className="p-6 bg-white rounded-xl border border-neutral-200">
                      <h4 className="text-lg font-bold text-[#3b4417] mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {t("detailModal.addresses")}
                      </h4>
                      <div className="space-y-3">
                        {userDetail.addresses.map((address: any) => (
                          <div
                            key={address.id}
                            className="p-4 bg-neutral-50 rounded-lg"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <p className="font-medium text-neutral-900">
                                {address.fullName}
                              </p>
                              {address.isDefault && (
                                <span className="px-2 py-1 bg-[#3b4417] text-white text-xs rounded">
                                  {t("detailModal.default")}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600">
                              {address.phoneNumber}
                            </p>
                            <p className="text-sm text-neutral-600">
                              {address.addressLine}, {address.ward},{" "}
                              {address.district}, {address.city}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activities.length > 0 && (
                    <div className="p-6 bg-white rounded-xl border border-neutral-200">
                      <h4 className="text-lg font-bold text-[#3b4417] mb-4">
                        {t("detailModal.recentActivities")}
                      </h4>
                      <div className="space-y-3">
                        {activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-[#3b4417] rounded-full mt-2" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-neutral-900">
                                {activity.description}
                              </p>
                              <p className="text-xs text-neutral-500">
                                {new Date(activity.createdAt).toLocaleString(
                                  "vi-VN"
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
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

