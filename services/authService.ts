import axiosInstance from "@/lib/axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenResponse,
} from "@/types/auth";

export const authService = {
  // Đăng ký
  register: async (data: RegisterRequest) => {
    const response = await axiosInstance.post<LoginResponse>(
      "/api/v1/auth/register",
      data
    );
    return response.data;
  },

  // Đăng nhập
  login: async (data: LoginRequest) => {
    const response = await axiosInstance.post<LoginResponse>(
      "/api/v1/auth/login",
      data,
      {
        withCredentials: false, // Tạm tắt để test CORS
      }
    );
    return response.data;
  },

  // Làm mới token
  refreshToken: async (refreshToken: string) => {
    const response = await axiosInstance.post<RefreshTokenResponse>(
      "/api/v1/auth/refresh",
      { refreshToken }
    );
    return response.data;
  },

  // Đăng xuất
  logout: async () => {
    const response = await axiosInstance.post("/api/v1/auth/logout");
    return response.data;
  },
};
