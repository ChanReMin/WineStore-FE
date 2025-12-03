"use client";

import { motion } from "framer-motion";

interface ImageSkeletonProps {
  aspectRatio?: string;
  className?: string;
  animated?: boolean;
}

export default function ImageSkeleton({
  aspectRatio = "3/4",
  className = "",
  animated = true,
}: ImageSkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Base shimmer effect */}
      {animated && (
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      )}
      
      {/* Wine bottle icon placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-neutral-300 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
