"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./auth/AuthModal";
import UserMenu from "./auth/UserMenu";
import CartDropdown from "./auth/CartDropdown";

const headerVariants: any = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">(
    "login",
  );

  const baseLink = "transition-all hover:opacity-70";

  const openAuthModal = (mode: "login" | "register") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-amber-50/95 backdrop-blur-md"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mx-auto flex items-center justify-between px-6 py-6"
          variants={itemVariants}
        >
        {/* LEFT: Search */}
        <motion.form
          className="flex flex-1 items-center justify-start text-[22px]"
          variants={itemVariants}
        >
          <Link
                href="/"
                className="font-semibold uppercase text-[#33391d]"
              >
                Wine Store
              </Link>
        </motion.form>

        {/* CENTER: Nav + Logo */}
        <motion.nav
          className="flex flex-1 items-center justify-center text-gray-800"
          variants={itemVariants}
        >
          <ul className="flex items-center gap-10 text-[14px] tracking-[0.25em] uppercase">
            <motion.li variants={itemVariants}>
              <Link
                href="/"
                className={`${baseLink} ${
                  pathname === "/"
                    ? "line-through decoration-1 decoration-neutral-900"
                    : ""
                }`}
              >
                Home
              </Link>
            </motion.li>

            <motion.li variants={itemVariants}>
              <Link
                href="/about"
                className={`${baseLink} ${
                  pathname.startsWith("/about")
                    ? "line-through decoration-1 decoration-neutral-900"
                    : ""
                }`}
              >
                About
              </Link>
            </motion.li>

            <motion.li variants={itemVariants}>
              <Link
                href="/our-story"
                className={`${baseLink} ${
                  pathname.startsWith("/our-story")
                    ? "line-through decoration-1 decoration-neutral-900"
                    : ""
                }`}
              >
                Our Story
              </Link>
            </motion.li>

            <motion.li variants={itemVariants}>
              <Link
                href="/blog"
                className={`${baseLink} ${
                  pathname.startsWith("/blog")
                    ? "line-through decoration-1 decoration-neutral-900"
                    : ""
                }`}
              >
                Blog
              </Link>
            </motion.li>

            <motion.li variants={itemVariants}>
              <Link
                href="/shop"
                className={`${baseLink} ${
                  pathname.startsWith("/shop")
                    ? "line-through decoration-1 decoration-neutral-900"
                    : ""
                }`}
              >
                Shop
              </Link>
            </motion.li>
          </ul>
        </motion.nav>

        {/* RIGHT: Auth or User Menu */}
        <motion.div
          className="flex flex-1 items-center justify-end gap-6"
          variants={itemVariants}
        >
          {isAuthenticated ? (
            <>
              {/* Cart Dropdown for authenticated users */}
              <CartDropdown />

              {/* User Menu */}
              <UserMenu />
            </>
          ) : (
            <>
              {/* Login Button */}
              <motion.button
                type="button"
                onClick={() => openAuthModal("login")}
                className="text-[14px] uppercase tracking-[0.2em] text-neutral-700 transition-opacity hover:opacity-70"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>

              {/* Register Button */}
              <motion.button
                type="button"
                onClick={() => openAuthModal("register")}
                className="border border-[#33391d] bg-[#33391d] px-5 py-2 text-[14px] uppercase tracking-[0.2em] text-amber-50 transition-all hover:bg-[#2a2f18]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
            </>
          )}
        </motion.div>
        </motion.div>
      </motion.header>

      {/* Auth Modal - Rendered outside header to cover full viewport */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
