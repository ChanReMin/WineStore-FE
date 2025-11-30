"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon, Check, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

interface AvatarEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File, previewUrl: string) => Promise<void>;
  currentAvatar: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function AvatarEditModal({
  isOpen,
  onClose,
  onSave,
  currentAvatar,
}: AvatarEditModalProps) {
  const t = useTranslations("profile.avatar");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      console.log("AvatarEditModal opened");
      setPreviewUrl(null);
      setSelectedFile(null);
      setError(null);
      setIsDragging(false);
    }
  }, [isOpen]);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return t("edit.errors.invalidType");
    }
    if (file.size > MAX_FILE_SIZE) {
      return t("edit.errors.tooLarge");
    }
    return null;
  };

  const handleFileSelect = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        toast.error(validationError);
        return;
      }

      setError(null);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile || !previewUrl) return;

    try {
      setIsLoading(true);
      await onSave(selectedFile, previewUrl);
      toast.success(t("edit.success"));
      handleClose();
    } catch (error: any) {
      toast.error(error.message || t("edit.errors.uploadFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setError(null);
    setIsDragging(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
      />

      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative px-4 sm:px-6 py-4 border-b border-[#e8e6dc]/50 bg-gradient-to-r from-[#fdfbf5] via-[#f5f3e8] to-[#fdfbf5]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#3b4417]">
                  {t("edit.title")}
                </h2>
                <p className="text-xs sm:text-sm text-[#7a8451] mt-1">
                  {t("edit.subtitle")}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-[#3b4417]/10 transition-colors"
              >
                <X className="w-5 h-5 text-[#3b4417]" />
              </motion.button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#7a8451] mb-2">
                {t("edit.currentAvatar")}
              </p>
              <div className="flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-[#e8e6dc] shadow-md">
                  <img
                    src={currentAvatar}
                    alt="Current avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-medium text-[#7a8451] mb-2">
                {t("edit.newAvatar")}
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_TYPES.join(",")}
                onChange={handleFileInputChange}
                className="hidden"
              />

              <motion.div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                whileHover={{ scale: 1.01 }}
                className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 transition-all ${
                  isDragging
                    ? "border-[#3b4417] bg-[#f5f3e8]"
                    : error
                    ? "border-red-300 bg-red-50"
                    : previewUrl
                    ? "border-[#3b4417] bg-[#f5f3e8]"
                    : "border-[#d4d6b4] bg-[#fdfbf5] hover:border-[#3b4417] hover:bg-[#f5f3e8]"
                }`}
              >
                {previewUrl ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 text-xs sm:text-sm bg-white text-[#3b4417] rounded-lg font-medium hover:bg-[#f5f3e8] transition-colors"
                        >
                          {t("edit.changeImage")}
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs sm:text-sm font-medium text-[#3b4417] truncate max-w-full">
                        {selectedFile?.name}
                      </p>
                      <p className="text-xs text-[#7a8451] mt-1">
                        {(selectedFile!.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="p-3 bg-[#3b4417]/10 rounded-full mb-3"
                    >
                      {error ? (
                        <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                      ) : (
                        <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#3b4417]" />
                      )}
                    </motion.div>

                    <h3 className="text-sm sm:text-base font-semibold text-[#3b4417] mb-1">
                      {error
                        ? t("edit.errors.title")
                        : t("edit.dropzone.title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7a8451] mb-3">
                      {error || t("edit.dropzone.subtitle")}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-sm bg-[#3b4417] text-white rounded-xl hover:bg-[#2a2f18] transition-colors font-medium"
                    >
                      <Upload className="w-4 h-4" />
                      {t("edit.dropzone.button")}
                    </motion.button>

                    <p className="text-xs text-[#7a8451] mt-3">
                      {t("edit.dropzone.formats")}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-blue-900">
                  <p className="font-medium mb-1">{t("edit.info.title")}</p>
                  <ul className="list-disc list-inside space-y-0.5 text-blue-700">
                    <li>{t("edit.info.formats")}</li>
                    <li>{t("edit.info.maxSize")}</li>
                    <li className="hidden sm:list-item">{t("edit.info.recommended")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-[#e8e6dc]/50 bg-gradient-to-r from-[#fdfbf5] via-white to-[#fdfbf5]">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClose}
              disabled={isLoading}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm border-2 border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-all font-medium disabled:opacity-50"
            >
              {t("edit.cancel")}
            </motion.button>
            <motion.button
              whileHover={{
                scale: previewUrl && !isLoading ? 1.02 : 1,
                y: previewUrl && !isLoading ? -2 : 0,
              }}
              whileTap={{
                scale: previewUrl && !isLoading ? 0.98 : 1,
              }}
              onClick={handleSave}
              disabled={!previewUrl || isLoading}
              className="flex items-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 text-sm bg-gradient-to-r from-[#3b4417] to-[#4c5b23] text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span className="hidden sm:inline">{t("edit.saving")}</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t("edit.save")}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}