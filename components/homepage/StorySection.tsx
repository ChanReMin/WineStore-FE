"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

// animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

export default function StorySection() {
  const t = useTranslations("home.story");

  return (
    <section className="w-full bg-white py-32 md:py-36">
      <motion.div
        className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 md:flex-row md:gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* LEFT: BIG HEADING */}
        <motion.div variants={itemVariants} className="md:w-1/2">
          <h2 className="text-[28px] leading-[1.3] tracking-widest text-[#3b4417] md:text-[34px] lg:text-[40px] uppercase font-semibold whitespace-pre-line">
            {t("heading")}
          </h2>

          <div className="mt-6 flex items-center gap-3 text-sm italic text-[#4c5b23]">
            <span className="h-px w-10 bg-[#4c5b23]" />
            <span>{t("subtitle")}</span>
          </div>
        </motion.div>

        {/* RIGHT: TEXT + BUTTON */}
        <motion.div variants={itemVariants} className="md:w-1/2">
          <div className="space-y-4 text-[18px] leading-relaxed text-neutral-700 tracking-widest">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>

          {/* READ MORE BUTTON */}
          <motion.div className="mt-10" variants={itemVariants}>
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center px-10 py-3 text-[11px] tracking-[0.3em] uppercase text-[#3b4417]"
            >
              {/* khung viền */}
              <span className="absolute inset-0 border border-[#c8c8a3]" />
              {/* tạo cảm giác hở góc bằng 2 line nhỏ */}
              <span className="pointer-events-none absolute left-0 bottom-0 h-px w-16 bg-white transition-all duration-300 group-hover:w-0" />
              <span className="pointer-events-none absolute right-0 top-0 h-px w-16 bg-white transition-all duration-300 group-hover:w-0" />

              <span className="relative bg-white px-4 py-1">
                {t("readMore")}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
