"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("about.faq");

  const CATEGORY_KEYS = [
    "all",
    "products",
    "shipping",
    "quality",
    "services",
    "policies",
  ];

  const CATEGORIES = CATEGORY_KEYS.map((key) => t(`categories.${key}`));

  const FAQS = Array.from({ length: 8 }, (_, index) => {
    const categoryKey = t(`items.${index}.category`);
    const categoryIndex = CATEGORY_KEYS.indexOf(categoryKey);
    return {
      question: t(`items.${index}.question`),
      answer: t(`items.${index}.answer`),
      category: CATEGORIES[categoryIndex >= 0 ? categoryIndex : 0],
      categoryKey: categoryKey,
    };
  });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(t("categories.all"));

  const filteredFAQs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === CATEGORIES[0] || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, FAQS, CATEGORIES]);

  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold tracking-wide text-[#3b4417] uppercase">
            {t("title")}
            <br />
            {t("titleLine2")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-neutral-600">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-12"
        >
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border-2 border-neutral-200 bg-[#fdfbf5] py-4 pl-12 pr-4 text-[15px] transition-all focus:border-[#3b4417] focus:outline-none"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {CATEGORIES.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-2 text-[13px] font-medium tracking-wide transition-all ${
                activeCategory === category
                  ? "bg-[#3b4417] text-white"
                  : "bg-[#fdfbf5] text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-[14px] text-neutral-500"
        >
          {t("results.showing")} {filteredFAQs.length}{" "}
          {filteredFAQs.length === 1
            ? t("results.question")
            : t("results.questions")}
        </motion.p>

        {/* FAQ List */}
        <div className="mt-12 space-y-4">
          {filteredFAQs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <p className="text-[18px] text-neutral-500">{t("noResults")}</p>
            </motion.div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border border-neutral-200 bg-[#fdfbf5] transition-colors hover:border-[#3b4417]"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left transition-colors"
                >
                  <h3 className="pr-8 text-[18px] font-semibold text-[#3b4417]">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus size={24} className="text-[#3b4417]" />
                    ) : (
                      <Plus size={24} className="text-[#3b4417]" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-neutral-200 p-6 pt-4">
                        <p className="text-[16px] leading-relaxed text-neutral-700">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[16px] text-neutral-600">
            {t("contact.text")}{" "}
            <a
              href="mailto:hello@winestore.com"
              className="font-semibold text-[#3b4417] underline transition-colors hover:text-[#4a5520]"
            >
              {t("contact.link")}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
