"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TIMELINE_LEFT = [
  {
    year: "1957",
    title: "Purchased Vineyard",
    text: "Our story begins with a small hillside vineyard, purchased by the first generation of the family.",
  },
  {
    year: "1976",
    title: "First Vintage",
    text: "After years of tending the vines, our very first house vintage was bottled and shared with close friends.",
  },
  {
    year: "1990",
    title: "Boutique Cellar",
    text: "We opened a tiny cellar door, welcoming travelers to taste limited releases straight from the barrel.",
  },
];

const TIMELINE_RIGHT = [
  {
    year: "1961",
    title: "First Vineyard Harvest",
    text: "A remarkable growing season delivered the harvest that would shape our winemaking philosophy.",
  },
  {
    year: "1985",
    title: "First Wine Club",
    text: "Loyal guests became members of our wine club, receiving curated selections for every season.",
  },
  {
    year: "2011",
    title: "Organic Winery",
    text: "We completed our transition to a fully organic estate, honoring the land that sustains our vines.",
  },
];

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
          The Fresh New Wine Stories
        </h2>

        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] italic text-[#7a8451]">
          <span className="h-px w-16 bg-[#d4d6b4]" />
          <span>estd 1970</span>
          <span className="h-px w-16 bg-[#d4d6b4]" />
        </div>

        {/* Timeline + Grapes */}
        <div className="relative mt-16 md:mt-20">
          {/* Center grapes illustration */}

          <div className="relative grid gap-y-20 md:grid-cols-3 md:gap-x-24 md:gap-y-14 text-left">
            {/* Left column */}
            <div className="space-y-10 md:space-y-16">
              {TIMELINE_LEFT.map((item) => (
                <motion.div
                  key={item.year}
                  variants={itemVariants}
                  whileInView="show"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.4 }}
                  className="md:text-right"
                >
                  <p className="text-[28px] font-semibold tracking-[0.2em] text-[#3b4417] uppercase">
                    {item.year}
                  </p>
                  <p className="mt-1 text-sm italic text-[#7a8451] text-[17px]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-[16px] leading-relaxed text-neutral-700">
                    {item.text}
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
              {TIMELINE_RIGHT.map((item) => (
                <motion.div
                  key={item.year}
                  variants={itemVariants}
                  whileInView="show"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <p className="text-[28px] font-semibold tracking-[0.2em] text-[#3b4417] uppercase">
                    {item.year}
                  </p>
                  <p className="mt-1 text-sm text-[17px] italic text-[#7a8451]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-[16px] leading-relaxed text-neutral-700">
                    {item.text}
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
