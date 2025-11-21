"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#3b4417] via-[#4a5520] to-[#3b4417] py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold leading-tight tracking-[0.15em] text-white uppercase">
            Let's Connect
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85">
            Whether you're looking for the perfect bottle, want to join our wine
            club, or simply have questions—we're here to help.
          </p>

          {/* Contact Methods */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Phone,
                title: "Call Us",
                info: "+1 (555) 123-4567",
                subtext: "Mon-Sat, 10am-8pm",
              },
              {
                icon: Mail,
                title: "Email Us",
                info: "hello@winestore.com",
                subtext: "We reply within 24 hours",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: "123 Wine Street, SF",
                subtext: "See our full collection",
              },
            ].map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all group-hover:bg-white/20">
                    <Icon size={28} strokeWidth={1.5} className="text-white" />
                  </div>
                  <h3 className="text-[18px] font-semibold tracking-wide text-white">
                    {method.title}
                  </h3>
                  <p className="mt-2 text-[16px] text-white/90">
                    {method.info}
                  </p>
                  <p className="mt-1 text-[13px] text-white/60">
                    {method.subtext}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/shop"
                className="group flex items-center gap-3 bg-white px-10 py-5 text-[12px] tracking-[0.25em] text-[#3b4417] transition-all hover:bg-[#f5f3e8] uppercase"
              >
                Browse Wines
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/our-story"
                className="group flex items-center gap-3 border-2 border-white/60 bg-white/10 px-10 py-5 text-[12px] tracking-[0.25em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20 uppercase"
              >
                Our Story
              </Link>
            </motion.div>
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-8 text-[13px] text-white/60"
          >
            <span>✓ 50,000+ Happy Customers</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">✓ 4.9/5 Rating</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">✓ Award-Winning Service</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
