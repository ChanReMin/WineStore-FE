"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Grape, Droplet, BarChart3, Package, Truck, Wine } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

const ICONS = [Grape, Droplet, BarChart3, Package, Truck, Wine];
const IMAGES = [
  "/hero/slide-1.jpg",
  "/hero/slide-2.jpg",
  "/hero/slide-3.jpg",
  "/hero/slide-4.jpg",
  "/hero/slide-5.jpg",
  "/hero/slide-6.jpg",
];

export default function WineJourney() {
  const t = useTranslations('about.wineJourney');
  
  const JOURNEY_STEPS = Array.from({ length: 6 }, (_, index) => ({
    icon: ICONS[index],
    title: t(`steps.${index}.title`),
    description: t(`steps.${index}.description`),
    image: IMAGES[index],
  }));
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white py-24 md:py-32"
    >
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

        {/* Journey Steps */}
        <div className="relative mt-20">
          {/* Connecting Line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-linear-to-b from-[#3b4417] via-[#7a8451] to-[#3b4417] md:block" />

          <div className="space-y-24">
            {JOURNEY_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`grid gap-8 md:grid-cols-2 md:gap-16 ${!isEven ? "md:grid-flow-dense" : ""}`}
                  >
                    {/* Image */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`relative aspect-4/3 overflow-hidden rounded-2xl shadow-2xl ${!isEven ? "md:col-start-2" : ""}`}
                    >
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />

                      {/* Overlay Number */}
                      <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#3b4417]/90 backdrop-blur-sm">
                        <span className="text-[24px] font-bold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div
                      className={`flex flex-col justify-center ${!isEven ? "md:col-start-1 md:row-start-1 md:text-right" : ""}`}
                    >
                      <motion.div
                        whileHover={{ x: isEven ? 8 : -8 }}
                        className="group"
                      >
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#3b4417] to-[#4a5520] shadow-lg ${!isEven ? "md:ml-auto" : ""}`}
                        >
                          <Icon
                            size={36}
                            strokeWidth={1.5}
                            className="text-white"
                          />
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-[28px] md:text-[32px] font-bold tracking-wide text-[#3b4417]">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-4 text-[17px] leading-relaxed text-neutral-700">
                          {step.description}
                        </p>

                        {/* Decorative Line */}
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100px" }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className={`mt-6 h-1 bg-linear-to-r from-[#3b4417] to-transparent ${!isEven ? "md:ml-auto md:bg-linear-to-l" : ""}`}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute left-8 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#3b4417] bg-white shadow-lg md:block"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
