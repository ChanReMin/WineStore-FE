"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";

const CATEGORIES = [
  "All",
  "Products",
  "Shipping",
  "Quality",
  "Services",
  "Policies",
];

const FAQS = [
  {
    question: "What makes your wine selection unique?",
    answer:
      "We personally visit vineyards, taste thousands of wines annually, and only select bottles that meet our strict quality standards. Our sommeliers have direct relationships with over 100 winemakers worldwide, giving us access to exclusive and limited-edition wines you won't find elsewhere.",
    category: "Products",
  },
  {
    question: "How do you ensure wine authenticity?",
    answer:
      "Every bottle is sourced directly from vineyards or authorized distributors. We maintain detailed provenance records, store wines in temperature-controlled facilities, and provide certificates of authenticity for rare vintages. Our reputation depends on trust and transparency.",
    category: "Quality",
  },
  {
    question: "Do you offer wine education programs?",
    answer:
      "Yes! We offer WSET-certified courses, monthly masterclasses, virtual tastings, and one-on-one sommelier consultations. Whether you're a beginner or advanced enthusiast, we have programs tailored to your level.",
    category: "Services",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, we'll provide a full refund or exchange. For damaged or defective bottles, we replace them immediately at no cost.",
    category: "Policies",
  },
  {
    question: "How do you handle shipping and storage?",
    answer:
      "All wines are stored at optimal temperature (55°F) and humidity. We use specialized packaging and ship via temperature-controlled carriers. Shipping is carbon-neutral, and we offer free shipping on orders over $200.",
    category: "Shipping",
  },
  {
    question: "Can I visit your physical store?",
    answer:
      "Absolutely! Our flagship store is open Mon-Sat 10am-8pm, Sunday 12pm-6pm. We offer complimentary tastings, and our sommeliers are always available for personalized recommendations. Book a private tasting session for a more intimate experience.",
    category: "Services",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship to over 30 countries worldwide. International shipping times vary by destination (typically 5-14 business days). All international orders include tracking and insurance.",
    category: "Shipping",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and bank transfers for large orders. All transactions are secured with 256-bit SSL encryption.",
    category: "Policies",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFAQs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold tracking-wide text-[#3b4417] uppercase">
            Frequently Asked
            <br />
            Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-neutral-600">
            Everything you need to know about Wine Store
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
            placeholder="Search questions..."
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
          Showing {filteredFAQs.length}{" "}
          {filteredFAQs.length === 1 ? "question" : "questions"}
        </motion.p>

        {/* FAQ List */}
        <div className="mt-12 space-y-4">
          {filteredFAQs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <p className="text-[18px] text-neutral-500">
                No questions found. Try a different search or category.
              </p>
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
            Still have questions?{" "}
            <a
              href="mailto:hello@winestore.com"
              className="font-semibold text-[#3b4417] underline transition-colors hover:text-[#4a5520]"
            >
              Contact our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
