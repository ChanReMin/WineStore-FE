"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Download, Upload } from "lucide-react";
import { mockProductList } from "@/lib/products.mock";
import ProductSummaryCards from "@/components/seller/dashboard/ProductSummaryCards";
import ProductFilters from "@/components/seller/dashboard/ProductFilters";
import ProductsTable from "@/components/seller/dashboard/ProductsTable";
import ProductPagination from "@/components/seller/dashboard/ProductPagination";
import ProductFormModal from "@/components/seller/dashboard/ProductFormModal";
import type { ProductFormData } from "@/types/productForm";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter products based on search and status
  const filteredProducts = useMemo(() => {
    let filtered = mockProductList.data.products;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.status === Number.parseInt(statusFilter)
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
  }, [searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // Handlers
  const handleCreateProduct = async (data: ProductFormData) => {
    console.log("Creating product:", data);
    // TODO: Call API POST /seller/products
    // await createProduct(data);
    alert("Tạo sản phẩm thành công! (Mock)");
  };

  const handleEditProduct = async (id: number, data: ProductFormData) => {
    console.log("Editing product:", id, data);
    // TODO: Call API PUT /seller/products/{id}
    // await updateProduct(id, data);
    alert(`Cập nhật sản phẩm #${id} thành công! (Mock)`);
  };

  const handleDeleteProduct = async (id: number) => {
    console.log("Deleting product:", id);
    // TODO: Call API DELETE /seller/products/{id}
    // await deleteProduct(id);
    alert(`Xóa sản phẩm #${id} thành công! (Mock)`);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-[#fdfbf5] min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3b4417] tracking-wide mb-2">
            Quản lý sản phẩm
          </h1>
          <p className="text-[#7a8451]">
            Quản lý danh sách sản phẩm và theo dõi trạng thái phê duyệt
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
            Thêm sản phẩm
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
