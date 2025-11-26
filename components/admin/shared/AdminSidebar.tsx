"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  LayoutDashboard,
  UserCheck,
  Package,
  Users,
  Store,
  Warehouse,
  Menu,
  X,
} from "lucide-react";

interface MenuItem {
  icon: any;
  labelKey: string;
  href: string;
  badge?: number;
}

const getMenuItems = (locale: string): MenuItem[] => [
  {
    icon: LayoutDashboard,
    labelKey: "dashboard",
    href: `/${locale}/admin`,
  },
  {
    icon: UserCheck,
    labelKey: "sellerRequest",
    href: `/${locale}/admin/seller-requests`,
    badge: 5,
  },
  {
    icon: Package,
    labelKey: "productApproval",
    href: `/${locale}/admin/product-approval`,
    badge: 12,
  },
  {
    icon: Warehouse,
    labelKey: "warehouseApproval",
    href: `/${locale}/admin/warehouse-approval`,
    badge: 3,
  },
  {
    icon: Users,
    labelKey: "userManagement",
    href: `/${locale}/admin/user-management`,
  },
  {
    icon: Store,
    labelKey: "sellerManagement",
    href: `/${locale}/admin/seller-management`,
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({
  isCollapsed,
  onToggle,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("admin");

  const menuItems = getMenuItems(locale);

  const isActive = (href: string) => {
    if (href === `/${locale}/admin`) {
      return pathname === `/${locale}/admin`;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col border-r border-neutral-200 bg-white shadow-sm"
    >
      {/* Logo & Toggle */}
      <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="text-lg font-semibold text-[#33391d]">
                WINE STORE
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="dropdown-content flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const itemActive = isActive(item.href);

            return (
              <li key={item.labelKey}>
                <Link
                  href={item.href}
                  className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    itemActive
                      ? "bg-[#33391d] text-amber-50"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="shrink-0" />
                    <AnimatePresence mode="wait">
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="whitespace-nowrap"
                        >
                          {t(`sidebar.${item.labelKey}`)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-200 p-3">
        <div
          className={`flex items-center gap-3 rounded-lg bg-amber-50 p-3 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#33391d] text-xs font-bold text-amber-50">
            WS
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-xs font-semibold text-neutral-900">
                  {t("layout.wineStore")}
                </p>
                <p className="text-xs text-neutral-600">
                  {t("layout.adminAccount")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
