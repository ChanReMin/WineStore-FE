"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus} from "lucide-react";
import { mockProductList } from "@/lib/products.mock";
import ProductSummaryCards from "@/components/seller/dashboard/ProductSummaryCards";
import ProductFilters from "@/components/seller/dashboard/ProductFilters";
import ProductsTable from "@/components/seller/dashboard/ProductsTable";
import ProductPagination from "@/components/seller/dashboard/ProductPagination";
import ProductFormModal from "@/components/seller/dashboard/ProductFormModal";
import type { ProductFormData } from "@/types/productForm";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [concentrationFrom, setConcentrationFrom] = useState("");
  const [concentrationTo, setConcentrationTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Clear all filters
  const handleClearFilters = () => {
    setCategoryFilter("all");
    setBrandFilter("all");
    setPriceFrom("");
    setPriceTo("");
    setConcentrationFrom("");
    setConcentrationTo("");
  };

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    let filtered = mockProductList.data.products;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.status === Number.parseInt(statusFilter)
      );
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category_id === Number.parseInt(categoryFilter)
      );
    }

    // Filter by brand
    if (brandFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.brand_id === Number.parseInt(brandFilter)
      );
    }

    // Filter by price range
    if (priceFrom !== "") {
      const minPrice = Number.parseFloat(priceFrom);
      filtered = filtered.filter((product) => product.price >= minPrice);
    }
    if (priceTo !== "") {
      const maxPrice = Number.parseFloat(priceTo);
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    // Filter by concentration range
    if (concentrationFrom !== "") {
      const minConcentration = Number.parseFloat(concentrationFrom);
      filtered = filtered.filter(
        (product) => product.concentration >= minConcentration
      );
    }
    if (concentrationTo !== "") {
      const maxConcentration = Number.parseFloat(concentrationTo);
      filtered = filtered.filter(
        (product) => product.concentration <= maxConcentration
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [
    searchQuery,
    statusFilter,
    categoryFilter,
    brandFilter,
    priceFrom,
    priceTo,
    concentrationFrom,
    concentrationTo,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    statusFilter,
    categoryFilter,
    brandFilter,
    priceFrom,
    priceTo,
    concentrationFrom,
    concentrationTo,
  ]);

  // Handlers
  const handleCreateProduct = async (data: ProductFormData) => {
    // TODO: Call API POST /seller/products
    // await createProduct(data);
    toast.success("Create successful products! (Mock)");
  };

  const handleEditProduct = async (id: number, data: ProductFormData) => {
    // TODO: Call API PUT /seller/products/{id}
    // await updateProduct(id, data);
    toast.success(`Updated product #${id} successfully! (Mock)`);
  };

  const handleDeleteProduct = async (id: number) => {
    // TODO: Call API DELETE /seller/products/{id}
    // await deleteProduct(id);
    toast.success(`Deleted product #${id} successfully! (Mock)`);
  };

  const handleAddPromotionToProduct = (productId: number, promotionIds: number[]) => {
    // TODO: Call API POST /seller/products/{productId}/promotions
    // await addPromotionsToProduct(productId, promotionIds);
    toast.success(
      `Added ${promotionIds.length} promotions to product #${productId}! (Mock)`
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3b4417] tracking-wide mb-2">
            Product Management
          </h1>
          <p className="text-[#7a8451]">
            Manage product list and track approval status
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#3b4417] text-white rounded-lg hover:bg-[#2a2f18] transition-colors font-medium shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </motion.button>
        </div>
      </div>

      {/* Summary Cards */}
      <ProductSummaryCards summary={mockProductList.data.summary} />

      {/* Filters */}
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        brandFilter={brandFilter}
        onBrandChange={setBrandFilter}
        priceFrom={priceFrom}
        onPriceFromChange={setPriceFrom}
        priceTo={priceTo}
        onPriceToChange={setPriceTo}
        concentrationFrom={concentrationFrom}
        onConcentrationFromChange={setConcentrationFrom}
        concentrationTo={concentrationTo}
        onConcentrationToChange={setConcentrationTo}
        onClearFilters={handleClearFilters}
        summary={mockProductList.data.summary}
      />

      {/* Pagination Stats (Optional) */}
      {/* <PaginationStats
        totalItems={mockProductList.data.products.length}
        filteredItems={filteredProducts.length}
        currentPageItems={paginatedProducts.length}
        isFiltered={searchQuery !== "" || statusFilter !== "all"}
      /> */}

      {/* Products Table */}
      <ProductsTable
        products={paginatedProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onAddPromotion={handleAddPromotionToProduct}
      />

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}

      {/* Create Product Modal */}
      <ProductFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProduct}
        mode="create"
      />
    </div>
  );
}
