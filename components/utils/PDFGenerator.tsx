"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface PDFGeneratorProps {
  data?: any;
  filename?: string;
  onGenerate?: () => void;
}

export default function PDFGenerator({
  data,
  filename = "document.pdf",
  onGenerate,
}: PDFGeneratorProps) {
  const t = useTranslations("utils.pdfGenerator");

  const handleGenerate = () => {
    onGenerate?.();
  };

  return (
    <button
      onClick={handleGenerate}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      <span>📄</span>
      {t("button")}
    </button>
  );
}
