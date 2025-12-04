"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const t = useTranslations("checkout");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">{t("review.title")}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t("review.shippingAddress")}
            </label>
            <textarea className="w-full border rounded px-3 py-2" rows={3} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50"
            >
              {t("address.form.cancel")}
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              {t("review.placeOrder")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
