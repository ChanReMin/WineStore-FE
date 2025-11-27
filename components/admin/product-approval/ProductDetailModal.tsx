"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Package,
  Wine,
  MapPin,
  Calendar,
  Tag,
  TrendingUp,
  Star,
  Mail,
  Phone,
  Thermometer,
  Droplet,
} from "lucide-react";
import { type ProductApproval } from "@/lib/adminProductApprovals";
import { Card, CardContent } from "@/components/ui/card";

interface ProductDetailModalProps {
  product: ProductApproval;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestChanges,
}: ProductDetailModalProps) {
  const t = useTranslations("admin.productApproval.detail");
  const [selectedImage, setSelectedImage] = useState(0);

  const getStatusBadge = () => {
    const badges = {
      pending: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: AlertCircle,
      },
      approved: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: CheckCircle,
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: XCircle,
      },
    };

    const badge =
      badges[product.approvalStatus as keyof typeof badges] || badges.pending;
    const Icon = badge.icon;

    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${badge.bg} ${badge.text} ${badge.border}`}
      >
        <Icon className="w-4 h-4" />
        <span className="font-semibold text-sm">
          {product.approvalStatusText}
        </span>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 w-full h-full"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[98vh] sm:max-h-[96vh] overflow-hidden flex flex-col"
            >
              {/* Header with Gradient */}
              <div className="relative bg-linear-to-br from-[#3b4417] via-[#4c5b23] to-[#5d6c2f] p-3 sm:p-4 lg:p-6 text-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="flex-1 pr-8 sm:pr-10 md:pr-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                        <Package className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-amber-300" />
                        <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-amber-200">
                          {t("productId")}: #{product.id}
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg lg:text-2xl font-bold mb-0.5 sm:mb-1 text-white line-clamp-2">
                        {product.name}
                      </h2>
                    </div>
                    <div className="self-start scale-90 sm:scale-100">
                      {getStatusBadge()}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 lg:gap-3 mt-3 sm:mt-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 lg:p-3 border border-white/20">
                      <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
                        <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-amber-300" />
                        <p className="text-[9px] sm:text-[10px] lg:text-xs text-amber-200 uppercase tracking-wide">
                          Giá
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm lg:text-lg font-bold truncate">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          notation: "compact",
                        }).format(product.price)}
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 lg:p-3 border border-white/20">
                      <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
                        <Wine className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-amber-300" />
                        <p className="text-[9px] sm:text-[10px] lg:text-xs text-amber-200 uppercase tracking-wide">
                          Loại
                        </p>
                      </div>
                      <p className="text-[10px] sm:text-xs lg:text-base font-semibold truncate">
                        {product.category.name}
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 lg:p-3 border border-white/20">
                      <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
                        <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-amber-300" />
                        <p className="text-[9px] sm:text-[10px] lg:text-xs text-amber-200 uppercase tracking-wide">
                          Xuất xứ
                        </p>
                      </div>
                      <p className="text-[10px] sm:text-xs lg:text-base font-semibold truncate">
                        {product.brand.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-[#fdfbf5]">
                <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-5">
                  {/* Images Gallery */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="border-neutral-200 overflow-hidden">
                      <CardContent className="p-3 sm:p-4 lg:p-5">
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#3b4417] mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                          <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                          {t("images")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {/* Main Image */}
                          <div className="md:col-span-3">
                            <motion.div
                              key={selectedImage}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="aspect-square rounded-2xl overflow-hidden border-2 border-neutral-200 bg-white shadow-lg"
                            >
                              <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                          </div>
                          {/* Thumbnails */}
                          <div className="md:col-span-2 grid grid-cols-4 md:grid-cols-2 gap-3">
                            {product.images.map((image, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                  selectedImage === index
                                    ? "border-[#3b4417] shadow-lg ring-2 ring-[#3b4417]/20"
                                    : "border-neutral-200 hover:border-neutral-300"
                                }`}
                              >
                                <img
                                  src={image}
                                  alt={`${product.name} ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Product Information */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="border-neutral-200 h-full">
                        <CardContent className="p-3 sm:p-4 lg:p-5">
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#3b4417] mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                            <Wine className="w-4 h-4 sm:w-5 sm:h-5" />
                            {t("productInfo")}
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-start justify-between p-3 bg-neutral-50 rounded-xl">
                              <div>
                                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                                  {t("productName")}
                                </p>
                                <p className="font-semibold text-neutral-900">
                                  {product.name}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-3 bg-linear-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                                <p className="text-xs text-blue-700 uppercase tracking-wide mb-1">
                                  {t("category")}
                                </p>
                                <p className="font-semibold text-blue-900">
                                  {product.category.name}
                                </p>
                              </div>
                              <div className="p-3 bg-linear-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                                <p className="text-xs text-purple-700 uppercase tracking-wide mb-1">
                                  {t("brand")}
                                </p>
                                <p className="font-semibold text-purple-900">
                                  {product.brand.name}
                                </p>
                              </div>
                            </div>

                            <div className="p-4 bg-linear-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200">
                              <p className="text-xs text-emerald-700 uppercase tracking-wide mb-2">
                                {t("price")}
                              </p>
                              <div className="flex items-baseline gap-3">
                                <p className="text-3xl font-bold text-emerald-900">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(product.price)}
                                </p>
                                {product.basePrice > product.price && (
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm text-neutral-500 line-through">
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(product.basePrice)}
                                    </p>
                                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                      -
                                      {Math.round(
                                        ((product.basePrice - product.price) /
                                          product.basePrice) *
                                          100
                                      )}
                                      %
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Wine Details */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="border-neutral-200 h-full">
                        <CardContent className="p-3 sm:p-4 lg:p-5">
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#3b4417] mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                            <Droplet className="w-4 h-4 sm:w-5 sm:h-5" />
                            {t("wineDetails")}
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {product.grapeVariety && (
                              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                                <p className="text-xs text-amber-700 uppercase tracking-wide mb-1">
                                  {t("grapeVariety")}
                                </p>
                                <p className="font-semibold text-amber-900 text-sm">
                                  {product.grapeVariety}
                                </p>
                              </div>
                            )}
                            {product.concentration && (
                              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                                <p className="text-xs text-red-700 uppercase tracking-wide mb-1">
                                  {t("concentration")}
                                </p>
                                <p className="font-semibold text-red-900">
                                  {product.concentration}%
                                </p>
                              </div>
                            )}
                            {product.vintageYear && (
                              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                                <div className="flex items-center gap-1 mb-1">
                                  <Calendar className="w-3 h-3 text-indigo-700" />
                                  <p className="text-xs text-indigo-700 uppercase tracking-wide">
                                    {t("vintageYear")}
                                  </p>
                                </div>
                                <p className="font-semibold text-indigo-900">
                                  {product.vintageYear}
                                </p>
                              </div>
                            )}
                            {product.capacityMl && (
                              <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                                <p className="text-xs text-cyan-700 uppercase tracking-wide mb-1">
                                  {t("capacity")}
                                </p>
                                <p className="font-semibold text-cyan-900">
                                  {product.capacityMl}ml
                                </p>
                              </div>
                            )}
                            {product.productionArea && (
                              <div className="col-span-2 p-3 bg-green-50 rounded-xl border border-green-200">
                                <div className="flex items-center gap-1 mb-1">
                                  <MapPin className="w-3 h-3 text-green-700" />
                                  <p className="text-xs text-green-700 uppercase tracking-wide">
                                    {t("productionArea")}
                                  </p>
                                </div>
                                <p className="font-semibold text-green-900">
                                  {product.productionArea}
                                </p>
                              </div>
                            )}
                            {product.idealtemperature && (
                              <div className="col-span-2 p-3 bg-sky-50 rounded-xl border border-sky-200">
                                <div className="flex items-center gap-1 mb-1">
                                  <Thermometer className="w-3 h-3 text-sky-700" />
                                  <p className="text-xs text-sky-700 uppercase tracking-wide">
                                    {t("idealTemperature")}
                                  </p>
                                </div>
                                <p className="font-semibold text-sky-900">
                                  {product.idealtemperature}
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Description */}
                  {product.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="border-neutral-200">
                        <CardContent className="p-3 sm:p-4 lg:p-5">
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#3b4417] mb-2 sm:mb-3">
                            {t("description")}
                          </h3>
                          <p className="text-neutral-700 leading-relaxed">
                            {product.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Seller Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card className="border-[#3b4417]/20 bg-linear-to-br from-[#fdfbf5] to-[#f5f3e8]">
                      <CardContent className="p-3 sm:p-4 lg:p-5">
                        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#3b4417] mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                          <User className="w-4 h-4 sm:w-5 sm:h-5" />
                          {t("sellerInfo")}
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Seller Contact */}
                          <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#3b4417] to-[#5d6c2f] flex items-center justify-center text-white font-bold text-lg">
                                  {product.seller.fullName.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-bold text-neutral-900">
                                    {product.seller.fullName}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    <span className="text-sm text-neutral-600">
                                      {product.seller.sellerRating || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                  <Mail className="w-4 h-4" />
                                  <span className="truncate">
                                    {product.seller.email}
                                  </span>
                                </div>
                                {product.seller.phoneNumber && (
                                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                                    <Phone className="w-4 h-4" />
                                    <span>{product.seller.phoneNumber}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Seller Stats */}
                          <div className="lg:col-span-2">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-white rounded-xl p-4 border border-neutral-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <Package className="w-4 h-4 text-[#3b4417]" />
                                  <p className="text-xs text-neutral-600 uppercase tracking-wide">
                                    {t("totalProducts")}
                                  </p>
                                </div>
                                <p className="text-3xl font-bold text-[#3b4417]">
                                  {product.seller.totalProducts || 0}
                                </p>
                              </div>
                              <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                                  <p className="text-xs text-neutral-600 uppercase tracking-wide">
                                    {t("approvedProducts")}
                                  </p>
                                </div>
                                <p className="text-3xl font-bold text-emerald-600">
                                  {product.seller.approvedProducts || 0}
                                </p>
                              </div>
                              <div className="bg-white rounded-xl p-4 border border-red-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <XCircle className="w-4 h-4 text-red-600" />
                                  <p className="text-xs text-neutral-600 uppercase tracking-wide">
                                    {t("rejectedProducts")}
                                  </p>
                                </div>
                                <p className="text-3xl font-bold text-red-600">
                                  {product.seller.rejectedProducts || 0}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Submission Timeline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-blue-100/30">
                      <CardContent className="p-3 sm:p-4 lg:p-5">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="bg-blue-600 p-2 sm:p-2.5 lg:p-3 rounded-lg lg:rounded-xl">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-bold text-blue-900 mb-2 sm:mb-3">
                              {t("submissionInfo")}
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                              <div>
                                <p className="text-[10px] sm:text-xs text-blue-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                                  {t("submittedAt")}
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-blue-900">
                                  {new Date(product.submittedAt).toLocaleString(
                                    "vi-VN"
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] sm:text-xs text-blue-700 uppercase tracking-wide mb-0.5 sm:mb-1">
                                  {t("createdAt")}
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-blue-900">
                                  {new Date(product.createdAt).toLocaleString(
                                    "vi-VN"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="shrink-0 border-t border-neutral-200 bg-white">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between gap-2 lg:gap-3 p-3 lg:p-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="px-4 lg:px-6 py-2 lg:py-3 border-2 border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all flex items-center gap-2 font-semibold text-sm lg:text-base"
                  >
                    <X className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="hidden lg:inline">Đóng</span>
                  </motion.button>

                  {product.approvalStatus === "pending" && (
                    <div className="flex items-center gap-2 lg:gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onRequestChanges}
                        className="px-3 lg:px-6 py-2 lg:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-1 lg:gap-2 font-semibold text-xs lg:text-base"
                      >
                        <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="hidden xl:inline">
                          {t("requestChanges")}
                        </span>
                        <span className="xl:hidden">Yêu cầu</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onReject}
                        className="px-3 lg:px-6 py-2 lg:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 flex items-center gap-1 lg:gap-2 font-semibold text-xs lg:text-base"
                      >
                        <XCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="hidden lg:inline">{t("reject")}</span>
                        <span className="lg:hidden">Từ chối</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onApprove}
                        className="px-3 lg:px-6 py-2 lg:py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-1 lg:gap-2 font-semibold text-xs lg:text-base"
                      >
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="hidden lg:inline">{t("approve")}</span>
                        <span className="lg:hidden">Duyệt</span>
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden p-3 space-y-2">
                  {product.approvalStatus === "pending" && (
                    <div className="grid grid-cols-3 gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={onRequestChanges}
                        className="px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex flex-col items-center gap-1 font-semibold text-xs"
                      >
                        <AlertCircle className="w-5 h-5" />
                        <span>Yêu cầu</span>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={onReject}
                        className="px-3 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex flex-col items-center gap-1 font-semibold text-xs"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Từ chối</span>
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={onApprove}
                        className="px-3 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all flex flex-col items-center gap-1 font-semibold text-xs"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Duyệt</span>
                      </motion.button>
                    </div>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full px-4 py-2.5 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 font-semibold text-sm"
                  >
                    <X className="w-4 h-4" />
                    Đóng
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
