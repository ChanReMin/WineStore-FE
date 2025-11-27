"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { vi } from "date-fns/locale";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  error?: string;
}

export default function DatePicker({
  value,
  onChange,
  placeholder = "Chọn ngày",
  minDate,
  maxDate,
  disabled = false,
  error,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );
  const [inputValue, setInputValue] = useState(
    value ? format(new Date(value), "dd/MM/yyyy") : ""
  );
  const [dropdownPosition, setDropdownPosition] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;

  // Sync input value with prop value
  useEffect(() => {
    if (value) {
      setInputValue(format(new Date(value), "dd/MM/yyyy"));
    } else {
      setInputValue("");
    }
  }, [value]);

  // Calculate dropdown position based on available space
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = 420; // Approximate height of calendar

      // Calculate position
      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        // Show above
        setDropdownPosition({
          bottom: window.innerHeight - rect.top + 8,
          left: rect.left,
          width: Math.max(rect.width, 320),
        });
      } else {
        // Show below
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left,
          width: Math.max(rect.width, 320),
        });
      }
    }
  }, [isOpen]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDateSelect = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    onChange(formattedDate);
    setInputValue(format(date, "dd/MM/yyyy"));
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);

    // Try to parse the input as dd/MM/yyyy
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = input.match(dateRegex);

    if (match) {
      const [, day, month, year] = match;
      const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

      // Validate the date
      if (
        parsedDate.getDate() === Number(day) &&
        parsedDate.getMonth() === Number(month) - 1 &&
        parsedDate.getFullYear() === Number(year)
      ) {
        // Check if date is within min/max range
        if (!isDateDisabled(parsedDate)) {
          const formattedDate = format(parsedDate, "yyyy-MM-dd");
          onChange(formattedDate);
          setCurrentMonth(parsedDate);
        }
      }
    }
  };

  const handleInputBlur = () => {
    // If input is invalid, reset to the current value
    if (value) {
      setInputValue(format(new Date(value), "dd/MM/yyyy"));
    } else {
      setInputValue("");
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  // Get calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <div ref={containerRef} className="relative">
      {/* Input with Calendar Icon */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => !disabled && setIsOpen(true)}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-3 py-2.5 rounded-lg border transition-all
            ${error ? "border-red-500" : "border-[#d4d6b4]"}
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:border-[#3b4417]"}
            ${isOpen ? "border-[#3b4417] ring-2 ring-[#3b4417]/20" : ""}
            text-[#3b4417] placeholder:text-[#7a8451]/50
          `}
        />
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8451]"
        >
          <Calendar className="h-4 w-4" />
        </button>
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}

      {/* Calendar Dropdown */}
      <AnimatePresence>
        {isOpen && dropdownPosition && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              top: dropdownPosition.top,
              bottom: dropdownPosition.bottom,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }}
            className="z-[10000] bg-white rounded-xl shadow-2xl border border-[#d4d6b4] overflow-hidden"
          >
            {/* Calendar Header */}
            <div className="bg-[#3b4417] text-white px-4 py-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="font-semibold text-base">
                  {format(currentMonth, "MMMM yyyy", { locale: vi })}
                </h3>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Week Days */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-semibold text-[#7a8451] py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isSelected =
                    selectedDate && isSameDay(day, selectedDate);
                  const isTodayDate = isToday(day);
                  const isDisabled = isDateDisabled(day);

                  return (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => !isDisabled && handleDateSelect(day)}
                      disabled={isDisabled}
                      whileHover={!isDisabled ? { scale: 1.05 } : {}}
                      whileTap={!isDisabled ? { scale: 0.95 } : {}}
                      className={`
                        aspect-square rounded-lg text-sm font-medium transition-all
                        ${!isCurrentMonth ? "text-[#7a8451]/30" : ""}
                        ${isDisabled ? "text-gray-300 cursor-not-allowed" : ""}
                        ${
                          isSelected
                            ? "bg-[#3b4417] text-white shadow-md"
                            : isTodayDate
                              ? "bg-[#d4af37]/20 text-[#3b4417] font-bold"
                              : isCurrentMonth && !isDisabled
                                ? "text-[#3b4417] hover:bg-[#f5f3e8]"
                                : ""
                        }
                      `}
                    >
                      {format(day, "d")}
                    </motion.button>
                  );
                })}
              </div>

              {/* Today Button */}
              <div className="mt-4 pt-3 border-t border-[#d4d6b4]">
                <button
                  type="button"
                  onClick={() => handleDateSelect(new Date())}
                  className="w-full py-2 text-sm font-medium text-[#3b4417] hover:bg-[#f5f3e8] rounded-lg transition-colors"
                >
                  Hôm nay
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
