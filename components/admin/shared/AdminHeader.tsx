"use client";

import { Bell, Globe } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NotificationClient from "@/components/auth/NotificationClient";

const languages = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("admin.header");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== locale) {
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPathname);
    }
    setShowLanguageMenu(false);
  };

  const goHome = () => {
    router.push("/");
  };

  const goProfile = () => {
    router.push("/profile");
  };

  const currentLanguage = languages.find((l) => l.code === locale);

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex flex-1 items-center"></div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 transition-all hover:border-neutral-300 hover:shadow-sm"
          >
            <Globe size={18} className="text-neutral-600" />
            <span className="text-sm font-medium uppercase">
              {currentLanguage?.code}
            </span>
          </button>

          <AnimatePresence>
            {showLanguageMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowLanguageMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 z-20 w-48 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-neutral-50 ${
                        locale === lang.code
                          ? "bg-neutral-100 font-semibold"
                          : ""
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="flex-1">{lang.label}</span>
                      {locale === lang.code && (
                        <span className="text-[10px] text-neutral-500">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <NotificationClient />

        {/* User Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2 transition-all hover:border-neutral-300 hover:shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#33391d] text-sm font-semibold text-amber-50">
              {user?.firstName?.charAt(0).toUpperCase() ||
                user?.username?.charAt(0).toUpperCase() ||
                "A"}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-neutral-900">
                {user?.firstName || user?.username || t("admin")}
              </p>
              <p className="text-xs text-neutral-500">{t("admin")}</p>
            </div>
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="dropdown-content absolute right-0 top-12 z-20 w-56 rounded-lg border border-neutral-200 bg-white shadow-lg"
                >
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={goProfile}
                      className="w-full rounded-lg px-4 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                    >
                      {t("myProfile")}
                    </button>
                    <button
                      type="button"
                      onClick={goHome}
                      className="w-full rounded-lg px-4 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                    >
                      {t("backtohomepage")}
                    </button>
                    <hr className="my-2 border-neutral-200" />
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full rounded-lg px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      {t("logout")}
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
