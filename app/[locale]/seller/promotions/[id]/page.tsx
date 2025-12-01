"use client";

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Tag,
  Calendar,
  Percent,
  DollarSign,
  Users,
  Package,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";
import PromotionStatusBadge from "@/components/seller/promotion/PromotionStatusBadge";
import PromotionFormModal from "@/components/seller/promotion/PromotionFormModal";
import ConfirmDeleteModal from "@/components/seller/promotion/ConfirmDeleteModal";
import { fetchPromotions, fetchPromotionStatistics } from "@/services/promotionService";

export default function PromotionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const promotionId = parseInt(params.id as string);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [promotion, setPromotion] = useState<any>(null);
  const [statistics, setStatistics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [promotionId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [promotionRes, statsRes] = await Promise.all([
        fetchPromotions({ limit: 1 }),
        fetchPromotionStatistics(Number(promotionId))
      ]);
      setPromotion(promotionRes.data.promotions[0]);
      setStatistics(statsRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const formatDiscount = (type: number, value: number) => {
    if (type === 1) return `${value}%`;
    return formatCurrency(value);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      router.push("/seller/promotions");
    }, 1500);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[#d4d6b4] text-[#3b4417] hover:bg-[#f5f3e8]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Come back
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#3b4417] tracking-wide">
              Promotion details
            </h1>
            <p className="text-[#7a8451] mt-1">
              Detailed information and statistics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleEdit}
            variant="outline"
            className="border-[#d4d6b4] text-blue-600 hover:bg-blue-50"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </motion.div>

      {/* Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-[#d4d6b4] p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Tag className="w-6 h-6 text-[#7a8451]" />
                <h3 className="text-3xl font-bold text-[#3b4417] font-mono">
                  {promotion.code}
                </h3>
                <PromotionStatusBadge
                  status={promotion.status}
                  startDate={promotion.start_date}
                  endDate={promotion.end_date}
                />
              </div>
              <p className="text-xl font-semibold text-[#3b4417] mb-2">
                {promotion.name}
              </p>
              <p className="text-[#7a8451]">{promotion.description}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                {promotion.discount_type === 1 ? (
                  <Percent className="h-10 w-10 text-[#d4af37]" />
                ) : (
                  <DollarSign className="h-10 w-10 text-[#d4af37]" />
                )}
                <span className="text-4xl font-bold text-[#d4af37]">
                  {formatDiscount(
                    promotion.discount_type,
                    promotion.discount_value
                  )}
                </span>
              </div>
              <span className="text-sm text-[#7a8451]">
                {promotion.discount_type === 1 ? "Giảm theo %" : "Giảm cố định"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#d4d6b4]">
            <div>
              <p className="text-xs text-[#7a8451] uppercase mb-2">
                Ngày bắt đầu
              </p>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#7a8451]" />
                <p className="font-semibold text-[#3b4417]">
                  {formatDate(promotion.start_date)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#7a8451] uppercase mb-2">
                Ngày kết thúc
              </p>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#7a8451]" />
                <p className="font-semibold text-[#3b4417]">
                  {formatDate(promotion.end_date)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#7a8451] uppercase mb-2">
                Đã sử dụng
              </p>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#7a8451]" />
                <p className="font-semibold text-[#3b4417]">
                  {promotion.used_count} / {promotion.max_usage}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-[#7a8451] uppercase mb-2">Còn lại</p>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-[#7a8451]" />
                <p className="font-semibold text-orange-600">
                  {promotion.max_usage - promotion.used_count}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Statistics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="border-[#d4d6b4] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#7a8451] uppercase">Tổng đơn hàng</p>
            <TrendingUp className="h-5 w-5 text-[#3b4417]" />
          </div>
          <p className="text-3xl font-bold text-[#3b4417]">
            {statistics.totalOrders}
          </p>
          <p className="text-xs text-[#7a8451] mt-1">Đơn hàng đã áp dụng</p>
        </Card>
        <Card className="border-[#d4d6b4] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#7a8451] uppercase">Tổng giảm giá</p>
            <DollarSign className="h-5 w-5 text-[#d4af37]" />
          </div>
          <p className="text-3xl font-bold text-[#d4af37]">
            {formatCurrency(statistics.totalDiscountAmount)}
          </p>
          <p className="text-xs text-[#7a8451] mt-1">Tổng số tiền đã giảm</p>
        </Card>
        <Card className="border-[#d4d6b4] p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#7a8451] uppercase">Tỷ lệ sử dụng</p>
            <Users className="h-5 w-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-600">
            {Math.round((statistics.total_usage / statistics.maxusage) * 100)}%
          </p>
          <p className="text-xs text-[#7a8451] mt-1">
            {statistics.remainingUsage} lượt còn lại
          </p>
        </Card>
      </motion.div>

      {/* Usage Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-[#d4d6b4] p-6">
          <h4 className="text-lg font-bold text-[#3b4417] mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Biểu đồ sử dụng theo ngày
          </h4>
          <ChartContainer
            config={{
              usageCount: {
                label: "Usage count",
                color: "#3b4417",
              },
              discountAmount: {
                label: "Discount (VND)",
                color: "#d4af37",
              },
            }}
            className="h-[400px] w-full"
          >
            <LineChart data={statistics.usageByDate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8e6dc" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
                stroke="#7a8451"
                fontSize={12}
              />
              <YAxis stroke="#7a8451" fontSize={12} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => formatDate(value as string)}
                    formatter={(value, name) => {
                      if (name === "discountAmount") {
                        return formatCurrency(value as number);
                      }
                      return value;
                    }}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="usageCount"
                stroke="#3b4417"
                strokeWidth={3}
                dot={{ fill: "#3b4417", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ChartContainer>
        </Card>
      </motion.div>

      {/* Applicable Products */}
      {promotion.applicableProducts &&
        promotion.applicableProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-[#d4d6b4] p-6">
              <h4 className="text-lg font-bold text-[#3b4417] mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Sản phẩm áp dụng ({promotion.applicableProducts.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {promotion.applicableProducts.map((product: any, index: number) => (
                  <motion.div
                    key={`product-${product.id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-[#fdfbf5] rounded-lg border border-[#e8e6dc] hover:border-[#3b4417] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#f5f3e8] flex items-center justify-center">
                        <Package className="w-5 h-5 text-[#7a8451]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#3b4417]">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#7a8451]">
                          ID: {product.id}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-[#d4af37]">
                      {formatCurrency(product.price)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <PromotionFormModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            promotionId={promotionId}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => !isDeleting && setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Xóa khuyến mãi"
            description="Bạn có chắc chắn muốn xóa khuyến mãi này? Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn."
            itemName={`${promotion.code} - ${promotion.name}`}
            isDeleting={isDeleting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
