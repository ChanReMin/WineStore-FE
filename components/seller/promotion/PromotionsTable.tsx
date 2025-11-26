"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Trash2, Calendar, Percent, Tag, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PromotionStatusBadge from "./PromotionStatusBadge";
import type { Promotion } from "@/types/promotion";
import { useTranslations } from "next-intl";

interface PromotionsTableProps {
  promotions: Promotion[];
  onView?: (promotion: Promotion) => void;
  onEdit?: (promotion: Promotion) => void;
  onDelete?: (promotion: Promotion) => void;
}

export default function PromotionsTable({
  promotions,
  onView,
  onEdit,
  onDelete,
}: PromotionsTableProps) {
  const t = useTranslations("seller.promotions.table");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDiscount = (type: number, value: number) => {
    if (type === 1) {
      return `${value}%`;
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const getUsagePercentage = (used: number, max: number) => {
    return Math.round((used / max) * 100);
  };

  if (promotions.length === 0) {
    return (
      <Card className="p-12 text-center border-[#d4d6b4]">
        <Tag className="w-16 h-16 mx-auto text-[#7a8451] mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-[#3b4417] mb-2">
          {t("noPromotions")}
        </h3>
        <p className="text-[#7a8451]">{t("createFirst")}</p>
      </Card>
    );
  }

  return (
    <Card className="border-[#d4d6b4] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f5f3e8] hover:bg-[#f5f3e8]">
              <TableHead className="font-semibold text-[#3b4417]">
                {t("promotionCode")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("discount")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("timeframe")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("usage")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("status")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417] text-right">
                {t("actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promo, index) => {
              const usagePercent = getUsagePercentage(
                promo.used_count,
                promo.max_usage
              );

              return (
                <motion.tr
                  key={promo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredRow(promo.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => onView && onView(promo)}
                  className="border-b border-[#e8e6dc] hover:bg-[#fdfbf5] transition-colors cursor-pointer"
                >
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <Tag className="w-4 h-4 text-[#7a8451] mt-1" />
                      <div>
                        <p className="font-bold text-[#3b4417] font-mono">
                          {promo.code}
                        </p>
                        <p className="text-sm text-[#3b4417] font-medium">
                          {promo.name}
                        </p>
                        <p className="text-xs text-[#7a8451] mt-1 line-clamp-1">
                          {promo.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-[#d4af37]" />
                      <span className="font-bold text-lg text-[#d4af37]">
                        {formatDiscount(
                          promo.discount_type,
                          promo.discount_value
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3.5 h-3.5 text-[#7a8451]" />
                        <span className="text-[#3b4417]">
                          {formatDate(promo.start_date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3.5 h-3.5 text-[#7a8451]" />
                        <span className="text-[#3b4417]">
                          {formatDate(promo.end_date)}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#7a8451]" />
                        <span className="text-sm font-medium text-[#3b4417]">
                          {promo.used_count} / {promo.max_usage}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            usagePercent >= 90
                              ? "bg-red-500"
                              : usagePercent >= 70
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`}
                          style={{ width: `${usagePercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#7a8451]">
                        {usagePercent}% {t("used")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <PromotionStatusBadge
                      status={promo.status}
                      startDate={promo.start_date}
                      endDate={promo.end_date}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {onView && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onView(promo);
                          }}
                          className="p-2 rounded-lg hover:bg-[#f5f3e8] text-[#3b4417] transition-colors"
                          title={t("viewDetails")}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                      )}
                      {onEdit && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(promo);
                          }}
                          className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                          title={t("edit")}
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                      )}
                      {onDelete && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(promo);
                          }}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title={t("delete")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
