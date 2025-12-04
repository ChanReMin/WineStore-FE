"use client";

import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PeriodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  const t = useTranslations("seller.dashboard.period");

  const periods = [
    { value: "day", label: t("day") || "Today" },
    { value: "week", label: t("week") || "This Week" },
    { value: "month", label: t("month") || "This Month" },
    { value: "year", label: t("year") || "This Year" },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] border-[#3b4417] text-[#3b4417]">
        <SelectValue placeholder={t("select") || "Select period"} />
      </SelectTrigger>
      <SelectContent>
        {periods.map((period) => (
          <SelectItem key={period.value} value={period.value}>
            {period.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
