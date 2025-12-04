"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface WineRecommendationsProps {
  userId: string;
  category?: string;
  limit?: number;
}

export default function WineRecommendations({
  userId,
  category,
  limit = 6,
}: WineRecommendationsProps) {
  const t = useTranslations("recommendations.wineRecommendations");

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{t("title")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="w-full h-32 bg-gray-200 rounded mb-2" />
            <h4 className="font-medium">Wine {i + 1}</h4>
            <p className="text-sm text-gray-600">$29.99</p>
          </div>
        ))}
      </div>
    </div>
  );
}
