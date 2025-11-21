"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

// Animation variants
const sidebarVariants: Variants = {
  hidden: { x: "100%", opacity: 0, filter: "blur(4px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 220,
      mass: 0.8,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};


  const cartSidebar = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9998"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Cart */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-amber-50 shadow-2xl border-l border-neutral-300 flex flex-col z-9999"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
              {/* Header */}
              <div className="p-6 flex justify-between items-center border-b border-neutral-300 bg-white/50">
                <h2 className="text-xl font-semibold text-[#33391d] tracking-wide">
                  Your Cart
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-300 hover:text-neutral-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>
              </div>

              {/* Empty Cart Content */}
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.45, delay: 0.25 }}
                  className="mb-6"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-neutral-300"
                    />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-neutral-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                >
                  <h3 className="text-lg font-semibold text-[#33391d] mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-neutral-600 mb-1">
                    Add some wines to get started
                  </p>
                  <p className="text-xs italic text-neutral-500">
                    Discover our premium collection
                  </p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="mt-8 border border-[#33391d] bg-[#33391d] px-8 py-3 text-[13px] uppercase tracking-[0.22em] text-amber-50 hover:bg-[#2a2f18] transition-colors"
                >
                  Continue Shopping
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
  );

  return (
    <>
      {/* Cart Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-1.5 text-[16px] italic text-neutral-700 transition-opacity hover:opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span>Cart ({totalItems})</span>

        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#33391d] text-[10px] font-semibold text-amber-50">
            {totalItems}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-80 origin-top-right overflow-hidden rounded-sm border border-neutral-300 bg-amber-50 shadow-xl"
          >
            {/* Empty Cart */}
            <div className="p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="mt-4 text-sm text-neutral-600">
                Your cart is empty
              </p>
              <p className="mt-1 text-xs italic text-neutral-500">
                Add some wines to get started
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
