"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface OrderAnalyticsProps {
  data?: any[];
  loading?: boolean;
}

export default function OrderAnalytics({ data, loading }: OrderAnalyticsProps) {
  const t = useTranslations("analytics.orderAnalytics");

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{t("title")}</h3>
      <div className="h-64 flex items-center justify-center text-gray-500">
        {loading ? t("loading") : t("placeholder")}
      </div>
    </div>
  );
}
