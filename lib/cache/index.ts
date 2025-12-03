/**
 * Centralized cache management for Wine Store
 *
 * Usage:
 * - Import cached functions from this file
 * - Use invalidation functions when data changes
 *
 * Cache Strategy:
 * - Products: 5-10 minutes (frequently updated)
 * - Categories/Brands: 1 hour (rarely updated)
 * - Featured/Best Sellers: 10-30 minutes
 */

// Product caching
export {
  getCachedShopProducts,
  getCachedProductDetail,
  getCachedProductsByCategory,
  getCachedProductsByBrand,
  getCachedFeaturedProducts,
  getCachedBestSellers,
  getCachedNewArrivals,
} from "./productCache";

// Category caching
export {
  getCachedCategories,
  getCachedCategoryDetail,
} from "./categoryCache";

// Brand caching
export {
  getCachedBrands,
  getCachedBrandDetail,
} from "./brandCache";

// Cache invalidation
export {
  invalidateProductCache,
  invalidateCategoryCache,
  invalidateBrandCache,
  invalidateFeaturedCache,
  invalidateBestSellersCache,
  invalidateAllCache,
  invalidateProductAndRelated,
} from "./cacheInvalidation";
