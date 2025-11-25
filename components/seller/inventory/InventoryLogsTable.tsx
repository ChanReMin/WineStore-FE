"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, FileText, Package, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InventoryLogTypeBadge from "./InventoryLogTypeBadge";
import type { InventoryLog } from "@/types/inventoryLog";
import { useTranslations } from "next-intl";

interface InventoryLogsTableProps {
  logs: InventoryLog[];
}

export default function InventoryLogsTable({ logs }: InventoryLogsTableProps) {
  const t = useTranslations("seller.inventory.logs.table");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getQuantityDisplay = (type: string, quantity: number) => {
    const isPositive = type === "IN" || type === "RETURN";
    const prefix = isPositive ? "+" : "-";
    const color = isPositive ? "text-emerald-600" : "text-red-600";

    return (
      <span className={`font-bold text-lg ${color}`}>
        {prefix}
        {Math.abs(quantity)}
      </span>
    );
  };

  if (logs.length === 0) {
    return (
      <Card className="p-12 text-center border-[#d4d6b4]">
        <FileText className="w-16 h-16 mx-auto text-[#7a8451] mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-[#3b4417] mb-2">
          {t("noTransactions")}
        </h3>
        <p className="text-[#7a8451]">
          {t("noTransactionsDesc")}
        </p>
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
                {t("timestamp")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("type")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("product")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("warehouse")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417] text-center">
                {t("quantity")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("user")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("note")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredRow(log.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className="border-b border-[#e8e6dc] hover:bg-[#fdfbf5] transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-2 text-[#7a8451]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(log.created_at)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <InventoryLogTypeBadge type={log.type} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#7a8451]" />
                    <span className="font-medium text-[#3b4417]">
                      {log.product}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#7a8451]" />
                    <span className="text-[#3b4417]">{log.warehouse}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {getQuantityDisplay(log.type, log.quantity)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#7a8451]" />
                    <span className="text-[#3b4417]">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {log.note ? (
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-[#7a8451] mt-0.5 shrink-0" />
                      <span className="text-sm text-[#7a8451] line-clamp-2">
                        {log.note}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-[#7a8451] italic">
                      {t("noNotes")}
                    </span>
                  )}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary Footer */}
      <div className="p-4 bg-[#fdfbf5] border-t border-[#e8e6dc]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-[#7a8451] mb-1">{t("totalTransactions")}</p>
            <p className="text-xl font-bold text-[#3b4417]">{logs.length}</p>
          </div>
          <div>
            <p className="text-[#7a8451] mb-1">{t("stockIn")}</p>
            <p className="text-xl font-bold text-emerald-600">
              {logs.filter((l) => l.type === "IN").length}
            </p>
          </div>
          <div>
            <p className="text-[#7a8451] mb-1">{t("stockOut")}</p>
            <p className="text-xl font-bold text-red-600">
              {logs.filter((l) => l.type === "OUT").length}
            </p>
          </div>
          <div>
            <p className="text-[#7a8451] mb-1">{t("others")}</p>
            <p className="text-xl font-bold text-blue-600">
              {
                logs.filter((l) => l.type === "ADJUST" || l.type === "RETURN")
                  .length
              }
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
