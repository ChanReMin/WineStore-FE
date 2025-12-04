"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { LoginRequest, RegisterRequest } from "@/types/auth";
import { getAccessTokenCookie, getRefreshTokenCookie } from "@/lib/cookies";

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);

      // 🔍 DEBUG: Log response để kiểm tra

      if (response.success) {
        // API trả về snake_case, cần map sang camelCase
        const { user, access_token, refresh_token } = response.data as any;

        setAuth(user, access_token, refresh_token);

        toast.success(response.message || "Login successful!");
        router.push("/");
        return { success: true };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);

      if (response.success) {
        toast.success(
          response.message || "Đăng ký thành công! Vui lòng đăng nhập."
        );
        // Don't redirect, let the modal handle switching to login mode
        return { success: true };
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      const errors = error.response?.data?.errors;

      if (errors && errors.length > 0) {
        errors.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(errorMessage);
      }

      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      clearAuth();
      toast.success("Logout successful!");
      router.push("/");
    } catch (error) {
      // Vẫn clear auth dù API lỗi
      clearAuth();
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const getAccessToken = (): string | null => {
    return getAccessTokenCookie();
  };

  const getRefreshToken = (): string | null => {
    return getRefreshTokenCookie();
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    getAccessToken,
    getRefreshToken,
  };
};
