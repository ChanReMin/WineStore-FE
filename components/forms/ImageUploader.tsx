"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface ImageUploaderProps {
  onUpload?: (files: File[]) => void;
  maxFiles?: number;
}

export default function ImageUploader({
  onUpload,
  maxFiles = 5,
}: ImageUploaderProps) {
  const t = useTranslations("forms.imageUploader");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onUpload?.(files);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
          📷
        </div>
        <div>
          <label className="cursor-pointer text-blue-600 hover:text-blue-700">
            {t("clickToUpload")}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-500 mt-1">{t("dragAndDrop")}</p>
        </div>
        <p className="text-xs text-gray-500">{t("fileTypes", { maxFiles })}</p>
      </div>
    </div>
  );
}
