"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import type { CustomerProfile, UpdateProfileRequest } from "@/types/profile";
import { profileService } from "@/services/profileService";
import DatePicker from "@/components/ui/date-picker";

interface ProfileFormProps {
  profile: CustomerProfile;
  onUpdate: (profile: CustomerProfile) => void;
}

export default function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const t = useTranslations("profile.form");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UpdateProfileRequest>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    phoneNumber: profile.phoneNumber,
    dateOfBirth: profile.dateOfBirth,
    gender: profile.gender,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updated = await profileService.updateProfile(formData);
      onUpdate(updated);
      setIsEditing(false);
      toast.success(t("updateSuccess"));
    } catch (error) {
      toast.error(t("updateError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#33391d]">{t("title")}</h2>
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded-md border border-[#33391d] px-4 py-2 text-sm text-[#33391d] transition-colors hover:bg-[#33391d] hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            {t("edit")}
          </motion.button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              {t("firstName")}
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20 disabled:bg-neutral-50 disabled:text-neutral-600"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              {t("lastName")}
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20 disabled:bg-neutral-50 disabled:text-neutral-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              {t("phoneNumber")}
            </label>
            <input
              type="tel"
              value={formData.phoneNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              disabled={!isEditing}
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20 disabled:bg-neutral-50 disabled:text-neutral-600"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              {t("dateOfBirth")}
            </label>
            {isEditing ? (
              <div className="date-picker-profile">
                <DatePicker
                  value={formData.dateOfBirth || ""}
                  onChange={(date) =>
                    setFormData({ ...formData, dateOfBirth: date })
                  }
                  placeholder={t("selectDateOfBirth")}
                  maxDate={new Date().toISOString().split("T")[0]}
                />
              </div>
            ) : (
              <input
                type="text"
                value={
                  formData.dateOfBirth
                    ? new Date(formData.dateOfBirth).toLocaleDateString("vi-VN")
                    : ""
                }
                disabled
                className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all disabled:bg-neutral-50 disabled:text-neutral-600"
              />
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              {t("gender")}
            </label>
            <select
              value={formData.gender || ""}
              onChange={(e) =>
                setFormData({ ...formData, gender: Number(e.target.value) })
              }
              disabled={!isEditing}
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20 disabled:bg-neutral-50 disabled:text-neutral-600"
            >
              <option value="">{t("selectGender")}</option>
              <option value="1">{t("genderOptions.male")}</option>
              <option value="2">{t("genderOptions.female")}</option>
              <option value="3">{t("genderOptions.other")}</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-md bg-[#33391d] px-6 py-2.5 text-white transition-colors hover:bg-[#2a2f18] disabled:opacity-50"
            >
              {isLoading ? t("saving") : t("save")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 rounded-md border border-neutral-300 px-6 py-2.5 text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
            >
              {t("cancel")}
            </motion.button>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
