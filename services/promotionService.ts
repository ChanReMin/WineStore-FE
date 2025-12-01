import axiosInstance from "@/lib/axios";
import type {
  Promotion,
  PromotionListResponse,
  PromotionDetailResponse,
  PromotionStatisticsResponse,
  PromotionFormData,
} from "@/types/promotion";

/**
 * Lấy danh sách khuyến mãi
 */
export const fetchPromotions = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: number | "all"; // 0: inactive, 1: active, "all": all
}): Promise<PromotionListResponse> => {
  const { page = 1, limit = 10, search, status } = params || {};

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  if (search) {
    queryParams.append("search", search);
  }

  if (status && status !== "all") {
    queryParams.append("status", status.toString());
  }

  const response = await axiosInstance.get<PromotionListResponse>(
    `/api/v1/promotions?${queryParams.toString()}`
  );

  return response.data;
};

/**
 * Lấy chi tiết khuyến mãi
 */
export const fetchPromotionDetail = async (
  promotionId: number
): Promise<PromotionDetailResponse> => {
  const response = await axiosInstance.get<PromotionDetailResponse>(
    `/api/v1/promotions/${promotionId}`
  );

  return response.data;
};

/**
 * Tạo khuyến mãi mới
 */
export interface CreatePromotionResponse {
  success: boolean;
  message: string;
  data: Promotion;
}

export const createPromotion = async (
  data: PromotionFormData
): Promise<CreatePromotionResponse> => {
  const response = await axiosInstance.post<CreatePromotionResponse>(
    "/api/v1/promotions",
    data
  );

  return response.data;
};

/**
 * Cập nhật khuyến mãi
 */
export interface UpdatePromotionResponse {
  success: boolean;
  message: string;
  data: Promotion;
}

export const updatePromotion = async (
  promotionId: number,
  data: Partial<PromotionFormData>
): Promise<UpdatePromotionResponse> => {
  const response = await axiosInstance.put<UpdatePromotionResponse>(
    `/api/v1/promotions/${promotionId}`,
    data
  );

  return response.data;
};

/**
 * Xóa khuyến mãi
 */
export interface DeletePromotionResponse {
  success: boolean;
  message: string;
}

export const deletePromotion = async (
  promotionId: number
): Promise<DeletePromotionResponse> => {
  const response = await axiosInstance.delete<DeletePromotionResponse>(
    `/api/v1/promotions/${promotionId}`
  );

  return response.data;
};

/**
 * Lấy thống kê khuyến mãi
 */
export const fetchPromotionStatistics = async (
  promotionId: number
): Promise<PromotionStatisticsResponse> => {
  const response = await axiosInstance.get<PromotionStatisticsResponse>(
    `/api/v1/promotions/${promotionId}/statistics`
  );

  return response.data;
};

/**
 * Gán khuyến mãi cho sản phẩm
 */
export interface AssignPromotionToProductResponse {
  success: boolean;
  message: string;
}

export const assignPromotionToProduct = async (
  productId: number,
  promotionId: number
): Promise<AssignPromotionToProductResponse> => {
  const response = await axiosInstance.post<AssignPromotionToProductResponse>(
    `/api/v1/products/${productId}/promotions`,
    { promotionIds: [promotionId] }
  );

  return response.data;
};

/**
 * Gỡ khuyến mãi khỏi sản phẩm
 */
export interface RemovePromotionFromProductResponse {
  success: boolean;
  message: string;
}

export const removePromotionFromProduct = async (
  productId: number,
  promotionId: number
): Promise<RemovePromotionFromProductResponse> => {
  const response =
    await axiosInstance.delete<RemovePromotionFromProductResponse>(
      `/api/v1/products/${productId}/promotions/${promotionId}`
    );

  return response.data;
};

