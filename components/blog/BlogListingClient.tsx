"use client";

import { motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import BlogCard from "./BlogCard";
import BlogHero from "./BlogHero";
import BlogCategories from "./BlogCategories";
import { useState } from "react";
import { blogPosts } from "@/lib/blogData";
import { useTranslations } from "next-intl";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
});

export default function BlogListingClient() {
  const t = useTranslations("blog");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <main className={`${displaySerif.variable} min-h-screen bg-white`}>
      <BlogHero />

      {/* Categories Section */}
      <section className="w-full bg-[#f5f3e8] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-[24px] md:text-[32px] tracking-[0.3em] uppercase text-[#3b4417] font-semibold mb-4">
              {t("categories.title")}
            </h2>
            <div className="flex items-center justify-center gap-3 text-[11px] italic tracking-[0.2em] text-[#4c5b23]">
              <span className="h-px w-10 bg-[#4c5b23]" />
              <span>{t("categories.subtitle")}</span>
              <span className="h-px w-10 bg-[#4c5b23]" />
            </div>
          </motion.div>

          <BlogCategories
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="w-full bg-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-20"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-[28px] md:text-[36px] lg:text-[42px] leading-tight tracking-[0.25em] uppercase text-[#3b4417] font-semibold">
                  {selectedCategory === "all"
                    ? t("listing.allPosts")
                    : t("listing.filteredPosts")}
                </h2>
                <div className="mt-4 flex items-center gap-3 text-[11px] italic tracking-[0.2em] text-[#4c5b23]">
                  <span className="h-px w-10 bg-[#4c5b23]" />
                  <span>
                    {filteredPosts.length} {t("listing.posts")}
                  </span>
                </div>
              </div>

              <p className="text-[15px] leading-relaxed text-neutral-600 tracking-wide max-w-xl">
                {t("listing.description")}
              </p>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-[#3b4417] py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] tracking-[0.3em] uppercase text-white font-semibold mb-6">
              {t("newsletter.title")}
            </h2>

            <div className="flex items-center justify-center gap-3 text-[11px] italic tracking-[0.2em] text-white/70 mb-8">
              <span className="h-px w-10 bg-white/40" />
              <span>{t("newsletter.subtitle")}</span>
              <span className="h-px w-10 bg-white/40" />
            </div>

            <p className="text-[15px] leading-relaxed text-white/85 tracking-wide mb-10 max-w-2xl mx-auto">
              {t("newsletter.description")}
            </p>

            {/* Form */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-6 py-4 bg-white/10 border border-white/30 text-white placeholder:text-white/50 text-[11px] tracking-[0.2em] uppercase focus:outline-none focus:border-white/60 transition-all duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-white text-[#3b4417] text-[11px] tracking-[0.25em] uppercase font-semibold hover:bg-[#f5f3e8] transition-all duration-300"
              >
                {t("newsletter.button")}
              </motion.button>
            </div>

            <p className="mt-6 text-[10px] tracking-[0.2em] uppercase text-white/60">
              {t("newsletter.privacy")}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
