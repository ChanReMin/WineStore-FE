"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SLIDE_IMAGES = [
  "/hero/slide-1.jpg",
  "/hero/slide-2.jpg",
  "/hero/slide-3.jpg",
  "/hero/slide-4.jpg",
  "/hero/slide-5.jpg",
];

// Smooth slide animation with crossfade
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.1,
    zIndex: 2,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 2,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.95,
    zIndex: 1,
  }),
};

export default function Hero() {
  const t = useTranslations("home.hero");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // Track slide direction
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // ✅ OPTIMIZED: Preload strategy cho performance tốt hơn
  useEffect(() => {
    // 1. Priority preload ảnh đầu tiên (LCP critical)
    const firstImageLink = document.createElement("link");
    firstImageLink.rel = "preload";
    firstImageLink.as = "image";
    firstImageLink.href = SLIDE_IMAGES[0];
    firstImageLink.setAttribute("fetchPriority", "high");
    document.head.appendChild(firstImageLink);

    // 2. Preload ảnh thứ 2 (sẽ hiển thị tiếp theo)
    const secondImg = new window.Image();
    secondImg.src = SLIDE_IMAGES[1];

    // 3. Lazy preload các ảnh còn lại
    const preloadRemainingImages = () => {
      SLIDE_IMAGES.slice(2).forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    };

    // Preload sau 2s hoặc khi user hover vào hero section
    const timer = setTimeout(preloadRemainingImages, 2000);
    const heroElement = document.querySelector("section");
    const hoverHandler = () => {
      preloadRemainingImages();
    };
    heroElement?.addEventListener("mouseenter", hoverHandler, { once: true });

    setImagesLoaded(true); // Cho phép component render ngay

    return () => {
      clearTimeout(timer);
      heroElement?.removeEventListener("mouseenter", hoverHandler);
      if (firstImageLink.parentNode) {
        document.head.removeChild(firstImageLink);
      }
    };
  }, []);

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
    if (!imagesLoaded) return; // Wait for images to load before autoplay

    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % SLIDE_IMAGES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [imagesLoaded]);

  // Preload next image dynamically
  useEffect(() => {
    const nextImageUrl = SLIDE_IMAGES[(index + 1) % SLIDE_IMAGES.length];
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = nextImageUrl;
    link.setAttribute("fetchPriority", "low");
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, [index]);

  const currentImage = SLIDE_IMAGES[index];
  const currentTitle = t(`slides.${index}.title`);
  const currentTagline = t(`slides.${index}.tagline`);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black isolate">
      {/* BACKGROUND + ANIMATION - Optimized slide with no black gap */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentImage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "tween",
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth motion
              },
              opacity: {
                duration: 0.6,
                ease: "easeInOut",
              },
              scale: {
                duration: 0.8,
                ease: "easeOut",
              },
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <Image
              src={currentImage}
              alt={currentTitle}
              fill
              priority={index === 0} // Priority for first image
              quality={index === 0 ? 95 : 85}
              sizes="100vw"
              className="object-cover pointer-events-none"
              style={{
                willChange: "transform, opacity", // GPU acceleration hint
              }}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiMyYTJmMTgiLz48L3N2Zz4="
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TEXT GIỮA MỖI SLIDE */}
      <div className="relative flex h-full w-full items-center justify-center px-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="text-center text-white"
            style={{
              willChange: "transform, opacity",
            }}
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
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row z-20">
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NÚT TRÁI / PHẢI */}
      <div className="absolute inset-y-0 flex w-full items-center justify-between px-6 md:px-10 pointer-events-none z-20">
        <motion.button
          type="button"
          onClick={prev}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-lg cursor-pointer pointer-events-auto hover:bg-black/40 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} strokeWidth={1.25} />
        </motion.button>

        <motion.button
          type="button"
          onClick={next}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          className="hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-lg cursor-pointer pointer-events-auto hover:bg-black/40 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={32} strokeWidth={1.25} />
        </motion.button>
      </div>

      {/* SLIDE INDICATORS (DOTS) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {SLIDE_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
