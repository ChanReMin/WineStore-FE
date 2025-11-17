import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxCellarSection() {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={container}
      className="relative flex h-screen items-center justify-center overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* TEXT OVERLAY */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between p-10 md:p-20 text-white">
        <p className="w-[60vw] self-end text-[2.2vw] leading-snug tracking-[0.2em] uppercase mix-blend-difference">
          SLOWLY CURATED WINES FOR UNHURRIED EVENINGS.
        </p>

        <div className="mix-blend-difference">
          <p className="text-[4.5vw] leading-tight tracking-[0.3em] uppercase">
            A JOURNEY
            <br />
            THROUGH OUR CELLAR
          </p>

          <p className="mt-4 max-w-xl text-[1.1rem] leading-relaxed text-white tracking-widest">
            From sun-drenched vineyards to candlelit tastings, every bottle on
            our shelves carries the patience of time and the craft of the
            winemaker. Scroll to explore the stories behind our favorite
            labels.
          </p>
        </div>
      </div>

      {/* PARALLAX BACKGROUND IMAGE */}
      <div className="fixed left-0 top-[-10vh] h-[120vh] w-full">
        <motion.div style={{ y }} className="relative h-full w-full">
          <Image
            src="/hero/slide-6.jpg"
            fill
            alt="Wine bottles in the cellar"
            style={{ objectFit: "cover" }}
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
