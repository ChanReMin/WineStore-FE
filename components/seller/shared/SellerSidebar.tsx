"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  label: string;
  href?: string;
  badge?: number;
  children?: {
    label: string;
    href: string;
    badge?: number;
  }[];
}

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/seller",
  },
  {
    icon: Package,
    label: "Product Management",
    href: "/seller/products",
  },
  {
    icon: ShoppingCart,
    label: "Order Management",
    href: "/seller/orders",
  },
  {
    icon: Warehouse,
    label: "Inventory Management",
    children: [
      {
        label: "Tồn kho",
        href: "/seller/inventory",
      },
      {
        label: "Lịch sử xuất nhập",
        href: "/seller/inventory-logs",
      },
    ],
  },
  {
    icon: Gift,
    label: "Promotions",
    href: "/seller/promotions",
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
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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
    if (href === "/seller") {
      return pathname === "/seller";
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#33391d]">
                <span className="text-sm font-bold text-amber-50">WS</span>
              </div>
              <span className="text-lg font-semibold text-[#33391d]">
                Seller Hub
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
            const isExpanded = expandedItems.includes(item.label);
            const itemActive =
              isActive(item.href) || isParentActive(item.children);

            return (
              <li key={item.label}>
                {/* Parent Item */}
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.label)}
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
                            {item.label}
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
                          {item.label}
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
                            <span>{child.label}</span>
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
                  Wine Store
                </p>
                <p className="text-xs text-neutral-600">Seller Account</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
