"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

interface PaymentFormProps {
  onSubmit?: (data: any) => void;
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const t = useTranslations('checkout.payment');
  
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">{t('cardNumber') || 'Card Number'}</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t('expiryDate') || 'Expiry Date'}</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('cvv') || 'CVV'}</label>
          <input
            type="text"
            placeholder="123"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {t('payNow') || 'Pay Now'}
      </button>
    </form>
  );
}
