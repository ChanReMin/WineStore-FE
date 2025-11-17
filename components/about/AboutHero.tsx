"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Globe, Heart, Users, Sparkles } from "lucide-react";
import { useRef } from "react";

const STATS = [
  { icon: Users, number: "50K+", label: "Happy Customers", color: "from-blue-400 to-blue-600" },
  { icon: Globe, number: "30+", label: "Countries", color: "from-green-400 to-green-600" },
  { icon: Award, number: "100+", label: "Awards", color: "from-yellow-400 to-yellow-600" },
  { icon: Heart, number: "50+", label: "Years Experience", color: "from-red-400 to-red-600" },
];

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-gradient-to-br from-[#3b4417] via-[#4a5520] to-[#3b4417] py-24 md:py-32">
      {/* Animated Background with Wine Bottle Shapes */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 100 + "%"],
              x: [null, (Math.random() - 0.5) * 50 + "%"],
              rotate: [0, 360],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Sparkles size={Math.random() * 20 + 10} className="text-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-block"
          >
            <span className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-[11px] tracking-[0.25em] text-white backdrop-blur-sm uppercase">
              Premium Wine Retail
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-[36px] md:text-[52px] lg:text-[64px] font-bold leading-tight tracking-[0.1em] text-white uppercase">
            About Wine Store
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mt-6 max-w-3xl text-[18px] leading-relaxed text-white/90"
          >
            We're more than a wine shop—we're your trusted partner in discovering
            exceptional wines from around the world. With expert curation,
            sustainable practices, and a passion for education, we make premium
            wine accessible to everyone.
          </motion.p>

          {/* Stats Grid with Counter Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.08 }}
                  className="group relative"
                >
                  {/* Gradient Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 blur-xl transition-opacity group-hover:opacity-30`}
                  />
                  
                  <div className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all group-hover:border-white/30 group-hover:bg-white/10">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
                    >
                      <Icon size={28} strokeWidth={1.5} className="text-white" />
                    </motion.div>
                    
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        delay: 0.8 + index * 0.1 
                      }}
                      className="text-[36px] md:text-[44px] font-bold text-white"
                    >
                      {stat.number}
                    </motion.p>
                    
                    <p className="mt-1 text-[13px] tracking-[0.2em] text-white/70 uppercase">
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
