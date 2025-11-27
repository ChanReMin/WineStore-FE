"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Loader2, Wine, DollarSign, Package } from "lucide-react";
import { useTranslations } from "next-intl";
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
  { id: 1, name: "French Wine" },
  { id: 2, name: "Italy Wine" },
  { id: 3, name: "Australian Wine" },
  { id: 4, name: "American Wine" },
  { id: 5, name: "Chile Wine" },
  { id: 6, name: "Argentina Wine" },
  { id: 7, name: "Spanish Wine" },
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

const WINETYPES = ["Red Wine", "White Wine", "Rosé Wine", "Sparkling Wine"];

export default function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: ProductFormModalProps) {
  const t = useTranslations("seller.products.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    categoryId: initialData?.categoryId || 1,
    brandId: initialData?.brandId || 1,
    name: initialData?.name || "",
    price: initialData?.price || 0,
    winetype: initialData?.winetype || "Vang đỏ",
    countryOfProduction: initialData?.countryOfProduction || "",
    grapeVariety: initialData?.grapeVariety || "",
    concentration: initialData?.concentration || 0,
    productionArea: initialData?.productionArea || "",
    capacity: initialData?.capacity || 750,
    idealtemperature: initialData?.idealtemperature || "",
    humidity: initialData?.humidity || "",
    avoidLight: initialData?.avoidLight || "",
    placeTheBottleHorizontally: initialData?.placeTheBottleHorizontally || "",
    avoidVibration: initialData?.avoidVibration || "",
    openedWine: initialData?.openedWine || "",
    use_wine_cabinet: initialData?.use_wine_cabinet || "",
    images: initialData?.images || [],
    description: initialData?.description || "",
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        categoryId: initialData.categoryId || 1,
        brandId: initialData.brandId || 1,
        name: initialData.name || "",
        price: initialData.price || 0,
        winetype: initialData.winetype || "Vang đỏ",
        countryOfProduction: initialData.countryOfProduction || "",
        grapeVariety: initialData.grapeVariety || "",
        concentration: initialData.concentration || 0,
        productionArea: initialData.productionArea || "",
        capacity: initialData.capacity || 750,
        idealtemperature: initialData.idealtemperature || "",
        humidity: initialData.humidity || "",
        avoidLight: initialData.avoidLight || "",
        placeTheBottleHorizontally:
          initialData.placeTheBottleHorizontally || "",
        avoidVibration: initialData.avoidVibration || "",
        openedWine: initialData.openedWine || "",
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
        name === "categoryId" ||
        name === "brandId"
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
                        ? t("addNewProduct")
                        : t("editProduct")}
                    </h2>
                    <p className="text-sm text-[#7a8451]">
                      {mode === "create" ? t("awaitApproval") : t("updateInfo")}
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
                      {t("basicInfo")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("productName")}{" "}
                          <span className="text-red-600">{t("required")}</span>
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
                          {t("priceVND")}{" "}
                          <span className="text-red-600">{t("required")}</span>
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
                          {t("category")}{" "}
                          <span className="text-red-600">{t("required")}</span>
                        </label>
                        <select
                          name="categoryId"
                          value={formData.categoryId}
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
                          {t("brand")}{" "}
                          <span className="text-red-600">{t("required")}</span>
                        </label>
                        <select
                          name="brandId"
                          value={formData.brandId}
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
                          {t("wineType")}{" "}
                          <span className="text-red-600">{t("required")}</span>
                        </label>
                        <select
                          name="winetype"
                          value={formData.winetype}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] bg-white"
                        >
                          {WINETYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("country")}{" "}
                          <span className="text-red-600">{t("required")}</span>
                        </label>
                        <input
                          type="text"
                          name="countryOfProduction"
                          value={formData.countryOfProduction}
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
                      {t("wineDetails")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("grapeVariety")}
                        </label>
                        <input
                          type="text"
                          name="grapeVariety"
                          value={formData.grapeVariety}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Cabernet Sauvignon"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("concentration")}
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
                          {t("capacity")}
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
                          {t("productionArea")}
                        </label>
                        <input
                          type="text"
                          name="productionArea"
                          value={formData.productionArea}
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
                      {t("storageInstructions")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("idealTemperature")}
                        </label>
                        <input
                          type="text"
                          name="idealtemperature"
                          value={formData.idealtemperature}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="15-18°C"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("humidity")}
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
                          {t("avoidLight")}
                        </label>
                        <input
                          type="text"
                          name="avoidLight"
                          value={formData.avoidLight}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Tránh ánh sáng trực tiếp"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("placeBottleHorizontally")}
                        </label>
                        <input
                          type="text"
                          name="placeTheBottleHorizontally"
                          value={formData.placeTheBottleHorizontally}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Đặt chai nằm ngang"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("avoidVibration")}
                        </label>
                        <input
                          type="text"
                          name="avoidVibration"
                          value={formData.avoidVibration}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Tránh rung động"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("afterOpening")}
                        </label>
                        <input
                          type="text"
                          name="openedWine"
                          value={formData.openedWine}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417]"
                          placeholder="Sử dụng trong 3-5 ngày"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("wineCabinet")}
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
                      {t("imagesDescription")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#3b4417] mb-2">
                          {t("productImages")}{" "}
                          <span className="text-red-600">{t("required")}</span>
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
                          {t("detailedDescription")}
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
                  {t("cancel")}
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
                      {t("saving")}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {mode === "create"
                        ? t("createProduct")
                        : t("updateProduct")}
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
