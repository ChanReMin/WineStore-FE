// API service for Admin Seller Management

import { axiosInstance } from "./axios";

export interface Seller {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string; // "seller"
  status: string; // "active" | "inactive"
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  lastLogin?: string;
  totalOrders: number;
  totalSpent: number;
}

export interface SellerListResponse {
  success: boolean;
  message: string;
  data: {
    users: Seller[];
    pagination: {
      limit: number;
      currentPage: number;
      totalPages: number;
      totalUsers: number;
    };
  };
}

export interface SellerDetailResponse {
  success: boolean;
  data: Seller;
}

/**
 * Fetch sellers list with filters
 * @param params - Query parameters including page, limit, search, status, sortBy, sortOrder
 * @returns SellerListResponse with sellers data and pagination
 */
export const fetchSellers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<SellerListResponse> => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      sortBy,
      sortOrder = "desc",
    } = params || {};

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());
    queryParams.append("role", "seller");

    // Add status filter if provided and not "all"
    if (status && status !== "all") {
      queryParams.append("status", status);
    }

    // Add search query if provided
    if (search) {
      queryParams.append("search", search);
    }

    // Add sorting if provided
    if (sortBy) {
      queryParams.append("sortBy", sortBy);
    }
    if (sortOrder) {
      queryParams.append("sortOrder", sortOrder);
    }

    const response = await axiosInstance.get<SellerListResponse>(
      `/api/v1/users?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching sellers:", error);
    throw error;
  }
};

/**
 * Fetch seller detail by ID
 * @param sellerId - Seller ID
 * @returns SellerDetailResponse with seller data
 */
export const fetchSellerDetail = async (
  sellerId: string | number
): Promise<SellerDetailResponse> => {
  try {
    const response = await axiosInstance.get<SellerDetailResponse>(
      `/api/v1/users/${sellerId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching seller detail:", error);
    throw error;
  }
};

/**
 * Create a new seller
 * @param data - Seller creation data
 * @returns Success response with new seller data
 */
export const createSeller = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender: number;
  role: number;
}): Promise<{ success: boolean; message: string; data: Seller }> => {
  try {
    const response = await axiosInstance.post<{
      success: boolean;
      message: string;
      data: Seller;
    }>("/api/v1/users", { ...data, role: "seller" });

    return response.data;
  } catch (error) {
    console.error("Error creating seller:", error);
    throw error;
  }
};

/**
 * Update seller information
 * @param sellerId - Seller ID
 * @param data - Partial seller data to update
 * @returns Success response with updated seller data
 */
export const updateSeller = async (
  sellerId: string | number,
  data: {
    name?: string;
    phone?: string;
    email?: string;
  }
): Promise<{ success: boolean; message: string; data: Seller }> => {
  try {
    const response = await axiosInstance.put<{
      success: boolean;
      message: string;
      data: Seller;
    }>(`/api/v1/users/${sellerId}`, data);

    return response.data;
  } catch (error) {
    console.error("Error updating seller:", error);
    throw error;
  }
};

/**
 * Update seller status
 * @param sellerId - Seller ID
 * @param status - New status ("active" | "inactive" | "locked")
 * @param reason - Optional reason for status change
 * @returns Success response
 */
export const updateSellerStatus = async (
  sellerId: string | number,
  status: string,
  reason?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.patch<{
      success: boolean;
      message: string;
    }>(`/api/v1/users/${sellerId}/status`, { status, reason });

    return response.data;
  } catch (error) {
    console.error("Error updating seller status:", error);
    throw error;
  }
};

/**
 * Update seller password
 * @param sellerId - Seller ID
 * @param newPassword - New password
 * @returns Success response
 */
export const updateSellerPassword = async (
  sellerId: string | number,
  newPassword: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.patch<{
      success: boolean;
      message: string;
    }>(`/api/v1/users/${sellerId}/password`, { password: newPassword });

    return response.data;
  } catch (error) {
    console.error("Error updating seller password:", error);
    throw error;
  }
};

/**
 * Delete seller (soft delete)
 * @param sellerId - Seller ID
 * @returns Success response
 */
export const deleteSeller = async (
  sellerId: string | number
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.delete<{
      success: boolean;
      message: string;
    }>(`/api/v1/users/${sellerId}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting seller:", error);
    throw error;
  }
};
