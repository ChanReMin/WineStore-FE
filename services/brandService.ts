import axiosInstance from "@/lib/axios";

export interface Brand {
  id: number;
  name: string;
  country: string;
  productsCount: number;
}

export interface BrandsResponse {
  success: boolean;
  data: {
    brands: Brand[];
  };
}

/**
 * Lấy danh sách tất cả brands
 */
export const fetchBrands = async (): Promise<BrandsResponse> => {
  const response = await axiosInstance.get<BrandsResponse>(
    "/api/v1/brands"
  );
  
  return response.data;
};
