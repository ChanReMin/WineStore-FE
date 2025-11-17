"use client";

import { motion } from "framer-motion";

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

export default function Timeline() {
  return (
    <section className="w-full bg-[#fdfbf5] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold tracking-wide text-[#3b4417] uppercase">
            Our Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-neutral-600">
            Five decades of passion, growth, and dedication to the art of wine
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#d4d6b4] via-[#3b4417] to-[#d4d6b4] md:block" />

          {/* Milestones */}
          <div className="space-y-16 md:space-y-24">
            {MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative grid gap-8 md:grid-cols-2 md:gap-16 ${
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
                      whileHover={{ x: isEven ? 8 : -8 }}
                      className="group"
                    >
                      <div className="inline-block rounded-full bg-[#3b4417] px-6 py-2">
                        <span className="text-[24px] font-bold text-white">
                          {milestone.year}
                        </span>
                      </div>

                      <h3 className="mt-4 text-[24px] md:text-[28px] font-semibold tracking-wide text-[#3b4417]">
                        {milestone.title}
                      </h3>

                      <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 top-0 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#3b4417] bg-white md:block" />

                  {/* Empty space for alternating layout */}
                  <div className={`hidden md:block ${isEven ? "md:col-start-2" : "md:col-start-1"}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
