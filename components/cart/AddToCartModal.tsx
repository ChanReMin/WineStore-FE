"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
}

export default function AddToCartModal({ isOpen, onClose, productId }: AddToCartModalProps) {
  const t = useTranslations('cart');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">{t('title')}</h2>
        <p className="text-gray-600 mb-4">{t('success.itemAdded') || 'Product added successfully!'}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {t('continueShopping')}
        </button>
      </div>
    </div>
  );
}
