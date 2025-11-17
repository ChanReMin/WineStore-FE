"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import CountUp from "../CountUp";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#3b4417] py-20 md:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
          >
            <Mail size={36} className="text-white" strokeWidth={1.5} />
          </motion.div>

          {/* Heading */}
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-semibold tracking-[0.25em] text-white uppercase">
            Join Our Wine Club
          </h2>

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] italic text-white/70">
            <span className="h-px w-16 bg-white/30" />
            <span>Exclusive offers & tasting notes</span>
            <span className="h-px w-16 bg-white/30" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white/80">
            Subscribe to receive curated wine recommendations, exclusive discounts, and invitations to private tastings.
          </p>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-10 max-w-xl"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full border border-white/30 bg-white/10 px-6 py-4 text-[14px] text-white placeholder:text-white/50 backdrop-blur-sm transition-all focus:border-white/60 focus:bg-white/15 focus:outline-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitted}
                className="group flex items-center justify-center gap-2 bg-white px-8 py-4 text-[11px] tracking-[0.25em] text-[#3b4417] transition-all hover:bg-[#f5f3e8] disabled:opacity-50 uppercase"
              >
                {isSubmitted ? (
                  "Subscribed!"
                ) : (
                  <>
                    Subscribe
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </motion.button>
            </div>

            <p className="mt-4 text-[12px] text-white/60">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </motion.form>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-8 border-t border-white/20 pt-12"
          >
            {[
              { number: "10K+", label: "Wine Lovers" },
              { number: "500+", label: "Premium Wines" },
              { number: "50+", label: "Countries" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <p className="text-[32px] md:text-[40px] font-bold text-white">
                  <CountUp
                  from={0}
                  to={parseInt(stat.number.replace("+", "").replace("K", "000"))}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  />
                </p>
                <p className="mt-1 text-[12px] tracking-[0.2em] text-white/70 uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
