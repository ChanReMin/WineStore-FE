"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, GraduationCap, Users, Wine } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Wine, GraduationCap, Users, Calendar];

export default function Community() {
  const t = useTranslations("about.community");

  const INITIATIVES = Array.from({ length: 4 }, (_, index) => ({
    icon: ICONS[index],
    title: t(`initiatives.${index}.title`),
    description: t(`initiatives.${index}.description`),
    stat: t(`initiatives.${index}.stat`),
  }));
  return (
    <section className="w-full bg-[#fdfbf5] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-tight tracking-wide text-[#3b4417] uppercase">
              {t("title")}
              <br />
              {t("titleLine2")}
            </h2>

            <p className="mt-6 text-[17px] leading-relaxed text-neutral-700">
              {t("subtitle")}
            </p>

            {/* Initiatives */}
            <div className="mt-10 space-y-6">
              {INITIATIVES.map((initiative, index) => {
                const Icon = initiative.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="group flex gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3b4417] transition-colors group-hover:bg-[#4a5520]">
                      <Icon
                        size={24}
                        strokeWidth={1.5}
                        className="text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-[18px] font-bold text-[#3b4417]">
                          {initiative.title}
                        </h3>
                        <span className="text-[13px] font-semibold text-[#d4af37]">
                          {initiative.stat}
                        </span>
                      </div>
                      <p className="mt-1 text-[15px] text-neutral-600">
                        {initiative.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 bg-[#3b4417] px-10 py-4 text-[12px] tracking-[0.25em] text-white transition-all hover:bg-[#4a5520] uppercase"
              >
                {t("cta")}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src="/hero/slide-5.jpg"
                alt="Wine community"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-white p-8 shadow-2xl"
            >
              <p className="text-[48px] font-bold text-[#3b4417]">
                {t("badge.number")}
              </p>
              <p className="text-[14px] tracking-[0.2em] text-neutral-600 uppercase">
                {t("badge.text")}
                <br />
                {t("badge.textLine2")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
