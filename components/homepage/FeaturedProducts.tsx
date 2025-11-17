"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";

const FEATURED_WINES = [
  {
    id: 1,
    name: "Château Margaux 2015",
    region: "Bordeaux, France",
    price: "$450",
    rating: 4.9,
    image: "/wines/wine-1.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Opus One 2018",
    region: "Napa Valley, USA",
    price: "$380",
    rating: 4.8,
    image: "/wines/wine-2.jpg",
    badge: "Limited",
  },
  {
    id: 3,
    name: "Penfolds Grange 2016",
    region: "South Australia",
    price: "$620",
    rating: 5.0,
    image: "/wines/wine-3.jpg",
    badge: "Award Winner",
  },
  {
    id: 4,
    name: "Sassicaia 2017",
    region: "Tuscany, Italy",
    price: "$290",
    rating: 4.7,
    image: "/wines/wine-4.jpg",
    badge: "New Arrival",
  },
];

const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

export default function FeaturedProducts() {
  return (
    <section className="w-full bg-[#fdfbf5] py-20 md:py-32">
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
            Featured Wines
          </h2>
          
          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] italic text-[#7a8451]">
            <span className="h-px w-16 bg-[#d4d6b4]" />
            <span>Handpicked by our sommeliers</span>
            <span className="h-px w-16 bg-[#d4d6b4]" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-neutral-600">
            Discover our carefully curated selection of exceptional wines from renowned vineyards around the world.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURED_WINES.map((wine) => (
            <motion.div
              key={wine.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white"
            >
              {/* Badge */}
              <div className="absolute left-4 top-4 z-10">
                <span className="bg-[#3b4417] px-3 py-1 text-[10px] tracking-[0.2em] text-white uppercase">
                  {wine.badge}
                </span>
              </div>

              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />
                
                {/* Quick Add Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-white px-6 py-3 text-[11px] tracking-[0.25em] text-[#3b4417] opacity-0 transition-all duration-500 group-hover:opacity-100 uppercase"
                >
                  <ShoppingBag size={14} />
                  Add to Cart
                </motion.button>
              </div>

              {/* Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#d4af37]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(wine.rating) ? "#d4af37" : "none"}
                      strokeWidth={1.5}
                    />
                  ))}
                  <span className="ml-2 text-[12px] text-neutral-500">
                    {wine.rating}
                  </span>
                </div>

                {/* Name */}
                <h3 className="mt-3 text-[18px] font-semibold tracking-wide text-[#3b4417] transition-colors group-hover:text-[#5a6b2a]">
                  {wine.name}
                </h3>

                {/* Region */}
                <p className="mt-1 text-[13px] italic text-neutral-500">
                  {wine.region}
                </p>

                {/* Price */}
                <p className="mt-4 text-[22px] font-semibold tracking-wider text-[#3b4417]">
                  {wine.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center px-12 py-4 text-[11px] tracking-[0.3em] uppercase text-[#3b4417]"
          >
            <span className="absolute inset-0 border border-[#c8c8a3] transition-colors group-hover:border-[#3b4417]" />
            <span className="pointer-events-none absolute left-0 bottom-0 h-px w-20 bg-[#fdfbf5] transition-all duration-300 group-hover:w-0" />
            <span className="pointer-events-none absolute right-0 top-0 h-px w-20 bg-[#fdfbf5] transition-all duration-300 group-hover:w-0" />
            <span className="relative bg-[#fdfbf5] px-6 py-2">
              Explore All Wines
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
