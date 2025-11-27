"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InventoryStatusBadge from "./InventoryStatusBadge";
import type { InventoryItem } from "@/types/inventory";
import { useTranslations } from "next-intl";

interface InventoryTableProps {
  items: InventoryItem[];
  onUpdateStock?: (item: InventoryItem) => void;
}

export default function InventoryTable({
  items,
  onUpdateStock,
}: InventoryTableProps) {
  const t = useTranslations("seller.inventory.table");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStockPercentage = (quantity: number, safetyStock: number) => {
    if (safetyStock === 0) return 100;
    return Math.round((quantity / safetyStock) * 100);
  };

  if (items.length === 0) {
    return (
      <Card className="p-12 text-center border-[#d4d6b4]">
        <Package className="w-16 h-16 mx-auto text-[#7a8451] mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-[#3b4417] mb-2">
          {t("noItems")}
        </h3>
        <p className="text-[#7a8451]">{t("tryChanging")}</p>
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
                {t("product")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("warehouse")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("stock")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("safetyStock")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("status")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("value")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("updated")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417] text-right">
                {t("actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const stockPercentage = getStockPercentage(
                item.quantityOnHand,
                item.safetyStock
              );

              return (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredRow(item.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="border-b border-[#e8e6dc] hover:bg-[#fdfbf5] transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#7a8451]" />
                      <div>
                        <p className="font-medium text-[#3b4417]">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-[#7a8451]">
                          ID: {item.product.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#7a8451]" />
                      <div>
                        <p className="font-medium text-[#3b4417]">
                          {item.warehouse.name}
                        </p>
                        <p className="text-sm text-[#7a8451]">
                          {item.warehouse.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-2xl font-bold ${
                          item.quantityOnHand === 0
                            ? "text-red-600"
                            : item.quantityOnHand < item.safetyStock
                              ? "text-amber-600"
                              : "text-emerald-600"
                        }`}
                      >
                        {item.quantityOnHand}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-[#3b4417]">
                        {item.safetyStock}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            stockPercentage >= 100
                              ? "bg-emerald-500"
                              : stockPercentage >= 50
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{
                            width: `${Math.min(stockPercentage, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <InventoryStatusBadge
                      status={item.status}
                      quantity={item.quantityOnHand}
                      safetyStock={item.safetyStock}
                    />
                  </TableCell>
                  <TableCell className="font-semibold text-[#3b4417]">
                    {formatPrice(item.product.price * item.quantityOnHand)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-[#7a8451]">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {formatDate(item.lastUpdatedAt)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {onUpdateStock && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onUpdateStock(item)}
                            className="p-2 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors"
                            title={t("stockIn")}
                          >
                            <TrendingUp className="w-6 h-6" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onUpdateStock(item)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                            title={t("stockOut")}
                          >
                            <TrendingDown className="w-6 h-6" />
                          </motion.button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Summary Footer */}
      <div className="p-4 bg-[#fdfbf5] border-t border-[#e8e6dc]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-[#7a8451] mb-1">{t("totalProducts")}</p>
            <p className="text-xl font-bold text-[#3b4417]">{items.length}</p>
          </div>
          <div>
            <p className="text-[#7a8451] mb-1">{t("inStock")}</p>
            <p className="text-xl font-bold text-emerald-600">
              {items.filter((i) => i.status === "inStock").length}
            </p>
          </div>
          <div>
            <p className="text-[#7a8451] mb-1">{t("lowStock")}</p>
            <p className="text-xl font-bold text-amber-600">
              {items.filter((i) => i.status === "lowStock").length}
            </p>
          </div>
          <div>
            <p className="text-[#7a8451] mb-1">{t("outOfStock")}</p>
            <p className="text-xl font-bold text-red-600">
              {items.filter((i) => i.status === "outOfStock").length}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
