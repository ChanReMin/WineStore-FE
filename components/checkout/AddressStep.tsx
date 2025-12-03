"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCheckout } from "@/contexts/CheckoutContext";
import { useState } from "react";

export default function AddressStep() {
  const t = useTranslations("checkout.address");
  const {
    addresses,
    selectedAddress,
    selectAddress,
    addNewAddress,
    setCurrentStep,
    isLoadingAddresses,
  } = useCheckout();
  const [showAddForm, setShowAddForm] = useState(addresses.length === 0);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine: "",
    ward: "",
    district: "",
    city: "",
    country: "Việt Nam", // Default country
    addressType: "HOME", // Default type (uppercase to match API)
    isDefault: false,
  });

  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    await addNewAddress(formData);
    setShowAddForm(false);
    setFormData({
      fullName: "",
      phoneNumber: "",
      addressLine: "",
      ward: "",
      district: "",
      city: "",
      country: "Việt Nam",
      addressType: "HOME",
      isDefault: false,
    });
  };

  const handleContinue = () => {
    if (selectedAddress) {
      setCurrentStep("payment");
    }
  };

  return (
    <div className="space-y-3 md:space-y-4 lg:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-[#e8e6dc] pb-2 md:pb-3 lg:pb-4"
      >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#3b4417] tracking-wide uppercase">
          {t("title")}
        </h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showAddForm && addresses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2 md:space-y-3 lg:space-y-4"
          >
            {addresses.map((address, index) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => selectAddress(address)}
                className={`relative p-3 md:p-4 lg:p-6 border-2 cursor-pointer transition-all ${
                  selectedAddress?.id === address.id
                    ? "border-[#3b4417] bg-[#f5f3e8]"
                    : "border-[#e8e6dc] bg-white hover:border-[#d4d6b4]"
                }`}
              >
                <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                  <div
                    className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-1 ${
                      selectedAddress?.id === address.id
                        ? "border-[#3b4417] bg-[#3b4417]"
                        : "border-[#d4d6b4]"
                    }`}
                  >
                    {selectedAddress?.id === address.id && (
                      <Check size={12} className="md:w-[14px] md:h-[14px] text-white" strokeWidth={3} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                      <h3 className="text-sm md:text-base font-semibold text-[#3b4417]">
                        {address.fullName}
                      </h3>
                      {address.isDefault && (
                        <span className="bg-[#d4af37] text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 uppercase tracking-wide">
                          {t("default")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-neutral-600 mb-0.5 md:mb-1">
                      {address.phoneNumber}
                    </p>
                    <p className="text-xs md:text-sm text-neutral-700">
                      {address.addressLine}
                      {address.ward && `, ${address.ward}`}
                      {address.district && `, ${address.district}`},{" "}
                      {address.city}
                    </p>
                  </div>

                  <MapPin size={16} className="md:w-5 md:h-5 text-[#3b4417] flex-shrink-0" />
                </div>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddForm(true)}
              className="w-full border-2 border-dashed border-[#d4d6b4] p-2 md:p-3 lg:p-4 text-[#3b4417] hover:border-[#3b4417] hover:bg-[#f5f3e8] transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} className="md:w-5 md:h-5" />
              <span className="text-xs md:text-sm tracking-wide uppercase">
                {t("addNew")}
              </span>
            </motion.button>
          </motion.div>
        )}

        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmitAddress}
            className="bg-white p-3 md:p-4 lg:p-6 border border-[#e8e6dc] space-y-3 md:space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-[#3b4417] mb-1 md:mb-2">
                  {t("form.fullName")} {t("form.required")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-[#3b4417] mb-1 md:mb-2">
                  {t("form.phoneNumber")} {t("form.required")}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-[#3b4417] mb-1 md:mb-2">
                {t("form.addressLine")} {t("form.required")}
              </label>
              <input
                type="text"
                required
                value={formData.addressLine}
                onChange={(e) =>
                  setFormData({ ...formData, addressLine: e.target.value })
                }
                className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-[#3b4417] mb-1 md:mb-2">
                  {t("form.ward")}
                </label>
                <input
                  type="text"
                  value={formData.ward}
                  onChange={(e) =>
                    setFormData({ ...formData, ward: e.target.value })
                  }
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-[#3b4417] mb-1 md:mb-2">
                  {t("form.district")}
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-[#3b4417] mb-1 md:mb-2">
                  {t("form.city")} {t("form.required")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-[#3b4417] mb-1 md:mb-2">
                  {t("form.addressType")}
                </label>
                <select
                  value={formData.addressType}
                  onChange={(e) =>
                    setFormData({ ...formData, addressType: e.target.value })
                  }
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors bg-white"
                >
                  <option value="HOME">🏠 {t("form.addressTypes.home")}</option>
                  <option value="OFFICE">
                    🏢 {t("form.addressTypes.office")}
                  </option>
                  <option value="OTHER">
                    📍 {t("form.addressTypes.other")}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-[#3b4417] mb-1 md:mb-2">
                  {t("form.country")}
                </label>
                <input
                  type="text"
                  value={formData.country}
                  readOnly
                  className="w-full px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-[#d4d6b4] bg-neutral-50 text-neutral-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="w-3.5 h-3.5 md:w-4 md:h-4 accent-[#3b4417]"
              />
              <label htmlFor="isDefault" className="text-xs md:text-sm text-neutral-700">
                {t("form.isDefault")}
              </label>
            </div>

            <div className="flex gap-2 md:gap-3 lg:gap-4 pt-2 md:pt-3 lg:pt-4">
              {addresses.length > 0 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border-2 border-[#d4d6b4] text-[#3b4417] py-2 md:py-2.5 lg:py-3 text-xs md:text-sm tracking-wide uppercase hover:border-[#3b4417] transition-colors"
                >
                  {t("form.cancel")}
                </motion.button>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoadingAddresses}
                className="flex-1 bg-[#3b4417] text-white py-2 md:py-2.5 lg:py-3 text-xs md:text-sm tracking-wide uppercase hover:bg-[#2a2f18] disabled:opacity-50 transition-colors"
              >
                {isLoadingAddresses ? t("form.saving") : t("form.save")}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {!showAddForm && selectedAddress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 md:gap-3 lg:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentStep("cart")}
            className="flex-1 border-2 border-[#d4d6b4] text-[#3b4417] py-2.5 md:py-3 lg:py-4 text-xs md:text-sm tracking-widest uppercase hover:border-[#3b4417] transition-colors"
          >
            {t("back")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="flex-1 bg-[#3b4417] text-white py-2.5 md:py-3 lg:py-4 text-xs md:text-sm tracking-widest uppercase hover:bg-[#2a2f18] transition-colors"
          >
            {t("continue")}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
