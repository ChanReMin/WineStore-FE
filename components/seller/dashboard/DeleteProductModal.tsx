"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import type { Product } from "@/types/product";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productId: number) => Promise<void>;
  product: Product | null;
}

export default function DeleteProductModal({
  isOpen,
  onClose,
  onConfirm,
  product,
}: DeleteProductModalProps) {
  const t = useTranslations("seller.products.delete");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!product) return;

    setIsDeleting(true);
    try {
      await onConfirm(product.id);
      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!product) return null;

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
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 p-4"
          >
            <Card className="border-[#d4d6b4] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e8e6dc] bg-red-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-red-900">
                      {t("title")}
                    </h2>
                    <p className="text-sm text-red-700">{t("subtitle")}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  disabled={isDeleting}
                  className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <X className="w-5 h-5 text-red-900" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4">
                  <p className="text-sm text-[#7a8451] mb-2">
                    {t("deletingProduct")}
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-[#3b4417] text-lg">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[#7a8451]">
                      <span>ID: #{product.id}</span>
                      <span>•</span>
                      <span>{product.brand.name}</span>
                      <span>•</span>
                      <span>{product.category.name}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div className="space-y-2">
                      <p className="font-medium text-red-900">
                        {t("importantNote")}
                      </p>
                      <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                        <li>{t("permanentDelete")}</li>
                        <li>{t("cannotRecover")}</li>
                        <li>{t("checkOrders")}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#7a8451]">{t("confirmQuestion")}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                <button
                  onClick={onClose}
                  disabled={isDeleting}
                  className="px-6 py-2.5 border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium disabled:opacity-50"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t("deleting")}
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      {t("deleteProduct")}
                    </>
                  )}
                </button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
