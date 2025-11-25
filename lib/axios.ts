import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { RefreshTokenResponse } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

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
  resolve: (value?: unknown) => void;
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

// Request interceptor - Thêm access token vào header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Lấy access token từ Zustand store
    const token = getAccessToken();
    
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
      isRefreshing = true;

      try {
        // Gọi API refresh token
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
          // RefreshToken không có sẵn (có thể do page refresh)
          // User cần login lại
          console.warn("⚠️ No refresh token available. User needs to re-login.");
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

        // Retry request ban đầu với token mới
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Log error để debugging
        console.error("❌ Token refresh failed:", refreshError);
        
        processQueue(refreshError as Error, null);
        
        // Xóa token và redirect về login
        clearAuth();
        
        if (typeof window !== "undefined") {
          // TODO: Cải thiện UX - Sử dụng Next.js router thay vì hard redirect
          // hoặc emit event để component xử lý
          window.location.href = "/";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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
