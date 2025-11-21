"use client";

import { motion } from "framer-motion";
import { Leaf, Users, Shield, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We prioritize eco-friendly practices and partner exclusively with vineyards committed to organic and biodynamic farming.",
    color: "from-green-50 to-emerald-50",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building lasting relationships with winemakers, customers, and wine enthusiasts through education and shared passion.",
    color: "from-blue-50 to-indigo-50",
  },
  {
    icon: Shield,
    title: "Authenticity",
    description:
      "Every bottle is guaranteed authentic, properly stored, and sourced directly from trusted producers worldwide.",
    color: "from-amber-50 to-orange-50",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description:
      "Uncompromising standards in selection, service, and expertise. We settle for nothing less than extraordinary.",
    color: "from-purple-50 to-pink-50",
  },
];

export default function Values() {
  return (
    <section className="w-full bg-linear-to-b from-[#fdfbf5] to-white py-24 md:py-32">
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
            Our Core Values
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-neutral-600">
            The principles that guide everything we do
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl md:p-10"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${value.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3b4417] transition-colors group-hover:bg-[#4a5520]"
                  >
                    <Icon size={32} strokeWidth={1.5} className="text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="mt-6 text-[24px] md:text-[28px] font-bold tracking-wide text-[#3b4417]">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-[16px] leading-relaxed text-neutral-700">
                    {value.description}
                  </p>

                  {/* Decorative Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    className="mt-6 h-px bg-linear-to-r from-[#3b4417] to-transparent"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 border-l-4 border-[#3b4417] bg-[#f5f3e8] p-8 md:p-12"
        >
          <blockquote className="text-[20px] md:text-[24px] font-serif italic leading-relaxed text-[#3b4417]">
            "Our mission is simple: to share the world's most exceptional wines
            with people who appreciate the artistry, tradition, and passion
            behind every bottle. We believe wine is more than a beverage—it's a
            bridge between cultures, a celebration of craftsmanship, and a
            catalyst for unforgettable moments."
          </blockquote>
          <p className="mt-6 text-[15px] font-semibold tracking-wide text-neutral-700">
            — Robert Chen, Founder
          </p>
        </motion.div>
      </div>
    </section>
  );
}
