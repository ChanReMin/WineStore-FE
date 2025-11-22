"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
});

export default function UnauthorizedPage() {
  return (
    <div
      className={`${displaySerif.variable} relative min-h-screen overflow-hidden bg-[#120906]`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.05) 10px,
              rgba(255,255,255,0.05) 20px
            )`,
          }}
        />
      </div>

      {/* Floating Particles */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-[10%] h-2 w-2 rounded-full bg-[#d4af37]/40 blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-40 right-[15%] h-3 w-3 rounded-full bg-[#d4af37]/30 blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -25, 0],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 4.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 left-[20%] h-2 w-2 rounded-full bg-[#d4af37]/35 blur-sm"
      />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-2xl"
              />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#d4af37]/30 bg-[#d4af37]/10">
                <ShieldAlert className="h-16 w-16 text-[#d4af37]" strokeWidth={1.5} />
              </div>
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1
              className="text-[120px] md:text-[160px] font-bold leading-none tracking-wider"
              style={{
                background:
                  "linear-gradient(135deg, #d4af37 0%, #f4e5a1 50%, #d4af37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              403
            </h1>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="my-8 flex items-center justify-center gap-4"
          >
            <motion.span
              animate={{ scaleX: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="h-px w-16 md:w-24 bg-linear-to-r from-transparent via-[#d4af37] to-transparent"
            />
            <span className="text-[10px] italic tracking-[0.3em] text-[#d4af37] font-light">
              ACCESS DENIED
            </span>
            <motion.span
              animate={{ scaleX: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 1,
              }}
              className="h-px w-16 md:w-24 bg-linear-to-r from-transparent via-[#d4af37] to-transparent"
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mb-4 text-[28px] md:text-[36px] font-semibold tracking-[0.15em] text-white uppercase"
            style={{ fontFamily: "var(--font-display-serif)" }}
          >
            Truy Cập Bị Từ Chối
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mx-auto mb-12 max-w-lg text-[16px] leading-relaxed text-white/80 font-light"
          >
            Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên
            nếu bạn cho rằng đây là lỗi.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="group flex items-center gap-3 border-2 border-[#d4af37]/30 bg-transparent px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-[#d4af37] transition-all hover:border-[#d4af37] hover:bg-[#d4af37]/10"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                strokeWidth={2}
              />
              Quay Lại
            </motion.button>

            {/* Home Button */}
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 border-2 border-[#d4af37] bg-[#d4af37] px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-[#120906] transition-all hover:bg-[#f4e5a1] hover:border-[#f4e5a1] shadow-lg shadow-[#d4af37]/20"
              >
                <Home
                  className="h-4 w-4 transition-transform group-hover:scale-110"
                  strokeWidth={2}
                />
                Trang Chủ
              </motion.button>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-16 text-[12px] text-white/50"
          >
            <p>
              Cần hỗ trợ?{" "}
              <Link
                href="/"
                className="text-[#d4af37] underline transition-colors hover:text-[#f4e5a1]"
              >
                Liên hệ với chúng tôi
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
