"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { warehouseService } from "@/services/warehouseService";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

interface CreateWarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateWarehouseModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateWarehouseModalProps) {
  const t = useTranslations("seller.warehouses.create");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    city: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = t("nameRequired");
    }
    if (!formData.location.trim()) {
      newErrors.location = t("locationRequired");
    }
    if (!formData.city.trim()) {
      newErrors.city = t("cityRequired");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await warehouseService.createWarehouse(formData);
      toast.success(result.message || t("success"));
      setFormData({ name: "", location: "", city: "", description: "" });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating warehouse:", error);
      toast.error(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: "", location: "", city: "", description: "" });
      setErrors({});
      onClose();
    }
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-xl font-bold text-[#3b4417]">
                  {t("title")}
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="text-neutral-500 hover:text-neutral-700 transition-colors disabled:opacity-50"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#3b4417]">
                    {t("name")}{" "}
                    <span className="text-red-500">{t("required")}</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t("namePlaceholder")}
                    className={`border-[#d4d6b4] focus:border-[#3b4417] ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-[#3b4417]">
                    {t("location")}{" "}
                    <span className="text-red-500">{t("required")}</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder={t("locationPlaceholder")}
                    className={`border-[#d4d6b4] focus:border-[#3b4417] ${
                      errors.location ? "border-red-500" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-[#3b4417]">
                    {t("city")}{" "}
                    <span className="text-red-500">{t("required")}</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder={t("cityPlaceholder")}
                    className={`border-[#d4d6b4] focus:border-[#3b4417] ${
                      errors.city ? "border-red-500" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#3b4417]">
                    {t("description")}
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder={t("descriptionPlaceholder")}
                    rows={4}
                    className="border-[#d4d6b4] focus:border-[#3b4417] resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>{t("note")}</strong> {t("noteMessage")}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="border-[#d4d6b4] text-[#3b4417] hover:bg-[#f5f3e8]"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#3b4417] hover:bg-[#2d3312] text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("submitting")}
                      </>
                    ) : (
                      t("submit")
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
