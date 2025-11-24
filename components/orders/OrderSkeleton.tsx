"use client";

import { motion } from "framer-motion";

export default function OrderSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="h-6 w-48 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-32 animate-pulse rounded bg-neutral-200" />
            </div>
            <div className="h-8 w-24 animate-pulse rounded-full bg-neutral-200" />
          </div>

          <div className="my-4 h-px bg-neutral-200" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-28 animate-pulse rounded bg-neutral-200" />
            </div>
            <div className="flex justify-between pt-2">
              <div className="h-5 w-24 animate-pulse rounded bg-neutral-200" />
              <div className="h-6 w-32 animate-pulse rounded bg-neutral-200" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="h-5 w-32 animate-pulse rounded bg-neutral-200" />
            <div className="h-5 w-24 animate-pulse rounded bg-neutral-200" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
