"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import {
  approveSellerRequest,
  rejectSellerRequest,
  type SellerRequest,
} from "@/lib/adminSellerRequests";

interface ApproveRejectModalProps {
  type: "approve" | "reject";
  request: SellerRequest;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApproveRejectModal({
  type,
  request,
  onClose,
  onSuccess,
}: ApproveRejectModalProps) {
  const t = useTranslations("admin.sellerRequests.modal");
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (type === "reject" && !reason.trim()) {
      setError(t("reasonRequired"));
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (type === "approve") {
        await approveSellerRequest(request.id, note);
      } else {
        await rejectSellerRequest(request.id, reason, note);
      }

      onSuccess();
    } catch (err) {
      setError(t("error"));
      console.error("Error processing request:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div
          className={`px-6 py-4 ${
            type === "approve"
              ? "bg-linear-to-r from-green-600 to-green-700"
              : "bg-linear-to-r from-red-600 to-red-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              {type === "approve" ? (
                <CheckCircle2 className="w-6 h-6 text-white" />
              ) : (
                <XCircle className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {type === "approve" ? t("approveTitle") : t("rejectTitle")}
              </h3>
              <p className="text-sm text-white/90">
                {type === "approve"
                  ? t("approveSubtitle")
                  : t("rejectSubtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Info */}
          <div className="bg-neutral-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={request.user.avatar}
                alt={request.user.fullName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-neutral-900">
                  {request.user.fullName}
                </p>
                <p className="text-sm text-neutral-600">{request.user.email}</p>
              </div>
            </div>
          </div>

          {/* Warning for Reject */}
          {type === "reject" && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">
                    {t("warning")}
                  </h4>
                  <p className="text-sm text-amber-700">{t("rejectWarning")}</p>
                </div>
              </div>
            </div>
          )}

          {/* Reason (for reject) */}
          {type === "reject" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                {t("reason")} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  setError("");
                }}
                placeholder={t("reasonPlaceholder")}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>
          )}

          {/* Note (optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {t("note")}{" "}
              <span className="text-neutral-400">({t("optional")})</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("notePlaceholder")}
              rows={3}
              className={`w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 ${
                type === "approve"
                  ? "focus:ring-green-500"
                  : "focus:ring-red-500"
              } focus:border-transparent resize-none`}
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
            >
              <p className="text-sm text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </p>
            </motion.div>
          )}

          {/* Confirmation Message */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-neutral-700">
              {type === "approve" ? t("approveConfirm") : t("rejectConfirm")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 font-medium hover:bg-neutral-100 transition-colors disabled:opacity-50"
          >
            {t("cancel")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium transition-colors flex items-center gap-2 disabled:opacity-50 ${
              type === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("processing")}
              </>
            ) : (
              <>
                {type === "approve" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {type === "approve" ? t("confirmApprove") : t("confirmReject")}
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
