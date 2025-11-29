"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, XCircle, Loader2, AlertTriangle } from "lucide-react";
import { banProduct } from "@/services/productService";
import type { Product } from "@/types/product";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RejectModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RejectModal({
  product,
  isOpen,
  onClose,
  onSuccess,
}: RejectModalProps) {
  const t = useTranslations("admin.productApproval.rejectModal");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const rejectReasons = [
    "incomplete_info",
    "poor_quality_images",
    "incorrect_pricing",
    "duplicate_product",
    "prohibited_item",
    "other",
  ];

  const handleSubmit = async () => {
    if (!reason) {
      alert(t("selectReason"));
      return;
    }

    try {
      setLoading(true);
      const noteWithReason = `${t(`reasons.${reason}`)}${note ? `: ${note}` : ""}`;
      await banProduct(product.id, noteWithReason);
      onSuccess();
      onClose();
      setReason("");
      setNote("");
    } catch (error) {
      console.error("Error banning product:", error);
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
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-red-50">
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 p-2 rounded-lg">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-red-900">
                    {t("title")}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 mb-2">
                    {t("productName")}
                  </p>
                  <p className="font-semibold text-neutral-900">
                    {product.name}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    ID: {product.id}
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <p className="text-sm text-red-800">
                      {t("warningMessage")}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t("reason")} <span className="text-red-600">*</span>
                  </label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectReasonPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {rejectReasons.map((r) => (
                        <SelectItem key={r} value={r}>
                          {t(`reasons.${r}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t("note")} ({t("optional")})
                  </label>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t("notePlaceholder")}
                    rows={4}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 bg-neutral-50">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-50"
                >
                  {t("cancel")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={loading || !reason}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("rejecting")}
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      {t("reject")}
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
