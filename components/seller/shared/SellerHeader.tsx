"use client";

import { Bell, Search, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SellerHeader() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      text: "You have 5 new orders",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      text: "15 products pending approval",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      text: "5 products low in stock",
      time: "2 hours ago",
      unread: false,
    },
  ];

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex flex-1 items-center"></div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            <Bell size={20} />
            <span className="absolute right-1 top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 z-20 w-80 rounded-lg border border-neutral-200 bg-white shadow-lg"
                >
                  <div className="border-b border-neutral-200 p-4">
                    <h3 className="font-semibold text-neutral-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="dropdown-content max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`border-b border-neutral-100 p-4 transition-colors hover:bg-neutral-50 ${
                          notif.unread ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <p className="text-sm text-neutral-900">{notif.text}</p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {notif.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-neutral-200 p-3 text-center">
                    <button
                      type="button"
                      className="text-sm font-medium text-[#33391d] hover:underline"
                    >
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2 transition-all hover:border-neutral-300 hover:shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#33391d] text-sm font-semibold text-amber-50">
              {user?.first_name?.charAt(0).toUpperCase() ||
                user?.username?.charAt(0).toUpperCase() ||
                "S"}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-neutral-900">
                {user?.first_name || user?.username || "Seller"}
              </p>
              <p className="text-xs text-neutral-500">Seller</p>
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
                      className="w-full rounded-lg px-4 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                    >
                      My Profile
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-lg px-4 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                    >
                      Settings
                    </button>
                    <hr className="my-2 border-neutral-200" />
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full rounded-lg px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      Logout
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
