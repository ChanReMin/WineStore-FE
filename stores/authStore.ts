import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types/auth";
import { setAuthHelpers } from "@/lib/axios";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      setAccessToken: (token) => {
        set({ accessToken: token });
      },

      clearAuth: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      getAccessToken: () => get().accessToken,

      getRefreshToken: () => get().refreshToken,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Lưu TOÀN BỘ auth state vào localStorage
        // Điều này cho phép auto-refresh token hoạt động sau khi reload
        user: state.user,
        accessToken: state.accessToken, // ✅ Auto-refresh khi hết hạn
        refreshToken: state.refreshToken, // ✅ Dùng để refresh accessToken
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Khởi tạo auth helpers cho axios
if (typeof window !== "undefined") {
  setAuthHelpers({
    getAccessToken: () => useAuthStore.getState().accessToken,
    getRefreshToken: () => useAuthStore.getState().refreshToken,
    setAccessToken: (token: string) =>
      useAuthStore.getState().setAccessToken(token),
    clearAuth: () => useAuthStore.getState().clearAuth(),
  });
}
