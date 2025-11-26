"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const SLIDE_IMAGES = [
  "/hero/slide-1.jpg",
  "/hero/slide-2.jpg",
  "/hero/slide-3.jpg",
  "/hero/slide-4.jpg",
  "/hero/slide-5.jpg",
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 1 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction === 1 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function Hero() {
  const t = useTranslations("home.hero");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1: next, -1: prev

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % SLIDE_IMAGES.length);
  };

  // ===== AUTOPLAY: tự chuyển slide mỗi 6 giây =====
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1); // đi tới
      setIndex((i) => (i + 1) % SLIDE_IMAGES.length);
    }, 6000); // 6000ms = 6 giây

    return () => clearInterval(timer); // cleanup khi unmount
  }, []);

  const currentImage = SLIDE_IMAGES[index];
  const currentTitle = t(`slides.${index}.title`);
  const currentTagline = t(`slides.${index}.tagline`);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black isolate">
      {/* BACKGROUND + ANIMATION */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentImage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${currentImage})` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TEXT GIỮA MỖI SLIDE */}
      <div className="relative flex h-full w-full items-center justify-center px-4">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-center text-white"
        >
          <h2 className="text-[26px] md:text-[40px] lg:text-[52px] font-semibold tracking-[0.35em] uppercase">
            {currentTitle}
          </h2>

          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="flex items-center justify-center gap-4 text-[11px] italic tracking-[0.25em]">
              <span className="h-px w-16 md:w-24 bg-white/70" />
              <span>{t("estd")}</span>
              <span className="h-px w-16 md:w-24 bg-white/70" />
            </div>

            <p className="mt-1 max-w-xl text-xs md:text-sm text-white/85">
              {currentTagline}
            </p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row z-20"
          >
            <motion.a
              href="/shop"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 bg-white px-10 py-4 text-[11px] tracking-[0.25em] text-[#3b4417] transition-all hover:bg-[#f5f3e8] uppercase"
            >
              {t("shopNow")}
              <ChevronRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>

            <motion.a
              href="/our-story"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 border-2 border-white/60 bg-white/10 px-10 py-4 text-[11px] tracking-[0.25em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20 uppercase"
            >
              {t("ourStory")}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* NÚT TRÁI / PHẢI */}
      <div className="absolute inset-y-0 flex w-full items-center justify-between px-6 md:px-10 pointer-events-none">
        <motion.button
          type="button"
          onClick={prev}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-lg cursor-pointer pointer-events-auto"
        >
          <ChevronLeft size={32} strokeWidth={1.25} />
        </motion.button>

        <motion.button
          type="button"
          onClick={next}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-lg cursor-pointer pointer-events-auto"
        >
          <ChevronRight size={32} strokeWidth={1.25} />
        </motion.button>
      </div>
    </section>
  );
}
