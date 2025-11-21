"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "../CountUp";

export default function Philosophy() {
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src="/hero/slide-1.jpg"
                alt="Wine philosophy"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-[#3b4417] p-8 text-white md:p-12"
            >
              <p className="text-[24px] md:text-[32px] font-serif italic leading-tight">
                "Every bottle
                <br />
                tells a story"
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold leading-tight tracking-wide text-[#3b4417] uppercase">
              Our Philosophy
            </h2>

            <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-neutral-700">
              <p>
                Founded in 1970, our wine store began with a simple belief: that
                exceptional wine should be accessible to everyone who
                appreciates the art of winemaking.
              </p>

              <p>
                We don't just sell wine—we curate experiences. Each bottle in
                our collection is carefully selected by our team of expert
                sommeliers who travel the world to discover hidden gems and
                establish relationships with passionate winemakers.
              </p>

              <p>
                From small family vineyards in Burgundy to innovative estates in
                Napa Valley, we seek out wines that embody authenticity,
                quality, and a true sense of place. Our mission is to connect
                you with these stories, one glass at a time.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-8 border-t border-neutral-200 pt-8"
            >
              {[
                { number: "50+", label: "Years" },
                { number: "500+", label: "Wines" },
                { number: "30+", label: "Countries" },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-[36px] md:text-[44px] font-bold text-[#3b4417]">
                    <CountUp
                      from={0}
                      to={parseInt(
                        stat.number.replace("+", "").replace("K", "000")
                      )}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                    +
                  </p>
                  <p className="mt-1 text-[13px] tracking-[0.2em] text-neutral-500 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
