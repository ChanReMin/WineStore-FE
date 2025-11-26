"use client";

import { motion } from "framer-motion";
import { Store, Lock } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Manage store and account information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-[#33391d] p-3">
              <Store size={24} className="text-amber-50" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">
                Store information
              </h3>
              <p className="text-sm text-neutral-600">
                Update information and logo
              </p>
            </div>
          </div>
          <Link
            href="/seller/settings/store"
            className="mt-4 block w-full rounded-lg border border-neutral-200 py-2 text-center text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50"
          >
            Edit
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-red-500 p-3">
              <Lock size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">
                Change Password
              </h3>
              <p className="text-sm text-neutral-600">
                Update your secure password
              </p>
            </div>
          </div>
          <Link
            href="/seller/settings/password"
            className="mt-4 block w-full rounded-lg border border-neutral-200 py-2 text-center text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50"
          >
            Change
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
