import { unstable_cache } from "next/cache";
import type { Product, ProductResponse } from "@/types/product";
import type { ProductDetailResponse } from "@/services/productService";

/**
 * Cache danh sách sản phẩm shop (approved products)
 * Revalidate: 5 phút
 */
export const getCachedShopProducts = unstable_cache(
  async (params?: {
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
    queryParams.append("status", "1"); // Only approved products

    if (search) queryParams.append("search", search);
    if (categoryId) queryParams.append("categoryId", categoryId.toString());
    if (brandId) queryParams.append("brandId", brandId.toString());
    if (priceFrom !== undefined)
      queryParams.append("priceFrom", priceFrom.toString());
    if (priceTo !== undefined)
      queryParams.append("priceTo", priceTo.toString());
    if (concentrationFrom !== undefined)
      queryParams.append("concentrationFrom", concentrationFrom.toString());
    if (concentrationTo !== undefined)
      queryParams.append("concentrationTo", concentrationTo.toString());

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["products", "shop-products"] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  },
  ["shop-products"],
  {
    revalidate: 300, // 5 phút
    tags: ["products", "shop-products"],
  }
);

/**
 * Cache chi tiết sản phẩm
 * Revalidate: 10 phút
 */
export const getCachedProductDetail = unstable_cache(
  async (productId: number): Promise<ProductDetailResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["products", "product-detail", `product-${productId}`] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product detail");
    }

    return response.json();
  },
  ["product-detail"],
  {
    revalidate: 600, // 10 phút
    tags: ["products", "product-detail"],
  }
);

/**
 * Cache sản phẩm theo category
 * Revalidate: 5 phút
 */
export const getCachedProductsByCategory = unstable_cache(
  async (
    categoryId: number,
    page: number = 1,
    limit: number = 9
  ): Promise<ProductResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());
    queryParams.append("categoryId", categoryId.toString());
    queryParams.append("status", "1"); // Only approved products

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["products", "shop-products", `category-${categoryId}`] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }

    return response.json();
  },
  ["products-by-category"],
  {
    revalidate: 300, // 5 phút
    tags: ["products", "categories"],
  }
);

/**
 * Cache sản phẩm theo brand
 * Revalidate: 5 phút
 */
export const getCachedProductsByBrand = unstable_cache(
  async (
    brandId: number,
    page: number = 1,
    limit: number = 9
  ): Promise<ProductResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());
    queryParams.append("brandId", brandId.toString());
    queryParams.append("status", "1"); // Only approved products

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["products", "shop-products", `brand-${brandId}`] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products by brand");
    }

    return response.json();
  },
  ["products-by-brand"],
  {
    revalidate: 300, // 5 phút
    tags: ["products", "brands"],
  }
);

/**
 * Cache sản phẩm nổi bật (featured products)
 * Revalidate: 10 phút
 */
export const getCachedFeaturedProducts = unstable_cache(
  async (limit: number = 8): Promise<ProductResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", limit.toString());
    queryParams.append("status", "1");
    queryParams.append("featured", "true");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["products", "featured-products"] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch featured products");
    }

    return response.json();
  },
  ["featured-products"],
  {
    revalidate: 600, // 10 phút
    tags: ["featured", "products"],
  }
);

/**
 * Cache best sellers
 * Revalidate: 30 phút
 */
export const getCachedBestSellers = unstable_cache(
  async (limit: number = 10): Promise<ProductResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", limit.toString());
    queryParams.append("status", "1");
    queryParams.append("sortBy", "sales");
    queryParams.append("order", "desc");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["products", "best-sellers"] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch best sellers");
    }

    return response.json();
  },
  ["best-sellers"],
  {
    revalidate: 1800, // 30 phút
    tags: ["best-sellers", "products"],
  }
);

/**
 * Cache new arrivals
 * Revalidate: 15 phút
 */
export const getCachedNewArrivals = unstable_cache(
  async (limit: number = 10): Promise<ProductResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("limit", limit.toString());
    queryParams.append("status", "1");
    queryParams.append("sortBy", "createdAt");
    queryParams.append("order", "desc");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["products", "new-arrivals"] },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch new arrivals");
    }

    return response.json();
  },
  ["new-arrivals"],
  {
    revalidate: 900, // 15 phút
    tags: ["new-arrivals", "products"],
  }
);
