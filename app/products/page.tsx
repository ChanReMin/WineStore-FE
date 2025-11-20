"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SearchBar from "@/components/products/SearchBar";
import SortSelect from "@/components/products/SortSelect";
import ProductsGrid from "@/components/products/ProductsGrid";
import Pagination from "@/components/products/Pagination";
import MobileFilterDrawer from "@/components/products/MobileFilterDrawer";
import { MOCK_PRODUCTS, MOCK_BRANDS, MOCK_CATEGORIES } from "@/lib/mockData";
import { Playfair_Display } from "next/font/google";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
});

interface ProductFilters {
  q?: string;
  brand_id?: string;
  category_id?: string;
  price_min?: number;
  price_max?: number;
  concentration_min?: number;
  concentration_max?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filters from URL
  const [filters, setFilters] = useState<ProductFilters>(() => ({
    q: searchParams.get("q") || "",
    brand_id: searchParams.get("brand_id") || undefined,
    category_id: searchParams.get("category_id") || undefined,
    price_min: searchParams.get("price_min")
      ? Number(searchParams.get("price_min"))
      : undefined,
    price_max: searchParams.get("price_max")
      ? Number(searchParams.get("price_max"))
      : undefined,
    concentration_min: searchParams.get("concentration_min")
      ? Number(searchParams.get("concentration_min"))
      : undefined,
    concentration_max: searchParams.get("concentration_max")
      ? Number(searchParams.get("concentration_max"))
      : undefined,
    sort_by: searchParams.get("sort_by") || "created_at",
    sort_order: (searchParams.get("sort_order") as "asc" | "desc") || "desc",
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: 9,
  }));

  // Filter and sort products using mock data
  const { filteredProducts, totalItems, isLoading } = useMemo(() => {
    let products = [...MOCK_PRODUCTS];

    // Apply search filter
    if (filters.q) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.q!.toLowerCase()) ||
          p.country_of_production
            .toLowerCase()
            .includes(filters.q!.toLowerCase())
      );
    }

    // Apply brand filter
    if (filters.brand_id) {
      products = products.filter(
        (p) => p.brand.id === Number(filters.brand_id)
      );
    }

    // Apply category filter
    if (filters.category_id) {
      // Note: Mock data doesn't have category_id, so this is placeholder
      // You can add category_id to MOCK_PRODUCTS if needed
    }

    // Apply price filter
    if (filters.price_min) {
      products = products.filter((p) => p.price >= filters.price_min!);
    }
    if (filters.price_max) {
      products = products.filter((p) => p.price <= filters.price_max!);
    }

    // Apply concentration filter
    if (filters.concentration_min) {
      products = products.filter(
        (p) => p.concentration >= filters.concentration_min!
      );
    }
    if (filters.concentration_max) {
      products = products.filter(
        (p) => p.concentration <= filters.concentration_max!
      );
    }

    // Sort products
    products.sort((a, b) => {
      let comparison = 0;

      if (filters.sort_by === "price") {
        comparison = a.price - b.price;
      } else if (filters.sort_by === "name") {
        comparison = a.name.localeCompare(b.name);
      }

      return filters.sort_order === "asc" ? comparison : -comparison;
    });

    const totalItems = products.length;
    const page = filters.page || 1;
    const limit = filters.limit || 9;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
      filteredProducts: paginatedProducts,
      totalItems,
      isLoading: false,
    };
  }, [filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });

    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  const handleFilterChange = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      setFilters((prev) => ({
        ...prev,
        ...newFilters,
        page: 1, // Reset to first page when filters change
      }));
    },
    []
  );

  const handleSortChange = useCallback((sortValue: string) => {
    const [sort_by, sort_order] = sortValue.split("_");
    const order =
      sort_order === "asc" || sort_order === "desc" ? sort_order : "desc";

    setFilters((prev) => ({
      ...prev,
      sort_by: sort_by === "created" ? "created_at" : sort_by,
      sort_order: order,
      page: 1,
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleReset = useCallback(() => {
    setFilters({
      q: "",
      page: 1,
      limit: 12,
      sort_by: "created_at",
      sort_order: "desc",
    });
  }, []);

  const currentSort = `${filters.sort_by}_${filters.sort_order}`;

  return (
    <div className={`${displaySerif.variable} min-h-screen bg-[#fdfbf5]`}>
      {/* Hero Section - Premium Style with Background Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[70vh] min-h-[600px] overflow-hidden"
      >
        {/* Background Image with Parallax Effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/hero/slide-2.jpg)",
          }}
        />

        {/* Multi-layer Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3b4417]/30 via-transparent to-[#3b4417]/30" />

        {/* Animated Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Particles */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-[10%] h-2 w-2 rounded-full bg-[#d4af37]/40 blur-sm"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-40 right-[15%] h-3 w-3 rounded-full bg-[#d4af37]/30 blur-sm"
          />
          <motion.div
            animate={{
              y: [0, -25, 0],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-32 left-[20%] h-2 w-2 rounded-full bg-[#d4af37]/35 blur-sm"
          />
        </div>

        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.05) 10px,
              rgba(255,255,255,0.05) 20px
            )`,
            }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 mx-auto flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-5xl">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-semibold tracking-[0.25em] text-white uppercase leading-tight">
                Wine
              </h1>
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-3 text-[44px] md:text-[60px] lg:text-[80px] font-bold tracking-[0.2em] uppercase leading-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #d4af37 0%, #f4e5a1 50%, #d4af37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Collection
              </motion.h2>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <motion.span
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
              />
              <span className="text-[12px] italic tracking-[0.3em] text-[#d4af37] font-light">
                estd 1970
              </span>
              <motion.span
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mx-auto mt-10 max-w-3xl text-[16px] md:text-[18px] leading-relaxed text-white/95 font-light"
            >
              Discover premium wines carefully selected from renowned vineyards
              around the world.
              <span className="block mt-2 text-[#d4af37]/90">
                Exquisite flavors, exceptional experience
              </span>
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-16 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-3 text-white/60 cursor-pointer hover:text-white/90 transition-colors"
              >
                <span className="text-[10px] uppercase tracking-[0.25em]">
                  Explore Now
                </span>
                <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/40 p-1">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-white/60"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 md:py-20">
        {/* Search & Filter Bar - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Top Bar with Search and Sort */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex-1 lg:max-w-xl">
              <SearchBar
                value={filters.q || ""}
                onChange={(value) => handleFilterChange({ q: value })}
              />
            </div>

            {/* Sort & Mobile Filter Button */}
            <div className="flex items-center gap-3">
              <SortSelect value={currentSort} onChange={handleSortChange} />

              {/* Mobile Filter Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 bg-[#3b4417] px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] text-white transition-all hover:bg-[#2a2f18] lg:hidden shadow-sm"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
              </motion.button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.brand_id ||
            filters.category_id ||
            filters.price_min ||
            filters.price_max ||
            filters.concentration_min ||
            filters.concentration_max) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 flex flex-wrap items-center gap-2"
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                Active Filters:
              </span>

              {filters.brand_id && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() => handleFilterChange({ brand_id: undefined })}
                  className="flex items-center gap-2 bg-[#3b4417]/10 px-3 py-1.5 text-[12px] text-[#3b4417] transition-all hover:bg-[#3b4417]/20"
                >
                  <span>
                    {
                      MOCK_BRANDS.find((b) => b.id === Number(filters.brand_id))
                        ?.name
                    }
                  </span>
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}

              {(filters.price_min || filters.price_max) && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() =>
                    handleFilterChange({
                      price_min: undefined,
                      price_max: undefined,
                    })
                  }
                  className="flex items-center gap-2 bg-[#3b4417]/10 px-3 py-1.5 text-[12px] text-[#3b4417] transition-all hover:bg-[#3b4417]/20"
                >
                  <span>
                    Price: ${filters.price_min?.toLocaleString() || "0"} - $
                    {filters.price_max?.toLocaleString() || "∞"}
                  </span>
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}

              {(filters.concentration_min || filters.concentration_max) && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() =>
                    handleFilterChange({
                      concentration_min: undefined,
                      concentration_max: undefined,
                    })
                  }
                  className="flex items-center gap-2 bg-[#3b4417]/10 px-3 py-1.5 text-[12px] text-[#3b4417] transition-all hover:bg-[#3b4417]/20"
                >
                  <span>
                    ABV: {filters.concentration_min || "0"}% -{" "}
                    {filters.concentration_max || "∞"}%
                  </span>
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}

              <button
                onClick={handleReset}
                className="ml-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500 underline transition-colors hover:text-[#3b4417]"
              >
                Clear All
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center justify-between border-b border-neutral-200 pb-4"
        >
          <p className="text-[13px] text-neutral-600">
            Showing{" "}
            <span className="font-semibold text-[#3b4417]">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#3b4417]">{totalItems}</span>{" "}
            products
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="flex gap-12">
          {/* Desktop Sidebar - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden w-80 flex-shrink-0 lg:block"
          >
            <div className="sticky top-24 space-y-6 bg-gradient-to-br from-white to-neutral-50 p-8 shadow-lg border border-neutral-100">
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-[#3b4417]/20 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3b4417]/10">
                    <svg
                      className="h-5 w-5 text-[#3b4417]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-[16px] font-semibold uppercase tracking-[0.25em] text-[#3b4417]">
                    Filters
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 underline transition-colors hover:text-[#3b4417]"
                >
                  Clear
                </motion.button>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                  Brand
                </label>
                <div className="relative">
                  <select
                    value={filters.brand_id || ""}
                    onChange={(e) =>
                      handleFilterChange({ brand_id: e.target.value })
                    }
                    className="w-full appearance-none border-2 border-neutral-200 bg-white px-4 py-3.5 text-[14px] text-neutral-800 transition-all hover:border-neutral-300 focus:border-[#3b4417] focus:outline-none focus:shadow-md focus:shadow-[#3b4417]/10 cursor-pointer"
                  >
                    <option value="">All Brands</option>
                    {MOCK_BRANDS.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={filters.category_id || ""}
                    onChange={(e) =>
                      handleFilterChange({ category_id: e.target.value })
                    }
                    className="w-full appearance-none border-2 border-neutral-200 bg-white px-4 py-3.5 text-[14px] text-neutral-800 transition-all hover:border-neutral-300 focus:border-[#3b4417] focus:outline-none focus:shadow-md focus:shadow-[#3b4417]/10 cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    {MOCK_CATEGORIES.map((category) => (
                      <optgroup key={category.id} label={category.name}>
                        <option value={category.id}>{category.name}</option>
                        {category.children?.map((child) => (
                          <option key={child.id} value={child.id}>
                            &nbsp;&nbsp;{child.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.price_min || ""}
                      onChange={(e) =>
                        handleFilterChange({
                          price_min: Number(e.target.value) || undefined,
                        })
                      }
                      className="w-full border-2 border-neutral-200 bg-white px-3 py-3 text-[13px] text-neutral-800 transition-all hover:border-neutral-300 focus:border-[#3b4417] focus:outline-none focus:shadow-md focus:shadow-[#3b4417]/10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400">
                      $
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.price_max || ""}
                      onChange={(e) =>
                        handleFilterChange({
                          price_max: Number(e.target.value) || undefined,
                        })
                      }
                      className="w-full border-2 border-neutral-200 bg-white px-3 py-3 text-[13px] text-neutral-800 transition-all hover:border-neutral-300 focus:border-[#3b4417] focus:outline-none focus:shadow-md focus:shadow-[#3b4417]/10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400">
                      $
                    </span>
                  </div>
                </div>
              </div>

              {/* Concentration Range */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                  ABV (Alcohol)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Min"
                      value={filters.concentration_min || ""}
                      onChange={(e) =>
                        handleFilterChange({
                          concentration_min:
                            Number(e.target.value) || undefined,
                        })
                      }
                      className="w-full border-2 border-neutral-200 bg-white px-3 py-3 text-[13px] text-neutral-800 transition-all hover:border-neutral-300 focus:border-[#3b4417] focus:outline-none focus:shadow-md focus:shadow-[#3b4417]/10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400">
                      %
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Max"
                      value={filters.concentration_max || ""}
                      onChange={(e) =>
                        handleFilterChange({
                          concentration_max:
                            Number(e.target.value) || undefined,
                        })
                      }
                      className="w-full border-2 border-neutral-200 bg-white px-3 py-3 text-[13px] text-neutral-800 transition-all hover:border-neutral-300 focus:border-[#3b4417] focus:outline-none focus:shadow-md focus:shadow-[#3b4417]/10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400">
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-[#3b4417] to-[#4a5520] px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-white shadow-md transition-all hover:shadow-lg hover:shadow-[#3b4417]/30"
              >
                Reset Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1"
          >
            <ProductsGrid products={filteredProducts} isLoading={isLoading} />

            {/* Pagination */}
            {totalItems > (filters.limit || 9) && (
              <div className="mt-16">
                <Pagination
                  currentPage={filters.page || 1}
                  totalPages={Math.ceil(totalItems / (filters.limit || 9))}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={() => {
          handleReset();
          setIsMobileFilterOpen(false);
        }}
      />
    </div>
  );
}
