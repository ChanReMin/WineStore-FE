import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { RefreshTokenResponse } from "@/types/auth";
import { isTokenExpiringSoon } from "./tokenUtils";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Tạo axios instance
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Quan trọng để gửi/nhận httpOnly cookies
});

// Biến để theo dõi trạng thái refresh token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Refresh access token proactively
 * @returns New access token or null if refresh failed
 */
const refreshAccessToken = async (): Promise<string | null> => {
  if (isRefreshing) {
    // Nếu đang refresh, đợi trong queue
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }) as Promise<string | null>;
  }

  isRefreshing = true;

  try {
    // Lấy refreshToken từ auth-storage trong localStorage
    let refreshToken: string | null = null;
    if (typeof window !== "undefined") {
      const authStorageString = localStorage.getItem("auth-storage");
      if (authStorageString) {
        const authStorage = JSON.parse(authStorageString);
        refreshToken = authStorage.state?.refreshToken || null;
      }
    }

    if (!refreshToken) {
      throw new Error("Session expired. Please login again.");
    }

    const response = await axios.post<RefreshTokenResponse>(
      `${API_URL}/api/v1/auth/refresh`,
      { refreshToken },
      { withCredentials: true }
    );

    const { access_token } = response.data.data;

    // Cập nhật access token mới vào store
    setAccessToken(access_token);

    // Xử lý các request đang chờ
    processQueue(null, access_token);

    return access_token;
  } catch (refreshError) {
    processQueue(refreshError as Error, null);

    // Xóa token và redirect về login
    clearAuth();

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }

    return null;
  } finally {
    isRefreshing = false;
  }
};

// Request interceptor - Thêm access token vào header và auto-refresh nếu sắp hết hạn
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Bỏ qua refresh token endpoint để tránh vòng lặp vô hạn
    if (config.url?.includes("/auth/refresh")) {
      return config;
    }

    // Lấy access token từ Zustand store
    let token = getAccessToken();

    // Kiểm tra nếu token sắp hết hạn (trong vòng 5 phút)
    if (token && isTokenExpiringSoon(token, 300)) {
      const newToken = await refreshAccessToken();
      token = newToken || token;
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Tự động refresh token khi hết hạn
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, đợi trong queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;

      try {
        // Sử dụng hàm refresh chung
        const newToken = await refreshAccessToken();

        if (!newToken) {
          throw new Error("Failed to refresh token");
        }

        // Retry request ban đầu với token mới
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Helper functions để tương tác với Zustand store
// Sẽ được import từ store sau
let getAccessToken: () => string | null = () => null;
let getRefreshToken: () => string | null = () => null;
let setAccessToken: (token: string) => void = () => {};
let clearAuth: () => void = () => {};

export const setAuthHelpers = (helpers: {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}) => {
  getAccessToken = helpers.getAccessToken;
  getRefreshToken = helpers.getRefreshToken;
  setAccessToken = helpers.setAccessToken;
  clearAuth = helpers.clearAuth;
};

export default axiosInstance;
