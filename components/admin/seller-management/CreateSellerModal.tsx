"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, UserPlus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSeller } from "@/lib/adminSellerManagement";

interface CreateSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateSellerModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateSellerModalProps) {
  const t = useTranslations("admin.sellerManagement");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "",
    gender: "1",
    role: "1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm_password) {
      setError(t("createModal.passwordMismatch"));
      return;
    }

    try {
      setLoading(true);
      await createSeller({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        date_of_birth: formData.date_of_birth,
        gender: parseInt(formData.gender),
        role: parseInt(formData.role),
      });

      onSuccess();
      onClose();
      setFormData({
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        date_of_birth: "",
        gender: "1",
        role: "1",
      });
    } catch (error: any) {
      setError(error.message || t("createModal.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-[#fdfbf5]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#3b4417] rounded-lg">
                  <UserPlus className="w-5 h-5 text-amber-50" />
                </div>
                <h2 className="text-2xl font-bold text-[#3b4417]">
                  {t("createModal.title")}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
            >
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                {/* Email & Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">{t("createModal.email")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="seller@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">{t("createModal.role")} *</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">{t("role.seller")}</SelectItem>
                        <SelectItem value="2">{t("role.admin")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">
                      {t("createModal.password")} *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm_password">
                      {t("createModal.confirmPassword")} *
                    </Label>
                    <Input
                      id="confirm_password"
                      type="password"
                      required
                      value={formData.confirm_password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirm_password: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">
                      {t("createModal.firstName")} *
                    </Label>
                    <Input
                      id="first_name"
                      required
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
                      }
                      placeholder={t("createModal.firstNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">
                      {t("createModal.lastName")} *
                    </Label>
                    <Input
                      id="last_name"
                      required
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData({ ...formData, last_name: e.target.value })
                      }
                      placeholder={t("createModal.lastNamePlaceholder")}
                    />
                  </div>
                </div>

                {/* Phone & DOB */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone_number">
                      {t("createModal.phone")}
                    </Label>
                    <Input
                      id="phone_number"
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
                      placeholder="0901234567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date_of_birth">
                      {t("createModal.dob")}
                    </Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date_of_birth: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <Label htmlFor="gender">{t("createModal.gender")}</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{t("gender.male")}</SelectItem>
                      <SelectItem value="2">{t("gender.female")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 bg-neutral-50">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-50"
              >
                {t("createModal.cancel")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-[#3b4417] text-amber-50 rounded-lg hover:bg-[#4c5b23] transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("createModal.creating")}
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    {t("createModal.create")}
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
