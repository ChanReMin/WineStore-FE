"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

  return (
    <>
      {/* Cart Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 text-neutral-700 transition-all hover:text-[#33391d]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
        <span className="text-[14px] uppercase tracking-[0.2em]">
          Cart
        </span>

        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#33391d] text-[10px] font-semibold text-amber-50 shadow-sm"
          >
            {totalItems}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Drawer - Portal to body to escape stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop with blur */}
              <motion.div
                className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => setIsOpen(false)}
              />

              {/* Curved Sidebar Panel */}
              <motion.div
                className="fixed right-0 top-0 z-[9999] h-full w-full max-w-[480px] bg-amber-50 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8,
              }}
            >
              {/* Curved edge decoration */}
              <div className="absolute left-0 top-0 h-full w-8 -translate-x-full">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 32 800"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M32 0 Q0 400 32 800 L32 0"
                    fill="#fef3e2"
                    className="drop-shadow-lg"
                  />
                </svg>
              </div>

              {/* Decorative top accent */}
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#33391d] via-amber-700 to-[#33391d]" />

              {/* Header */}
              <div className="relative border-b border-neutral-200/60 bg-white/40 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[22px] font-semibold tracking-wide text-[#33391d]">
                      Shopping Cart
                    </h2>
                    <p className="mt-1 text-xs uppercase tracking-widest text-neutral-600">
                      {totalItems} {totalItems === 1 ? "Item" : "Items"}
                    </p>
                  </div>

                  {/* Close button */}
                  <motion.button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 w-10 items-center justify-center border border-neutral-300 bg-white text-neutral-700 transition-all hover:border-[#33391d] hover:bg-[#33391d] hover:text-amber-50"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
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
              </div>

              {/* Cart Content */}
              <div className="flex h-[calc(100%-180px)] flex-col">
                {cartItems.length === 0 ? (
                  /* Empty State */
                  <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mb-8"
                    >
                      {/* Animated icon */}
                      <div className="relative mx-auto h-32 w-32">
                        {/* Rotating ring */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="absolute inset-0 rounded-full border-2 border-dashed border-neutral-300"
                        />

                        {/* Inner circle with icon */}
                        <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white shadow-lg">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-14 w-14 text-neutral-400"
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

                        {/* Decorative dots */}
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className="absolute -right-2 top-8 h-3 w-3 rounded-full bg-amber-400"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            delay: 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className="absolute -left-2 bottom-8 h-2 w-2 rounded-full bg-[#33391d]"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <h3 className="mb-2 text-lg font-semibold tracking-wide text-[#33391d]">
                        Your Cart is Empty
                      </h3>
                      <p className="mb-1 text-sm text-neutral-600">
                        Add some wines to get started
                      </p>
                      <p className="text-xs italic text-neutral-500">
                        Discover our premium collection
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-8"
                    >
                      <Link
                        href="/shop"
                        onClick={() => setIsOpen(false)}
                        className="inline-block border border-[#33391d] bg-[#33391d] px-8 py-3 text-[13px] uppercase tracking-[0.2em] text-amber-50 transition-all hover:bg-[#2a2f18]"
                      >
                        Browse Wines
                      </Link>
                    </motion.div>
                  </div>
                ) : (
                  /* Cart Items - For future implementation */
                  <div className="flex-1 overflow-y-auto p-6">
                    {/* Cart items will go here */}
                  </div>
                )}
              </div>

              {/* Footer - Checkout Section */}
              {cartItems.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200/60 bg-white/60 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm uppercase tracking-widest text-neutral-600">
                      Subtotal
                    </span>
                    <span className="text-xl font-semibold text-[#33391d]">
                      $0.00
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    className="w-full border border-[#33391d] bg-[#33391d] py-3.5 text-[13px] uppercase tracking-[0.2em] text-amber-50 transition-all hover:bg-[#2a2f18]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                  </motion.button>

                  <p className="mt-3 text-center text-xs text-neutral-500">
                    Shipping & taxes calculated at checkout
                  </p>
                </div>
              )}

              {/* Decorative bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#33391d] via-amber-700 to-[#33391d]" />
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}
