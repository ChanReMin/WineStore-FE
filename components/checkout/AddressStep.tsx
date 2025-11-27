"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Check } from "lucide-react";
import { useCheckout } from "@/contexts/CheckoutContext";
import { useState } from "react";

export default function AddressStep() {
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
      isDefault: false,
    });
  };

  const handleContinue = () => {
    if (selectedAddress) {
      setCurrentStep("payment");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-[#e8e6dc] pb-4"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-[#3b4417] tracking-wide uppercase">
          Địa chỉ giao hàng
        </h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showAddForm && addresses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {addresses.map((address, index) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => selectAddress(address)}
                className={`relative p-6 border-2 cursor-pointer transition-all ${
                  selectedAddress?.id === address.id
                    ? "border-[#3b4417] bg-[#f5f3e8]"
                    : "border-[#e8e6dc] bg-white hover:border-[#d4d6b4]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                      selectedAddress?.id === address.id
                        ? "border-[#3b4417] bg-[#3b4417]"
                        : "border-[#d4d6b4]"
                    }`}
                  >
                    {selectedAddress?.id === address.id && (
                      <Check size={14} className="text-white" strokeWidth={3} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-[#3b4417]">
                        {address.fullName}
                      </h3>
                      {address.isDefault && (
                        <span className="bg-[#d4af37] text-white text-xs px-2 py-0.5 uppercase tracking-wide">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-1">
                      {address.phoneNumber}
                    </p>
                    <p className="text-sm text-neutral-700">
                      {address.addressLine}
                      {address.ward && `, ${address.ward}`}
                      {address.district && `, ${address.district}`},{" "}
                      {address.city}
                    </p>
                  </div>

                  <MapPin size={20} className="text-[#3b4417] flex-shrink-0" />
                </div>
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddForm(true)}
              className="w-full border-2 border-dashed border-[#d4d6b4] p-4 text-[#3b4417] hover:border-[#3b4417] hover:bg-[#f5f3e8] transition-all flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              <span className="text-sm tracking-wide uppercase">
                Thêm địa chỉ mới
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
            className="bg-white p-6 border border-[#e8e6dc] space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#3b4417] mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3b4417] mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3b4417] mb-2">
                Địa chỉ chi tiết *
              </label>
              <input
                type="text"
                required
                value={formData.addressLine}
                onChange={(e) =>
                  setFormData({ ...formData, addressLine: e.target.value })
                }
                className="w-full px-4 py-3 border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#3b4417] mb-2">
                  Phường/Xã
                </label>
                <input
                  type="text"
                  value={formData.ward}
                  onChange={(e) =>
                    setFormData({ ...formData, ward: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3b4417] mb-2">
                  Quận/Huyện
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3b4417] mb-2">
                  Tỉnh/Thành phố *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
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
                className="w-4 h-4 accent-[#3b4417]"
              />
              <label htmlFor="isDefault" className="text-sm text-neutral-700">
                Đặt làm địa chỉ mặc định
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              {addresses.length > 0 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border-2 border-[#d4d6b4] text-[#3b4417] py-3 text-sm tracking-wide uppercase hover:border-[#3b4417] transition-colors"
                >
                  Hủy
                </motion.button>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoadingAddresses}
                className="flex-1 bg-[#3b4417] text-white py-3 text-sm tracking-wide uppercase hover:bg-[#2a2f18] disabled:opacity-50 transition-colors"
              >
                {isLoadingAddresses ? "Đang lưu..." : "Lưu địa chỉ"}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {!showAddForm && selectedAddress && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentStep("cart")}
            className="flex-1 border-2 border-[#d4d6b4] text-[#3b4417] py-4 text-sm tracking-widest uppercase hover:border-[#3b4417] transition-colors"
          >
            Quay lại
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="flex-1 bg-[#3b4417] text-white py-4 text-sm tracking-widest uppercase hover:bg-[#2a2f18] transition-colors"
          >
            Tiếp tục
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
