"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  AlertTriangle,
  Loader2,
  CheckCircle,
  XCircle,
  Lock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { updateSellerStatus, type Seller } from "@/lib/adminSellerManagement";

interface ChangeStatusModalProps {
  seller: Seller;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChangeStatusModal({
  seller,
  isOpen,
  onClose,
  onSuccess,
}: ChangeStatusModalProps) {
  const t = useTranslations("admin.sellerManagement");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newStatus, setNewStatus] = useState(seller.status.toString());

  const handleSubmit = async () => {
    setError("");
    try {
      setLoading(true);
      await updateSellerStatus(seller.id, parseInt(newStatus));

      onSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message || t("statusModal.error"));
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "1":
        return <CheckCircle className="w-6 h-6 text-emerald-600" />;
      case "0":
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      case "-1":
        return <Lock className="w-6 h-6 text-red-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-neutral-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "1":
        return "bg-emerald-50 border-emerald-200";
      case "0":
        return "bg-amber-50 border-amber-200";
      case "-1":
        return "bg-red-50 border-red-200";
      default:
        return "bg-neutral-50 border-neutral-200";
    }
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
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-[#3b4417]">
                {t("statusModal.title")}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              {/* Seller Info */}
              <div className="flex items-center gap-3 mb-6 p-4 bg-neutral-50 rounded-lg">
                <img
                  src={seller.avatar}
                  alt={`${seller.firstName} ${seller.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#3b4417]">
                    {seller.firstName} {seller.lastName}
                  </p>
                  <p className="text-sm text-neutral-500">{seller.email}</p>
                </div>
              </div>

              {/* Status Selection */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">{t("statusModal.newStatus")}</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{t("status.active")}</SelectItem>
                      <SelectItem value="0">{t("status.inactive")}</SelectItem>
                      <SelectItem value="-1">{t("status.locked")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Preview */}
                <div
                  className={`p-4 rounded-lg border-2 ${getStatusColor(newStatus)}`}
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(newStatus)}
                    <div>
                      <p className="font-medium text-neutral-900">
                        {newStatus === "1"
                          ? t("status.active")
                          : newStatus === "0"
                            ? t("status.inactive")
                            : t("status.locked")}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {newStatus === "1"
                          ? t("statusModal.activeDesc")
                          : newStatus === "0"
                            ? t("statusModal.inactiveDesc")
                            : t("statusModal.lockedDesc")}
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
                disabled={loading}
                className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-50"
              >
                {t("statusModal.cancel")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading || newStatus === seller.status.toString()}
                className="flex items-center gap-2 px-6 py-2 bg-[#3b4417] text-amber-50 rounded-lg hover:bg-[#4c5b23] transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("statusModal.updating")}
                  </>
                ) : (
                  t("statusModal.update")
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
