"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { CustomerProfile } from "@/types/profile";

interface ProfileHeaderProps {
  profile: CustomerProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const t = useTranslations("profile.header");
  
  const getGenderText = (gender?: number) => {
    switch (gender) {
      case 1:
        return t("gender.male");
      case 2:
        return t("gender.female");
      case 3:
        return t("gender.other");
      default:
        return t("gender.notUpdated");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg border border-neutral-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm"
    >
      {/* Decorative background */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#33391d]/5 to-transparent" />

      <div className="relative flex items-start gap-6">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative"
        >
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <img
              src={profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
              alt={profile.username}
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white bg-green-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          />
        </motion.div>

        {/* Info */}
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-semibold text-[#33391d]"
          >
            {profile.first_name} {profile.last_name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-1 text-sm text-neutral-600"
          >
            @{profile.username}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-700"
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>{profile.email}</span>
            </div>
            {profile.phone_number && (
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-neutral-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{profile.phone_number}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-neutral-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{getGenderText(profile.gender)}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
