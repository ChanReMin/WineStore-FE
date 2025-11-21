"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/products/SearchBar";
import SortSelect from "@/components/products/SortSelect";
import ProductsGrid from "@/components/products/ProductsGrid";
import Pagination from "@/components/products/Pagination";
import { MOCK_PRODUCTS, MOCK_BRANDS, MOCK_CATEGORIES } from "@/lib/mockData";

export default function ProductsDemoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("created_at_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  // Filter products based on search and filters
  let filteredProducts = [...MOCK_PRODUCTS];

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedBrand) {
    filteredProducts = filteredProducts.filter(
      (p) => p.brand.id === Number(selectedBrand)
    );
  }

  if (priceMin) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= Number(priceMin)
    );
  }

  if (priceMax) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= Number(priceMax)
    );
  }

  // Sort products
  const [sortBy, sortOrder] = sortValue.split("_");
  filteredProducts.sort((a, b) => {
    if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    }
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredProducts.length / 8);
  const displayProducts = filteredProducts.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );

  const handleReset = () => {
    setSearchQuery("");
    setSelectedBrand("");
    setSelectedCategory("");
    setPriceMin("");
    setPriceMax("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b border-neutral-200 bg-gradient-to-b from-[#33391d] to-[#2a2f18] py-16 text-white"
      >
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-center font-serif text-4xl font-bold uppercase tracking-wider md:text-5xl"
          >
            Bộ sưu tập rượu vang
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-center text-amber-100"
          >
            Demo UI với Mock Data - Khám phá những chai rượu vang cao cấp
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Search & Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 lg:max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className="flex items-center gap-4">
            <SortSelect value={sortValue} onChange={setSortValue} />
          </div>
        </div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm text-neutral-600"
        >
          Hiển thị {displayProducts.length} trong tổng số{" "}
          {filteredProducts.length} sản phẩm
        </motion.div>

        {/* Content Grid */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden w-64 flex-shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold uppercase tracking-wider text-neutral-800">
                  Bộ lọc
                </h2>
                <button
                  onClick={handleReset}
                  className="text-sm text-neutral-600 transition-colors hover:text-[#33391d]"
                >
                  Xóa tất cả
                </button>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3">
                <label className="block text-sm font-medium uppercase tracking-wide text-neutral-700">
                  Thương hiệu
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                >
                  <option value="">Tất cả thương hiệu</option>
                  {MOCK_BRANDS.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="block text-sm font-medium uppercase tracking-wide text-neutral-700">
                  Danh mục
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                >
                  <option value="">Tất cả danh mục</option>
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
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="block text-sm font-medium uppercase tracking-wide text-neutral-700">
                  Khoảng giá (VNĐ)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Từ"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full rounded-sm border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 transition-all focus:border-[#33391d] focus:outline-none focus:ring-2 focus:ring-[#33391d]/20"
                  />
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full border border-[#33391d] bg-[#33391d] px-4 py-3 text-sm uppercase tracking-wider text-amber-50 transition-all hover:bg-[#2a2f18]"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <ProductsGrid products={displayProducts} isLoading={false} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
