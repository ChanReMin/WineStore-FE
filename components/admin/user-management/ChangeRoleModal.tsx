"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  X,
  UserCog,
  AlertCircle,
  Loader2,
  ShoppingBag,
  Store,
  Shield,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeUserRole, type User } from "@/services/userManagementService";
import { toast } from "react-toastify";

interface ChangeRoleModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChangeRoleModal({
  user,
  isOpen,
  onClose,
  onSuccess,
}: ChangeRoleModalProps) {
  const t = useTranslations("admin.userManagement");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(user.role);
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await changeUserRole(user.id, role, note);

      toast.success(t("roleModal.success"));
      onSuccess();
      onClose();
      setNote("");
    } catch (error: any) {
      toast.error(error.message || t("roleModal.error"));
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (roleValue: string) => {
    if (roleValue === "customer") return ShoppingBag;
    if (roleValue === "seller") return Store;
    return Shield;
  };

  const RoleIcon = getRoleIcon(role);

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
            <div className="bg-linear-to-r from-purple-600 to-purple-700 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <UserCog className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{t("roleModal.title")}</h2>
                  <p className="text-sm text-white/80">
                    {user.name.split(" ")[0]}{" "}
                    {user.name.split(" ").slice(1).join(" ")}
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
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div className="text-sm text-purple-800">
                  <p className="font-medium mb-1">{t("roleModal.warning")}</p>
                  <p>{t("roleModal.warningDesc")}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">{t("roleModal.newRole")} *</Label>
                <Select value={role} onValueChange={(value) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        {t("role.customer")}
                      </div>
                    </SelectItem>
                    <SelectItem value="seller">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4" />
                        {t("role.seller")}
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">{t("roleModal.note")}</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t("roleModal.notePlaceholder")}
                  rows={4}
                />
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
                  {t("roleModal.cancel")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("roleModal.updating")}
                    </>
                  ) : (
                    <>
                      <RoleIcon className="w-4 h-4" />
                      {t("roleModal.update")}
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
