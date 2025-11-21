"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, Calendar, TrendingUp, TrendingDown } from "lucide-react";
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

interface InventoryTableProps {
  items: InventoryItem[];
  onUpdateStock?: (item: InventoryItem) => void;
}

export default function InventoryTable({
  items,
  onUpdateStock,
}: InventoryTableProps) {
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
          No inventory items found
        </h3>
        <p className="text-[#7a8451]">
          Try changing the filter or searching with a different keyword
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
                Product
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Warehouse
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Stock
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Safety Stock
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Status
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Value
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Updated
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417] text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const stockPercentage = getStockPercentage(
                item.quantity_on_hand,
                item.safety_stock
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
                          item.quantity_on_hand === 0
                            ? "text-red-600"
                            : item.quantity_on_hand < item.safety_stock
                              ? "text-amber-600"
                              : "text-emerald-600"
                        }`}
                      >
                        {item.quantity_on_hand}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-[#3b4417]">
                        {item.safety_stock}
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
                      quantity={item.quantity_on_hand}
                      safetyStock={item.safety_stock}
                    />
                  </TableCell>
                  <TableCell className="font-semibold text-[#3b4417]">
                    {formatPrice(item.product.price * item.quantity_on_hand)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-[#7a8451]">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {formatDate(item.last_updated_at)}
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
                            title="Stock In"
                          >
                            <TrendingUp className="w-6 h-6" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onUpdateStock(item)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                            title="Stock Out"
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
            <p className="text-[#7a8451] mb-1">Total Products</p>
            <p className="text-xl font-bold text-[#3b4417]">{items.length}</p>
          </div>
          <div>
            <p className="text-[#7a8451] mb-1">In Stock</p>
            <p className="text-xl font-bold text-emerald-600">
              {items.filter((i) => i.status === "in_stock").length}
            </p>
          </div>
          <div>
            <p className="text-[#7a8451] mb-1">Low Stock</p>
            <p className="text-xl font-bold text-amber-600">
              {items.filter((i) => i.status === "low_stock").length}
            </p>
          </div>
          <div>
            <p className="text-[#7a8451] mb-1">Out of Stock</p>
            <p className="text-xl font-bold text-red-600">
              {items.filter((i) => i.status === "out_of_stock").length}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
