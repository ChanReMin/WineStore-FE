import axiosInstance from "@/lib/axios";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  productsCount: number;
}

export interface CategoriesResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}

/**
 * Lấy danh sách tất cả categories
 */
export const fetchCategories = async (): Promise<CategoriesResponse> => {
  const response =
    await axiosInstance.get<CategoriesResponse>("/api/v1/categories");

  return response.data;
};
