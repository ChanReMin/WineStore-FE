"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, Percent, DollarSign, Package, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/ui/date-picker";
import ProductSelector from "./ProductSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { promotionSchema } from "@/lib/validations/promotion";
import { z } from "zod";
import { toast } from "react-toastify";
import type { PromotionFormData } from "@/types/promotion";
import {
  createPromotion,
  updatePromotion,
  fetchPromotionDetail,
} from "@/services/promotionService";
import { getErrorMessage } from "@/lib/errorHandler";
import { LoaderOne } from "@/components/ui/loader";
import { useTranslations } from "next-intl";

interface PromotionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotionId?: number | null;
}

export default function PromotionFormModal({
  isOpen,
  onClose,
  promotionId,
}: PromotionFormModalProps) {
  const t = useTranslations("seller.promotions.form");
  const isEdit = promotionId !== null && promotionId !== undefined;

  const [formData, setFormData] = useState<PromotionFormData>({
    code: "",
    name: "",
    description: "",
    discount_type: 0,
    discount_value: 0,
    start_date: "",
    end_date: "",
    max_usage: 100,
    productIds: [],
    status: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load promotion data when editing
  useEffect(() => {
    if (isEdit && promotionId && isOpen) {
      loadPromotionData();
    } else if (!isEdit && isOpen) {
      // Reset form for new promotion
      setFormData({
        code: "",
        name: "",
        description: "",
        discount_type: 0,
        discount_value: 0,
        start_date: "",
        end_date: "",
        max_usage: 100,
        productIds: [],
        status: 1,
      });
      setErrors({});
    }
  }, [isEdit, promotionId, isOpen]);

  const loadPromotionData = async () => {
    if (!promotionId) return;

    setIsLoading(true);
    try {
      const response = await fetchPromotionDetail(promotionId);
      const promotion = response.data;
      setFormData({
        code: promotion.code,
        name: promotion.name,
        description: promotion.description,
        discount_type: promotion.discount_type,
        discount_value: promotion.discount_value,
        start_date: promotion.start_date.split("T")[0],
        end_date: promotion.end_date.split("T")[0],
        max_usage: promotion.max_usage,
        status: promotion.status,
        productIds: promotion.applicableProducts?.map((p) => p.id) || [],
      });
    } catch (error: any) {
      console.error("Error loading promotion:", error);
      toast.error(getErrorMessage(error, t("errors.loadFailed")));
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    try {
      promotionSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);

        // Show first error in toast
        const firstError = error.issues[0];
        toast.error(firstError.message, {
          position: "top-right",
          autoClose: 3000,
        });
        return false;
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Format dates with timezone before sending to API
      const formattedData = {
        ...formData,
        start_date: formData.start_date
          ? `${formData.start_date}`
          : formData.start_date,
        end_date: formData.end_date
          ? `${formData.end_date}`
          : formData.end_date,
      };

      if (isEdit && promotionId) {
        // Update existing promotion
        await updatePromotion(promotionId, formattedData);
        toast.success(t("success.updated"));
      } else {
        // Create new promotion
        await createPromotion(formattedData);
        toast.success(t("success.created"));
      }
      onClose();
    } catch (error: any) {
      console.error("Error saving promotion:", error);
      const tDelete = useTranslations("seller.promotions.delete");
      toast.error(getErrorMessage(error, tDelete("error")));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof PromotionFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#d4d6b4] bg-[#f5f3e8] px-6 py-4">
            {isLoading ? (
              <div className="flex h-screen items-center justify-center bg-neutral-50">
                <LoaderOne />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b4417]">
                    <Tag className="h-5 w-5 text-amber-50" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#3b4417]">
                      {isEdit ? t("editTitle") : t("createTitle")}
                    </h2>
                    <p className="text-sm text-[#7a8451]">
                      {isEdit ? t("editSubtitle") : t("createSubtitle")}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-[#7a8451] transition-colors hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Code & Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-[#3b4417] font-semibold">
                  {t("code")} {t("required")}
                </Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7a8451]" />
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      handleChange("code", e.target.value.toUpperCase())
                    }
                    placeholder={t("codePlaceholder")}
                    className="pl-10 border-[#d4d6b4] focus:border-[#3b4417] focus:ring-[#3b4417] font-mono"
                    disabled={isEdit}
                  />
                </div>
                {errors.code && (
                  <p className="text-xs text-red-600">{errors.code}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#3b4417] font-semibold">
                  {t("name")} {t("required")}
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder={t("namePlaceholder")}
                  className="border-[#d4d6b4] focus:border-[#3b4417] focus:ring-[#3b4417]"
                />
                {errors.name && (
                  <p className="text-xs text-red-600">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-[#3b4417] font-semibold"
              >
                {t("description")}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder={t("descriptionPlaceholder")}
                rows={3}
                className="border-[#d4d6b4] focus:border-[#3b4417] focus:ring-[#3b4417] resize-none"
              />
            </div>

            {/* Discount Type & Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="discount_type"
                  className="text-[#3b4417] font-semibold"
                >
                  {t("discountType")} {t("required")}
                </Label>
                <Select
                  value={formData.discount_type.toString()}
                  onValueChange={(value) =>
                    handleChange("discount_type", parseInt(value))
                  }
                >
                  <SelectTrigger className="border-[#d4d6b4] focus:border-[#3b4417] focus:ring-[#3b4417]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4 text-[#d4af37]" />
                        {t("discountTypePercent")}
                      </div>
                    </SelectItem>
                    <SelectItem value="1">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-[#d4af37]" />
                        {t("discountTypeFixed")}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="discount_value"
                  className="text-[#3b4417] font-semibold"
                >
                  {t("discountValue")} {t("required")}
                </Label>
                <div className="relative">
                  {formData.discount_type === 0 ? (
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7a8451]" />
                  ) : (
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7a8451]" />
                  )}
                  <Input
                    id="discount_value"
                    type="number"
                    value={formData.discount_value}
                    onChange={(e) =>
                      handleChange("discount_value", parseFloat(e.target.value))
                    }
                    placeholder={
                      formData.discount_type === 0 ? t("discountValuePlaceholder") : t("discountValuePlaceholderFixed")
                    }
                    className="pl-10 border-[#d4d6b4] focus:border-[#3b4417] focus:ring-[#3b4417]"
                    min="0"
                    step={formData.discount_type === 0 ? "1" : "1000"}
                  />
                </div>
                {errors.discount_value && (
                  <p className="text-xs text-red-600">
                    {errors.discount_value}
                  </p>
                )}
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="start_date"
                  className="text-[#3b4417] font-semibold"
                >
                  {t("startDate")} {t("required")}
                </Label>
                <DatePicker
                  value={formData.start_date}
                  onChange={(date) => handleChange("start_date", date)}
                  placeholder={t("startDatePlaceholder")}
                  error={errors.start_date}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="end_date"
                  className="text-[#3b4417] font-semibold"
                >
                  {t("endDate")} {t("required")}
                </Label>
                <DatePicker
                  value={formData.end_date}
                  onChange={(date) => handleChange("end_date", date)}
                  placeholder={t("endDatePlaceholder")}
                  minDate={formData.start_date || undefined}
                  error={errors.end_date}
                />
              </div>
            </div>

            {/* Max Usage & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="max_usage"
                  className="text-[#3b4417] font-semibold"
                >
                  {t("maxUsage")} {t("required")}
                </Label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7a8451]" />
                  <Input
                    id="max_usage"
                    type="number"
                    value={formData.max_usage}
                    onChange={(e) =>
                      handleChange("max_usage", parseInt(e.target.value))
                    }
                    placeholder={t("maxUsagePlaceholder")}
                    className="pl-10 border-[#d4d6b4] focus:border-[#3b4417] focus:ring-[#3b4417]"
                    min="0"
                  />
                </div>
                {errors.max_usage && (
                  <p className="text-xs text-red-600">{errors.max_usage}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="status"
                  className="text-[#3b4417] font-semibold"
                >
                  {t("status")}
                </Label>
                <Select
                  value={formData.status?.toString() || "1"}
                  onValueChange={(value) =>
                    handleChange("status", parseInt(value))
                  }
                >
                  <SelectTrigger className="border-[#d4d6b4] focus:border-[#3b4417] focus:ring-[#3b4417]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">{t("statusActive")}</SelectItem>
                    <SelectItem value="0">{t("statusInactive")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#d4d6b4]">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-[#d4d6b4] text-[#3b4417] hover:bg-[#f5f3e8]"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#3b4417] hover:bg-[#2a2f18] text-amber-50"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="mr-2"
                    >
                      <Save className="h-4 w-4" />
                    </motion.div>
                    {t("saving")}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEdit ? t("update") : t("create")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
