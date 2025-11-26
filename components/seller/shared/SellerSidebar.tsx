"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Warehouse,
  Gift,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

interface MenuItem {
  icon: any;
  labelKey: string;
  href?: string;
  badge?: number;
  children?: {
    labelKey: string;
    href: string;
    badge?: number;
  }[];
}

const getMenuItems = (locale: string): MenuItem[] => [
  {
    icon: LayoutDashboard,
    labelKey: "dashboard",
    href: `/${locale}/seller`,
  },
  {
    icon: Package,
    labelKey: "productManagement",
    href: `/${locale}/seller/products`,
  },
  {
    icon: ShoppingCart,
    labelKey: "orderManagement",
    href: `/${locale}/seller/orders`,
  },
  {
    icon: Warehouse,
    labelKey: "inventoryManagement",
    children: [
      {
        labelKey: "warehouses",
        href: `/${locale}/seller/warehouses`,
      },
      {
        labelKey: "inventory",
        href: `/${locale}/seller/inventory`,
      },
      {
        labelKey: "inventoryLogs",
        href: `/${locale}/seller/inventory-logs`,
      },
    ],
  },
  {
    icon: Gift,
    labelKey: "promotions",
    children: [
      {
        labelKey: "promotionList",
        href: `/${locale}/seller/promotions`,
      },
      {
        labelKey: "promotionAssignment",
        href: `/${locale}/seller/promotion-assignment`,
      },
    ],
  },
];

interface SellerSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function SellerSidebar({
  isCollapsed,
  onToggle,
}: SellerSidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("seller");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const menuItems = getMenuItems(locale);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    // Exact match for root seller path
    if (href === `/${locale}/seller`) {
      return pathname === `/${locale}/seller`;
    }
    // For other paths, check exact match or starts with path + /
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isParentActive = (children?: { href: string }[]) => {
    if (!children) return false;
    return children.some((child) => isActive(child.href));
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
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.labelKey);
            const itemActive =
              isActive(item.href) || isParentActive(item.children);

            return (
              <li key={item.labelKey}>
                {/* Parent Item */}
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.labelKey)}
                    className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
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
                    {!isCollapsed && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                      itemActive
                        ? "bg-[#33391d] text-amber-50"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
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
                  </Link>
                )}

                {/* Children Items */}
                <AnimatePresence>
                  {hasChildren && isExpanded && !isCollapsed && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 space-y-1 overflow-hidden pl-9"
                    >
                      {item.children?.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all ${
                              isActive(child.href)
                                ? "bg-neutral-100 font-medium text-[#33391d]"
                                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                            }`}
                          >
                            <span>{t(`sidebar.${child.labelKey}`)}</span>
                            {child.badge && (
                              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                                {child.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
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
                  {t("layout.sellerAccount")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
