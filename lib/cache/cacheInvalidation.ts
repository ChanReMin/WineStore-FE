import { revalidatePath } from "next/cache";

/**
 * Invalidate cache cho products
 * Sử dụng khi:
 * - Admin approve/reject product
 * - Seller thêm/sửa/xóa product
 * - Product stock thay đổi
 */
export async function invalidateProductCache(productId?: number) {
  // Revalidate shop pages
  revalidatePath("/shop", "page");
  revalidatePath("/", "page"); // Homepage

  if (productId) {
    revalidatePath(`/shop/${productId}`, "page");
  }
}

/**
 * Invalidate cache cho categories
 * Sử dụng khi:
 * - Admin thêm/sửa/xóa category
 */
export async function invalidateCategoryCache(categoryId?: number) {
  // Revalidate pages that use categories
  revalidatePath("/shop", "page");
  revalidatePath("/", "page");

  if (categoryId) {
    revalidatePath(`/shop/category/${categoryId}`, "page");
  }
}

/**
 * Invalidate cache cho brands
 * Sử dụng khi:
 * - Admin thêm/sửa/xóa brand
 */
export async function invalidateBrandCache(brandId?: number) {
  // Revalidate pages that use brands
  revalidatePath("/shop", "page");
  revalidatePath("/", "page");

  if (brandId) {
    revalidatePath(`/shop/brand/${brandId}`, "page");
  }
}

/**
 * Invalidate cache cho featured products
 * Sử dụng khi:
 * - Admin update featured status
 */
export async function invalidateFeaturedCache() {
  revalidatePath("/", "page"); // Homepage
}

/**
 * Invalidate cache cho best sellers
 * Sử dụng khi:
 * - Order hoàn thành (sales count thay đổi)
 */
export async function invalidateBestSellersCache() {
  revalidatePath("/", "page"); // Homepage typically shows best sellers
}

/**
 * Invalidate toàn bộ cache (dùng cẩn thận)
 * Sử dụng khi:
 * - Deploy version mới
 * - Major data migration
 */
export async function invalidateAllCache() {
  // Revalidate all pages in the layout
  revalidatePath("/", "layout");
}

/**
 * Selective invalidation - chỉ invalidate những gì cần thiết
 */
export async function invalidateProductAndRelated(
  productId: number,
  options?: {
    includeCategory?: boolean;
    includeBrand?: boolean;
    includeFeatured?: boolean;
    includeBestSellers?: boolean;
  }
) {
  // Always invalidate product itself
  revalidatePath(`/shop/${productId}`, "page");
  revalidatePath("/shop", "page");

  // Homepage if featured or best sellers
  if (options?.includeFeatured || options?.includeBestSellers) {
    revalidatePath("/", "page");
  }
}
