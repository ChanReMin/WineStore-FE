"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { Code, User, Store, Shield, X } from "lucide-react";

// Mock users for development
const DEV_USERS = [
  {
    id: 1,
    username: "customer_dev",
    email: "customer@dev.com",
    first_name: "John",
    last_name: "Customer",
    role: "CUSTOMER",
    icon: User,
    color: "bg-blue-500",
  },
  {
    id: 2,
    username: "seller_dev",
    email: "seller@dev.com",
    first_name: "Jane",
    last_name: "Seller",
    role: "SELLER",
    icon: Store,
    color: "bg-green-500",
  },
  {
    id: 3,
    username: "admin_dev",
    email: "admin@dev.com",
    first_name: "Admin",
    last_name: "User",
    role: "ADMIN",
    icon: Shield,
    color: "bg-red-500",
  },
];

export default function DevLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { setAuth } = useAuthStore();

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const handleDevLogin = (devUser: (typeof DEV_USERS)[0]) => {
    // Mock tokens
    const mockAccessToken = `dev_access_token_${devUser.role}_${Date.now()}`;
    const mockRefreshToken = `dev_refresh_token_${devUser.role}_${Date.now()}`;

    // Set auth directly in Zustand store
    setAuth(devUser as any, mockAccessToken, mockRefreshToken);

    // Close modal
    setIsOpen(false);

    // Reload to trigger navigation
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <>
      {/* Current User Badge - Bottom Left */}
      {user && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-white border-2 border-purple-200 px-3 py-2 shadow-lg"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white">
            {user.first_name?.charAt(0) || user.username?.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-neutral-900">
              {user.first_name} {user.last_name}
            </span>
            <span className="text-[10px] font-medium text-purple-600">
              {user.role}
            </span>
          </div>
        </motion.div>
      )}

      {/* Dev Login Button - Fixed position Bottom Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
        title="Dev Login (Development Only)"
      >
        <Code className="w-5 h-5" />
        <span className="font-medium hidden sm:inline">Dev Login</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl"
              >
                {/* Header */}
                <div className="border-b border-neutral-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                        <Code className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-neutral-900">
                          Dev Login
                        </h2>
                        <p className="text-sm text-neutral-500">
                          Quick login for development
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Current User */}
                {user && (
                  <div className="border-b border-neutral-200 bg-neutral-50 p-4">
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">
                      Currently logged in as:
                    </p>
                    <div className="flex items-center gap-3 rounded-lg bg-white p-3 border border-neutral-200">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#33391d] text-xs font-bold text-amber-50">
                        {user.first_name?.charAt(0) || user.username?.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-neutral-500">{user.email}</p>
                      </div>
                      <span className="rounded-full bg-[#33391d] px-2 py-1 text-xs font-medium text-amber-50">
                        {user.role}
                      </span>
                    </div>
                  </div>
                )}

                {/* User List */}
                <div className="p-6 space-y-3">
                  <p className="text-sm font-medium text-neutral-700 mb-4">
                    Select a user to login:
                  </p>
                  {DEV_USERS.map((devUser, index) => {
                    const Icon = devUser.icon;
                    const isCurrentUser = user?.email === devUser.email;

                    return (
                      <motion.button
                        key={devUser.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleDevLogin(devUser)}
                        disabled={isCurrentUser}
                        className={`w-full flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                          isCurrentUser
                            ? "border-[#33391d] bg-[#f5f3e8] cursor-not-allowed"
                            : "border-neutral-200 hover:border-[#33391d] hover:bg-neutral-50"
                        }`}
                      >
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${devUser.color}`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-neutral-900">
                            {devUser.first_name} {devUser.last_name}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {devUser.email}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold text-white ${devUser.color}`}
                          >
                            {devUser.role}
                          </span>
                          {isCurrentUser && (
                            <span className="text-xs text-emerald-600 font-medium">
                              ✓ Active
                            </span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-200 bg-neutral-50 p-4">
                  <p className="text-xs text-neutral-500 text-center">
                    ⚠️ This is a development tool and will not appear in
                    production
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
