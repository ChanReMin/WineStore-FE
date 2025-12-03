// Auth Types
export interface User {
  id: number;
  email: string;
  username: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string; // Backend trả về snake_case
    refresh_token: string;
    token_type: string;
    expires_in: number;
    user: User;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  data: {
    access_token: string; // Backend trả về snake_case
    expires_in: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
