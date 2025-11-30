"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { warehouseService, type City, type Warehouse } from "@/services/warehouseService";

interface LocationModalProps {
  isOpen: boolean;
  onComplete: (data: { city: string; store: string }) => void;
  onClose?: () => void;
  defaultValues?: {
    city: string;
    store: string;
  } | null;
}

export default function LocationModal({
  isOpen,
  onComplete,
  onClose,
  defaultValues,
}: LocationModalProps) {
  const t = useTranslations("home.locationModal");
  const [city, setCity] = useState("");
  const [store, setStore] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prevCity, setPrevCity] = useState("");
  
  // API states
  const [cities, setCities] = useState<City[]>([]);
  const [stores, setStores] = useState<Warehouse[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingStores, setIsLoadingStores] = useState(false);
  const [errorCities, setErrorCities] = useState<string | null>(null);
  const [errorStores, setErrorStores] = useState<string | null>(null);

  const fetchCities = useCallback(async () => {
    setIsLoadingCities(true);
    setErrorCities(null);
    try {
      const response = await warehouseService.getCities();
      if (response.success && response.data?.cities) {
        setCities(response.data.cities);
      } else {
        setErrorCities(t("errorLoadCities"));
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setErrorCities(t("errorLoadCities"));
    } finally {
      setIsLoadingCities(false);
    }
  }, [t]);

  const fetchStores = useCallback(async (cityName: string) => {
    setIsLoadingStores(true);
    setErrorStores(null);
    try {
      const response = await warehouseService.getWarehousesByCity(cityName);
      if (response.success && response.data?.warehouses) {
        // Filter only active warehouses (status === 1)
        const activeStores = response.data.warehouses.filter(
          (w) => w.status === 1
        );
        setStores(activeStores);
      } else {
        setErrorStores(t("errorLoadStores"));
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
      setErrorStores(t("errorLoadStores"));
    } finally {
      setIsLoadingStores(false);
    }
  }, [t]);

  // Fetch cities when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCities();
    }
  }, [isOpen, fetchCities]);

  // Load default values from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      // Try to get from defaultValues prop first
      if (defaultValues) {
        const cityValue = defaultValues.city || "";
        const storeValue = defaultValues.store || "";
        setCity(cityValue);
        setStore(storeValue);
        setPrevCity(cityValue);
        // If we have a city from defaultValues, fetch stores for it
        if (cityValue) {
          fetchStores(cityValue);
        } else {
          setStores([]);
        }
      } else {
        // Otherwise try to load from localStorage
        const storedLocation = localStorage.getItem("location");
        if (storedLocation) {
          try {
            const parsed = JSON.parse(storedLocation);
            const cityValue = parsed.city || "";
            const storeValue = parsed.store || "";
            setCity(cityValue);
            setStore(storeValue);
            setPrevCity(cityValue);
            // If we have a city from localStorage, fetch stores for it
            if (cityValue) {
              fetchStores(cityValue);
            } else {
              setStores([]);
            }
          } catch (e) {
            console.error("Failed to parse location data");
            setCity("");
            setStore("");
            setPrevCity("");
            setStores([]);
          }
        } else {
          // Reset all fields if no stored location
          setCity("");
          setStore("");
          setPrevCity("");
          setStores([]);
        }
      }
    } else {
      // Reset when modal closes
      setCity("");
      setStore("");
      setPrevCity("");
      setStores([]);
      setErrors({});
      setErrorCities(null);
      setErrorStores(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!city) newErrors.city = t("errorSelectCity");
    if (!store) newErrors.store = t("errorSelectStore");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onComplete({ city, store });
  };

  const handleCityChange = (value: string) => {
    setErrors((prev) => ({
      ...prev,
      city: "",
    }));

    setCity(value);
    setStore(""); // Reset store when city changes
    setStores([]); // Clear stores list
    setErrorStores(null); // Clear store errors

    // Fetch stores for the selected city
    if (value) {
      fetchStores(value);
    }
  };

  const handleStoreChange = (value: string) => {
    setErrors((prev) => ({
      ...prev,
      store: "",
    }));
    setStore(value);
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
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed left-1/2 top-1/2 z-9999 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"
            onClick={(e) => e.stopPropagation()}
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
                  aria-label={t("close")}
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
                    stiffness: 200,
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
                    {t("title")}
                  </h2>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8 text-center text-sm italic text-neutral-600"
                >
                  {t("description")}
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
                      {t("city")}
                    </label>
                    <div className="relative mt-1">
                      <select
                        id="city"
                        value={city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        disabled={isLoadingCities}
                        className={`w-full appearance-none border bg-white px-4 py-3 pr-10 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 ${
                          errors.city
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]/20"
                        }`}
                      >
                        <option value="">
                          {isLoadingCities
                            ? t("loadingCities")
                            : t("selectCity")}
                        </option>
                        {cities.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600">
                        {isLoadingCities ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent" />
                        ) : (
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
                        )}
                      </div>
                    </div>
                    {errorCities && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs italic text-red-600"
                      >
                        {errorCities}
                      </motion.p>
                    )}
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

                  {/* Store Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <label
                      htmlFor="store"
                      className="block text-xs uppercase tracking-wider text-neutral-700"
                    >
                      {t("store")}
                    </label>
                    <div className="relative mt-1">
                      <select
                        id="store"
                        value={store}
                        onChange={(e) => handleStoreChange(e.target.value)}
                        disabled={!city || isLoadingStores}
                        className={`w-full appearance-none border bg-white px-4 py-3 pr-10 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 ${
                          errors.store
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]/20"
                        }`}
                      >
                        <option value="">
                          {!city
                            ? t("selectCityFirst")
                            : isLoadingStores
                            ? t("loadingStores")
                            : t("selectStore")}
                        </option>
                        {stores.map((s) => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-600">
                        {isLoadingStores ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent" />
                        ) : (
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
                        )}
                      </div>
                    </div>
                    {errorStores && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-xs italic text-red-600"
                      >
                        {errorStores}
                      </motion.p>
                    )}
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
                    transition={{ duration: 0.4, delay: 0.5 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!city || !store || isLoadingCities || isLoadingStores}
                    className="w-full bg-[#33391d] py-3 text-sm uppercase tracking-widest text-amber-50 transition-all hover:bg-[#2a2f18] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    {t("complete")}
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