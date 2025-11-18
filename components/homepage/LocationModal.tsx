"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LocationModalProps {
  isOpen: boolean;
  onComplete: (data: { city: string; district: string; store: string }) => void;
  onClose?: () => void;
  defaultValues?: {
    city: string;
    district: string;
    store: string;
  } | null;
}

// Mock data - Replace with real API data
const CITIES = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Nha Trang",
  "Huế",
  "Vũng Tàu",
];

const DISTRICTS: Record<string, string[]> = {
  "Hà Nội": [
    "Ba Đình",
    "Hoàn Kiếm",
    "Tây Hồ",
    "Long Biên",
    "Cầu Giấy",
    "Đống Đa",
    "Hai Bà Trưng",
    "Hoàng Mai",
    "Thanh Xuân",
  ],
  "Hồ Chí Minh": [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Bình Thạnh",
    "Tân Bình",
    "Phú Nhuận",
  ],
  "Đà Nẵng": [
    "Hải Châu",
    "Thanh Khê",
    "Sơn Trà",
    "Ngũ Hành Sơn",
    "Liên Chiểu",
    "Cẩm Lệ",
  ],
  "Hải Phòng": [
    "Hồng Bàng",
    "Ngô Quyền",
    "Lê Chân",
    "Hải An",
    "Kiến An",
    "Đồ Sơn",
  ],
  "Cần Thơ": [
    "Ninh Kiều",
    "Ô Môn",
    "Bình Thuỷ",
    "Cái Răng",
    "Thốt Nốt",
  ],
  "Nha Trang": ["Nha Trang", "Vĩnh Nguyên", "Vĩnh Hòa", "Phước Long"],
  "Huế": ["Phú Nhuận", "Phú Hội", "Phú Hậu", "Thuận Thành"],
  "Vũng Tàu": ["Vũng Tàu", "Bà Rịa", "Long Điền", "Đất Đỏ"],
};

const STORES: Record<string, string[]> = {
  "Ba Đình": ["Wine Store Ba Đình 1", "Wine Store Ba Đình 2", "Wine Store Ngọc Hà"],
  "Hoàn Kiếm": ["Wine Store Hàng Bạc", "Wine Store Tràng Tiền", "Wine Store Lý Thái Tổ"],
  "Tây Hồ": ["Wine Store Quảng An", "Wine Store Nhật Chiêu", "Wine Store Xuân La"],
  "Long Biên": ["Wine Store Gia Thụy", "Wine Store Phúc Đồng", "Wine Store Sài Đồng"],
  "Cầu Giấy": ["Wine Store Trần Thái Tông", "Wine Store Dịch Vọng", "Wine Store Nghĩa Đô"],
  "Đống Đa": ["Wine Store Láng Hạ", "Wine Store Thái Hà", "Wine Store Khâm Thiên"],
  "Hai Bà Trưng": ["Wine Store Bạch Mai", "Wine Store Minh Khai", "Wine Store Thanh Nhàn"],
  "Hoàng Mai": ["Wine Store Giáp Bát", "Wine Store Định Công", "Wine Store Yên Sở"],
  "Thanh Xuân": ["Wine Store Khương Đình", "Wine Store Nhân Chính", "Wine Store Hạ Đình"],
  "Quận 1": ["Wine Store Nguyễn Huệ", "Wine Store Đồng Khởi", "Wine Store Lê Lợi"],
  "Quận 2": ["Wine Store Thảo Điền", "Wine Store An Phú", "Wine Store Bình An"],
  "Quận 3": ["Wine Store Võ Văn Tần", "Wine Store Nam Kỳ Khởi Nghĩa", "Wine Store Điện Biên Phủ"],
  "Quận 4": ["Wine Store Nguyễn Tất Thành", "Wine Store Khánh Hội", "Wine Store Bến Vân Đồn"],
  "Quận 5": ["Wine Store Trần Hưng Đạo", "Wine Store An Dương Vương", "Wine Store Nguyễn Trãi"],
  "Quận 6": ["Wine Store Hậu Giang", "Wine Store Minh Phụng", "Wine Store Bình Phú"],
  "Quận 7": ["Wine Store Phú Mỹ Hưng", "Wine Store Nguyễn Thị Thập", "Wine Store Huỳnh Tấn Phát"],
  "Quận 8": ["Wine Store Phạm Thế Hiển", "Wine Store Cao Lỗ", "Wine Store Dương Bá Trạc"],
  "Quận 9": ["Wine Store Đỗ Xuân Hợp", "Wine Store Lê Văn Việt", "Wine Store Tăng Nhơn Phú"],
  "Quận 10": ["Wine Store 3 Tháng 2", "Wine Store Sư Vạn Hạnh", "Wine Store Nguyễn Chí Thanh"],
  "Quận 11": ["Wine Store Lạc Long Quân", "Wine Store Đại lộ Bình Phú", "Wine Store Minh Phụng"],
  "Quận 12": ["Wine Store Tô Ký", "Wine Store Lê Văn Khương", "Wine Store Thạnh Xuân"],
  "Bình Thạnh": ["Wine Store Xô Viết Nghệ Tĩnh", "Wine Store Điện Biên Phủ", "Wine Store Nơ Trang Long"],
  "Tân Bình": ["Wine Store Cộng Hòa", "Wine Store Hoàng Văn Thụ", "Wine Store Trường Chinh"],
  "Phú Nhuận": ["Wine Store Phan Đăng Lưu", "Wine Store Huỳnh Văn Bánh", "Wine Store Phan Xích Long"],
  // Đà Nẵng
  "Hải Châu": ["Wine Store Bạch Đằng", "Wine Store Trần Phú", "Wine Store Lê Duẩn"],
  "Thanh Khê": ["Wine Store Điện Biên Phủ", "Wine Store Nguyễn Lương Bằng", "Wine Store Hoàng Diệu"],
  "Sơn Trà": ["Wine Store Võ Nguyên Giáp", "Wine Store Hoàng Sa", "Wine Store Trường Sa"],
  "Ngũ Hành Sơn": ["Wine Store Nguyễn Tất Thành", "Wine Store Hòa Hải", "Wine Store Mỹ An"],
  "Liên Chiểu": ["Wine Store Nguyễn Văn Linh", "Wine Store Trường Chinh", "Wine Store Hòa Khánh"],
  "Cẩm Lệ": ["Wine Store Nguyễn Hữu Thọ", "Wine Store Hoà Thọ", "Wine Store Khuê Trung"],
  // Hải Phòng
  "Hồng Bàng": ["Wine Store Hồng Bàng 1", "Wine Store Hồng Bàng 2"],
  "Ngô Quyền": ["Wine Store Ngô Quyền 1", "Wine Store Ngô Quyền 2"],
  "Lê Chân": ["Wine Store Lê Chân 1", "Wine Store Lê Chân 2"],
  "Hải An": ["Wine Store Hải An 1", "Wine Store Hải An 2"],
  "Kiến An": ["Wine Store Kiến An 1", "Wine Store Kiến An 2"],
  "Đồ Sơn": ["Wine Store Đồ Sơn 1", "Wine Store Đồ Sơn 2"],
  // Cần Thơ
  "Ninh Kiều": ["Wine Store Ninh Kiều 1", "Wine Store Ninh Kiều 2"],
  "Ô Môn": ["Wine Store Ô Môn 1", "Wine Store Ô Môn 2"],
  "Bình Thuỷ": ["Wine Store Bình Thuỷ 1", "Wine Store Bình Thuỷ 2"],
  "Cái Răng": ["Wine Store Cái Răng 1", "Wine Store Cái Răng 2"],
  "Thốt Nốt": ["Wine Store Thốt Nốt 1", "Wine Store Thốt Nốt 2"],
  // Nha Trang
  "Nha Trang": ["Wine Store Nha Trang 1", "Wine Store Nha Trang 2"],
  "Vĩnh Nguyên": ["Wine Store Vĩnh Nguyên 1", "Wine Store Vĩnh Nguyên 2"],
  "Vĩnh Hòa": ["Wine Store Vĩnh Hòa 1", "Wine Store Vĩnh Hòa 2"],
  "Phước Long": ["Wine Store Phước Long 1", "Wine Store Phước Long 2"],
  // Huế (renamed to avoid duplicate with HCM's Phú Nhuận)
  "Phú Nhuận (Huế)": ["Wine Store Phú Nhuận Huế 1", "Wine Store Phú Nhuận Huế 2"],
  "Phú Hội": ["Wine Store Phú Hội 1", "Wine Store Phú Hội 2"],
  "Phú Hậu": ["Wine Store Phú Hậu 1", "Wine Store Phú Hậu 2"],
  "Thuận Thành": ["Wine Store Thuận Thành 1", "Wine Store Thuận Thành 2"],
  // Vũng Tàu
  "Vũng Tàu": ["Wine Store Vũng Tàu 1", "Wine Store Vũng Tàu 2"],
  "Bà Rịa": ["Wine Store Bà Rịa 1", "Wine Store Bà Rịa 2"],
  "Long Điền": ["Wine Store Long Điền 1", "Wine Store Long Điền 2"],
  "Đất Đỏ": ["Wine Store Đất Đỏ 1", "Wine Store Đất Đỏ 2"],
};

export default function LocationModal({
  isOpen,
  onComplete,
  onClose,
  defaultValues,
}: LocationModalProps) {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [store, setStore] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prevCity, setPrevCity] = useState("");
  const [prevDistrict, setPrevDistrict] = useState("");

  // Load default values from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      // Try to get from defaultValues prop first
      if (defaultValues) {
        setCity(defaultValues.city || "");
        setDistrict(defaultValues.district || "");
        setStore(defaultValues.store || "");
        setPrevCity(defaultValues.city || "");
        setPrevDistrict(defaultValues.district || "");
      } else {
        // Otherwise try to load from localStorage
        const storedLocation = localStorage.getItem("location");
        if (storedLocation) {
          try {
            const parsed = JSON.parse(storedLocation);
            setCity(parsed.city || "");
            setDistrict(parsed.district || "");
            setStore(parsed.store || "");
            setPrevCity(parsed.city || "");
            setPrevDistrict(parsed.district || "");
          } catch (e) {
            console.error('Failed to parse location data');
          }
        } else {
          // Reset all fields if no stored location
          setCity("");
          setDistrict("");
          setStore("");
          setPrevCity("");
          setPrevDistrict("");
        }
      }
    }
  }, [isOpen, defaultValues]);

  // Reset district and store when city changes (only if actually changed by user)
  useEffect(() => {
    if (city && city !== prevCity && prevCity !== "") {
      setDistrict("");
      setStore("");
    }
    setPrevCity(city);
  }, [city]);

  // Reset store when district changes (only if actually changed by user)
  useEffect(() => {
    if (district && district !== prevDistrict && prevDistrict !== "") {
      setStore("");
    }
    setPrevDistrict(district);
  }, [district]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!city) newErrors.city = "Vui lòng chọn thành phố";
    if (!district) newErrors.district = "Vui lòng chọn quận/huyện";
    if (!store) newErrors.store = "Vui lòng chọn cửa hàng";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onComplete({ city, district, store });
  };

  const handleChange = (field: "city" | "district" | "store", value: string) => {
  setErrors((prev) => ({
    ...prev,
    [field]: "",
  }));

  switch (field) {
    case "city":
      setCity(value);
      // Khi đổi city → reset district và store
      setDistrict("");
      setStore("");
      break;

    case "district":
      setDistrict(value);
      // Khi đổi district → reset store
      setStore("");
      break;

    case "store":
      setStore(value);
      break;
  }

  // TODO: Debounce API khi cần load data đến các dropdown kế tiếp
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
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-9998 bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="fixed left-1/2 top-1/2 z-9999 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
          >
            <div className="relative overflow-hidden rounded-sm border border-neutral-300 bg-amber-50 shadow-2xl">
              {/* Decorative top border */}
              <motion.div
                className="h-1 bg-linear-to-r from-[#33391d] via-amber-700 to-[#33391d]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* Subtle background pattern */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
                <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,#33391d_1px,transparent_1px)] bg-size-[24px_24px]" />
              </div>

              {/* Close button - only show if onClose is provided */}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 z-10 text-neutral-600 transition-colors hover:text-neutral-900"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}

              <div className="relative p-8 md:p-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    type: "spring",
                    stiffness: 200
                  }}
                  className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#33391d]/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#33391d]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-3 text-center"
                >
                  <h2 className="text-2xl font-semibold tracking-wide text-[#33391d]">
                    Chọn Địa Chỉ
                  </h2>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8 text-center text-sm italic text-neutral-600"
                >
                  Vui lòng cung cấp thông tin giao hàng của bạn
                </motion.p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* City Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <label
                      htmlFor="city"
                      className="block text-xs uppercase tracking-wider text-neutral-700"
                    >
                      Thành phố
                    </label>
                    <div className="relative mt-1">
                      <select
                        id="city"
                        value={city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className={`w-full appearance-none border bg-white px-4 py-3 pr-10 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-2 ${
                          errors.city
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]/20"
                        }`}
                      >
                        <option value="">Chọn thành phố</option>
                        {CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.city && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs italic text-red-600"
                      >
                        {errors.city}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* District Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <label
                      htmlFor="district"
                      className="block text-xs uppercase tracking-wider text-neutral-700"
                    >
                      Quận/Huyện
                    </label>
                    <div className="relative mt-1">
                      <select
                        id="district"
                        value={district}
                        onChange={(e) => handleChange("district", e.target.value)}
                        disabled={!city}
                        className={`w-full appearance-none border bg-white px-4 py-3 pr-10 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 ${
                          errors.district
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]/20"
                        }`}
                      >
                        <option value="">
                          {city ? "Chọn quận/huyện" : "Chọn thành phố trước"}
                        </option>
                        {city &&
                          DISTRICTS[city]?.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.district && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs italic text-red-600"
                      >
                        {errors.district}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Store Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <label
                      htmlFor="store"
                      className="block text-xs uppercase tracking-wider text-neutral-700"
                    >
                      Cửa hàng
                    </label>
                    <div className="relative mt-1">
                      <select
                        id="store"
                        value={store}
                        onChange={(e) => handleChange("store", e.target.value)}
                        disabled={!district}
                        className={`w-full appearance-none border bg-white px-4 py-3 pr-10 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 ${
                          errors.store
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]/20"
                        }`}
                      >
                        <option value="">
                          {district ? "Chọn cửa hàng" : "Chọn quận/huyện trước"}
                        </option>
                        {district &&
                          STORES[district]?.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.store && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs italic text-red-600"
                      >
                        {errors.store}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!city || !district || !store}
                    className="w-full bg-[#33391d] py-3 text-sm uppercase tracking-widest text-amber-50 transition-all hover:bg-[#2a2f18] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    Hoàn tất
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
