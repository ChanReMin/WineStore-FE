"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function StoryHero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero/slide-6.jpg"
          alt="Our vineyard"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6 flex items-center justify-center gap-4 text-[11px] italic tracking-[0.25em]"
          >
            <span className="h-px w-16 bg-white/70" />
            <span>Since 1970</span>
            <span className="h-px w-16 bg-white/70" />
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-bold leading-tight tracking-[0.15em] uppercase">
            Our Story
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/90"
          >
            A journey through generations of passion, craftsmanship, and an
            unwavering commitment to bringing the world's finest wines to your
            table.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/80 hover:text-white"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase">
              Scroll
            </span>
            <ChevronDown size={24} strokeWidth={1.5} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
