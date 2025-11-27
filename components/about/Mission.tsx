"use client";

import { motion } from "framer-motion";
import { Target, Eye, Compass } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Mission() {
  const t = useTranslations("about.mission");

  const PILLARS = [
    {
      icon: Target,
      title: t("pillars.mission.title"),
      description: t("pillars.mission.description"),
    },
    {
      icon: Eye,
      title: t("pillars.vision.title"),
      description: t("pillars.vision.description"),
    },
    {
      icon: Compass,
      title: t("pillars.purpose.title"),
      description: t("pillars.purpose.description"),
    },
  ];
  return (
    <section className="w-full bg-[#fdfbf5] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold tracking-wide text-[#3b4417] uppercase">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-neutral-600">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#3b4417] transition-colors group-hover:bg-[#4a5520]"
                >
                  <Icon size={32} strokeWidth={1.5} className="text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-[24px] font-bold tracking-wide text-[#3b4417]">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
                  {pillar.description}
                </p>

                {/* Decorative Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="mt-6 h-px bg-linear-to-r from-[#3b4417] to-transparent"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
