"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

interface PersonalizedSuggestionsProps {
  userId?: string;
  limit?: number;
}

export default function PersonalizedSuggestions({ userId, limit = 4 }: PersonalizedSuggestionsProps) {
  const t = useTranslations('recommendations.personalizedSuggestions');
  
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
      <div className="space-y-3">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="flex gap-3 border rounded-lg p-3">
            <div className="w-16 h-16 bg-gray-200 rounded" />
            <div className="flex-1">
              <h4 className="font-medium">{t('suggestedWine')} {i + 1}</h4>
              <p className="text-sm text-gray-600">{t('basedOnPreferences')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
