"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Globe, Heart, Users } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about.hero");

  const STATS = [
    { icon: Users, number: "50K+", label: t("stats.happyCustomers") },
    { icon: Globe, number: "30+", label: t("stats.countries") },
    { icon: Award, number: "100+", label: t("stats.awards") },
    { icon: Heart, number: "50+", label: t("stats.yearsExperience") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-auto overflow-hidden bg-[#120906] pt-24 pb-32 md:pt-32 md:pb-40 lg:pt-40 lg:pb-48"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero/slide-5.jpg')" }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60" />

      {/* Animated grain texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex items-center justify-center gap-4"
          >
            <span className="h-px w-16 md:w-24 bg-white/20" />
            <span className="text-[11px] tracking-[0.3em] text-white/60 uppercase italic">
              {t("estd")}
            </span>
            <span className="h-px w-16 md:w-24 bg-white/30" />
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-[40px] md:text-[56px] lg:text-[68px] font-semibold leading-[1.1] tracking-[0.15em] text-white uppercase">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-8 max-w-3xl text-[17px] md:text-[18px] leading-relaxed text-white/90 tracking-wide"
          >
            {t("subtitle")}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-20 grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4"
          >
            {STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="group relative"
                >
                  <div className="relative flex flex-col items-center border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/20">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, -8, 0], scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f3e8]/30 transition-colors group-hover:bg-[#f5f3e8]/30"
                    >
                      <Icon
                        size={26}
                        strokeWidth={1.5}
                        className="text-white"
                      />
                    </motion.div>

                    {/* Number */}
                    <p className="text-[38px] md:text-[42px] font-bold text-white">
                      {stat.number}
                    </p>

                    {/* Label */}
                    <p className="mt-2 text-[12px] tracking-[0.2em] text-white uppercase">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
