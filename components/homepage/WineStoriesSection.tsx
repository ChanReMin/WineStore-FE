"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const containerVariants: any = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

export default function WineStoriesSection() {
  const t = useTranslations("home.wineStories");

  return (
    <section className="w-full bg-[#fdfbf5] py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-6xl px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Heading */}
        <h2 className="text-[22px] md:text-[26px] lg:text-[30px] font-semibold tracking-[0.35em] text-[#3b4417] uppercase">
          {t("title")}
        </h2>

        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] italic text-[#7a8451]">
          <span className="h-px w-16 bg-[#d4d6b4]" />
          <span>{t("subtitle")}</span>
          <span className="h-px w-16 bg-[#d4d6b4]" />
        </div>

        {/* Timeline + Grapes */}
        <div className="relative mt-16 md:mt-20">
          {/* Center grapes illustration */}

          <div className="relative grid gap-y-20 md:grid-cols-3 md:gap-x-24 md:gap-y-14 text-left">
            {/* Left column */}
            <div className="space-y-10 md:space-y-16">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileInView="show"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.4 }}
                  className="md:text-right"
                >
                  <p className="text-[28px] font-semibold tracking-[0.2em] text-[#3b4417] uppercase">
                    {t(`timeline.left.${index}.year`)}
                  </p>
                  <p className="mt-1 text-sm italic text-[#7a8451] text-[17px]">
                    {t(`timeline.left.${index}.title`)}
                  </p>
                  <p className="mt-3 text-[16px] leading-relaxed text-neutral-700">
                    {t(`timeline.left.${index}.text`)}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="pointer-events-none inset-0 hidden items-center justify-center md:flex"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 0.7, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/hero/slide-7.jpg" // đổi path theo file của bạn
                alt="Grapes illustration"
                width={600}
                height={600}
                className="opacity-70"
              />
            </motion.div>

            {/* Right column */}
            <div className="space-y-10 md:space-y-16">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileInView="show"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <p className="text-[28px] font-semibold tracking-[0.2em] text-[#3b4417] uppercase">
                    {t(`timeline.right.${index}.year`)}
                  </p>
                  <p className="mt-1 text-sm text-[17px] italic text-[#7a8451]">
                    {t(`timeline.right.${index}.title`)}
                  </p>
                  <p className="mt-3 text-[16px] leading-relaxed text-neutral-700">
                    {t(`timeline.right.${index}.text`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
