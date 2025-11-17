"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

export default function Header() {
  const pathname = usePathname();

  const baseLink = "transition-all hover:opacity-70";

  return (
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
          className="flex flex-1 items-center justify-start"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2 text-[11px] text-neutral-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="11" cy="11" r="6" />
              <line x1="16" y1="16" x2="21" y2="21" />
            </svg>

            <input
              type="text"
              placeholder="Search..."
              className="
                w-28 bg-transparent 
                text-[16px] italic tracking-wide
                placeholder:italic placeholder:text-neutral-500
                focus:outline-none
              "
            />
          </div>
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

            <motion.li
              className="text-[22px] tracking-[0.35em]"
              variants={itemVariants}
            >
              <Link href="/" className="font-semibold text-[#33391d] uppercase">
                Wine Store
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

        {/* RIGHT: Cart + Menu */}
        <motion.div
          className="flex flex-1 items-center justify-end gap-6"
          variants={itemVariants}
        >
          <button className="text-[16px] italic text-neutral-700">
            Cart (0)
          </button>

          <button
            aria-label="Open menu"
            className="flex flex-col gap-[5px] transition-transform duration-200 hover:scale-105"
          >
            <span className="h-px w-7 bg-black" />
            <span className="h-px w-7 bg-black" />
          </button>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
