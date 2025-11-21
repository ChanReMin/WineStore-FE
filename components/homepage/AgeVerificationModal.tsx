"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: (isAdult: boolean) => void;
}

export default function AgeVerificationModal({
  isOpen,
  onVerify,
}: AgeVerificationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-9998 bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1], // Custom easing for smooth feel
            }}
            className="fixed left-1/2 top-1/2 z-9999 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="relative overflow-hidden rounded-sm border border-neutral-300 bg-amber-50 shadow-2xl">
              {/* Decorative top border */}
              <motion.div
                className="h-1 bg-linear-to-r from-[#33391d] via-amber-700 to-[#33391d]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />

              {/* Subtle background pattern */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
                <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,#33391d_1px,transparent_1px)] bg-size-[24px_24px]" />
              </div>

              <div className="relative p-8 md:p-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#33391d]/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#33391d]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-3 text-center"
                >
                  <h2 className="text-2xl font-semibold tracking-wide text-[#33391d]">
                    Age Confirmation
                  </h2>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mb-8 text-center text-sm italic text-neutral-600"
                >
                  Are you at least 18 years old?
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {/* No Button */}
                  <motion.button
                    type="button"
                    onClick={() => onVerify(false)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="border border-neutral-300 bg-white px-6 py-3 text-sm uppercase tracking-widest text-neutral-700 transition-all hover:border-neutral-400 hover:bg-neutral-50"
                  >
                    No
                  </motion.button>

                  {/* Yes Button */}
                  <motion.button
                    type="button"
                    onClick={() => onVerify(true)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#33391d] px-6 py-3 text-sm uppercase tracking-widest text-amber-50 transition-all hover:bg-[#2a2f18]"
                  >
                    Yes
                  </motion.button>
                </motion.div>

                {/* Legal notice */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-6 text-center text-xs text-neutral-500"
                >
                  You must be at least 18 years old to access this website
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
