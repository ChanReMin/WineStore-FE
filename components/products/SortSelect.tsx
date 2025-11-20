"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowUpDown } from "lucide-react";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SORT_OPTIONS = [
  { value: "created_at_desc", label: "Newest", icon: "" },
  { value: "created_at_asc", label: "Oldest", icon: "" },
  { value: "price_asc", label: "Price: Low → High", icon: "" },
  { value: "price_desc", label: "Price: High → Low", icon: "" },
  { value: "name_asc", label: "Name: A → Z", icon: "" },
  { value: "name_desc", label: "Name: Z → A", icon: "" },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3"
    >
      {/* Label with Icon */}
      <div className="hidden sm:flex items-center gap-2 text-neutral-600">
        <ArrowUpDown size={16} strokeWidth={1.5} />
        <label className="text-[11px] font-medium uppercase tracking-[0.2em]">
          Sort By
        </label>
      </div>

      {/* Select Wrapper */}
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none border-2 border-neutral-200 bg-white pl-4 pr-10 py-3.5 text-[14px] text-neutral-800 transition-all cursor-pointer shadow-sm hover:border-neutral-300 focus:border-[#3b4417] focus:outline-none focus:shadow-md focus:shadow-[#3b4417]/10 min-w-[180px]"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.icon} {option.label}
            </option>
          ))}
        </select>

        {/* Chevron Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown
            size={18}
            strokeWidth={1.5}
            className="text-neutral-600 transition-transform group-hover:text-[#3b4417]"
          />
        </div>

        {/* Focus Border Animation */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#3b4417] to-[#5a6b2a] pointer-events-none"
          initial={{ width: 0 }}
          whileFocus={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
