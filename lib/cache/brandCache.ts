import { unstable_cache } from "next/cache";
import type { BrandsResponse } from "@/services/brandService";

/**
 * Cache danh sách brands
 * Brands ít thay đổi nên revalidate lâu hơn
 * Revalidate: 1 giờ
 */
export const getCachedBrands = unstable_cache(
  async (): Promise<BrandsResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/brands`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["brands"] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    return response.json();
  },
  ["brands"],
  {
    revalidate: 3600, // 1 giờ
    tags: ["brands"],
  }
);

/**
 * Cache chi tiết brand
 * Revalidate: 1 giờ
 */
export const getCachedBrandDetail = unstable_cache(
  async (brandId: number): Promise<any> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/brands/${brandId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["brands", `brand-${brandId}`] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch brand detail");
    }

    return response.json();
  },
  ["brand-detail"],
  {
    revalidate: 3600, // 1 giờ
    tags: ["brands"],
  }
);
