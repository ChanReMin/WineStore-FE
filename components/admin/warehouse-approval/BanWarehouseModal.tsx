"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Ban, Loader2, AlertTriangle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  banWarehouse,
  type WarehouseRequest,
} from "@/services/warehouseApprovalService";

interface BanWarehouseModalProps {
  warehouse: WarehouseRequest;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BanWarehouseModal({
  warehouse,
  isOpen,
  onClose,
  onSuccess,
}: BanWarehouseModalProps) {
  const t = useTranslations("admin.warehouseApproval.ban");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError(t("reasonRequired"));
      return;
    }

    setError("");
    setLoading(true);

    try {
      await banWarehouse(warehouse.id, reason);
      onSuccess();
      onClose();
      setReason("");
    } catch (err) {
      const message =
        (err as any)?.response?.data?.errors?.[0]?.message ||
        (err as any)?.response?.data?.message ||
        (err as any)?.message ||
        (typeof err === "string" ? err : undefined) ||
        "Có lỗi xảy ra";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-orange-600 to-orange-700 p-6 text-white rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Ban className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-1">{t("title")}</h2>
                      <p className="text-white/80 text-sm">{t("subtitle")}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-orange-800 font-medium">
                        {t("warning")}
                      </p>
                    </div>
                    <p className="text-sm text-orange-700 ml-7">
                      <span className="font-semibold">
                        {t("warehouseName")}:
                      </span>{" "}
                      {warehouse.name}
                    </p>
                    <p className="text-sm text-orange-700 ml-7 mt-1">
                      <span className="font-semibold">{t("manager")}:</span>{" "}
                      {warehouse.manager.firstName} {warehouse.manager.lastName}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t("reasonLabel")} <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={reason}
                      onChange={(e) => {
                        setReason(e.target.value);
                        setError("");
                      }}
                      placeholder={t("reasonPlaceholder")}
                      rows={5}
                      className="resize-none"
                      required
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      {t("reasonHint")}
                    </p>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors font-medium disabled:opacity-50"
                  >
                    {t("cancel")}
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading || !reason.trim()}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t("banning")}
                      </>
                    ) : (
                      <>
                        <Ban className="w-4 h-4" />
                        {t("confirm")}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
