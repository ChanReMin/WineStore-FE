"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./auth/AuthModal";
import UserMenu from "./auth/UserMenu";
import CartDropdown from "./auth/CartDropdown";
import LocationModal from "./homepage/LocationModal";

const headerVariants: any = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");
  const [userCity, setUserCity] = useState<string>("");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const baseLink = "transition-all hover:opacity-60";

  const openAuthModal = (mode: "login" | "register") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  useEffect(() => {
    const location = localStorage.getItem("location");
    if (location) {
      try {
        const data = JSON.parse(location);
        setUserCity(data.city);
      } catch {}
    }

    const handleLocationUpdate = (event: CustomEvent) => {
      setUserCity(event.detail.city);
    };

    window.addEventListener("locationUpdated", handleLocationUpdate as EventListener);

    return () => window.removeEventListener("locationUpdated", handleLocationUpdate as EventListener);
  }, []);

  const handleLocationComplete = (data: { city: string; name: string }) => {
    localStorage.setItem("location", JSON.stringify(data));
    setUserCity(data.city);
    setIsLocationModalOpen(false);
    window.dispatchEvent(new CustomEvent("locationUpdated", { detail: data }));
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-amber-50/95 backdrop-blur-md shadow-sm"
        variants={headerVariants as any}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mx-auto flex items-center justify-between px-6 py-5 md:py-6"
          variants={itemVariants as any}
        >
          {/* LEFT: Logo */}
          <motion.div className="flex flex-1 items-center" variants={itemVariants}>
            <Link href="/" className="font-semibold uppercase text-[22px] text-[#33391d] tracking-wide">
              Wine Store
            </Link>
          </motion.div>

          {/* CENTER: Navigation */}
          <motion.nav className="hidden md:flex flex-1 justify-center text-gray-800" variants={itemVariants}>
            <ul className="flex items-center gap-10 text-[13px] tracking-[0.22em] uppercase whitespace-nowrap min-w-fit">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Our Story", path: "/our-story" },
                { label: "Blog", path: "/blog" },
                { label: "Products", path: "/products" },
              ].map((item) => (
                <motion.li key={item.path} variants={itemVariants}>
                  <Link
                    href={item.path}
                    className={`${baseLink} ${
                      pathname === item.path || pathname.startsWith(item.path)
                        ? "line-through decoration-[1.5px] decoration-neutral-900"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* RIGHT: Location + Auth */}
          <motion.div className="flex flex-1 items-center justify-end gap-6" variants={itemVariants}>
            {/* Location Button */}
            {userCity && (
              <motion.button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-1.5 rounded px-3 py-1.5 text-sm text-neutral-700 transition-all hover:bg-white/50 hover:border-neutral-300"
                title="Change location"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[13px] tracking-[0.22em] uppercase">{userCity}</span>
              </motion.button>
            )}

            {/* Authenticated */}
            {isAuthenticated ? (
              <>
                <CartDropdown />
                <UserMenu />
              </>
            ) : (
              <>
                <motion.button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[13px] uppercase tracking-[0.22em] text-neutral-700 hover:opacity-70"
                >
                  Login
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#33391d] bg-[#33391d] px-5 py-2 text-[13px] uppercase tracking-[0.22em] text-amber-50 hover:bg-[#2a2f18]"
                >
                  Register
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.header>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* LOCATION MODAL */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onComplete={handleLocationComplete}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
}
