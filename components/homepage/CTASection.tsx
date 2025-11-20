"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-[#3b4417] via-[#4a5520] to-[#3b4417] py-24 md:py-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: [null, Math.random() * 100 + "%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
          >
            <Sparkles size={36} className="text-white" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold leading-tight tracking-[0.2em] text-white uppercase">
            Ready to Discover
            <br />
            Your Perfect Wine?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85">
            Browse our curated collection of premium wines from around the
            world. Whether you're a connoisseur or just beginning your journey,
            we have something special for you.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/shop"
                className="group flex items-center gap-3 bg-white px-10 py-5 text-[12px] tracking-[0.25em] text-[#3b4417] transition-all hover:bg-[#f5f3e8] uppercase"
              >
                Shop Now
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/our-story"
                className="group flex items-center gap-3 border-2 border-white/40 bg-transparent px-10 py-5 text-[12px] tracking-[0.25em] text-white transition-all hover:border-white hover:bg-white/10 uppercase"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Trust Indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-[13px] text-white/60"
          >
            ✓ Free shipping on orders over $200 • ✓ 30-day return policy • ✓
            Secure checkout
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
