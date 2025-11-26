"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Edit, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser, type User } from "@/lib/adminUserManagement";
import { toast } from "react-toastify";

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserModal({
  user,
  isOpen,
  onClose,
  onSuccess,
}: EditUserModalProps) {
  const t = useTranslations("admin.userManagement");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user.account.email,
    first_name: user.user_info.first_name,
    last_name: user.user_info.last_name,
    phone_number: user.user_info.phone_number || "",
    date_of_birth: user.user_info.date_of_birth || "",
    gender: user.user_info.gender || 1,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: user.account.email,
        first_name: user.user_info.first_name,
        last_name: user.user_info.last_name,
        phone_number: user.user_info.phone_number || "",
        date_of_birth: user.user_info.date_of_birth || "",
        gender: user.user_info.gender || 1,
      });
    }
  }, [isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateUser(user.id, {
        email: formData.email,
        user_info: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: formData.phone_number,
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
        },
      });

      toast.success(t("editModal.success"));
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message || t("editModal.error"));
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
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <div className="sticky top-0 bg-linear-to-r from-[#3b4417] to-[#4c5b23] text-white px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{t("editModal.title")}</h2>
                  <p className="text-sm text-white/80">
                    {user.user_info.first_name} {user.user_info.last_name}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto max-h-[calc(90vh-140px)] p-6"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">
                      {t("editModal.firstName")} *
                    </Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name">
                      {t("editModal.lastName")} *
                    </Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData({ ...formData, last_name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("editModal.email")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone_number">{t("editModal.phone")}</Label>
                    <Input
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">
                      {t("editModal.dateOfBirth")}
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

                <div className="space-y-2">
                  <Label htmlFor="gender">{t("editModal.gender")}</Label>
                  <Select
                    value={formData.gender.toString()}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: parseInt(value) })
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

            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex items-center justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
              >
                {t("editModal.cancel")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-[#3b4417] text-white rounded-lg hover:bg-[#4c5b23] transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("editModal.saving")}
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" />
                    {t("editModal.save")}
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
