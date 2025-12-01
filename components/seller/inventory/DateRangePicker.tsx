"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { DateRangePicker as DateRangePickerUI } from "@/components/ui/date-range-picker";
import { Card } from "@/components/ui/card";

interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
  className?: string;
}

export default function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>(value);

  const presets = [
    {
      label: "Hôm nay",
      getValue: () => {
        const today = new Date();
        return { from: today, to: today };
      },
    },
    {
      label: "Hôm qua",
      getValue: () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return { from: yesterday, to: yesterday };
      },
    },
    {
      label: "7 ngày qua",
      getValue: () => {
        const today = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return { from: weekAgo, to: today };
      },
    },
    {
      label: "30 ngày qua",
      getValue: () => {
        const today = new Date();
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate() - 30);
        return { from: monthAgo, to: today };
      },
    },
    {
      label: "Tháng này",
      getValue: () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        return { from: firstDay, to: today };
      },
    },
    {
      label: "Tháng trước",
      getValue: () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
        return { from: firstDay, to: lastDay };
      },
    },
  ];

  const handleApply = () => {
    onChange(tempRange);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempRange(undefined);
    onChange(undefined);
    setIsOpen(false);
  };

  const handlePresetClick = (preset: typeof presets[0]) => {
    const range = preset.getValue();
    setTempRange(range);
    onChange(range);
    setIsOpen(false);
  };

  const formatDateRange = (range?: DateRange) => {
    if (!range?.from) return "Chọn khoảng thời gian";
    if (!range.to) return format(range.from, "dd/MM/yyyy", { locale: vi });
    return `${format(range.from, "dd/MM/yyyy", { locale: vi })} - ${format(range.to, "dd/MM/yyyy", { locale: vi })}`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all
          ${value?.from 
            ? "border-[#d4af37] bg-[#fdfbf5] text-[#3b4417]" 
            : "border-[#d4d6b4] bg-white text-neutral-600 hover:border-[#d4af37]"
          }
        `}
      >
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-medium">{formatDateRange(value)}</span>
        
        {value?.from && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="ml-2 p-1 hover:bg-white rounded-full transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 z-50"
            >
              <Card className="p-4 border-[#d4d6b4] shadow-xl min-w-[320px]">
                {/* Presets */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#3b4417] mb-2 uppercase tracking-wider">
                    Chọn nhanh
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                      <Button
                        key={preset.label}
                        onClick={() => handlePresetClick(preset)}
                        variant="outline"
                        size="sm"
                        className="border-[#d4d6b4] hover:bg-[#f5f3e8] hover:border-[#d4af37] text-[#3b4417]"
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#e8e6dc] my-4" />

                {/* Custom Range Label */}
                <p className="text-xs font-semibold text-[#3b4417] mb-3 uppercase tracking-wider">
                  Tùy chỉnh
                </p>

                {/* Date Range Picker */}
                <DateRangePickerUI
                  value={tempRange}
                  onChange={setTempRange}
                />

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-[#e8e6dc]">
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#d4d6b4] hover:bg-neutral-100"
                  >
                    Xóa
                  </Button>
                  <Button
                    onClick={handleApply}
                    size="sm"
                    className="flex-1 bg-[#3b4417] hover:bg-[#2a2f18] text-white"
                  >
                    Áp dụng
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
