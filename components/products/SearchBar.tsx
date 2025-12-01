"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, X, Sparkles } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  const t = useTranslations("shop.search");
  const defaultPlaceholder = placeholder || t("placeholder");
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  
  // Use ref to store the latest onChange without triggering useEffect
  const onChangeRef = useRef(onChange);
  // Store the previous value to detect actual changes
  const prevValueRef = useRef(value);
  
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only call onChange if the local value is different from what we started with
      console.log('SearchBar debounce: localValue=', localValue, 'prevValue=', prevValueRef.current);
      if (localValue !== prevValueRef.current) {
        console.log('SearchBar: Calling onChange with:', localValue);
        prevValueRef.current = localValue;
        onChangeRef.current(localValue);
      }
    }, 2000); // 2 seconds debounce

    return () => clearTimeout(timer);
  }, [localValue]); // Only depend on localValue

  // Sync with external value changes (e.g., reset button)
  useEffect(() => {
    if (value !== prevValueRef.current) {
      setLocalValue(value);
      prevValueRef.current = value;
    }
  }, [value]);

  const handleClear = () => {
    setLocalValue("");
    prevValueRef.current = "";
    onChangeRef.current("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full group"
    >
      <div className="relative">
        {/* Decorative Corner Accents */}
        <motion.div
          animate={{
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-[#d4af37]"
        />
        <motion.div
          animate={{
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -right-1 -bottom-1 h-3 w-3 border-r-2 border-b-2 border-[#d4af37]"
        />

        {/* Search Icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            animate={{
              scale: isFocused ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Search
              size={20}
              strokeWidth={1.5}
              className={`transition-all duration-300 ${
                isFocused ? "text-[#d4af37]" : "text-[#7b5b2c]"
              }`}
            />
          </motion.div>
        </div>

        {/* Input */}
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={defaultPlaceholder}
          className={`w-full border-2 bg-linear-to-br from-white to-[#fdfbf5] px-5 py-4 pl-14 pr-14 text-[14px] text-[#3b4417] placeholder-neutral-400 transition-all duration-300 shadow-sm ${
            isFocused
              ? "border-[#d4af37] shadow-lg shadow-[#d4af37]/20"
              : "border-neutral-200 hover:border-[#d4af37]/50"
          } focus:outline-none`}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {localValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
              onClick={handleClear}
              className="absolute right-5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-[#7b5b2c] to-[#3b4417] text-white transition-all hover:scale-110 hover:shadow-md"
            >
              <X size={14} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Animated Border */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#d4af37] via-[#f4e5a1] to-[#d4af37]"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: isFocused ? "100%" : 0,
            opacity: isFocused ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Shimmer Effect on Focus */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-linear-to-r from-transparent via-[#d4af37]/10 to-transparent pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Search Hint */}
      <AnimatePresence>
        {isFocused && !localValue && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute left-0 top-full mt-3 flex items-center gap-2 text-[11px] text-[#7b5b2c] italic"
          >
            <Sparkles size={12} className="text-[#d4af37]" />
            <span>{t("hint")}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
