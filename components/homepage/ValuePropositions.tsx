"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Award, Headphones } from "lucide-react";

const VALUES = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $200",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected checkout",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Authentic wines only",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Sommeliers available 24/7",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  },
};

export default function ValuePropositions() {
  return (
    <section className="w-full border-y border-neutral-200 bg-white py-12 md:py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {VALUES.map((value, index) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f3e8] transition-colors group-hover:bg-[#3b4417]"
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-[#3b4417] transition-colors group-hover:text-white"
                />
              </motion.div>

              {/* Text */}
              <h3 className="text-[15px] font-semibold tracking-[0.15em] text-[#3b4417] uppercase">
                {value.title}
              </h3>
              <p className="mt-2 text-[13px] text-neutral-600">
                {value.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
