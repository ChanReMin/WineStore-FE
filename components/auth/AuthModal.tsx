"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { z } from "zod";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("auth");
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Required fields
    email: "",
    password: "",
    confirmPassword: "",
    // Optional fields for register
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
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

    // Validate using Zod schema
    try {
      if (mode === "login") {
        loginSchema.parse({
          email: formData.email,
          password: formData.password,
          role: "customer",
        });
      } else {
        registerSchema.parse({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          role: "customer",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    try {
      const result =
        mode === "login"
          ? await login({
              email: formData.email,
              password: formData.password,
            })
          : await register({
              email: formData.email,
              password: formData.password,
              firstName: formData.firstName,
              lastName: formData.lastName,
              phoneNumber: formData.phoneNumber,
              dateOfBirth: formData.dateOfBirth,
              gender: formData.gender ? Number.parseInt(formData.gender) : 1,
            });

      // Only close modal and reset form if successful
      if (result?.success) {
        if (mode === "login") {
          // Close modal after successful login
          onClose();
        } else {
          // Switch to login mode after successful registration
          setMode("login");
          // Keep email but clear other fields
          setFormData({
            email: formData.email,
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            dateOfBirth: "",
            gender: "1",
          });
        }
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

  const validateDateOfBirth = (dateString: string) => {
    if (!dateString) {
      // Optional field, no error if empty
      return "";
    }

    const selectedDate = new Date(dateString);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 100); // Maximum 100 years old

    // Check if date is valid
    if (isNaN(selectedDate.getTime())) {
      return t("validation.invalidDate");
    }

    // Check if date is in the future
    if (selectedDate > today) {
      return t("validation.dateInFuture");
    }

    // Check if date is too old (more than 100 years)
    if (selectedDate < minDate) {
      return t("validation.dateTooOld");
    }

    // Check if user is at least 18 years old (for wine website)
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);

    if (selectedDate > eighteenYearsAgo) {
      return t("validation.mustBe18");
    }

    return "";
  };

  const handleDateOfBirthBlur = () => {
    if (formData.dateOfBirth) {
      const error = validateDateOfBirth(formData.dateOfBirth);
      if (error) {
        setErrors({ ...errors, dateOfBirth: error });
      }
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return t("validation.passwordRequired");
    }

    if (password.length < 8) {
      return t("validation.passwordTooShort");
    }

    if (password.length > 50) {
      return t("validation.passwordTooLong");
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return t("validation.passwordNeedsUppercase");
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return t("validation.passwordNeedsLowercase");
    }

    // Check for at least one number
    if (!/[0-9]/.test(password)) {
      return t("validation.passwordNeedsNumber");
    }

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return t("validation.passwordNeedsSpecial");
    }

    return "";
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ) => {
    if (!confirmPassword) {
      return t("validation.confirmPasswordRequired");
    }

    if (confirmPassword !== password) {
      return t("validation.passwordMismatch");
    }

    return "";
  };

  const handlePasswordBlur = () => {
    if (mode === "register" && formData.password) {
      const error = validatePassword(formData.password);
      if (error) {
        setErrors({ ...errors, password: error });
      } else {
        // Clear password error if valid
        const newErrors = { ...errors };
        delete newErrors.password;
        setErrors(newErrors);
      }
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (mode === "register" && formData.confirmPassword) {
      const error = validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      );
      if (error) {
        setErrors({ ...errors, confirmPassword: error });
      } else {
        // Clear confirm password error if valid
        const newErrors = { ...errors };
        delete newErrors.confirmPassword;
        setErrors(newErrors);
      }
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    // Reset form data khi chuyển mode
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      dateOfBirth: "",
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
                    {mode === "login" ? t("login.title") : t("register.title")}
                  </h2>
                  <p className="mt-1 text-sm italic text-neutral-600">
                    {mode === "login"
                      ? t("login.subtitle")
                      : t("register.subtitle")}
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
                              htmlFor="firstName"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              {t("fields.firstName")}{" "}
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="mt-1 w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-1 focus:ring-[#33391d]"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="lastName"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              {t("fields.lastName")}{" "}
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
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
                              {t("fields.email")}
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
                              htmlFor="phoneNumber"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              {t("fields.phoneNumber")}{" "}
                              <span className="text-neutral-400">
                                ({t("fields.optional")})
                              </span>
                            </label>
                            <input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              className={`mt-1 w-full border bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                                errors.phoneNumber
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                  : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                              }`}
                              placeholder="0123456789"
                            />
                            {errors.phoneNumber && (
                              <p className="mt-1 text-xs italic text-red-600">
                                {errors.phoneNumber}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Date of Birth & Gender */}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="dateOfBirth"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              {t("fields.dateOfBirth")}{" "}
                              <span className="text-neutral-400">
                                ({t("fields.optional")})
                              </span>
                            </label>
                            <input
                              type="date"
                              id="dateOfBirth"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              onBlur={handleDateOfBirthBlur}
                              max={new Date().toISOString().split("T")[0]}
                              className={`mt-1 w-full border bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                                errors.dateOfBirth
                                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                  : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                              }`}
                            />
                            {errors.dateOfBirth && (
                              <p className="mt-1 text-xs italic text-red-600">
                                {errors.dateOfBirth}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="gender"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              {t("fields.gender")}{" "}
                              <span className="text-neutral-400">
                                ({t("fields.optional")})
                              </span>
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className="mt-1 w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-all focus:border-[#33391d] focus:outline-none focus:ring-1 focus:ring-[#33391d]"
                            >
                              <option value="0">
                                {t("fields.genderOptions.unknown")}
                              </option>
                              <option value="1">
                                {t("fields.genderOptions.male")}
                              </option>
                              <option value="2">
                                {t("fields.genderOptions.female")}
                              </option>
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
                              {t("fields.password")}
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handlePasswordBlur}
                                className={`mt-1 w-full border bg-white px-4 py-2.5 pr-10 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                                  errors.password
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                                }`}
                                placeholder="••••••••"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                                tabIndex={-1}
                              >
                                {showPassword ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                )}
                              </button>
                            </div>
                            {errors.password && (
                              <p className="mt-1 text-xs italic text-red-600">
                                {errors.password}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="block text-xs uppercase tracking-wider text-neutral-700"
                            >
                              {t("fields.confirmPassword")}
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleConfirmPasswordBlur}
                                className={`mt-1 w-full border bg-white px-4 py-2.5 pr-10 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                                  errors.confirmPassword
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                                }`}
                                placeholder="••••••••"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                                tabIndex={-1}
                              >
                                {showConfirmPassword ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                )}
                              </button>
                            </div>
                            {errors.confirmPassword && (
                              <p className="mt-1 text-xs italic text-red-600">
                                {errors.confirmPassword}
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
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 w-full border bg-white px-4 py-2.5 pr-10 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-1 ${
                              errors.password
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-neutral-300 focus:border-[#33391d] focus:ring-[#33391d]"
                            }`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            )}
                          </button>
                        </div>
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
                        {t("buttons.processing")}
                      </span>
                    ) : mode === "login" ? (
                      t("buttons.signIn")
                    ) : (
                      t("buttons.createAccount")
                    )}
                  </motion.button>
                </form>

                {/* Divider - Only show in login mode */}
                {mode === "login" && (
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-amber-50 px-2 text-neutral-500">
                        {t("divider.or")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Google Sign In Button - Only show in login mode */}
                {mode === "login" && (
                  <motion.button
                    type="button"
                    onClick={() => {
                      toast.info("Google Sign In coming soon!", {
                        position: "top-right",
                        autoClose: 2000,
                      });
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 border-2 border-neutral-300 bg-white py-3 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-400"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="uppercase tracking-wide">
                      {t("buttons.signInWithGoogle")}
                    </span>
                  </motion.button>
                )}

                {/* Switch mode */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-neutral-600">
                    {mode === "login"
                      ? t("switchMode.noAccount")
                      : t("switchMode.haveAccount")}{" "}
                    <button
                      type="button"
                      onClick={switchMode}
                      className="font-medium text-[#33391d] underline decoration-1 underline-offset-2 transition-opacity hover:opacity-70"
                    >
                      {mode === "login"
                        ? t("switchMode.signUp")
                        : t("switchMode.signIn")}
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
