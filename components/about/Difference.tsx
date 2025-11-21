"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const FEATURES = [
  "Expert sommeliers with 50+ years combined experience",
  "Direct relationships with 100+ vineyards worldwide",
  "Temperature-controlled storage for optimal preservation",
  "Exclusive access to limited-edition and rare vintages",
  "Complimentary wine education and tasting events",
  "Carbon-neutral shipping and eco-friendly packaging",
  "30-day satisfaction guarantee on all purchases",
  "Personalized recommendations powered by AI and expertise",
];

export default function Difference() {
  return (
    <section className="w-full bg-white py-24 md:py-32">
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
              What Makes Us
              <br />
              Different
            </h2>

            <p className="mt-6 text-[17px] leading-relaxed text-neutral-700">
              In a world of mass-market wine retailers, we stand apart through
              our unwavering commitment to quality, authenticity, and customer
              experience. Here's what sets us apart:
            </p>

            {/* Features List */}
            <div className="mt-10 space-y-4">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3b4417]">
                    <Check size={14} strokeWidth={3} className="text-white" />
                  </div>
                  <p className="text-[16px] text-neutral-700">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square overflow-hidden"
                >
                  <Image
                    src="/hero/slide-1.jpg"
                    alt="Wine selection"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-4/5 overflow-hidden"
                >
                  <Image
                    src="/hero/slide-2.jpg"
                    alt="Wine cellar"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="space-y-4 pt-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-4/5 overflow-hidden"
                >
                  <Image
                    src="/hero/slide-3.jpg"
                    alt="Wine tasting"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square overflow-hidden"
                >
                  <Image
                    src="/hero/slide-4.jpg"
                    alt="Vineyard"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-[#3b4417] p-8 text-white shadow-2xl"
            >
              <p className="text-[48px] font-bold">50+</p>
              <p className="text-[14px] tracking-[0.2em] uppercase">
                Years of
                <br />
                Excellence
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
