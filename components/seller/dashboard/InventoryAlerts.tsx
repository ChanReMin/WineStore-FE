"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";

interface InventoryItem {
  id: number;
  warehouse: {
    id: number;
    name: string;
    location: string;
  };
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity_on_hand: number;
  safety_stock: number;
  status: string;
  last_updated_at: string;
}

interface InventoryAlertsProps {
  inventory: InventoryItem[];
}

const getStatusBadge = (status: string) => {
  if (status === "out_of_stock") {
    return (
      <Badge className="bg-red-50 text-red-700 border border-red-300">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Hết hàng
      </Badge>
    );
  }
  if (status === "low_stock") {
    return (
      <Badge className="bg-[#fdfbf5] text-[#d4af37] border border-[#d4af37]">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Sắp hết
      </Badge>
    );
  }
  return (
    <Badge className="bg-[#3b4417] text-white border-[#3b4417]">Đủ hàng</Badge>
  );
};

export default function InventoryAlerts({ inventory }: InventoryAlertsProps) {
  const alertItems = inventory.filter(
    (item) => item.status === "low_stock" || item.status === "out_of_stock"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="border-[#d4d6b4]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#3b4417] tracking-wide">
            <AlertTriangle className="w-5 h-5 text-[#d4af37]" />
            Inventory alert ({alertItems.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#d4d6b4]">
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Product
                  </TableHead>
                  <TableHead className="text-right text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Price
                  </TableHead>
                  <TableHead className="text-center text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Stock
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Warehouse
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Updated
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-[#fdfbf5] transition-colors border-[#d4d6b4]"
                  >
                    <TableCell className="font-medium text-[#3b4417]">
                      {item.product.name}
                    </TableCell>
                    <TableCell className="text-right text-[#3b4417] font-medium">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.product.price)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`font-bold ${
                          item.quantity_on_hand === 0
                            ? "text-red-600"
                            : "text-[#d4af37]"
                        }`}
                      >
                        {item.quantity_on_hand}
                      </span>
                      <span className="text-[#7a8451]">
                        {" "}
                        / {item.safety_stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#3b4417]">
                          {item.warehouse.name}
                        </p>
                        <p className="text-sm text-[#7a8451]">
                          {item.warehouse.location}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-sm text-[#7a8451]">
                      {new Date(item.last_updated_at).toLocaleDateString(
                        "vi-VN",
                        {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
