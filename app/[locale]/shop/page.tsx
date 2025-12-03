"use client";

import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Suspense,
  useRef,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Droplet,
  Filter,
  Globe2,
  SlidersHorizontal,
  Sparkles,
  Tag,
} from "lucide-react";
import SearchBar from "@/components/products/SearchBar";
import SortSelect from "@/components/products/SortSelect";
import ProductsGrid from "@/components/products/ProductsGrid";
import Pagination from "@/components/products/Pagination";
import MobileFilterDrawer from "@/components/products/MobileFilterDrawer";
import RangeSlider from "@/components/products/RangeSlider";
import { fetchShopProducts } from "@/services/productService";
import { fetchCategories } from "@/services/categoryService";
import { fetchBrands } from "@/services/brandService";
import type { Product } from "@/types/product";
import { Playfair_Display } from "next/font/google";
import { useDebounce } from "@/hooks/useDebounce";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
});

interface ProductFilters {
  search?: string;
  brandId?: string;
  categoryId?: string;
  priceFrom?: number;
  priceTo?: number;
  concentrationFrom?: number;
  concentrationTo?: number;
  sortby?: string;
  sortorder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // API data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filters synced from URL (for API calls)
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    page: 1,
    limit: 9,
    sortby: "createdAt",
    sortorder: "desc",
  });

  // Local state for all filter inputs (show immediately, debounce before updating URL)
  const [localFilters, setLocalFilters] = useState<ProductFilters>({
    search: "",
    page: 1,
    limit: 9,
    sortby: "createdAt",
    sortorder: "desc",
  });

  // Ref to store the latest localFilters without triggering useCallback re-creation
  const localFiltersRef = useRef<ProductFilters>(localFilters);

  // Update ref whenever localFilters changes
  useEffect(() => {
    localFiltersRef.current = localFilters;
  }, [localFilters]);

  // Debounced function to push filters to URL (for text inputs like search)
  const debouncedPushFiltersToURL = useDebounce((filtersToApply: ProductFilters) => {
    pushFiltersToURL(filtersToApply);
  }, 300); // 300ms debounce for search and range inputs

  // Sync filters with URL params
  useEffect(() => {
    const urlFilters: ProductFilters = {
      search: searchParams.get("search") || "",
      brandId: searchParams.get("brandId") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      priceFrom: searchParams.get("priceFrom")
        ? Number(searchParams.get("priceFrom"))
        : undefined,
      priceTo: searchParams.get("priceTo")
        ? Number(searchParams.get("priceTo"))
        : undefined,
      concentrationFrom: searchParams.get("concentrationFrom")
        ? Number(searchParams.get("concentrationFrom"))
        : undefined,
      concentrationTo: searchParams.get("concentrationTo")
        ? Number(searchParams.get("concentrationTo"))
        : undefined,
      sortby: searchParams.get("sortby") || "createdAt",
      sortorder: (searchParams.get("sortorder") as "asc" | "desc") || "desc",
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: 9,
    };
    console.log("URL sync - searchParams changed, new page:", urlFilters.page);
    setFilters(urlFilters);
    setLocalFilters(urlFilters);
  }, [searchParams]); // Sync with URL changes

  // Fetch categories and brands on mount
  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          fetchCategories(),
          fetchBrands(),
        ]);
        setCategories(categoriesRes.data.categories);
        setBrands(brandsRes.data.brands);
      } catch (error) {
        console.error("Error loading filters data:", error);
        // Set empty arrays on error
        setCategories([]);
        setBrands([]);
      }
    };
    loadFiltersData();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    let isCancelled = false;

    const loadProducts = async () => {
      setIsLoading(true);
      console.log("Fetching products with page:", filters.page);
      try {
        const response = await fetchShopProducts({
          page: filters.page,
          limit: filters.limit,
          search: filters.search || undefined,
          categoryId: filters.categoryId
            ? Number(filters.categoryId)
            : undefined,
          brandId: filters.brandId ? Number(filters.brandId) : undefined,
          priceFrom: filters.priceFrom,
          priceTo: filters.priceTo,
          concentrationFrom: filters.concentrationFrom,
          concentrationTo: filters.concentrationTo,
        });

        if (!isCancelled) {
          console.log(
            "API Response - currentPage:",
            response.data.pagination.currentPage
          );
          setProducts(response.data.products);
          setTotalItems(response.data.pagination.totalItems);
          setTotalPages(response.data.pagination.totalPages);
          setCurrentPage(response.data.pagination.currentPage);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error fetching products:", error);
          // Set empty array on error
          setProducts([]);
          setTotalItems(0);
          setTotalPages(0);
          setCurrentPage(1);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isCancelled = true;
    };
  }, [
    filters.page,
    filters.limit,
    filters.search,
    filters.categoryId,
    filters.brandId,
    filters.priceFrom,
    filters.priceTo,
    filters.concentrationFrom,
    filters.concentrationTo,
  ]);

  // Products are now fetched from API, no need for client-side filtering
  const filteredProducts = products;

  // Push filters to URL (triggers API call via useEffect)
  const pushFiltersToURL = useCallback(
    (filtersToApply: ProductFilters) => {
      const params = new URLSearchParams();

      if (filtersToApply.search) params.set("search", filtersToApply.search);
      if (filtersToApply.brandId) params.set("brandId", filtersToApply.brandId);
      if (filtersToApply.categoryId)
        params.set("categoryId", filtersToApply.categoryId);
      if (filtersToApply.priceFrom)
        params.set("priceFrom", String(filtersToApply.priceFrom));
      if (filtersToApply.priceTo)
        params.set("priceTo", String(filtersToApply.priceTo));
      if (filtersToApply.concentrationFrom)
        params.set(
          "concentrationFrom",
          String(filtersToApply.concentrationFrom)
        );
      if (filtersToApply.concentrationTo)
        params.set("concentrationTo", String(filtersToApply.concentrationTo));
      if (filtersToApply.sortby && filtersToApply.sortby !== "createdAt")
        params.set("sortby", filtersToApply.sortby);
      if (filtersToApply.sortorder && filtersToApply.sortorder !== "desc")
        params.set("sortorder", filtersToApply.sortorder);
      if (filtersToApply.page && filtersToApply.page > 1)
        params.set("page", String(filtersToApply.page));

      const newParamsString = params.toString();
      const currentParamsString = searchParams.toString();

      if (newParamsString !== currentParamsString) {
        const newUrl = newParamsString ? `?${newParamsString}` : "?";
        console.log("Pushing URL:", newUrl, "with page:", filtersToApply.page);
        router.replace(newUrl, { scroll: false });
      }
    },
    [searchParams, router]
  );

  // Immediate filter change (no debounce) - for dropdowns and pagination
  const handleFilterChangeImmediate = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      console.log("handleFilterChangeImmediate called with:", newFilters);

      const currentFilters = localFiltersRef.current;

      // Merge with current local filters
      const updatedFilters = {
        ...currentFilters,
        ...newFilters,
      };

      // Reset to page 1 ONLY if we're actually changing search/filters values
      // AND if page is not explicitly being set
      if (newFilters.page === undefined) {
        const isFilterChange = Object.keys(newFilters).some((key) => {
          if (key === "page" || key === "limit") return false;
          const newValue = newFilters[key as keyof ProductFilters];
          const currentValue = currentFilters[key as keyof ProductFilters];
          return newValue !== currentValue;
        });

        if (isFilterChange) {
          updatedFilters.page = 1;
        }
      }

      console.log("updatedFilters:", updatedFilters);

      // Update local state immediately
      setLocalFilters(updatedFilters);

      // Push to URL (triggers API call)
      pushFiltersToURL(updatedFilters);
    },
    [pushFiltersToURL]
  );

  // Debounced filter change - for text inputs (search, price, concentration)
  // Using useCallback without localFilters dependency to prevent SearchBar re-triggering
  const handleFilterChange = useCallback(
    (newFilters: Partial<ProductFilters>, immediate = false) => {
      console.log(
        "handleFilterChange called with:",
        newFilters,
        "immediate:",
        immediate
      );

      // Capture current filters BEFORE updating state
      const currentFilters = localFiltersRef.current;

      // Update local state immediately for display
      setLocalFilters((prev) => ({ ...prev, ...newFilters }));

      // Prepare updated filters
      const updatedFilters = { ...currentFilters, ...newFilters };

      // Reset to page 1 if changing filters (not pagination)
      // BUT only if page is not explicitly being set
      if (newFilters.page === undefined) {
        const isFilterChange = Object.keys(newFilters).some((key) => {
          if (key === "page" || key === "limit") return false;
          return (
            newFilters[key as keyof ProductFilters] !==
            currentFilters[key as keyof ProductFilters]
          );
        });

        if (isFilterChange) {
          updatedFilters.page = 1;
        }
      }

      // If immediate (pagination, dropdowns, checkboxes), push to URL right away
      if (immediate) {
        console.log("Immediate filter change, pushing to URL:", updatedFilters);
        pushFiltersToURL(updatedFilters);
        return;
      }

      // For text inputs and range sliders, use debounced push
      console.log("Debounced filter change, scheduling URL push:", updatedFilters);
      debouncedPushFiltersToURL(updatedFilters);
    },
    [pushFiltersToURL, debouncedPushFiltersToURL]
  );

  const handleSortChange = useCallback(
    (sortValue: string) => {
      const [sortby, sortorder] = sortValue.split("_");
      const order =
        sortorder === "asc" || sortorder === "desc" ? sortorder : "desc";

      handleFilterChange(
        {
          sortby: sortby === "created" ? "createdAt" : sortby,
          sortorder: order,
          page: 1,
        },
        true
      ); // immediate
    },
    [handleFilterChange]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      console.log("handlePageChange called with page:", page);
      if (page !== currentPage) {
        handleFilterChangeImmediate({ page }); // Use immediate function directly
        // Scroll after a short delay to ensure page change has been processed
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      }
    },
    [handleFilterChangeImmediate, currentPage]
  );

  const handleReset = useCallback(() => {
    // Reset local filters
    const resetFilters: ProductFilters = {
      search: "",
      page: 1,
      limit: 9,
      sortby: "createdAt",
      sortorder: "desc",
    };
    setLocalFilters(resetFilters);
    router.push("?", { scroll: false });
  }, [router]);

  const currentSort = `${localFilters.sortby}_${localFilters.sortorder}`;
  const activeFilterCount = [
    localFilters.brandId,
    localFilters.categoryId,
    localFilters.priceFrom,
    localFilters.priceTo,
    localFilters.concentrationFrom,
    localFilters.concentrationTo,
  ].filter(
    (value) => value !== undefined && value !== null && value !== ""
  ).length;

  const filterChips = useMemo(
    () =>
      [
        localFilters.brandId
          ? {
              key: "brandId",
              label:
                brands.find(
                  (brand) => brand.id === Number(localFilters.brandId)
                )?.name || "Brand",
              icon: <Tag className="h-3.5 w-3.5 text-[#7b5b2c]" />,
              onRemove: () => handleFilterChange({ brandId: undefined }, true),
            }
          : null,
        localFilters.categoryId
          ? {
              key: "categoryId",
              label:
                categories.find(
                  (category) => category.id === Number(localFilters.categoryId)
                )?.name || "Category",
              icon: <Globe2 className="h-3.5 w-3.5 text-[#7b5b2c]" />,
              onRemove: () =>
                handleFilterChange({ categoryId: undefined }, true),
            }
          : null,
        localFilters.priceFrom || localFilters.priceTo
          ? {
              key: "price",
              label: `Price $${localFilters.priceFrom?.toLocaleString() || "0"} - $${
                localFilters.priceTo?.toLocaleString() || "∞"
              }`,
              icon: <BadgeCheck className="h-3.5 w-3.5 text-[#7b5b2c]" />,
              onRemove: () =>
                handleFilterChange(
                  {
                    priceFrom: undefined,
                    priceTo: undefined,
                  },
                  true
                ),
            }
          : null,
        localFilters.concentrationFrom || localFilters.concentrationTo
          ? {
              key: "abv",
              label: `ABV ${localFilters.concentrationFrom || 0}% - ${
                localFilters.concentrationTo || "∞"
              }%`,
              icon: <Droplet className="h-3.5 w-3.5 text-[#7b5b2c]" />,
              onRemove: () =>
                handleFilterChange(
                  {
                    concentrationFrom: undefined,
                    concentrationTo: undefined,
                  },
                  true
                ),
            }
          : null,
      ].filter(Boolean),
    [
      localFilters.brandId,
      localFilters.categoryId,
      localFilters.priceFrom,
      localFilters.priceTo,
      localFilters.concentrationFrom,
      localFilters.concentrationTo,
      brands,
      categories,
      handleFilterChange,
    ]
  );

  const priceSnapshot = useMemo(() => {
    if (!filteredProducts.length) {
      return { min: 0, max: 0, avg: 0 };
    }

    const prices = filteredProducts.map((product) => product.price);
    const total = prices.reduce((sum, value) => sum + value, 0);

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(total / prices.length),
    };
  }, [filteredProducts]);

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
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-linear-to-r from-[#3b4417]/30 via-transparent to-[#3b4417]/30" />

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
                className="h-px w-24 md:w-40 bg-linear-to-r from-transparent via-[#d4af37] to-transparent"
              />
              <span className="text-[12px] italic tracking-[0.3em] text-[#d4af37] font-light">
                estd 1970
              </span>
              <motion.span
                animate={{ scaleX: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="h-px w-24 md:w-40 bg-linear-to-r from-transparent via-[#d4af37] to-transparent"
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
                value={localFilters.search || ""}
                onChange={(value) => {
                  handleFilterChange({ search: value || undefined });
                }}
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
          {(localFilters.brandId ||
            localFilters.categoryId ||
            localFilters.priceFrom ||
            localFilters.priceTo ||
            localFilters.concentrationFrom ||
            localFilters.concentrationTo) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 flex flex-wrap items-center gap-2"
            >
              <span className="text-[12px] uppercase tracking-[0.2em] text-neutral-900">
                Active Filters:
              </span>

              {localFilters.brandId && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() =>
                    handleFilterChange({ brandId: undefined }, true)
                  }
                  className="flex items-center gap-2 bg-[#3b4417]/10 px-3 py-1.5 text-[12px] text-[#3b4417] transition-all hover:bg-[#3b4417]/20"
                >
                  <span>
                    {
                      brands.find((b) => b.id === Number(localFilters.brandId))
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

              {(localFilters.priceFrom || localFilters.priceTo) && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() =>
                    handleFilterChange(
                      {
                        priceFrom: undefined,
                        priceTo: undefined,
                      },
                      true
                    )
                  }
                  className="flex items-center gap-2 bg-[#3b4417]/10 px-3 py-1.5 text-[12px] text-[#3b4417] transition-all hover:bg-[#3b4417]/20"
                >
                  <span>
                    Price: ${localFilters.priceFrom?.toLocaleString() || "0"} -
                    ${localFilters.priceTo?.toLocaleString() || "∞"}
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

              {(localFilters.concentrationFrom ||
                localFilters.concentrationTo) && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() =>
                    handleFilterChange(
                      {
                        concentrationFrom: undefined,
                        concentrationTo: undefined,
                      },
                      true
                    )
                  }
                  className="flex items-center gap-2 bg-[#3b4417]/10 px-3 py-1.5 text-[12px] text-[#3b4417] transition-all hover:bg-[#3b4417]/20"
                >
                  <span>
                    ABV: {localFilters.concentrationFrom || "0"}% -{" "}
                    {localFilters.concentrationTo || "∞"}%
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
            className="hidden w-80 shrink-0 lg:block"
          >
            <div className="sticky top-24 space-y-6 bg-linear-to-br from-white to-neutral-50 p-8 shadow-lg border border-neutral-100">
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
              </div>

              {/* Brand Filter */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                  Brand
                </label>
                <div className="relative">
                  <select
                    value={localFilters.brandId || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        { brandId: e.target.value || undefined },
                        true
                      )
                    }
                    className="w-full appearance-none border-2 border-neutral-200 bg-white px-4 py-3.5 text-[14px] text-neutral-800 transition-all hover:border-neutral-300 focus:border-[#3b4417] focus:outline-none focus:shadow-md focus:shadow-[#3b4417]/10 cursor-pointer"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name} - {brand.country}
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
                    value={localFilters.categoryId || ""}
                    onChange={(e) =>
                      handleFilterChange(
                        { categoryId: e.target.value || undefined },
                        true
                      )
                    }
                    className="w-full appearance-none border-2 border-neutral-200 bg-white px-4 py-3.5 text-[14px] text-neutral-800 transition-all hover:border-neutral-300 focus:border-[#3b4417] focus:outline-none focus:shadow-md focus:shadow-[#3b4417]/10 cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
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

              {/* Price Range */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                  Price Range
                </label>
                <RangeSlider
                  min={0}
                  max={2000000}
                  step={100}
                  value={[
                    localFilters.priceFrom || 0,
                    localFilters.priceTo || 2000000,
                  ]}
                  onChange={([min, max]) => {
                    console.log("Price range changed:", min, max);
                    handleFilterChange(
                      {
                        priceFrom: min > 0 ? min : undefined,
                        priceTo: max < 2000000 ? max : undefined,
                      },
                      true
                    );
                  }}
                  unit=""
                  formatValue={(val) => `${val.toLocaleString()}`}
                />
              </div>

              {/* Concentration Range */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                  ABV (Alcohol)
                </label>
                <RangeSlider
                  min={0}
                  max={100}
                  step={0.5}
                  value={[
                    localFilters.concentrationFrom || 0,
                    localFilters.concentrationTo || 100,
                  ]}
                  onChange={([min, max]) => {
                    console.log("ABV range changed:", min, max);
                    handleFilterChange(
                      {
                        concentrationFrom: min > 0 ? min : undefined,
                        concentrationTo: max < 100 ? max : undefined,
                      },
                      true
                    );
                  }}
                  unit="%"
                />
              </div>

              {/* Reset Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="w-full bg-linear-to-r from-[#3b4417] to-[#4a5520] px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-white shadow-md transition-all hover:shadow-lg hover:shadow-[#3b4417]/30"
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
                  currentPage={currentPage}
                  totalPages={totalPages}
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

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fdfbf5] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#3b4417] border-r-transparent"></div>
            <p className="mt-4 text-sm text-neutral-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
