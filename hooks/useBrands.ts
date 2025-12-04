import { useQuery } from "@tanstack/react-query";
import { fetchBrands } from "@/services/brandService";

/**
 * Custom hook để fetch brands với React Query
 * Brands thường ít thay đổi nên cache lâu hơn
 */
export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await fetchBrands();
      return response.data.brands;
    },
    staleTime: 10 * 60 * 1000, // 10 phút - Brands ít thay đổi
    gcTime: 30 * 60 * 1000, // 30 phút - Keep cache lâu hơn
  });
};
