"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Edit3 } from "lucide-react";
import { useTranslations } from "next-intl";

interface AvatarPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  avatarUrl: string;
  userName: string;
}

export default function AvatarPreviewModal({
  isOpen,
  onClose,
  onEdit,
  avatarUrl,
  userName,
}: AvatarPreviewModalProps) {
  const t = useTranslations("profile.avatar");

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              className="relative max-w-xs sm:max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute -top-10 sm:-top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              {/* Avatar Container */}
              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                {/* Image */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative aspect-square bg-gradient-to-br from-[#f5f3e8] to-[#e8e6dc]"
                >
                  <img
                    src={avatarUrl}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 sm:p-5 bg-gradient-to-r from-[#fdfbf5] to-white"
                >
                  <div className="text-center mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-[#3b4417]">
                      {userName}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7a8451] mt-1">
                      {t("preview.subtitle")}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onEdit}
                    className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-gradient-to-r from-[#3b4417] to-[#4c5b23] text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    <Edit3 className="w-4 h-4" />
                    {t("preview.editButton")}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
