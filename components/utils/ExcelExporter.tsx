"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface ExcelExporterProps {
  data?: any[];
  filename?: string;
  onExport?: () => void;
}

export default function ExcelExporter({
  data,
  filename = "export.xlsx",
  onExport,
}: ExcelExporterProps) {
  const t = useTranslations("utils.excelExporter");

  const handleExport = () => {
    onExport?.();
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      <span>📊</span>
      {t("button")}
    </button>
  );
}
