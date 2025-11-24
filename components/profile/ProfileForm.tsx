"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import type { CustomerProfile, UpdateProfileRequest } from "@/types/profile";
import { profileService } from "@/services/profileService";
import DatePicker from "@/components/ui/date-picker";

interface ProfileFormProps {
  profile: CustomerProfile;
  onUpdate: (profile: CustomerProfile) => void;
}

export default function ProfileForm({ profile, onUpdate }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<UpdateProfileRequest>({
    first_name: profile.first_name,
    last_name: profile.last_name,
    phone_number: profile.phone_number,
    date_of_birth: profile.date_of_birth,
    gender: profile.gender,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updated = await profileService.updateProfile(formData);
      onUpdate(updated);
      setIsEditing(false);
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone_number: profile.phone_number,
      date_of_birth: profile.date_of_birth,
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
        <h2 className="text-xl font-semibold text-[#33391d]">
          Thông tin cá nhân
        </h2>
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
            Chỉnh sửa
          </motion.button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Họ
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              disabled={!isEditing}
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20 disabled:bg-neutral-50 disabled:text-neutral-600"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Tên
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              disabled={!isEditing}
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20 disabled:bg-neutral-50 disabled:text-neutral-600"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={formData.phone_number || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              disabled={!isEditing}
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20 disabled:bg-neutral-50 disabled:text-neutral-600"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Ngày sinh
            </label>
            {isEditing ? (
              <div className="date-picker-profile">
                <DatePicker
                  value={formData.date_of_birth || ""}
                  onChange={(date) =>
                    setFormData({ ...formData, date_of_birth: date })
                  }
                  placeholder="Chọn ngày sinh"
                  maxDate={new Date().toISOString().split("T")[0]}
                />
              </div>
            ) : (
              <input
                type="text"
                value={
                  formData.date_of_birth
                    ? new Date(formData.date_of_birth).toLocaleDateString("vi-VN")
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
              Giới tính
            </label>
            <select
              value={formData.gender || ""}
              onChange={(e) =>
                setFormData({ ...formData, gender: Number(e.target.value) })
              }
              disabled={!isEditing}
              className="w-full rounded-md border border-neutral-300 px-4 py-2 text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20 disabled:bg-neutral-50 disabled:text-neutral-600"
            >
              <option value="">Chọn giới tính</option>
              <option value="1">Nam</option>
              <option value="2">Nữ</option>
              <option value="3">Khác</option>
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
              {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 rounded-md border border-neutral-300 px-6 py-2.5 text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50"
            >
              Hủy
            </motion.button>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
