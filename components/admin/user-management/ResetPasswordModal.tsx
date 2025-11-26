"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Key, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { resetUserPassword, type User } from "@/lib/adminUserManagement";
import { toast } from "react-toastify";

interface ResetPasswordModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ResetPasswordModal({
  user,
  isOpen,
  onClose,
  onSuccess,
}: ResetPasswordModalProps) {
  const t = useTranslations("admin.userManagement");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(t("resetPasswordModal.passwordMismatch"));
      return;
    }

    if (newPassword.length < 8) {
      toast.error(t("resetPasswordModal.passwordTooShort"));
      return;
    }

    try {
      setLoading(true);
      await resetUserPassword(user.id, newPassword, sendEmail);

      toast.success(t("resetPasswordModal.success"));
      onSuccess();
      onClose();
      setNewPassword("");
      setConfirmPassword("");
      setSendEmail(true);
    } catch (error: any) {
      toast.error(error.message || t("resetPasswordModal.error"));
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
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md"
          >
            <div className="bg-linear-to-r from-amber-600 to-orange-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {t("resetPasswordModal.title")}
                  </h2>
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

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">
                    {t("resetPasswordModal.warning")}
                  </p>
                  <p>{t("resetPasswordModal.warningDesc")}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">
                  {t("resetPasswordModal.newPassword")} *
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-neutral-500">
                  {t("resetPasswordModal.passwordHint")}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {t("resetPasswordModal.confirmPassword")} *
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendEmail"
                  checked={sendEmail}
                  onCheckedChange={(checked: boolean) => setSendEmail(checked)}
                />
                <label
                  htmlFor="sendEmail"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("resetPasswordModal.sendEmail")}
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  {t("resetPasswordModal.cancel")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("resetPasswordModal.resetting")}
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      {t("resetPasswordModal.reset")}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
