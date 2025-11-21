"use client";

import { motion } from "framer-motion";
import { Wine, Sparkles } from "lucide-react";

const MILESTONES = [
  {
    year: "1970",
    title: "The Beginning",
    description:
      "Founded by wine enthusiast Robert Chen in a small storefront in downtown. Started with just 50 carefully selected bottles from France and Italy.",
  },
  {
    year: "1985",
    title: "Expansion & Recognition",
    description:
      "Opened our second location and received the prestigious Wine Merchant of the Year award. Expanded collection to include New World wines.",
  },
  {
    year: "1998",
    title: "Digital Revolution",
    description:
      "Launched our online platform, making premium wines accessible nationwide. Introduced virtual tastings and sommelier consultations.",
  },
  {
    year: "2010",
    title: "Global Partnerships",
    description:
      "Established direct relationships with over 100 vineyards worldwide. Began exclusive import program for rare and limited-edition wines.",
  },
  {
    year: "2018",
    title: "Sustainability Initiative",
    description:
      "Committed to eco-friendly practices. Partnered exclusively with organic and biodynamic vineyards. Achieved carbon-neutral shipping.",
  },
  {
    year: "2024",
    title: "Innovation & Growth",
    description:
      "Launched AI-powered wine recommendation system. Opened flagship tasting room and wine education center. Serving 50,000+ wine lovers globally.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
  },
};

export default function Timeline() {
  return (
    <section className="w-full bg-[#fdfbf5] py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Decorative line */}
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-16 md:w-24 bg-[#3b4417]/30" />
            <Sparkles size={16} className="text-[#3b4417]/40" />
            <span className="h-px w-16 md:w-24 bg-[#3b4417]/30" />
          </div>

          <h2 className="text-[34px] md:text-[44px] lg:text-[52px] font-semibold tracking-[0.15em] text-[#3b4417] uppercase">
            Our Journey
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-neutral-600 tracking-wide">
            Five decades of passion, growth, and dedication to the art of wine
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-24"
        >
          {/* Center Line with gradient */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-linear-to-b from-transparent via-[#3b4417]/30 to-transparent md:block" />

          {/* Milestones */}
          <div className="space-y-20 md:space-y-28">
            {MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className={`relative grid gap-8 md:grid-cols-2 md:gap-20 ${
                    isEven ? "" : "md:text-right"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`${
                      isEven ? "md:col-start-1" : "md:col-start-2"
                    }`}
                  >
                    <motion.div
                      whileHover={{ x: isEven ? 6 : -6, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      {/* Year badge */}
                      <div
                        className={`inline-flex items-center gap-3 ${isEven ? "" : "md:flex-row-reverse"}`}
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3b4417]/10"
                        >
                          <Wine size={20} className="text-[#3b4417]" />
                        </motion.div>
                        <span className="text-[28px] md:text-[32px] font-bold tracking-wider text-[#3b4417]">
                          {milestone.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-5 text-[26px] md:text-[30px] font-semibold tracking-wide text-[#3b4417] transition-colors group-hover:text-[#4a5520]">
                        {milestone.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-4 text-[16px] md:text-[17px] leading-relaxed text-neutral-600 tracking-wide">
                        {milestone.description}
                      </p>

                      {/* Decorative underline */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`mt-6 h-0.5 w-20 bg-linear-to-r from-[#3b4417] to-transparent ${
                          isEven ? "" : "md:ml-auto md:bg-linear-to-l"
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Center Dot with pulse animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute left-1/2 top-0 hidden -translate-x-1/2 md:block"
                  >
                    <div className="relative">
                      {/* Outer pulse ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 h-6 w-6 -translate-x-1 -translate-y-1 rounded-full bg-[#3b4417]/30"
                      />
                      {/* Main dot */}
                      <div className="h-4 w-4 rounded-full border-[3px] border-[#3b4417] bg-[#fdfbf5] shadow-lg" />
                    </div>
                  </motion.div>

                  {/* Empty space for alternating layout */}
                  <div
                    className={`hidden md:block ${isEven ? "md:col-start-2" : "md:col-start-1"}`}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
