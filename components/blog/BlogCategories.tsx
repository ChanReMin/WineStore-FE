"use client";

import { motion } from "framer-motion";
import {
  Wine,
  Utensils,
  BookOpen,
  Award,
  Thermometer,
  Globe,
} from "lucide-react";

const categories = [
  { id: "all", label: "ALL", icon: Wine },
  { id: "tasting", label: "TASTING", icon: Award },
  { id: "pairing", label: "DISH COMBINATIONS", icon: Utensils },
  { id: "storage", label: "STORAGE", icon: Thermometer },
  { id: "education", label: "EDUCATION", icon: BookOpen },
  { id: "regions", label: "REGIONS", icon: Globe },
];

interface BlogCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function BlogCategories({
  selectedCategory,
  onSelectCategory,
}: BlogCategoriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-wrap justify-center gap-3 md:gap-4"
    >
      {categories.map((category, index) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;

        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory(category.id)}
            className={`
              group relative px-6 md:px-8 py-3 text-[10px] md:text-[11px] tracking-[0.25em] uppercase transition-all duration-300
              ${
                isSelected
                  ? "bg-[#3b4417] text-white"
                  : "bg-white text-[#3b4417] border border-[#c8c8a3] hover:border-[#3b4417]"
              }
            `}
          >
            <span className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
              {category.label}
            </span>

            {/* Decorative corners */}
            {!isSelected && (
              <>
                <span className="absolute left-0 bottom-0 h-px w-4 bg-white transition-all duration-300 group-hover:w-0" />
                <span className="absolute right-0 top-0 h-px w-4 bg-white transition-all duration-300 group-hover:w-0" />
              </>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
