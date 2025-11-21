"use client";

import { motion } from "framer-motion";
import { Wine, BookOpen } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full w-full"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/wines/wine-1.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-center text-white"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 flex justify-center gap-4"
          >
            <Wine className="h-8 w-8 text-white/80" strokeWidth={1} />
            <BookOpen className="h-8 w-8 text-white/80" strokeWidth={1} />
          </motion.div>

          {/* Main Title */}
          <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-semibold tracking-[0.35em] uppercase leading-tight">
            WINE KNOWLEDGE
          </h1>

          {/* Decorative Line */}
          <div className="mt-6 flex items-center justify-center gap-4 text-[11px] italic tracking-[0.25em]">
            <span className="h-px w-16 md:w-24 bg-white/70" />
            <span>JOURNAL</span>
            <span className="h-px w-16 md:w-24 bg-white/70" />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-white/85 tracking-wider leading-relaxed"
          >
            Discover the art of enjoying wine through specialized articles deep
            <br className="hidden md:block" />
            from sommeliers and wine enthusiasts
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
              className="group inline-flex items-center gap-3 border-2 border-white/60 bg-white/10 px-12 py-4 text-[11px] tracking-[0.25em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20 uppercase"
            >
              EXPLORE NOW
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-8 w-px bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
