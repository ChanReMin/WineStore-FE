"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Store } from "lucide-react";
import { toast } from "react-toastify";

interface BecomeSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BecomeSellerModal({
  isOpen,
  onClose,
}: BecomeSellerModalProps) {
  const t = useTranslations("becomeSeller");
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // TODO: Call API to submit seller request
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      toast.success(t("successMessage"));
      onClose();
    } catch (error) {
      toast.error(t("errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Use portal to render outside of parent DOM tree
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-9998 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Wrapper */}
          <div className="fixed inset-0 z-9999 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 14 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5 rounded-t-2xl bg-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#414a23] to-[#59682c] shadow-inner">
                      <Store className="h-6 w-6 text-amber-50" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-[#2b2f1a] leading-tight">
                        {t("title")}
                      </h2>
                      <p className="text-sm text-neutral-600">
                        {t("subtitle")}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl p-2 text-neutral-400 transition-all hover:bg-neutral-100 hover:text-neutral-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  {/* Icon & Message */}
                  <div className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 shadow-inner mb-4">
                      <Store className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                      {t("confirmTitle")}
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                      {t("confirmMessage")}
                    </p>
                  </div>

                  {/* Info Box */}
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 shadow-sm">
                    <p className="text-sm text-amber-900 text-center leading-relaxed">
                      <strong>{t("note")}:</strong> {t("noteMessage")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSubmitting}
                      className="flex-1 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-400 disabled:opacity-50"
                    >
                      {t("cancel")}
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 rounded-lg bg-linear-to-br from-[#414a23] to-[#59682c] px-6 py-3 text-sm font-medium text-amber-50 shadow-md transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t("submitting") : t("submit")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>,

    document.body
  );
}
