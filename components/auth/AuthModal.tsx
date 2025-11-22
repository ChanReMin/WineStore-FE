"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { z } from "zod";
import DatePicker from "@/components/ui/date-picker";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [formData, setFormData] = useState({
    // Required fields
    email: "",
    password: "",
    confirm_password: "",
    // Optional fields for register
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "",
    gender: "1", // 1 = Male by default
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, register, isLoading } = useAuth();

  // Sync mode with initialMode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (mode === "register" && formData.password !== formData.confirm_password) {
      toast.error("Confirm password does not match", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const result = mode === "login" 
        ? await login({
            email: formData.email,
            password: formData.password,
          })
        : await register({
            email: formData.email,
            password: formData.password,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number: formData.phone_number,
            date_of_birth: formData.date_of_birth,
            gender: formData.gender ? Number.parseInt(formData.gender) : 1,
          });

      // Only close modal and reset form if successful
      if (result?.success) {
        onClose();
        setFormData({
          email: "",
          password: "",
          confirm_password: "",
          first_name: "",
          last_name: "",
          phone_number: "",
          date_of_birth: "",
          gender: "1",
        });
      }
    } catch (error: any) {
      // Error toast is already handled in useAuth hook
      console.error("Auth error:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setErrors({});
    // Reset form data khi chuyển mode
    setFormData({
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      date_of_birth: "",
      gender: "1",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Covers entire viewport including header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-9998 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal - Centered in viewport with scroll and responsive width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed left-1/2 top-1/2 z-9999 max-h-[90vh] w-full -translate-x-1/2 -translate-y-1/2 overflow-y-auto px-4 transition-all duration-300 ${
              mode === "register"
                ? "max-w-xl lg:max-w-2xl"
                : "max-w-md lg:max-w-lg"
            }`}
          >
            <div className="relative overflow-hidden rounded-sm border border-neutral-300 bg-amber-50 shadow-2xl ">
              {/* Decorative top border with animation */}
              <motion.div
                className="h-1 bg-linear-to-r from-[#33391d] via-amber-700 to-[#33391d]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Subtle background pattern */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
                <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,#33391d_1px,transparent_1px)] bg-size-[24px_24px]" />
              </div>

              {/* Close button */}
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

              <div className="relative p-6 md:p-8">
                {/* Title with animation */}
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <h2 className="text-2xl font-semibold tracking-wide text-[#33391d]">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="mt-1 text-sm italic text-neutral-600">
                    {mode === "login"
                      ? "Sign in to your account"
                      : "Join our wine community"}
                  </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Register fields - only for register */}
                  <AnimatePresence mode="wait">
                    {mode === "register" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {/* First Name & Last Name */}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="first_name"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              First Name{" "}
                              <span className="text-neutral-400">
                                (Optional)
                              </span>
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleChange}
                              className="mt-1 w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-1 focus:ring-[#33391d]"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="last_name"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              Last Name{" "}
                              <span className="text-neutral-400">
                                (Optional)
                              </span>
                            </label>
                            <input
                              type="text"
                              id="last_name"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleChange}
                              className="mt-1 w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-1 focus:ring-[#33391d]"
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        {/* Email & Phone Number */}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`mt-1 w-full border bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                                errors.email
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                  : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                              }`}
                              placeholder="your@email.com"
                            />
                            {errors.email && (
                              <p className="mt-1 text-xs italic text-red-600">
                                {errors.email}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="phone_number"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              Phone Number{" "}
                              <span className="text-neutral-400">
                                (Optional)
                              </span>
                            </label>
                            <input
                              type="tel"
                              id="phone_number"
                              name="phone_number"
                              value={formData.phone_number}
                              onChange={handleChange}
                              className={`mt-1 w-full border bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                                errors.phone_number
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                  : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                              }`}
                              placeholder="0123456789"
                            />
                            {errors.phone_number && (
                              <p className="mt-1 text-xs italic text-red-600">
                                {errors.phone_number}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Date of Birth & Gender */}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="date_of_birth"
                              className="block text-xs uppercase tracking-wider text-neutral-700 mb-1"
                            >
                              Date of Birth{" "}
                              <span className="text-neutral-400">
                                (Optional)
                              </span>
                            </label>
                            <DatePicker
                              value={formData.date_of_birth}
                              onChange={(date) =>
                                setFormData({ ...formData, date_of_birth: date })
                              }
                              placeholder="Chọn ngày sinh"
                              maxDate={new Date().toISOString().split("T")[0]}
                              error={errors.date_of_birth}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="gender"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              Gender{" "}
                              <span className="text-neutral-400">
                                (Optional)
                              </span>
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className="mt-1 w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-1 focus:ring-[#33391d]"
                            >
                              <option value="0">Unknown</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                            </select>
                            {errors.gender && (
                              <p className="mt-1 text-xs italic text-red-600">
                                {errors.gender}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Password & Confirm Password */}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="password"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              className={`mt-1 w-full border bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                                errors.password
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                  : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                              }`}
                              placeholder="••••••••"
                            />
                            {errors.password && (
                              <p className="mt-1 text-xs italic text-red-600">
                                {errors.password}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="confirm_password"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              id="confirm_password"
                              name="confirm_password"
                              value={formData.confirm_password}
                              onChange={handleChange}
                              className={`mt-1 w-full border bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                                errors.confirm_password
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                  : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                              }`}
                              placeholder="••••••••"
                            />
                            {errors.confirm_password && (
                              <p className="mt-1 text-xs italic text-red-600">
                                {errors.confirm_password}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Login fields - only for login mode */}
                  {mode === "login" && (
                    <>
                      {/* Email field */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs uppercase tracking-wider text-neutral-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`mt-1 w-full border bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                            errors.email
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs italic text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Password field */}
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-xs uppercase tracking-wider text-neutral-700"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`mt-1 w-full border bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                            errors.password
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                          }`}
                          placeholder="••••••••"
                        />
                        {errors.password && (
                          <p className="mt-1 text-xs italic text-red-600">
                            {errors.password}
                          </p>
                        )}
                      </div>

                    </>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#33391d] py-3 text-sm uppercase tracking-widest text-amber-50 transition-all hover:bg-[#2a2f18] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : mode === "login" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>
                </form>

                {/* Switch mode */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-neutral-600">
                    {mode === "login"
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={switchMode}
                      className="font-medium text-[#33391d] underline decoration-1 underline-offset-2 transition-opacity hover:opacity-70"
                    >
                      {mode === "login" ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
