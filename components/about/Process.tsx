"use client";

import { motion } from "framer-motion";
import { Search, Handshake, Package, Sparkles } from "lucide-react";
import { useTranslations } from 'next-intl';

const ICONS = [Search, Handshake, Package, Sparkles];
const NUMBERS = ["01", "02", "03", "04"];

export default function Process() {
  const t = useTranslations('about.process');
  
  const STEPS = Array.from({ length: 4 }, (_, index) => ({
    icon: ICONS[index],
    number: NUMBERS[index],
    title: t(`steps.${index}.title`),
    description: t(`steps.${index}.description`),
  }));
  return (
    <section className="w-full bg-linear-to-b from-white to-[#fdfbf5] py-24 md:py-32">
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
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-neutral-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-20 grid gap-12 md:grid-cols-2 lg:gap-16">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="flex gap-6">
                  {/* Number & Icon */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-[#3b4417] transition-colors group-hover:bg-[#4a5520]"
                    >
                      <Icon
                        size={36}
                        strokeWidth={1.5}
                        className="text-white"
                      />
                    </motion.div>
                    <div className="mt-4 text-[48px] font-bold text-[#3b4417]/10">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-[24px] md:text-[28px] font-bold tracking-wide text-[#3b4417]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-neutral-700">
                      {step.description}
                    </p>

                    {/* Progress Line */}
                    {index < STEPS.length - 1 && (
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="absolute left-10 top-24 hidden w-px bg-linear-to-b from-[#3b4417] to-transparent md:block"
                        style={{ height: "calc(100% + 3rem)" }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
