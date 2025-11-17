"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Wine Enthusiast",
    rating: 5,
    text: "The selection is impeccable. Every bottle I've ordered has exceeded my expectations. The sommelier recommendations are spot-on!",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "James Chen",
    role: "Restaurant Owner",
    rating: 5,
    text: "We've been sourcing wines for our restaurant from here for 3 years. Quality is consistent, delivery is prompt, and the team is incredibly knowledgeable.",
    location: "San Francisco, USA",
  },
  {
    id: 3,
    name: "Emma Laurent",
    role: "Collector",
    rating: 5,
    text: "As a serious collector, I appreciate their rare vintage selection. They've helped me find bottles I couldn't locate anywhere else.",
    location: "Paris, France",
  },
  {
    id: 4,
    name: "Michael Torres",
    role: "Home Chef",
    rating: 5,
    text: "The food pairing suggestions are brilliant. My dinner parties have never been better. Highly recommend their wine club membership!",
    location: "Barcelona, Spain",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-semibold tracking-[0.3em] text-[#3b4417] uppercase">
            What Our Clients Say
          </h2>
          
          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] italic text-[#7a8451]">
            <span className="h-px w-16 bg-[#d4d6b4]" />
            <span>Trusted by wine lovers worldwide</span>
            <span className="h-px w-16 bg-[#d4d6b4]" />
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setActiveIndex(index)}
              className="group relative bg-[#fdfbf5] p-8 transition-shadow hover:shadow-xl"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3b4417] transition-transform group-hover:scale-110">
                  <Quote size={20} className="text-white" fill="white" />
                </div>
              </div>

              {/* Rating */}
              <div className="mt-6 flex gap-1 text-[#d4af37]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  >
                    <Star size={16} fill="#d4af37" strokeWidth={0} />
                  </motion.div>
                ))}
              </div>

              {/* Text */}
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="mt-6 border-t border-neutral-200 pt-6">
                <p className="text-[16px] font-semibold tracking-wide text-[#3b4417]">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-[13px] italic text-neutral-500">
                  {testimonial.role}
                </p>
                <p className="mt-1 text-[12px] text-neutral-400">
                  {testimonial.location}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent transition-colors group-hover:border-[#d4d6b4]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-neutral-200 pt-12"
        >
          {[
            "Wine Spectator Approved",
            "Decanter Award Winner",
            "James Suckling 95+ Points",
            "Robert Parker Certified",
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-neutral-500 uppercase"
            >
              <Star size={14} className="text-[#d4af37]" fill="#d4af37" />
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
