import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchShopProducts } from "@/services/productService";
import type { ProductResponse } from "@/types/product";

interface UseProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  brandId?: number;
  priceFrom?: number;
  priceTo?: number;
  concentrationFrom?: number;
  concentrationTo?: number;
  enabled?: boolean;
}

/**
 * Custom hook để fetch products với React Query
 * - Tự động cache data
 * - Background refetch
 * - Optimistic updates
 * - Keep previous data khi pagination
 */
export const useProducts = (params: UseProductsParams = {}) => {
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
    enabled = true,
  } = params;

  return useQuery<ProductResponse>({
    queryKey: [
      "products",
      {
        page,
        limit,
        search,
        categoryId,
        brandId,
        priceFrom,
        priceTo,
        concentrationFrom,
        concentrationTo,
      },
    ],
    queryFn: async () => {
      const response = await fetchShopProducts({
        page,
        limit,
        search: search || undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        brandId: brandId ? Number(brandId) : undefined,
        priceFrom,
        priceTo,
        concentrationFrom,
        concentrationTo,
      });
      return response;
    },
    staleTime: 2 * 60 * 1000, // 2 phút - Products data coi là fresh trong 2 phút
    gcTime: 5 * 60 * 1000, // 5 phút - Keep trong cache 5 phút
    placeholderData: keepPreviousData, // Giữ data cũ khi pagination để tránh loading state
    enabled, // Cho phép disable query khi cần
  });
};

/**
 * Custom hook để prefetch products cho trang tiếp theo
 * Giúp navigation mượt mà hơn
 */
export const usePrefetchProducts = () => {
  const queryClient = useQueryClient();

  const prefetchNextPage = async (
    params: UseProductsParams,
    nextPage: number
  ) => {
    await queryClient.prefetchQuery({
      queryKey: [
        "products",
        {
          ...params,
          page: nextPage,
        },
      ],
      queryFn: async () => {
        const response = await fetchShopProducts({
          ...params,
          page: nextPage,
        });
        return response;
      },
      staleTime: 2 * 60 * 1000,
    });
  };

  return { prefetchNextPage };
};
