"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface SocialLoginProps {
  onSuccess?: (provider: string) => void;
}

export default function SocialLogin({ onSuccess }: SocialLoginProps) {
  const t = useTranslations("auth.social");

  return (
    <div className="space-y-3">
      <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
        <span>📘</span>
        {t("facebook")}
      </button>
      <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded hover:bg-red-700">
        <span>🔴</span>
        {t("google")}
      </button>
      <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded hover:bg-gray-900">
        <span>🐙</span>
        {t("github")}
      </button>
    </div>
  );
}
