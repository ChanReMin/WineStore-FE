"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import type { SellerRequest } from "@/lib/adminSellerRequests";
import ApproveRejectModal from "./ApproveRejectModal";

interface SellerRequestDetailProps {
  request: SellerRequest;
  onClose: () => void;
  onUpdate: () => void;
}

export default function SellerRequestDetail({
  request,
  onClose,
  onUpdate,
}: SellerRequestDetailProps) {
  const t = useTranslations("admin.sellerRequests.detail");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

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
        return <Clock className="w-5 h-5" />;
      case "approved":
        return <CheckCircle2 className="w-5 h-5" />;
      case "rejected":
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-linear-to-r from-[#3b4417] to-[#4c5b23] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {t("title")} #{request.id}
                </h2>
                <p className="text-sm text-amber-100">{t("subtitle")}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {/* Status Badge */}
            <div className="mb-6">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(
                  request.status
                )}`}
              >
                {getStatusIcon(request.status)}
                <span className="font-semibold">{request.statusText}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                {t("userInfo")}
              </h3>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={request.user.avatar}
                  alt={request.user.fullName}
                  className="w-20 h-20 rounded-full bg-white border-2 border-white shadow-md"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-neutral-900 mb-1">
                    {request.user.fullName}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Mail className="w-4 h-4" />
                      {request.user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Phone className="w-4 h-4" />
                      {request.user.phoneNumber}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <User className="w-4 h-4" />
                      {t("userId")}: {request.user.userId} | {t("accountId")}:{" "}
                      {request.user.accountId}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-medium">
                      {t("totalOrders")}
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {request.user.totalOrders || 0}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-medium">
                      {t("totalSpent")}
                    </p>
                    <p className="text-xl font-bold text-green-700">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(request.user.totalSpent || 0)}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-purple-50 border border-purple-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-600 font-medium">
                      {t("accountAge")}
                    </p>
                    <p className="text-2xl font-bold text-purple-700">
                      {request.user.account_age_days || 0} {t("days")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Request Details */}
            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#3b4417] mb-4">
                {t("requestDetails")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                  <span className="text-sm font-medium text-neutral-600">
                    {t("currentRole")}
                  </span>
                  <span className="text-sm font-semibold text-neutral-900">
                    {request.currentRole === 0 ? t("customer") : t("seller")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                  <span className="text-sm font-medium text-neutral-600">
                    {t("requestedRole")}
                  </span>
                  <span className="text-sm font-semibold text-neutral-900">
                    {request.requestedRole === 1 ? t("seller") : t("customer")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                  <span className="text-sm font-medium text-neutral-600">
                    {t("requestDate")}
                  </span>
                  <span className="text-sm font-semibold text-neutral-900">
                    {new Date(request.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
                {request.updatedAt && (
                  <div className="flex justify-between items-center py-2 border-b border-neutral-200">
                    <span className="text-sm font-medium text-neutral-600">
                      {t("updatedDate")}
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {new Date(request.updatedAt).toLocaleString("vi-VN")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Rejection Reason */}
            {request.status === "rejected" && request.reason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">
                      {t("rejectionReason")}
                    </h4>
                    <p className="text-sm text-red-700">{request.reason}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendation */}
            {request.status === "pending" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">
                      {t("recommendation")}
                    </h4>
                    <p className="text-sm text-amber-700">
                      {t("recommendationText")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {request.status === "pending" && (
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 font-medium hover:bg-neutral-100 transition-colors"
              >
                {t("close")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowRejectModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                {t("reject")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowApproveModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t("approve")}
              </motion.button>
            </div>
          )}

          {request.status !== "pending" && (
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-2 bg-[#3b4417] text-white rounded-lg font-medium hover:bg-[#4c5b23] transition-colors"
              >
                {t("close")}
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Approve/Reject Modals */}
      {showApproveModal && (
        <ApproveRejectModal
          type="approve"
          request={request}
          onClose={() => setShowApproveModal(false)}
          onSuccess={() => {
            setShowApproveModal(false);
            onUpdate();
            onClose();
          }}
        />
      )}

      {showRejectModal && (
        <ApproveRejectModal
          type="reject"
          request={request}
          onClose={() => setShowRejectModal(false)}
          onSuccess={() => {
            setShowRejectModal(false);
            onUpdate();
            onClose();
          }}
        />
      )}
    </>
  );
}
