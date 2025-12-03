"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	Eye,
	Edit,
	Calendar,
	User,
	Wine,
	Receipt,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrdersTableProps {
  orders: any[];
  onViewDetails?: (order: any) => void;
  onUpdateStatus?: (order: any) => void;
}

export default function OrdersTable({
  orders,
  onViewDetails,
  onUpdateStatus,
}: OrdersTableProps) {
  const t = useTranslations("seller.orders");

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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (orders.length === 0) {
    return (
      <Card className="p-12 text-center border-[#d4d6b4]">
        <Wine className="w-16 h-16 mx-auto text-[#7a8451] mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-[#3b4417] mb-2">
          {t("table.noOrders")}
        </h3>
        <p className="text-[#7a8451]">{t("table.tryChangingFilter")}</p>
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
                {t("table.orderCode")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("table.customer")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("table.orderStatus")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("table.totalAmount")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("table.createdAt")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417] text-right">
                {t("table.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-[#e8e6dc] hover:bg-[#fdfbf5] transition-colors"
              >
                <TableCell className="font-medium text-[#3b4417]">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#7a8451]" />
                    <span>{order.orderCode}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-[#7a8451] mt-1" />
                    <div>
                      <p className="font-medium text-[#3b4417]">
                        {order.shippingAddress?.fullName || "N/A"}
                      </p>
                      <p className="text-sm text-[#7a8451]">
                        {order.shippingAddress?.phoneNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <OrderStatusBadge
                    status={order.status}
                    statusText={order.statusText}
                  />
                </TableCell>
                <TableCell className="font-semibold text-[#3b4417]">
                  {formatPrice(order.finalAmount)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-[#7a8451]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {onViewDetails && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onViewDetails(order)}
                        className="p-2 rounded-lg hover:bg-[#f5f3e8] text-[#3b4417] transition-colors"
                        title={t("table.viewDetails")}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                    )}
                    {onUpdateStatus && order.status !== 6 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateStatus(order)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        title={t("table.updateStatus")}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
