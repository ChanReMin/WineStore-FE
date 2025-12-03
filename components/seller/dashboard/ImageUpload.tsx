"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  validateImageFile,
  compressImage,
  formatFileSize,
  getBase64Size,
} from "@/lib/imageUtils";

interface ImageUploadProps {
  value: string[];
  existingImageUrl?: string; // URL of existing image from server
  onChange: (images: string[], files?: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  enableCompression?: boolean;
}

export default function ImageUpload({
  value = [],
  existingImageUrl,
  onChange,
  maxFiles = 5,
  maxSizeMB = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
  enableCompression = true,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileObjects, setFileObjects] = useState<File[]>([]);

  // Determine if we should show existing image or new uploads
  const hasNewImages = value.length > 0;
  const shouldShowExisting = existingImageUrl && !hasNewImages;

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    setError(null);
    setIsProcessing(true);

    // Check max files
    if (value.length + files.length > maxFiles) {
      setError(`Chỉ được tải lên tối đa ${maxFiles} ảnh`);
      setIsProcessing(false);
      return;
    }

    const newImages: string[] = [];
    const newFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file
      const validation = validateImageFile(file, maxSizeMB, acceptedFormats);
      if (!validation.valid) {
        setError(validation.error || "Lỗi không xác định");
        continue;
      }

      // Store original file
      newFiles.push(file);

      // Create preview (base64)
      try {
        let base64: string;

        if (enableCompression) {
          // Compress image before converting
          base64 = await compressImage(file, 1920, 1920, 0.85);

          // Check compressed size
          const compressedSize = getBase64Size(base64);
          const compressedSizeMB = compressedSize / (1024 * 1024);

          // If still too large after compression, show error
          if (compressedSizeMB > maxSizeMB) {
            setError(
              `Ảnh sau khi nén vẫn quá lớn (${compressedSizeMB.toFixed(2)}MB). Vui lòng chọn ảnh nhỏ hơn.`
            );
            continue;
          }
        } else {
          // Just convert without compression
          base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
          });
        }

        newImages.push(base64);
      } catch (err) {
        setError("Lỗi khi xử lý ảnh");
        console.error(err);
      }
    }

    if (newImages.length > 0) {
      const updatedFiles = [...fileObjects, ...newFiles];
      setFileObjects(updatedFiles);
      onChange([...value, ...newImages], updatedFiles);
    }

    setIsProcessing(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    const newFiles = fileObjects.filter((_, i) => i !== index);
    setFileObjects(newFiles);
    onChange(newImages, newFiles);
    setError(null);
  };

  const removeExistingImage = () => {
    // When removing existing image, just clear it from UI
    // The actual removal will be sent when user submits the form
    onChange([], []);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-[#3b4417] bg-[#f5f3e8]"
            : "border-[#d4d6b4] hover:border-[#3b4417] hover:bg-[#fdfbf5]"
        } ${value.length >= maxFiles || isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(",")}
          onChange={handleFileInput}
          disabled={value.length >= maxFiles || isProcessing}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="p-4 bg-[#f5f3e8] rounded-full">
            {isProcessing ? (
              <Loader2 className="w-8 h-8 text-[#3b4417] animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-[#3b4417]" />
            )}
          </div>

          <div>
            <p className="text-lg font-semibold text-[#3b4417] mb-1">
              {isProcessing
                ? "Đang xử lý ảnh..."
                : isDragging
                  ? "Thả ảnh vào đây"
                  : "Kéo thả ảnh hoặc click để chọn"}
            </p>
            <p className="text-sm text-[#7a8451]">
              Tối đa {maxFiles} ảnh, mỗi ảnh không quá {maxSizeMB}MB
            </p>
            <p className="text-xs text-[#7a8451] mt-1">
              Định dạng:{" "}
              {acceptedFormats
                .map((f) => f.split("/")[1].toUpperCase())
                .join(", ")}
            </p>
          </div>

          {value.length > 0 && (
            <p className="text-sm font-medium text-[#3b4417]">
              Đã tải: {value.length}/{maxFiles} ảnh
            </p>
          )}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-red-900 mb-1">Lỗi tải ảnh</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto p-1 hover:bg-red-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Grid */}
      {(existingImageUrl || value.length > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <AnimatePresence>
            {/* Show existing image if no new images uploaded */}
            {existingImageUrl && value.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-lg overflow-hidden border-2 border-[#d4d6b4] hover:border-[#3b4417] transition-all"
              >
                {/* Image */}
                <img
                  src={existingImageUrl}
                  alt="Current product image"
                  className="w-full h-full object-cover"
                />

                {/* Overlay with Delete Button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExistingImage();
                    }}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    title="Xóa ảnh hiện tại"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Current Image Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                  Ảnh hiện tại
                </div>
              </motion.div>
            )}

            {/* Show new uploaded images */}
            {value.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-lg overflow-hidden border-2 border-[#d4d6b4] hover:border-[#3b4417] transition-all"
              >
                {/* Image */}
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Primary Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-[#3b4417] text-white text-xs font-semibold rounded">
                    {existingImageUrl ? "Ảnh mới (chính)" : "Ảnh chính"}
                  </div>
                )}

                {/* Image Number */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Info */}
      {!hasNewImages && !shouldShowExisting && (
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-blue-900 mb-1">
              Lưu ý về ảnh sản phẩm
            </p>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Ảnh đầu tiên sẽ là ảnh chính hiển thị trên danh sách</li>
              <li>Nên sử dụng ảnh có độ phân giải cao, rõ nét</li>
              <li>Ảnh nên có nền trắng hoặc nền đơn giản</li>
              <li>Tránh ảnh bị mờ, tối hoặc có watermark</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
