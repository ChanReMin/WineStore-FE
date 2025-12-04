"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

interface AdvancedFiltersProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  initialFilters?: Record<string, any>;
}

export default function AdvancedFilters({ onFiltersChange, initialFilters }: AdvancedFiltersProps) {
  const t = useTranslations('products.advancedFilters');
  
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{t('title')}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t('category')}</label>
          <select className="w-full border rounded px-3 py-2">
            <option>{t('allCategories')}</option>
            <option>{t('redWine')}</option>
            <option>{t('whiteWine')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('priceRange')}</label>
          <input type="range" className="w-full" />
        </div>
      </div>
    </div>
  );
}
