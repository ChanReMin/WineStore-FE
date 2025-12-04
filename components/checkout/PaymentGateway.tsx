"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface PaymentGatewayProps {
  amount?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function PaymentGateway({
  amount,
  onSuccess,
  onError,
}: PaymentGatewayProps) {
  const t = useTranslations("checkout.payment");

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{t("title")}</h3>
      <div className="space-y-4">
        <div className="text-2xl font-bold">
          ${amount?.toFixed(2) || "0.00"}
        </div>
        <div className="space-y-2">
          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            {t("payWithCard") || "Pay with Card"}
          </button>
          <button className="w-full bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600">
            {t("payWithPayPal") || "Pay with PayPal"}
          </button>
        </div>
      </div>
    </div>
  );
}
