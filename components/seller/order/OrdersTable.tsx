"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Calendar, User, ShoppingBag } from "lucide-react";
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
import PaymentStatusBadge from "./PaymentStatusBadge";
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (orders.length === 0) {
    return (
      <Card className="p-12 text-center border-[#d4d6b4]">
        <ShoppingBag className="w-16 h-16 mx-auto text-[#7a8451] mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-[#3b4417] mb-2">
          Không tìm thấy đơn hàng
        </h3>
        <p className="text-[#7a8451]">
          Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
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
                Mã đơn
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Khách hàng
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Trạng thái
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Thanh toán
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Tổng tiền
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Ngày đặt
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417] text-right">
                Thao tác
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
                onMouseEnter={() => setHoveredRow(order.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className="border-b border-[#e8e6dc] hover:bg-[#fdfbf5] transition-colors"
              >
                <TableCell className="font-medium text-[#3b4417]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#7a8451]" />
                    {order.order_code}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-[#7a8451] mt-1" />
                    <div>
                      <p className="font-medium text-[#3b4417]">
                        {order.customer.name}
                      </p>
                      <p className="text-sm text-[#7a8451]">
                        {order.customer.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <OrderStatusBadge
                    status={order.status}
                    statusText={order.status_text}
                  />
                </TableCell>
                <TableCell>
                  <PaymentStatusBadge status={order.payment_status} />
                </TableCell>
                <TableCell className="font-semibold text-[#3b4417]">
                  {formatPrice(order.final_amount)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-[#7a8451]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(order.created_at)}
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
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                    )}
                    {onUpdateStatus && order.status !== 4 && order.status !== 5 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateStatus(order)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                        title="Cập nhật trạng thái"
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
