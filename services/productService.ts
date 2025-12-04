import axiosInstance from "@/lib/axios";
import type { Product, ProductResponse } from "@/types/product";
import type { AxiosRequestConfig } from "axios";

export interface RequestConfig extends AxiosRequestConfig {
  signal?: AbortSignal;
}

export interface ProductDetailResponse {
  success: boolean;
  data: Product;
}

export interface UpdateProductStatusPayload {
  status: 0 | 1 | 2; // 0: pending, 1: approved, 2: banned
  note?: string;
}

export interface UpdateProductStatusResponse {
  success: boolean;
  message: string;
  data?: Product;
}

/**
 * Lấy danh sách sản phẩm cho shop (public API - chỉ approved products)
 */
export const fetchShopProducts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  brandId?: number;
  priceFrom?: number;
  priceTo?: number;
  concentrationFrom?: number;
  concentrationTo?: number;
}): Promise<ProductResponse> => {
  const {
    page = 1,
    limit = 9,
    search,
    categoryId,
    brandId,
    priceFrom,
    priceTo,
    concentrationFrom,
    concentrationTo,
  } = params || {};

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  // Add optional filters
  if (search) queryParams.append("search", search);
  if (categoryId) queryParams.append("categoryId", categoryId.toString());
  if (brandId) queryParams.append("brandId", brandId.toString());
  if (priceFrom !== undefined)
    queryParams.append("priceFrom", priceFrom.toString());
  if (priceTo !== undefined) queryParams.append("priceTo", priceTo.toString());
  if (concentrationFrom !== undefined)
    queryParams.append("concentrationFrom", concentrationFrom.toString());
  if (concentrationTo !== undefined)
    queryParams.append("concentrationTo", concentrationTo.toString());

  const response = await axiosInstance.get<ProductResponse>(
    `/api/v1/products/public?${queryParams.toString()}`
  );

  return response.data;
};

/**
 * Lấy danh sách tất cả sản phẩm với phân trang và filters (for seller/admin)
 */
export const fetchProducts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: number; // 0: pending, 1: approved, 2: banned
  categoryId?: number;
  warehouseId?: number;
  brandId?: number;
  priceFrom?: number;
  priceTo?: number;
  concentrationFrom?: number;
  concentrationTo?: number;
}, config?: RequestConfig): Promise<ProductResponse> => {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    categoryId,
    warehouseId,
    brandId,
    priceFrom,
    priceTo,
    concentrationFrom,
    concentrationTo,
  } = params || {};

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  // Add optional filters
  if (search) queryParams.append("search", search);
  if (status !== undefined) queryParams.append("status", status.toString());
  if (categoryId) queryParams.append("categoryId", categoryId.toString());
  if (warehouseId) queryParams.append("warehouseId", warehouseId.toString());
  if (brandId) queryParams.append("brandId", brandId.toString());
  if (priceFrom !== undefined)
    queryParams.append("priceFrom", priceFrom.toString());
  if (priceTo !== undefined) queryParams.append("priceTo", priceTo.toString());
  if (concentrationFrom !== undefined)
    queryParams.append("concentrationFrom", concentrationFrom.toString());
  if (concentrationTo !== undefined)
    queryParams.append("concentrationTo", concentrationTo.toString());

  const response = await axiosInstance.get<ProductResponse>(
    `/api/v1/products?${queryParams.toString()}`,
    config
  );

  return response.data;
};

/**
 * Lấy chi tiết một sản phẩm (cho admin/seller)
 */
export const fetchProductDetail = async (
  productId: number
): Promise<ProductDetailResponse> => {
  const response = await axiosInstance.get<ProductDetailResponse>(
    `/api/v1/products/${productId}`
  );

  return response.data;
};

/**
 * Lấy chi tiết một sản phẩm (public API - cho shop/customer)
 */
export const fetchPublicProductDetail = async (
  productId: number
): Promise<ProductDetailResponse> => {
  const response = await axiosInstance.get<ProductDetailResponse>(
    `/api/v1/products/${productId}/public`
  );

  return response.data;
};

/**
 * Cập nhật trạng thái sản phẩm (approve/reject)
 */
export const updateProductStatus = async (
  productId: number,
  payload: UpdateProductStatusPayload
): Promise<UpdateProductStatusResponse> => {
  const response = await axiosInstance.put<UpdateProductStatusResponse>(
    `/api/v1/products/${productId}/status`,
    payload
  );

  return response.data;
};

/**
 * Approve sản phẩm (status = 1)
 */
export const approveProduct = async (
  productId: number,
  note?: string
): Promise<UpdateProductStatusResponse> => {
  return updateProductStatus(productId, { status: 1, note });
};

/**
 * Ban sản phẩm (status = 2)
 */
export const banProduct = async (
  productId: number,
  note?: string
): Promise<UpdateProductStatusResponse> => {
  return updateProductStatus(productId, { status: 2, note });
};

/**
 * Set sản phẩm về pending (status = 0)
 */
export const setPendingProduct = async (
  productId: number,
  note?: string
): Promise<UpdateProductStatusResponse> => {
  return updateProductStatus(productId, { status: 0, note });
};

export interface UpdateProductPayload {
  categoryId: number;
  brandId: number;
  name: string;
  price: number;
  winetype: string;
  countryOfProduction: string;
  grapeVariety: string;
  concentration: number;
  productionArea: string;
  capacity: number;
  idealtemperature: string;
  humidity: string;
  avoidLight: string;
  placeTheBottleHorizontally: string;
  avoidVibration: string;
  openedWine: string;
  useWineCabinet: string;
  images: string; // Existing image URL (required - must keep current URL)
  image?: File[]; // For file upload (optional - only if user wants to change image)
  description: string;
}

export interface UpdateProductResponse {
  success: boolean;
  message: string;
  data?: Product;
}

/**
 * Cập nhật thông tin sản phẩm
 */
export const updateProduct = async (
  productId: number,
  payload: UpdateProductPayload
): Promise<UpdateProductResponse> => {
  // Create FormData for multipart/form-data
  const formData = new FormData();

  // Append all fields
  formData.append("categoryId", payload.categoryId.toString());
  formData.append("brandId", payload.brandId.toString());
  formData.append("name", payload.name);
  formData.append("price", payload.price.toString());
  formData.append("winetype", payload.winetype);
  formData.append("countryOfProduction", payload.countryOfProduction);
  formData.append("grapeVariety", payload.grapeVariety);
  formData.append("concentration", payload.concentration.toString());
  formData.append("productionArea", payload.productionArea);
  formData.append("capacity", payload.capacity.toString());
  formData.append("idealtemperature", payload.idealtemperature);
  formData.append("humidity", payload.humidity);
  formData.append("avoidLight", payload.avoidLight);
  formData.append(
    "placeTheBottleHorizontally",
    payload.placeTheBottleHorizontally
  );
  formData.append("avoidVibration", payload.avoidVibration);
  formData.append("openedWine", payload.openedWine);
  formData.append("useWineCabinet", payload.useWineCabinet);
  formData.append("description", payload.description);

  // Always send existing images URL (required)
  formData.append("images", payload.images);

  // Append new image files if provided (optional - will replace existing)
  if (payload.image && payload.image.length > 0) {
    for (const imageFile of payload.image) {
      formData.append("image", imageFile);
    }
  }

  const response = await axiosInstance.put<UpdateProductResponse>(
    `/api/v1/products/${productId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export interface CreateProductPayload {
  categoryId: number;
  brandId: number;
  name: string;
  price: number;
  winetype: string;
  countryOfProduction: string;
  grapeVariety: string;
  concentration: number;
  productionArea: string;
  capacity: number;
  idealtemperature: string;
  humidity: string;
  avoidLight: string;
  placeTheBottleHorizontally: string;
  avoidVibration: string;
  openedWine: string;
  useWineCabinet: string;
  image?: File[]; // For file upload (required for create)
  description: string;
}

export interface CreateProductResponse {
  success: boolean;
  message: string;
  data?: Product;
}

/**
 * Tạo sản phẩm mới
 */
export const createProduct = async (
  payload: CreateProductPayload
): Promise<CreateProductResponse> => {
  // Create FormData for multipart/form-data
  const formData = new FormData();

  // Append all fields
  formData.append("categoryId", payload.categoryId.toString());
  formData.append("brandId", payload.brandId.toString());
  formData.append("name", payload.name);
  formData.append("price", payload.price.toString());
  formData.append("winetype", payload.winetype);
  formData.append("countryOfProduction", payload.countryOfProduction);
  formData.append("grapeVariety", payload.grapeVariety);
  formData.append("concentration", payload.concentration.toString());
  formData.append("productionArea", payload.productionArea);
  formData.append("capacity", payload.capacity.toString());
  formData.append("idealtemperature", payload.idealtemperature);
  formData.append("humidity", payload.humidity);
  formData.append("avoidLight", payload.avoidLight);
  formData.append(
    "placeTheBottleHorizontally",
    payload.placeTheBottleHorizontally
  );
  formData.append("avoidVibration", payload.avoidVibration);
  formData.append("openedWine", payload.openedWine);
  formData.append("useWineCabinet", payload.useWineCabinet);
  formData.append("description", payload.description);

  // Append image files if provided
  if (payload.image && payload.image.length > 0) {
    for (const imageFile of payload.image) {
      formData.append("image", imageFile);
    }
  }

  const response = await axiosInstance.post<CreateProductResponse>(
    "/api/v1/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

/**
 * Xóa sản phẩm
 */
export const deleteProduct = async (
  productId: number
): Promise<DeleteProductResponse> => {
  const response = await axiosInstance.delete<DeleteProductResponse>(
    `/api/v1/products/${productId}`
  );

  return response.data;
};

export interface CheckStockResponse {
  success: boolean;
  data: {
    productId: number;
    productName: string;
    available: boolean;
    currentStock: number;
    requestedQuantity: number;
    message: string;
  };
}

/**
 * Kiểm tra tồn kho sản phẩm trước khi đặt hàng
 */
export const checkStock = async (
  productId: number,
  quantity: number
): Promise<CheckStockResponse> => {
  const response = await axiosInstance.post<CheckStockResponse>(
    `/api/v1/products/${productId}/check-stock`,
    { quantity }
  );

  return response.data;
};

export interface RelatedProductsResponse {
  success: boolean;
  data: {
    products: Product[];
  };
}

/**
 * Lấy danh sách sản phẩm liên quan (chỉ lấy 4 sản phẩm đầu tiên)
 */
export const fetchRelatedProducts = async (
  productId: number
): Promise<RelatedProductsResponse> => {
  const response = await axiosInstance.get<RelatedProductsResponse>(
    `/api/v1/products/${productId}/related`
  );

  // Chỉ lấy 4 sản phẩm đầu tiên
  return {
    ...response.data,
    data: {
      products: response.data.data.products.slice(0, 4),
    },
  };
};
