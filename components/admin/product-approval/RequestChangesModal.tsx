"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, AlertCircle, Loader2, Plus, Trash2 } from "lucide-react";
import {
  type ProductApproval,
  requestProductChanges,
} from "@/lib/adminProductApprovals";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface RequestChangesModalProps {
  product: ProductApproval;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RequestChangesModal({
  product,
  isOpen,
  onClose,
  onSuccess,
}: RequestChangesModalProps) {
  const t = useTranslations("admin.productApproval.requestChangesModal");
  const [changesRequired, setChangesRequired] = useState<string[]>([""]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const addChangeField = () => {
    setChangesRequired([...changesRequired, ""]);
  };

  const removeChangeField = (index: number) => {
    setChangesRequired(changesRequired.filter((_, i) => i !== index));
  };

  const updateChangeField = (index: number, value: string) => {
    const updated = [...changesRequired];
    updated[index] = value;
    setChangesRequired(updated);
  };

  const handleSubmit = async () => {
    const validChanges = changesRequired.filter((c) => c.trim() !== "");

    if (validChanges.length === 0) {
      alert(t("addAtLeastOne"));
      return;
    }

    try {
      setLoading(true);
      await requestProductChanges(product.id, validChanges, note);
      onSuccess();
      onClose();
      setChangesRequired([""]);
      setNote("");
    } catch (error) {
      console.error("Error requesting changes:", error);
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
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-blue-50">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-blue-900">
                    {t("title")}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 mb-2">
                    {t("productName")}
                  </p>
                  <p className="font-semibold text-neutral-900">
                    {product.name}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    SKU: {product.sku}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">{t("infoMessage")}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t("changesRequired")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="space-y-2">
                    {changesRequired.map((change, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-2"
                      >
                        <Input
                          value={change}
                          onChange={(e) =>
                            updateChangeField(index, e.target.value)
                          }
                          placeholder={t("changePlaceholder")}
                          className="flex-1"
                        />
                        {changesRequired.length > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeChangeField(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addChangeField}
                    className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    {t("addMore")}
                  </motion.button>
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
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      {t("send")}
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
