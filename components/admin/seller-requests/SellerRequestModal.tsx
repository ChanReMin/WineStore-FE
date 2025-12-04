"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface SellerRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId?: string;
}

export default function SellerRequestModal({
  isOpen,
  onClose,
  requestId,
}: SellerRequestModalProps) {
  const t = useTranslations("admin.sellerRequests");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {t("title") || "Seller Request"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            {t("requestId") || "Request ID"}: {requestId}
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              {t("approve") || "Approve"}
            </button>
            <button className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">
              {t("reject") || "Reject"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
