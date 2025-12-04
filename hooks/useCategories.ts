import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/categoryService";

/**
 * Custom hook để fetch categories với React Query
 * Categories thường ít thay đổi nên cache lâu hơn
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetchCategories();
      return response.data.categories;
    },
    staleTime: 10 * 60 * 1000, // 10 phút - Categories ít thay đổi
    gcTime: 30 * 60 * 1000, // 30 phút - Keep cache lâu hơn
  });
};
