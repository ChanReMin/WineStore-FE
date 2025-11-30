"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Camera } from "lucide-react";
import type { CustomerProfile } from "@/types/profile";
import AvatarPreviewModal from "./AvatarPreviewModal";
import AvatarEditModal from "./AvatarEditModal";

interface ProfileHeaderProps {
  profile: CustomerProfile;
  onAvatarUpdate?: (newAvatarUrl: string) => void;
}

export default function ProfileHeader({ profile, onAvatarUpdate }: ProfileHeaderProps) {
  const t = useTranslations("profile.header");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(
    profile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`
  );

  // Debug: Log state changes
  console.log("ProfileHeader render - isEditOpen:", isEditOpen, "isPreviewOpen:", isPreviewOpen);

  // Test function to directly open edit modal
  const testOpenEditModal = () => {
    console.log("TEST: Opening edit modal directly");
    setIsEditOpen(true);
  };

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

  const handleAvatarSave = async (_file: File, previewUrl: string) => {
    // Mock API call - replace with actual API when available
    // TODO: Replace with actual API call: await profileService.updateAvatar(file);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCurrentAvatar(previewUrl);
        onAvatarUpdate?.(previewUrl);
        resolve();
      }, 1500);
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-lg border border-neutral-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-sm"
      >
        {/* Decorative background */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#33391d]/5 to-transparent" />
        
        {/* DEBUG: Test button */}
        <button
          onClick={testOpenEditModal}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded text-xs z-10"
        >
          Open
        </button>

      <div className="relative flex items-start gap-6">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative group"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPreviewOpen(true)}
            className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg cursor-pointer"
          >
            <img
              src={currentAvatar}
              alt={profile.username}
              className="h-full w-full object-cover transition-transform group-hover:scale-110"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </motion.button>
          
          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Direct edit button clicked");
              setIsEditOpen(true);
            }}
            className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full border-2 border-white bg-[#3b4417] flex items-center justify-center shadow-lg hover:bg-[#2a2f18] transition-colors"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Camera className="w-4 h-4 text-white" />
          </motion.button>
        </motion.div>

        {/* Info */}
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-semibold text-[#33391d]"
          >
            {profile.firstName} {profile.lastName}
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
            {profile.phoneNumber && (
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
                <span>{profile.phoneNumber}</span>
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
      
      {/* Modals - Render outside motion.div to avoid z-index issues */}
      {/* Always render both modals */}
      <AvatarPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          console.log("Closing preview modal");
          setIsPreviewOpen(false);
        }}
        onEdit={() => {
          console.log("Edit button clicked - closing preview and opening edit");
          setIsPreviewOpen(false);
          setIsEditOpen(true);
        }}
        avatarUrl={currentAvatar}
        userName={`${profile.firstName} ${profile.lastName}`}
      />

      <AvatarEditModal
        isOpen={isEditOpen}
        onClose={() => {
          console.log("Closing edit modal");
          setIsEditOpen(false);
        }}
        onSave={handleAvatarSave}
        currentAvatar={currentAvatar}
      />
    </>
  );
}
