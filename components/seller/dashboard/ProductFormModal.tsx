"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Loader2, Wine, DollarSign, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import ImageUpload from "./ImageUpload";
import type { ProductFormData } from "@/types/productForm";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  initialData?: Partial<ProductFormData>;
  mode: "create" | "edit";
}

// Mock data - Replace with API
const CATEGORIES = [
  { id: 1, name: "Vang Pháp" },
  { id: 2, name: "Vang Ý" },
  { id: 3, name: "Vang Úc" },
  { id: 4, name: "Vang Mỹ" },
  { id: 5, name: "Vang Chile" },
  { id: 6, name: "Vang Argentina" },
  { id: 7, name: "Vang Tây Ban Nha" },
];

const BRANDS = [
  { id: 1, name: "Château Margaux" },
  { id: 2, name: "Bordeaux" },
  { id: 3, name: "Château Lafite" },
  { id: 4, name: "Barolo" },
  { id: 5, name: "Brunello" },
  { id: 6, name: "Penfolds" },
  { id: 7, name: "Opus One" },
];

const WINE_TYPES = ["Vang đỏ", "Vang trắng", "Vang hồng", "Vang sủi"];

export default function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: ProductFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    category_id: initialData?.category_id || 1,
    brand_id: initialData?.brand_id || 1,
    name: initialData?.name || "",
    price: initialData?.price || 0,
    wine_type: initialData?.wine_type || "Vang đỏ",
    country_of_production: initialData?.country_of_production || "",
    grape_variety: initialData?.grape_variety || "",
    concentration: initialData?.concentration || 0,
    production_area: initialData?.production_area || "",
    capacity: initialData?.capacity || 750,
    ideal_temperature: initialData?.ideal_temperature || "",
    humidity: initialData?.humidity || "",
    avoid_light: initialData?.avoid_light || "",
    place_the_bottle_horizontally:
      initialData?.place_the_bottle_horizontally || "",
    avoid_vibration: initialData?.avoid_vibration || "",
    opened_wine: initialData?.opened_wine || "",
    use_wine_cabinet: initialData?.use_wine_cabinet || "",
    images: initialData?.images || [],
    description: initialData?.description || "",
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        category_id: initialData.category_id || 1,
        brand_id: initialData.brand_id || 1,
        name: initialData.name || "",
        price: initialData.price || 0,
        wine_type: initialData.wine_type || "Vang đỏ",
        country_of_production: initialData.country_of_production || "",
        grape_variety: initialData.grape_variety || "",
        concentration: initialData.concentration || 0,
        production_area: initialData.production_area || "",
        capacity: initialData.capacity || 750,
        ideal_temperature: initialData.ideal_temperature || "",
        humidity: initialData.humidity || "",
        avoid_light: initialData.avoid_light || "",
        place_the_bottle_horizontally:
          initialData.place_the_bottle_horizontally || "",
        avoid_vibration: initialData.avoid_vibration || "",
        opened_wine: initialData.opened_wine || "",
        use_wine_cabinet: initialData.use_wine_cabinet || "",
        images: initialData.images || [],
        description: initialData.description || "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "concentration" ||
        name === "capacity" ||
        name === "category_id" ||
        name === "brand_id"
          ? Number(value)
          : value,
    }));
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 w-full h-full"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl z-50"
          >
            <Card className="h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col border-[#d4d6b4] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e8e6dc] bg-[#f5f3e8]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#3b4417] rounded-lg">
                    <Wine className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#3b4417]">
                      {mode === "create"
                        ? "Thêm sản phẩm mới"
                        : "Chỉnh sửa sản phẩm"}
                    </h2>
                    <p className="text-sm text-[#7a8451]">
                      {mode === "create"
                        ? "Sản phẩm sẽ chờ Admin phê duyệt"
                        : "Cập nhật thông tin sản phẩm"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[#e8e6dc] transition-colors"
                  disabled={isSubmitting}
                >
                  <X className="w-6 h-6 text-[#3b4417]" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto p-6"
              >
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Thông tin cơ bản
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Tên sản phẩm <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Château Margaux 2015"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Giá (VNĐ) <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7a8451]" />
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full pl-10 pr-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                            placeholder="5940000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Danh mục <span className="text-red-600">*</span>
                        </label>
                        <select
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Thương hiệu <span className="text-red-600">*</span>
                        </label>
                        <select
                          name="brand_id"
                          value={formData.brand_id}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white"
                        >
                          {BRANDS.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                              {brand.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Loại vang <span className="text-red-600">*</span>
                        </label>
                        <select
                          name="wine_type"
                          value={formData.wine_type}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white"
                        >
                          {WINE_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Quốc gia <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="country_of_production"
                          value={formData.country_of_production}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Pháp"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Wine Details */}
                  <div className="border-t border-[#e8e6dc] pt-6">
                    <h3 className="text-lg font-semibold text-[#3b4417] mb-4 flex items-center gap-2">
                      <Wine className="w-5 h-5" />
                      Chi tiết rượu vang
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Giống nho
                        </label>
                        <input
                          type="text"
                          name="grape_variety"
                          value={formData.grape_variety}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Cabernet Sauvignon"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Nồng độ (%)
                        </label>
                        <input
                          type="number"
                          name="concentration"
                          value={formData.concentration}
                          onChange={handleChange}
                          step="0.1"
                          min="0"
                          max="100"
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="13.5"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Dung tích (ml)
                        </label>
                        <input
                          type="number"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleChange}
                          min="0"
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="750"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Vùng sản xuất
                        </label>
                        <input
                          type="text"
                          name="production_area"
                          value={formData.production_area}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Bordeaux"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Storage Instructions */}
                  <div className="border-t border-[#e8e6dc] pt-6">
                    <h3 className="text-lg font-semibold text-[#3b4417] mb-4">
                      Hướng dẫn bảo quản
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Nhiệt độ lý tưởng
                        </label>
                        <input
                          type="text"
                          name="ideal_temperature"
                          value={formData.ideal_temperature}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="15-18°C"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Độ ẩm
                        </label>
                        <input
                          type="text"
                          name="humidity"
                          value={formData.humidity}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="60-70%"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Tránh ánh sáng
                        </label>
                        <input
                          type="text"
                          name="avoid_light"
                          value={formData.avoid_light}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Tránh ánh sáng trực tiếp"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Đặt chai
                        </label>
                        <input
                          type="text"
                          name="place_the_bottle_horizontally"
                          value={formData.place_the_bottle_horizontally}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Đặt chai nằm ngang"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Tránh rung động
                        </label>
                        <input
                          type="text"
                          name="avoid_vibration"
                          value={formData.avoid_vibration}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Tránh rung động"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Sau khi mở
                        </label>
                        <input
                          type="text"
                          name="opened_wine"
                          value={formData.opened_wine}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Sử dụng trong 3-5 ngày"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Tủ rượu
                        </label>
                        <input
                          type="text"
                          name="use_wine_cabinet"
                          value={formData.use_wine_cabinet}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Nên sử dụng tủ rượu"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images & Description */}
                  <div className="border-t border-[#e8e6dc] pt-6">
                    <h3 className="text-lg font-semibold text-[#3b4417] mb-4">
                      Hình ảnh & Mô tả
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Hình ảnh sản phẩm{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <ImageUpload
                          value={formData.images}
                          onChange={(images) =>
                            setFormData((prev) => ({ ...prev, images }))
                          }
                          maxFiles={5}
                          maxSizeMB={5}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          Mô tả chi tiết
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] resize-none"
                          placeholder="Mô tả chi tiết về sản phẩm..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#3b4417] text-white rounded-lg hover:bg-[#2a2f18] transition-colors font-medium disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {mode === "create" ? "Tạo sản phẩm" : "Cập nhật"}
                    </>
                  )}
                </button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
