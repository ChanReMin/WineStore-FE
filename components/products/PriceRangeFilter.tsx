"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

interface PriceRangeFilterProps {
  min?: number;
  max?: number;
  onChange?: (min: number, max: number) => void;
}

export default function PriceRangeFilter({ min = 0, max = 1000, onChange }: PriceRangeFilterProps) {
  const t = useTranslations('products.priceRangeFilter');
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{t('title')}</label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder={t('min')}
          className="w-full border rounded px-3 py-2"
          defaultValue={min}
        />
        <input
          type="number"
          placeholder={t('max')}
          className="w-full border rounded px-3 py-2"
          defaultValue={max}
        />
      </div>
    </div>
  );
}
