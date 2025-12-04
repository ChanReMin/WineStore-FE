"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const t = useTranslations('forms.richTextEditor');
  
  return (
    <div className="space-y-2">
      <div className="flex gap-2 border-b pb-2">
        <button className="px-2 py-1 border rounded hover:bg-gray-100" title={t('bold')}>
          <strong>B</strong>
        </button>
        <button className="px-2 py-1 border rounded hover:bg-gray-100" title={t('italic')}>
          <em>I</em>
        </button>
        <button className="px-2 py-1 border rounded hover:bg-gray-100" title={t('underline')}>
          <u>U</u>
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder || t('placeholder')}
        className="w-full border rounded px-3 py-2 min-h-[200px]"
      />
    </div>
  );
}
