"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const getInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || "U";
  };

  const getDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user?.username || user?.email || "User";
  };

  // Build menu items based on user role
  const menuItems = [];

  // Customer menu items
  menuItems.push(
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      label: "My Orders",
      href: "/profile/orders",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    }
  );

  // Seller/Admin menu items
  if (user?.role === "SELLER" || user?.role === "ADMIN") {
    menuItems.push(
      {
        label: "Seller Dashboard",
        href: "/seller",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        ),
      },
      {
        label: "Manage Orders",
        href: "/seller/orders",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        ),
      },
      {
        label: "Products",
        href: "/seller/products",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        ),
      }
    );
  }

  return (
    <div className="relative">
      {/* User Avatar Button - Minimalist Design */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Avatar with elegant border */}
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#33391d] to-[#4c5b23] text-[11px] font-semibold tracking-wider text-amber-50 shadow-sm ring-1 ring-[#33391d]/20 transition-all group-hover:shadow-md group-hover:ring-[#33391d]/40">
            {getInitials()}
          </div>
          {/* Status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-amber-50 bg-emerald-500" />
        </div>

        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 text-neutral-600 transition-all duration-300 group-hover:text-[#33391d] ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute right-0 top-14 z-50 w-72 overflow-hidden border border-neutral-200 bg-amber-50/98 shadow-xl backdrop-blur-sm"
            >
              {/* Decorative top accent */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#33391d] to-transparent" />

              {/* User Info Section */}
              <div className="border-b border-neutral-200/60 bg-white/40 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#33391d] to-[#4c5b23] text-sm font-semibold tracking-wider text-amber-50 shadow-sm">
                    {getInitials()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold tracking-wide text-[#33391d]">
                      {getDisplayName()}
                    </p>
                    <p className="truncate text-xs text-neutral-600 mt-0.5">
                      {user?.email}
                    </p>
                    {user?.role && (
                      <span className="mt-2 inline-block border border-[#33391d]/20 bg-[#33391d]/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-[#33391d]">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {/* Customer Menu Items */}
                {menuItems.slice(0, 2).map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-3 px-4 py-2.5 text-[13px] uppercase tracking-[0.15em] text-neutral-700 transition-all hover:bg-white/60 hover:text-[#33391d]"
                    >
                      <span className="text-neutral-500 transition-colors group-hover:text-[#33391d]">
                        {item.icon}
                      </span>
                      {item.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-auto h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

                {/* Seller/Admin Menu Items */}
                {menuItems.length > 2 && (
                  <>
                    <div className="my-2 flex items-center gap-2 px-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                      <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">
                        Seller
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                    </div>
                    {menuItems.slice(2).map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + 2) * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center gap-3 px-4 py-2.5 text-[13px] uppercase tracking-[0.15em] text-neutral-700 transition-all hover:bg-amber-100/60 hover:text-[#33391d]"
                        >
                          <span className="text-neutral-500 transition-colors group-hover:text-[#33391d]">
                            {item.icon}
                          </span>
                          {item.label}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-auto h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </motion.div>
                    ))}
                  </>
                )}

                {/* Divider */}
                <div className="my-2 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

                {/* Logout Button */}
                <motion.button
                  type="button"
                  onClick={handleLogout}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.05 }}
                  className="group flex w-full items-center gap-3 px-4 py-2.5 text-[13px] uppercase tracking-[0.15em] text-neutral-700 transition-all hover:bg-red-50/80 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </motion.button>
              </div>

              {/* Bottom accent */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#33391d] to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
