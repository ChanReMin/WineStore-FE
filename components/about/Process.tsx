"use client";

import { motion } from "framer-motion";
import { Search, Handshake, Package, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Discover & Curate",
    description:
      "Our sommeliers travel the world, visiting vineyards and tasting thousands of wines to find exceptional bottles worth sharing.",
  },
  {
    icon: Handshake,
    number: "02",
    title: "Build Relationships",
    description:
      "We establish direct partnerships with winemakers, ensuring authenticity, fair pricing, and exclusive access to limited releases.",
  },
  {
    icon: Package,
    number: "03",
    title: "Store & Preserve",
    description:
      "Every bottle is stored in our temperature-controlled facility, maintaining optimal conditions from vineyard to your door.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "Deliver Excellence",
    description:
      "We package with care, ship carbon-neutral, and provide expert guidance to ensure your wine experience is unforgettable.",
  },
];

export default function Process() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-[#fdfbf5] py-24 md:py-32">
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
            Our Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-neutral-600">
            From vineyard to your glass, every step is designed to deliver
            excellence
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
                        className="absolute left-10 top-24 hidden w-px bg-gradient-to-b from-[#3b4417] to-transparent md:block"
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
