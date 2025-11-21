"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wine, Globe, Award, Heart } from "lucide-react";

const FEATURES = [
  {
    icon: Wine,
    title: "Curated Selection",
    description:
      "Every wine is personally tasted and approved by our master sommeliers",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Direct partnerships with over 100 vineyards across 30 countries",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description:
      "Recognized internationally for excellence in wine retail and education",
  },
  {
    icon: Heart,
    title: "Passion-Driven",
    description:
      "Three generations of family dedication to the art of winemaking",
  },
];

export default function Heritage() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24 md:py-32">
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
              Heritage &
              <br />
              Excellence
            </h2>

            <p className="mt-6 text-[17px] leading-relaxed text-neutral-700">
              What started as a passion project has grown into one of the most
              respected wine merchants in the industry. Our commitment to
              quality, authenticity, and customer education remains unchanged.
            </p>

            {/* Features Grid */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f3e8] transition-colors group-hover:bg-[#3b4417]">
                      <Icon
                        size={24}
                        strokeWidth={1.5}
                        className="text-[#3b4417] transition-colors group-hover:text-white"
                      />
                    </div>
                    <h3 className="mt-4 text-[18px] font-semibold text-[#3b4417]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/hero/slide-2.jpg"
                    alt="Wine cellar"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/hero/slide-3.jpg"
                    alt="Wine tasting"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/hero/slide-4.jpg"
                    alt="Vineyard"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/hero/slide-5.jpg"
                    alt="Wine bottles"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
