"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import type { Address, CreateAddressRequest } from "@/types/profile";
import { profileService } from "@/services/profileService";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editAddress?: Address | null;
}

export default function AddressModal({
  isOpen,
  onClose,
  onSuccess,
  editAddress,
}: AddressModalProps) {
  const t = useTranslations("profile.addresses.modal");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAddressRequest>({
    full_name: "",
    phone_number: "",
    address_line: "",
    city: "",
    state: "",
    country: "Việt Nam",
    is_default: false,
  });

  useEffect(() => {
    if (editAddress) {
      setFormData({
        full_name: editAddress.full_name,
        phone_number: editAddress.phone_number,
        address_line: editAddress.address_line,
        city: editAddress.city,
        state: editAddress.state,
        country: editAddress.country,
        is_default: editAddress.is_default,
      });
    } else {
      setFormData({
        full_name: "",
        phone_number: "",
        address_line: "",
        city: "",
        state: "",
        country: "Việt Nam",
        is_default: false,
      });
    }
  }, [editAddress, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editAddress) {
        await profileService.updateAddress(editAddress.id, formData);
        toast.success(t("updateSuccess"));
      } else {
        await profileService.addAddress(formData);
        toast.success(t("addSuccess"));
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
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
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="modal-content max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-neutral-200 bg-white p-6 shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#33391d]">
                  {editAddress ? t("titleEdit") : t("titleAdd")}
                </h2>
                <button
                  onClick={onClose}
                  className="text-neutral-400 transition-colors hover:text-neutral-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      {t("fullName")}{" "}
                      <span className="text-red-500">{t("required")}</span>
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      required
                      className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      {t("phoneNumber")}{" "}
                      <span className="text-red-500">{t("required")}</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
                      required
                      className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                    />
                  </div>
                </div>

                {/* Address Line */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    {t("addressLine")}{" "}
                    <span className="text-red-500">{t("required")}</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address_line}
                    onChange={(e) =>
                      setFormData({ ...formData, address_line: e.target.value })
                    }
                    required
                    placeholder={t("addressPlaceholder")}
                    className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {/* City */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      {t("city")}{" "}
                      <span className="text-red-500">{t("required")}</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                      className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      {t("state")}{" "}
                      <span className="text-red-500">{t("required")}</span>
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      required
                      className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      {t("country")}{" "}
                      <span className="text-red-500">{t("required")}</span>
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      required
                      className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                    />
                  </div>
                </div>

                {/* Default Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_default"
                    checked={formData.is_default}
                    onChange={(e) =>
                      setFormData({ ...formData, is_default: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-neutral-300 text-[#33391d] focus:ring-2 focus:ring-[#33391d]/20"
                  />
                  <label
                    htmlFor="is_default"
                    className="text-sm text-neutral-700"
                  >
                    {t("isDefault")}
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 rounded-md bg-[#33391d] px-6 py-2.5 text-white transition-colors hover:bg-[#2a2f18] disabled:opacity-50"
                  >
                    {isLoading
                      ? t("processing")
                      : editAddress
                        ? t("update")
                        : t("submit")}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 rounded-md border border-neutral-300 px-6 py-2.5 text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
                  >
                    {t("cancel")}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
