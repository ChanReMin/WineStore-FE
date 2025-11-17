"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Mail } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative w-full overflow-hidden bg-[#3b4417] py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold leading-tight tracking-[0.15em] text-white uppercase">
            Experience The Difference
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85">
            Visit our flagship store or book a private tasting session with our
            expert sommeliers. Let us help you discover wines that will create
            lasting memories.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/shop"
                className="group flex items-center gap-3 bg-white px-10 py-5 text-[12px] tracking-[0.25em] text-[#3b4417] transition-all hover:bg-[#f5f3e8] uppercase"
              >
                Explore Our Collection
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="group flex items-center gap-3 border-2 border-white/60 bg-white/10 px-10 py-5 text-[12px] tracking-[0.25em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20 uppercase">
                <Calendar size={18} />
                Book a Tasting
              </button>
            </motion.div>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid gap-8 border-t border-white/20 pt-12 sm:grid-cols-3"
          >
            <div>
              <p className="text-[13px] tracking-[0.2em] text-white/60 uppercase">
                Visit Us
              </p>
              <p className="mt-2 text-[16px] text-white">
                123 Wine Street
                <br />
                San Francisco, CA 94102
              </p>
            </div>

            <div>
              <p className="text-[13px] tracking-[0.2em] text-white/60 uppercase">
                Contact
              </p>
              <p className="mt-2 text-[16px] text-white">
                +1 (555) 123-4567
                <br />
                hello@winestore.com
              </p>
            </div>

            <div>
              <p className="text-[13px] tracking-[0.2em] text-white/60 uppercase">
                Hours
              </p>
              <p className="mt-2 text-[16px] text-white">
                Mon-Sat: 10am - 8pm
                <br />
                Sunday: 12pm - 6pm
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
