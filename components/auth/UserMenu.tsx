"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!user) return null;

  const displayName = user.username || "User";
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 transition-opacity hover:opacity-70"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-neutral-300 bg-white">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={displayName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#33391d] text-xs font-semibold text-amber-50">
              {firstLetter}
            </div>
          )}
        </div>
        <span className="text-sm text-neutral-700">{displayName}</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-neutral-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-56 origin-top-right overflow-hidden rounded-sm border border-neutral-300 bg-amber-50 shadow-xl"
          >
            {/* User Info */}
            <div className="border-b border-neutral-200 bg-white/50 px-4 py-3">
              <p className="text-sm font-medium text-neutral-900">
                {displayName}
              </p>
              <p className="mt-0.5 text-xs italic text-neutral-600">
                {user.email}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
                label="My Profile"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to profile
                }}
              />
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                }
                label="My Orders"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to orders
                }}
              />
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                }
                label="Wishlist"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to wishlist
                }}
              />
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v6m0 6v6m8.66-9.66l-5.2 3M8.54 14.66l-5.2 3m13.32 0l-5.2-3M8.54 9.34l-5.2-3" />
                  </svg>
                }
                label="Settings"
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to settings
                }}
              />
            </div>

            {/* Logout */}
            <div className="border-t border-neutral-200">
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                }
                label="Logout"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                danger
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}

function MenuItem({ icon, label, onClick, danger }: MenuItemProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
        danger
          ? "text-red-700 hover:bg-red-50"
          : "text-neutral-700 hover:bg-white/70"
      }`}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
