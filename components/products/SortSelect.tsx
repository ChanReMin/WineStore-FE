"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { useState } from "react";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SORT_OPTIONS = [
  { value: "created_at_desc", label: "Newest Arrivals", icon: "✨" },
  { value: "created_at_asc", label: "Classic Collection", icon: "🏛️" },
  { value: "price_asc", label: "Price: Low → High", icon: "💰" },
  { value: "price_desc", label: "Price: High → Low", icon: "💎" },
  { value: "name_asc", label: "Name: A → Z", icon: "🔤" },
  { value: "name_desc", label: "Name: Z → A", icon: "🔡" },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      {/* Label with Icon */}
      <div className="hidden sm:flex items-center gap-2 text-[#7b5b2c]">
        <ArrowUpDown size={16} strokeWidth={1.5} />
        <label className="text-[11px] font-semibold uppercase tracking-[0.25em]">
          Sort By
        </label>
      </div>

      {/* Select Wrapper */}
      <div className="relative group">
        {/* Decorative Corner Accents */}
        <motion.div
          animate={{
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-[#d4af37] z-10"
        />
        <motion.div
          animate={{
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -right-1 -bottom-1 h-3 w-3 border-r-2 border-b-2 border-[#d4af37] z-10"
        />

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="appearance-none border-2 border-neutral-200 bg-gradient-to-br from-white to-[#fdfbf5] pl-5 pr-12 py-4 text-[14px] text-[#3b4417] font-medium transition-all cursor-pointer shadow-sm hover:border-[#d4af37]/50 focus:border-[#d4af37] focus:outline-none focus:shadow-lg focus:shadow-[#d4af37]/20 min-w-[200px]"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron Icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={{
              rotate: isFocused ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown
              size={18}
              strokeWidth={2}
              className={`transition-colors ${
                isFocused ? "text-[#d4af37]" : "text-[#7b5b2c]"
              }`}
            />
          </motion.div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#d4af37] via-[#f4e5a1] to-[#d4af37]"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isFocused ? "100%" : 0,
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
