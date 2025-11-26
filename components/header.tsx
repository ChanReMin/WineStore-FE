"use client";

import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "./auth/AuthModal";
import { UserMenu } from "./auth/UserMenu";
import CartDropdown from "./auth/CartDropdown";
import LocationModal from "./homepage/LocationModal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { Menu, X, MapPin } from "lucide-react";

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
  const t = useTranslations("header");

  // Remove locale prefix for pathname matching
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-amber-50/95 backdrop-blur-md shadow-sm"
        variants={headerVariants as any}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mx-auto flex items-center px-4 sm:px-6 py-4 sm:py-6 max-w-[1920px] gap-4"
          variants={itemVariants}
        >
          {/* LEFT: Logo */}
          <motion.div
            className="flex items-center text-[18px] sm:text-[22px] lg:flex-1 z-10"
            variants={itemVariants}
          >
            <Link
              href="/"
              className="font-semibold uppercase text-[#33391d] whitespace-nowrap"
            >
              {t("title")}
            </Link>
          </motion.div>

          {/* CENTER: Desktop Nav */}
          <motion.nav
            className="hidden lg:flex lg:flex-1 items-center justify-center text-gray-800"
            variants={itemVariants}
          >
            <ul className="flex items-center gap-4 lg:gap-6 xl:gap-8 text-[13px] lg:text-[14px] tracking-[0.15em] lg:tracking-[0.2em] uppercase whitespace-nowrap">
              <motion.li variants={itemVariants}>
                <Link
                  href="/"
                  className={`${baseLink} ${
                    pathnameWithoutLocale === "/"
                      ? "line-through decoration-1 decoration-neutral-900"
                      : ""
                  }`}
                >
                  {t("nav.home")}
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
                  {t("nav.about")}
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
                  {t("nav.ourStory")}
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
                  {t("nav.blog")}
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
                  {t("nav.shop")}
                </Link>
              </motion.li>
            </ul>
          </motion.nav>

          {/* RIGHT: Desktop Actions */}
          <motion.div
            className="hidden lg:flex lg:flex-1 items-center justify-end gap-3 xl:gap-6"
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
                <MapPin className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="text-[14px] tracking-[0.25em] uppercase whitespace-nowrap">
                  {userCity}
                </span>
              </motion.button>
            )}
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
                  className="text-[14px] uppercase tracking-[0.2em] text-neutral-700 transition-opacity hover:opacity-70"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("auth.login")}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="border border-[#33391d] bg-[#33391d] px-5 py-2 text-[14px] uppercase tracking-[0.2em] text-amber-50 transition-all hover:bg-[#2a2f18]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("auth.register")}
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Mobile: Right Actions */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3 z-10 ml-auto">
            <LanguageSwitcher />
            {isAuthenticated && <CartDropdown />}

            {/* Hamburger Menu Button */}
            <motion.button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-700 hover:bg-white/50 rounded-md transition-colors"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-neutral-200 bg-amber-50/98 backdrop-blur-md overflow-hidden"
            >
              <div className="px-4 py-6 space-y-6">
                {/* Navigation Links */}
                <nav className="space-y-4">
                  <Link
                    href="/"
                    className={`block text-[15px] uppercase tracking-[0.2em] py-2 transition-opacity hover:opacity-70 ${
                      pathnameWithoutLocale === "/"
                        ? "line-through decoration-1 decoration-neutral-900"
                        : ""
                    }`}
                  >
                    {t("nav.home")}
                  </Link>
                  <Link
                    href="/about"
                    className={`block text-[15px] uppercase tracking-[0.2em] py-2 transition-opacity hover:opacity-70 ${
                      pathnameWithoutLocale.startsWith("/about")
                        ? "line-through decoration-1 decoration-neutral-900"
                        : ""
                    }`}
                  >
                    {t("nav.about")}
                  </Link>
                  <Link
                    href="/our-story"
                    className={`block text-[15px] uppercase tracking-[0.2em] py-2 transition-opacity hover:opacity-70 ${
                      pathnameWithoutLocale.startsWith("/our-story")
                        ? "line-through decoration-1 decoration-neutral-900"
                        : ""
                    }`}
                  >
                    {t("nav.ourStory")}
                  </Link>
                  <Link
                    href="/blog"
                    className={`block text-[15px] uppercase tracking-[0.2em] py-2 transition-opacity hover:opacity-70 ${
                      pathnameWithoutLocale.startsWith("/blog")
                        ? "line-through decoration-1 decoration-neutral-900"
                        : ""
                    }`}
                  >
                    {t("nav.blog")}
                  </Link>
                  <Link
                    href="/shop"
                    className={`block text-[15px] uppercase tracking-[0.2em] py-2 transition-opacity hover:opacity-70 ${
                      pathnameWithoutLocale.startsWith("/shop")
                        ? "line-through decoration-1 decoration-neutral-900"
                        : ""
                    }`}
                  >
                    {t("nav.shop")}
                  </Link>
                </nav>

                {/* Location Button */}
                {userCity && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsLocationModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-neutral-600 bg-white/50 rounded-md hover:bg-white/70 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span className="text-[14px] tracking-[0.2em] uppercase">
                      {userCity}
                    </span>
                  </button>
                )}

                {/* Auth Buttons or User Menu */}
                {isAuthenticated ? (
                  <div className="pt-4 border-t border-neutral-200">
                    <UserMenu />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200">
                    <button
                      type="button"
                      onClick={() => {
                        openAuthModal("login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-3 text-[14px] uppercase tracking-[0.2em] text-neutral-700 border border-neutral-300 rounded-md hover:bg-white/50 transition-colors"
                    >
                      {t("auth.login")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        openAuthModal("register");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-3 text-[14px] uppercase tracking-[0.2em] text-amber-50 bg-[#33391d] border border-[#33391d] rounded-md hover:bg-[#2a2f18] transition-colors"
                    >
                      {t("auth.register")}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
