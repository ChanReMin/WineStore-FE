"use client";

import { Link, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./auth/AuthModal";
import { UserMenu } from "./auth/UserMenu";
import CartDropdown from "./auth/CartDropdown";
import LocationModal from "./homepage/LocationModal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

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
  const t = useTranslations('header');
  
  // Remove locale prefix for pathname matching
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">(
    "login"
  );
  const [userCity, setUserCity] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
    city: string;
    store: string;
  } | null>(null);
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
        setUserLocation(data);
      } catch (e) {
        console.error("Failed to parse location data");
      }
    }

    const handleLocationUpdate = (event: CustomEvent) => {
      setUserCity(event.detail.city);
    };

    window.addEventListener(
      "locationUpdated",
      handleLocationUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "locationUpdated",
        handleLocationUpdate as EventListener
      );
    };
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
          className="mx-auto flex items-center justify-between px-6 py-6"
          variants={itemVariants}
        >
          {/* LEFT: Logo */}
          <motion.form
            className="flex flex-1 items-center justify-start text-[22px]"
            variants={itemVariants}
          >
            <Link href="/" className="font-semibold uppercase text-[#33391d]">
              {t('title')}
            </Link>
          </motion.form>

          {/* CENTER: Nav + Logo */}
          <motion.nav
            className="flex flex-1 items-center justify-center text-gray-800"
            variants={itemVariants}
          >
            <ul className="flex items-center gap-4 lg:gap-6 xl:gap-8 text-[13px] lg:text-[14px] tracking-[0.15em] lg:tracking-[0.2em] uppercase whitespace-nowrap min-w-fit">
              <motion.li variants={itemVariants}>
                <Link
                  href="/"
                  className={`${baseLink} ${
                    pathnameWithoutLocale === "/"
                      ? "line-through decoration-1 decoration-neutral-900"
                      : ""
                  }`}
                >
                  {t('nav.home')}
                </Link>
              </motion.li>

              <motion.li variants={itemVariants}>
                <Link
                  href="/about"
                  className={`${baseLink} ${
                    pathnameWithoutLocale.startsWith("/about")
                      ? "line-through decoration-1 decoration-neutral-900"
                      : ""
                  }`}
                >
                  {t('nav.about')}
                </Link>
              </motion.li>

              <motion.li variants={itemVariants}>
                <Link
                  href="/our-story"
                  className={`${baseLink} ${
                    pathnameWithoutLocale.startsWith("/our-story")
                      ? "line-through decoration-1 decoration-neutral-900"
                      : ""
                  }`}
                >
                  {t('nav.ourStory')}
                </Link>
              </motion.li>

              <motion.li variants={itemVariants}>
                <Link
                  href="/blog"
                  className={`${baseLink} ${
                    pathnameWithoutLocale.startsWith("/blog")
                      ? "line-through decoration-1 decoration-neutral-900"
                      : ""
                  }`}
                >
                  {t('nav.blog')}
                </Link>
              </motion.li>

              <motion.li variants={itemVariants}>
                <Link
                  href="/shop"
                  className={`${baseLink} ${
                    pathnameWithoutLocale.startsWith("/shop")
                      ? "line-through decoration-1 decoration-neutral-900"
                      : ""
                  }`}
                >
                  {t('nav.shop')}
                </Link>
              </motion.li>
            </ul>
          </motion.nav>

          {/* RIGHT: Auth or User Menu */}
          <motion.div
            className="flex flex-1 items-center justify-end gap-6"
            variants={itemVariants}
          >
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {userCity && (
              <motion.button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm text-neutral-600 transition-all hover:border-neutral-300 hover:bg-white/50"
                title="Thay đổi địa chỉ"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-[14px] tracking-[0.25em] uppercase whitespace-nowrap min-w-fit">
                  {userCity}
                </span>
              </motion.button>
            )}
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
                  {t('auth.login')}
                </motion.button>

                {/* Register Button */}
                <motion.button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="border border-[#33391d] bg-[#33391d] px-5 py-2 text-[14px] uppercase tracking-[0.2em] text-amber-50 transition-all hover:bg-[#2a2f18]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('auth.register')}
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

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onComplete={(data) => {
          // Save to localStorage
          localStorage.setItem("location", JSON.stringify(data));

          // Update state
          setUserCity(data.city);
          setUserLocation(data);

          // Dispatch custom event for other components
          window.dispatchEvent(
            new CustomEvent("locationUpdated", { detail: data })
          );

          // Close modal
          setIsLocationModalOpen(false);
        }}
        defaultValues={userLocation}
      />
    </>
  );
}
