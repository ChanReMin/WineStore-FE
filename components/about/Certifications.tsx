"use client";

import { motion } from "framer-motion";
import { Award, Leaf, Shield, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Award, Leaf, Shield, Star];

export default function Certifications() {
  const t = useTranslations("about.certifications");

  const CERTIFICATIONS = Array.from({ length: 4 }, (_, index) => ({
    icon: ICONS[index],
    title: t(`items.${index}.title`),
    year: t(`items.${index}.year`),
    description: t(`items.${index}.description`),
  }));

  const PARTNERS = Array.from({ length: 6 }, (_, index) =>
    t(`partners.list.${index}`)
  );
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
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

        {/* Certifications Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-[#fdfbf5] p-6 text-center transition-shadow hover:shadow-xl"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3b4417] transition-colors group-hover:bg-[#4a5520]"
                >
                  <Icon size={32} strokeWidth={1.5} className="text-white" />
                </motion.div>

                <h3 className="text-[18px] font-bold text-[#3b4417]">
                  {cert.title}
                </h3>
                <p className="mt-2 text-[14px] font-semibold text-[#d4af37]">
                  {cert.year}
                </p>
                <p className="mt-2 text-[14px] text-neutral-600">
                  {cert.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 border-t border-neutral-200 pt-12"
        >
          <p className="text-center text-[13px] tracking-[0.2em] text-neutral-500 uppercase">
            {t("partners.title")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {PARTNERS.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="text-[15px] font-medium text-neutral-400 transition-colors hover:text-[#3b4417]"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
