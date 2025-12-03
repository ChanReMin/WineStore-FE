import { unstable_cache } from "next/cache";
import type { CategoriesResponse } from "@/services/categoryService";

/**
 * Cache danh sách categories
 * Categories ít thay đổi nên revalidate lâu hơn
 * Revalidate: 1 giờ
 */
export const getCachedCategories = unstable_cache(
  async (): Promise<CategoriesResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["categories"] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  },
  ["categories"],
  {
    revalidate: 3600, // 1 giờ
    tags: ["categories"],
  }
);

/**
 * Cache chi tiết category
 * Revalidate: 1 giờ
 */
export const getCachedCategoryDetail = unstable_cache(
  async (categoryId: number): Promise<any> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["categories", `category-${categoryId}`] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch category detail");
    }

    return response.json();
  },
  ["category-detail"],
  {
    revalidate: 3600, // 1 giờ
    tags: ["categories"],
  }
);
