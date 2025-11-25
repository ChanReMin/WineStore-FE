"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { orderService } from "@/services/orderService";
import type { OrderDetail } from "@/types/order";
import { ArrowLeft, Package, MapPin, CreditCard, Clock } from "lucide-react";
import OrderTimeline from "@/components/orders/OrderTimeline";

export default function OrderDetailPage() {
  const t = useTranslations("orders");
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const orderId = Number(params.id);

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    if (!orderId || isNaN(orderId)) {
      router.push("/profile/orders");
      return;
    }

    loadOrder();
  }, [isAuthenticated, orderId, router]);

  const loadOrder = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getOrderDetail(orderId);
      setOrder(data);
    } catch (error) {
      toast.error(t("error"));
      router.push("/profile/orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-amber-50 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-10 w-64 animate-pulse rounded bg-neutral-200 mb-8" />
          <div className="space-y-4">
            <div className="h-48 animate-pulse rounded-lg bg-neutral-200" />
            <div className="h-96 animate-pulse rounded-lg bg-neutral-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const statusColors = {
    1: "bg-yellow-100 text-yellow-800",
    2: "bg-blue-100 text-blue-800",
    3: "bg-purple-100 text-purple-800",
    4: "bg-green-100 text-green-800",
    5: "bg-red-100 text-red-800",
  };

  const paymentStatusColors = {
    1: "bg-yellow-100 text-yellow-800",
    2: "bg-green-100 text-green-800",
    3: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="mx-auto max-w-4xl px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-[#33391d] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t("backToOrders")}</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#33391d]">
                {t("orderDetail")} #{order.id}
              </h1>
              <p className="mt-2 text-neutral-600">
                {new Date(order.created_at).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  statusColors[order.status as keyof typeof statusColors]
                }`}
              >
                {t(`status.${order.status}`)}
              </span>
              <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  paymentStatusColors[
                    order.payment_status as keyof typeof paymentStatusColors
                  ]
                }`}
              >
                {t(`paymentStatus.${order.payment_status}`)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <OrderTimeline status={order.status} />
        </motion.div>

        {/* Order Info Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#33391d]" />
              <h3 className="font-semibold text-[#33391d]">
                {t("shippingAddress")}
              </h3>
            </div>
            <div className="space-y-2 text-sm text-neutral-600">
              <p className="font-medium text-neutral-900">
                {order.shipping_address.full_name}
              </p>
              <p>{order.shipping_address.phone_number}</p>
              <p>{order.shipping_address.address_line}</p>
              <p>{order.shipping_address.city}</p>
            </div>
          </motion.div>

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#33391d]" />
              <h3 className="font-semibold text-[#33391d]">
                {t("paymentInfo")}
              </h3>
            </div>
            <div className="space-y-2 text-sm text-neutral-600">
              <div className="flex justify-between">
                <span>{t("paymentMethod")}</span>
                <span className="font-medium text-neutral-900">
                  {order.payment_method.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t("paymentStatus")}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    paymentStatusColors[
                      order.payment_status as keyof typeof paymentStatusColors
                    ]
                  }`}
                >
                  {t(`paymentStatus.${order.payment_status}`)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-5 w-5 text-[#33391d]" />
            <h3 className="font-semibold text-[#33391d]">{t("orderItems")}</h3>
          </div>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-neutral-100 pb-4 last:border-0 last:pb-0"
              >
                <img
                  src={item.product_image || "/placeholder-wine.jpg"}
                  alt={item.product_name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">
                    {item.product_name}
                  </h4>
                  <p className="text-sm text-neutral-600">
                    {t("quantity")}: {item.quantity}
                  </p>
                  <p className="text-sm font-medium text-[#33391d]">
                    {item.unit_price.toLocaleString("vi-VN")}₫
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-neutral-900">
                    {item.line_total.toLocaleString("vi-VN")}₫
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 space-y-2 border-t border-neutral-200 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">{t("subtotal")}</span>
              <span className="font-medium text-neutral-900">
                {order.total_amount.toLocaleString("vi-VN")}₫
              </span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">{t("discount")}</span>
                <span className="font-medium text-green-600">
                  -{order.discount_amount.toLocaleString("vi-VN")}₫
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-neutral-200 pt-2 text-lg font-bold">
              <span className="text-[#33391d]">{t("total")}</span>
              <span className="text-[#33391d]">
                {order.final_amount.toLocaleString("vi-VN")}₫
              </span>
            </div>
          </div>
        </motion.div>

        {/* Notes */}
        {order.note && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#33391d]" />
              <h3 className="font-semibold text-[#33391d]">{t("notes")}</h3>
            </div>
            <p className="text-sm text-neutral-600">{order.note}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
