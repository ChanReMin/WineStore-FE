"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
import type { SellerOrder } from "@/types/sellerOrder";

interface LatestOrdersTableProps {
  orders: SellerOrder[];
}

const getStatusColor = (status: number) => {
  switch (status) {
    case 1:
      return "bg-[#fdfbf5] text-[#d4af37] border border-[#d4af37]";
    case 2:
      return "bg-[#f5f3e8] text-[#7a8451] border border-[#7a8451]";
    case 4:
      return "bg-[#3b4417]/10 text-[#3b4417] border border-[#3b4417]";
    case 5:
      return "bg-[#3b4417] text-white border border-[#3b4417]";
    case 7:
      return "bg-red-50 text-red-700 border border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-300";
  }
};

export default function LatestOrdersTable({ orders }: LatestOrdersTableProps) {
  const t = useTranslations("seller.dashboard.latestOrders");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-[#d4d6b4]">
        <CardHeader>
          <CardTitle className="text-[#3b4417] tracking-wide">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#d4d6b4]">
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    {t("orderId")}
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    {t("customer")}
                  </TableHead>
                  <TableHead className="text-center text-[#7a8451] uppercase text-[11px] tracking-wider">
                    {t("items") || "Items"}
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    {t("status")}
                  </TableHead>
                  <TableHead className="text-right text-[#7a8451] uppercase text-[11px] tracking-wider">
                    {t("totalAmount")}
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    {t("createdAt")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-[#fdfbf5] transition-colors border-[#d4d6b4]"
                  >
                    <TableCell className="font-medium text-[#3b4417]">
                      {order.order_code}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#3b4417]">
                          {order.customer.name}
                        </p>
                        <p className="text-sm text-[#7a8451]">
                          {order.customer.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f5f3e8] text-[#3b4417] font-semibold text-sm">
                        {order.items_count}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status_text}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-[#3b4417]">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.final_amount)}
                    </TableCell>
                    <TableCell className="text-[#7a8451] text-sm">
                      {new Date(order.created_at).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
