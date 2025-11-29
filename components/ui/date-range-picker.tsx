"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import { vi } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface DateRangePickerUIProps {
  value?: DateRange;
  onChange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerUIProps) {
  return (
    <div className="date-picker-profile">
      <DayPicker
        mode="range"
        selected={value}
        onSelect={onChange}
        locale={vi}
        className="rounded-lg border border-[#d4d6b4] p-3"
        modifiersClassNames={{
          selected: "bg-[#3b4417] text-white hover:bg-[#2a2f18]",
          today: "font-bold text-[#d4af37]",
        }}
      />
    </div>
  );
}
