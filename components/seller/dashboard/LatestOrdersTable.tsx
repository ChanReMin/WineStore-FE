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

interface Order {
  id: number;
  order_code: string;
  customer: {
    id: number;
    name: string;
    email: string;
  };
  status: number;
  status_text: string;
  payment_status: number;
  final_amount: number;
  created_at: string;
}

interface LatestOrdersTableProps {
  orders: Order[];
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

const getPaymentStatusText = (status: number) => {
  return status === 1 ? "Đã thanh toán" : "Chưa thanh toán";
};

export default function LatestOrdersTable({ orders }: LatestOrdersTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-[#d4d6b4]">
        <CardHeader>
          <CardTitle className="text-[#3b4417] tracking-wide">
            Đơn hàng mới nhất
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#d4d6b4]">
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Mã đơn
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Khách hàng
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Trạng thái
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Thanh toán
                  </TableHead>
                  <TableHead className="text-right text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Tổng tiền
                  </TableHead>
                  <TableHead className="text-[#7a8451] uppercase text-[11px] tracking-wider">
                    Ngày tạo
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
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status_text}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.payment_status === 1
                            ? "bg-[#3b4417] text-white border-[#3b4417]"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }
                      >
                        {getPaymentStatusText(order.payment_status)}
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
