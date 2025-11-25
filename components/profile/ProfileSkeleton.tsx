"use client";

import { motion } from "framer-motion";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header Skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden rounded-lg border border-neutral-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm"
        >
          <div className="flex items-start gap-6">
            {/* Avatar Skeleton */}
            <div className="h-24 w-24 animate-pulse rounded-full bg-neutral-200" />

            {/* Info Skeleton */}
            <div className="flex-1 space-y-3">
              <div className="h-8 w-48 animate-pulse rounded bg-neutral-200" />
              <div className="h-4 w-32 animate-pulse rounded bg-neutral-200" />
              <div className="flex gap-4">
                <div className="h-4 w-40 animate-pulse rounded bg-neutral-200" />
                <div className="h-4 w-32 animate-pulse rounded bg-neutral-200" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Skeleton */}
        <div className="mt-8 flex gap-4 border-b border-neutral-200">
          <div className="h-10 w-32 animate-pulse rounded-t bg-neutral-200" />
          <div className="h-10 w-32 animate-pulse rounded-t bg-neutral-200" />
        </div>

        {/* Content Skeleton */}
        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-6 h-6 w-48 animate-pulse rounded bg-neutral-200" />
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
                  <div className="h-10 w-full animate-pulse rounded bg-neutral-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
