"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label?: string;
  unit?: string;
  formatValue?: (value: number) => string;
}

export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  unit = "",
  formatValue,
}: RangeSliderProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);

  // Keep onChange ref up to date
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMouseDown = (type: "min" | "max") => {
    setIsDragging(type);
  };

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(null);
      console.log('RangeSlider: Mouse up, calling onChange with:', localValue);
      onChangeRef.current(localValue);
    }
  }, [isDragging, localValue]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;

    setLocalValue((prev) => {
      if (isDragging === "min") {
        const newMin = Math.min(steppedValue, prev[1] - step);
        return [Math.max(min, newMin), prev[1]];
      } else {
        const newMax = Math.max(steppedValue, prev[0] + step);
        return [prev[0], Math.min(max, newMax)];
      }
    });
  }, [isDragging, min, max, step]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const minPercent = getPercent(localValue[0]);
  const maxPercent = getPercent(localValue[1]);

  const formatDisplayValue = (val: number) => {
    if (formatValue) return formatValue(val);
    return `${val.toLocaleString()}${unit}`;
  };

  return (
    <div className="space-y-4">
      {/* Value Display */}
      <div className="flex items-center justify-between">
        <motion.div
          animate={{ scale: isDragging === "min" ? 1.05 : 1 }}
          className="flex items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Min
          </span>
          <span className="text-[15px] font-semibold text-[#3b4417]">
            {formatDisplayValue(localValue[0])}
          </span>
        </motion.div>

        <div className="h-px w-8 bg-linear-to-r from-[#d4af37]/50 to-[#d4af37]/50" />

        <motion.div
          animate={{ scale: isDragging === "max" ? 1.05 : 1 }}
          className="flex items-center gap-2"
        >
          <span className="text-[15px] font-semibold text-[#3b4417]">
            {formatDisplayValue(localValue[1])}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Max
          </span>
        </motion.div>
      </div>

      {/* Slider Track */}
      <div className="relative pt-2 pb-2">
        <div
          ref={sliderRef}
          className="relative h-2 bg-linear-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-full shadow-inner"
        >
          {/* Active Range */}
          <motion.div
            className="absolute h-full bg-linear-to-r from-[#d4af37] to-[#c4a137] rounded-full shadow-md"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
            animate={{
              opacity: isDragging ? 0.9 : 0.8,
            }}
          />

          {/* Min Thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer group"
            style={{ left: `${minPercent}%` }}
            onMouseDown={() => handleMouseDown("min")}
            whileHover={{ scale: 1.1 }}
            animate={{
              scale: isDragging === "min" ? 1.2 : 1,
            }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: isDragging === "min" ? [1, 1.5, 1] : 1,
                  opacity: isDragging === "min" ? [0.5, 0, 0.5] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: isDragging === "min" ? Infinity : 0,
                }}
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0) 70%)",
                  width: "32px",
                  height: "32px",
                  left: "-8px",
                  top: "-8px",
                }}
              />

              {/* Thumb */}
              <div className="relative w-4 h-4 rounded-full bg-white border-3 border-[#d4af37] shadow-lg transition-all group-hover:border-[#c4a137] group-hover:shadow-xl">
                {/* Inner shine */}
                <div className="absolute inset-0.5 rounded-full bg-linear-to-br from-[#d4af37]/20 to-transparent" />
              </div>

              {/* Decorative corners */}
              <div className="absolute -left-1 -top-1 w-2 h-2 border-l border-t border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -right-1 -bottom-1 w-2 h-2 border-r border-b border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Max Thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer group"
            style={{ left: `${maxPercent}%` }}
            onMouseDown={() => handleMouseDown("max")}
            whileHover={{ scale: 1.1 }}
            animate={{
              scale: isDragging === "max" ? 1.2 : 1,
            }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: isDragging === "max" ? [1, 1.5, 1] : 1,
                  opacity: isDragging === "max" ? [0.5, 0, 0.5] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: isDragging === "max" ? Infinity : 0,
                }}
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0) 70%)",
                  width: "32px",
                  height: "32px",
                  left: "-8px",
                  top: "-8px",
                }}
              />

              {/* Thumb */}
              <div className="relative w-4 h-4 rounded-full bg-white border-3 border-[#d4af37] shadow-lg transition-all group-hover:border-[#c4a137] group-hover:shadow-xl">
                {/* Inner shine */}
                <div className="absolute inset-0.5 rounded-full bg-linear-to-br from-[#d4af37]/20 to-transparent" />
              </div>

              {/* Decorative corners */}
              <div className="absolute -left-1 -top-1 w-2 h-2 border-l border-t border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -right-1 -bottom-1 w-2 h-2 border-r border-b border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        </div>

        {/* Min/Max Labels */}
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
            {formatDisplayValue(min)}
          </span>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
            {formatDisplayValue(max)}
          </span>
        </div>
      </div>
    </div>
  );
}
