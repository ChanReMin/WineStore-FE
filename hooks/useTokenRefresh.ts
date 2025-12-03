import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { isTokenExpiringSoon, getTokenRemainingTime } from "@/lib/tokenUtils";

/**
 * Hook to automatically refresh token before expiration
 * Checks token every minute and refreshes if expiring within 5 minutes
 */
export const useTokenRefresh = () => {
  const {
    accessToken,
    refreshToken,
    setAccessToken,
    clearAuth,
    isAuthenticated,
  } = useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Chỉ chạy khi user đã đăng nhập
    if (!isAuthenticated || !accessToken || !refreshToken) {
      return;
    }

    const checkAndRefreshToken = async () => {
      try {
        // Kiểm tra nếu token sắp hết hạn (trong vòng 5 phút)
        if (isTokenExpiringSoon(accessToken, 300)) {

          const response = await authService.refreshToken(refreshToken);
          setAccessToken(response.data.access_token);
        }
      } catch (error) {
        console.error("❌ Background token refresh failed:", error);
        // Nếu refresh thất bại, clear auth và redirect
        clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }
    };

    // Kiểm tra ngay lập tức
    checkAndRefreshToken();

    // Kiểm tra mỗi 1 phút
    intervalRef.current = setInterval(checkAndRefreshToken, 60 * 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [accessToken, refreshToken, isAuthenticated, setAccessToken, clearAuth]);
};
