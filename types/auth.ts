// Auth Types
export interface User {
  id: number;
  email: string;
  username: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    user: User;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  data: {
    access_token: string;
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
