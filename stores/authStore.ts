import { create } from "zustand";
import type { User } from "@/types/auth";
import { setAuthHelpers } from "@/lib/axios";
import {
  setTokenCookies,
  setAccessTokenCookie,
  removeAllTokenCookies,
  getAccessTokenCookie,
  getRefreshTokenCookie,
} from "@/lib/cookies";

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

// Khôi phục auth state từ cookies và localStorage khi khởi động
const initializeFromStorage = () => {
  if (typeof window !== "undefined") {
    const accessToken = getAccessTokenCookie();
    const refreshToken = getRefreshTokenCookie();
    
    // Lấy user data từ localStorage (không nhạy cảm như tokens)
    const userDataString = localStorage.getItem("wine-user-data");
    let user: User | null = null;
    
    if (userDataString) {
      try {
        user = JSON.parse(userDataString);
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
    
    if (accessToken && refreshToken) {
      return {
        user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      };
    }
  }
  
  return {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  };
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  ...initializeFromStorage(),

  setAuth: (user, accessToken, refreshToken) => {
    // Lưu tokens vào cookies
    if (typeof window !== "undefined") {
      setTokenCookies(accessToken, refreshToken);
      // Lưu user data vào localStorage (không nhạy cảm)
      localStorage.setItem("wine-user-data", JSON.stringify(user));
    }
    
    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  setAccessToken: (token) => {
    // Lưu access token vào cookie
    if (typeof window !== "undefined") {
      setAccessTokenCookie(token);
    }
    
    set({ accessToken: token });
  },

  clearAuth: () => {
    // Xóa tokens khỏi cookies và user data khỏi localStorage
    if (typeof window !== "undefined") {
      removeAllTokenCookies();
      localStorage.removeItem("wine-user-data");
    }
    
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  getAccessToken: () => get().accessToken,

  getRefreshToken: () => get().refreshToken,
}));

// Khởi tạo auth helpers cho axios
if (typeof window !== "undefined") {
  setAuthHelpers({
    getAccessToken: () => {
      // Ưu tiên từ store, fallback sang cookie
      return useAuthStore.getState().accessToken || getAccessTokenCookie();
    },
    getRefreshToken: () => {
      // Ưu tiên từ store, fallback sang cookie
      return useAuthStore.getState().refreshToken || getRefreshTokenCookie();
    },
    setAccessToken: (token: string) =>
      useAuthStore.getState().setAccessToken(token),
    clearAuth: () => useAuthStore.getState().clearAuth(),
  });
}
