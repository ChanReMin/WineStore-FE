"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { fetchProducts, updateProduct, createProduct, deleteProduct } from "@/services/productService";
import type { Product, Summary } from "@/types/product";
import ProductSummaryCards from "@/components/seller/dashboard/ProductSummaryCards";
import ProductFilters from "@/components/seller/dashboard/ProductFilters";
import ProductsTable from "@/components/seller/dashboard/ProductsTable";
import ProductPagination from "@/components/seller/dashboard/ProductPagination";
import ProductFormModal from "@/components/seller/dashboard/ProductFormModal";
import type { ProductFormData } from "@/types/productForm";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const t = useTranslations("seller.products");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [concentrationFrom, setConcentrationFrom] = useState("");
  const [concentrationTo, setConcentrationTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Debounced values for price and concentration
  const [debouncedPriceFrom, setDebouncedPriceFrom] = useState("");
  const [debouncedPriceTo, setDebouncedPriceTo] = useState("");
  const [debouncedConcentrationFrom, setDebouncedConcentrationFrom] = useState("");
  const [debouncedConcentrationTo, setDebouncedConcentrationTo] = useState("");
  
  // API data states
  const [products, setProducts] = useState<Product[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    pending: 0,
    active: 0,
    banned: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Debounce price and concentration inputs (2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceFrom(priceFrom);
      setDebouncedPriceTo(priceTo);
      setDebouncedConcentrationFrom(concentrationFrom);
      setDebouncedConcentrationTo(concentrationTo);
    }, 2000);

    return () => clearTimeout(timer);
  }, [priceFrom, priceTo, concentrationFrom, concentrationTo]);

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProducts({
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery || undefined,
          status: statusFilter !== "all" ? Number(statusFilter) : undefined,
          categoryId: categoryFilter !== "all" ? Number(categoryFilter) : undefined,
          brandId: brandFilter !== "all" ? Number(brandFilter) : undefined,
          warehouseId: warehouseFilter !== "all" ? Number(warehouseFilter) : undefined,
          priceFrom: debouncedPriceFrom ? Number(debouncedPriceFrom) : undefined,
          priceTo: debouncedPriceTo ? Number(debouncedPriceTo) : undefined,
          concentrationFrom: debouncedConcentrationFrom ? Number(debouncedConcentrationFrom) : undefined,
          concentrationTo: debouncedConcentrationTo ? Number(debouncedConcentrationTo) : undefined,
        });
        
        setProducts(response.data.products);
        setSummary(response.data.summary);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Không thể tải danh sách sản phẩm");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [
    currentPage, 
    itemsPerPage, 
    searchQuery,
    statusFilter, 
    categoryFilter, 
    brandFilter,
    warehouseFilter,
    debouncedPriceFrom,
    debouncedPriceTo,
    debouncedConcentrationFrom,
    debouncedConcentrationTo
  ]);

  // Clear all filters
  const handleClearFilters = () => {
    setCategoryFilter("all");
    setBrandFilter("all");
    setWarehouseFilter("all");
    setPriceFrom("");
    setPriceTo("");
    setConcentrationFrom("");
    setConcentrationTo("");
  };

  // No need for client-side filtering anymore - API handles all filters
  const filteredProducts = products;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    statusFilter, 
    categoryFilter, 
    brandFilter,
    warehouseFilter,
    debouncedPriceFrom,
    debouncedPriceTo,
    debouncedConcentrationFrom,
    debouncedConcentrationTo
  ]);

  // Handlers
  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      await createProduct({
        categoryId: data.categoryId,
        brandId: data.brandId,
        name: data.name,
        price: data.price,
        winetype: data.winetype,
        countryOfProduction: data.countryOfProduction,
        grapeVariety: data.grapeVariety,
        concentration: data.concentration,
        productionArea: data.productionArea,
        capacity: data.capacity,
        idealtemperature: data.idealtemperature,
        humidity: data.humidity,
        avoidLight: data.avoidLight,
        placeTheBottleHorizontally: data.placeTheBottleHorizontally,
        avoidVibration: data.avoidVibration,
        openedWine: data.openedWine,
        useWineCabinet: data.useWineCabinet,
        images: data.imageFiles,
        description: data.description,
      });
      
      toast.success("Tạo sản phẩm thành công! Đang chờ Admin phê duyệt.");
      
      // Reload products list
      const response = await fetchProducts({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? Number(statusFilter) : undefined,
        categoryId: categoryFilter !== "all" ? Number(categoryFilter) : undefined,
        brandId: brandFilter !== "all" ? Number(brandFilter) : undefined,
        warehouseId: warehouseFilter !== "all" ? Number(warehouseFilter) : undefined,
        priceFrom: debouncedPriceFrom ? Number(debouncedPriceFrom) : undefined,
        priceTo: debouncedPriceTo ? Number(debouncedPriceTo) : undefined,
        concentrationFrom: debouncedConcentrationFrom ? Number(debouncedConcentrationFrom) : undefined,
        concentrationTo: debouncedConcentrationTo ? Number(debouncedConcentrationTo) : undefined,
      });
      
      setProducts(response.data.products);
      setSummary(response.data.summary);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Không thể tạo sản phẩm. Vui lòng thử lại!");
    }
  };

  const handleEditProduct = async (id: number, data: ProductFormData) => {
    try {
      await updateProduct(id, {
        categoryId: data.categoryId,
        brandId: data.brandId,
        name: data.name,
        price: data.price,
        winetype: data.winetype,
        countryOfProduction: data.countryOfProduction,
        grapeVariety: data.grapeVariety,
        concentration: data.concentration,
        productionArea: data.productionArea,
        capacity: data.capacity,
        idealtemperature: data.idealtemperature,
        humidity: data.humidity,
        avoidLight: data.avoidLight,
        placeTheBottleHorizontally: data.placeTheBottleHorizontally,
        avoidVibration: data.avoidVibration,
        openedWine: data.openedWine,
        useWineCabinet: data.useWineCabinet,
        images: data.imageFiles, // Send File objects, not base64 strings
        description: data.description,
      });
      
      toast.success("Cập nhật sản phẩm thành công!");
      
      // Reload products list
      const response = await fetchProducts({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? Number(statusFilter) : undefined,
        categoryId: categoryFilter !== "all" ? Number(categoryFilter) : undefined,
        brandId: brandFilter !== "all" ? Number(brandFilter) : undefined,
        warehouseId: warehouseFilter !== "all" ? Number(warehouseFilter) : undefined,
        priceFrom: debouncedPriceFrom ? Number(debouncedPriceFrom) : undefined,
        priceTo: debouncedPriceTo ? Number(debouncedPriceTo) : undefined,
        concentrationFrom: debouncedConcentrationFrom ? Number(debouncedConcentrationFrom) : undefined,
        concentrationTo: debouncedConcentrationTo ? Number(debouncedConcentrationTo) : undefined,
      });
      
      setProducts(response.data.products);
      setSummary(response.data.summary);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Không thể cập nhật sản phẩm. Vui lòng thử lại!");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      
      toast.success("Xóa sản phẩm thành công!");
      
      // Reload products list
      const response = await fetchProducts({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
        status: statusFilter !== "all" ? Number(statusFilter) : undefined,
        categoryId: categoryFilter !== "all" ? Number(categoryFilter) : undefined,
        brandId: brandFilter !== "all" ? Number(brandFilter) : undefined,
        warehouseId: warehouseFilter !== "all" ? Number(warehouseFilter) : undefined,
        priceFrom: debouncedPriceFrom ? Number(debouncedPriceFrom) : undefined,
        priceTo: debouncedPriceTo ? Number(debouncedPriceTo) : undefined,
        concentrationFrom: debouncedConcentrationFrom ? Number(debouncedConcentrationFrom) : undefined,
        concentrationTo: debouncedConcentrationTo ? Number(debouncedConcentrationTo) : undefined,
      });
      
      setProducts(response.data.products);
      setSummary(response.data.summary);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Không thể xóa sản phẩm. Vui lòng thử lại!");
    }
  };

  const handleAddPromotionToProduct = (
    productId: number,
    promotionIds: number[]
  ) => {
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
            {t("title")}
          </h1>
          <p className="text-[#7a8451]">{t("subtitle")}</p>
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
            {t("addProduct")}
          </motion.button>
        </div>
      </div>

      {/* Summary Cards */}
      <ProductSummaryCards summary={summary} />

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
        warehouseFilter={warehouseFilter}
        onWarehouseChange={setWarehouseFilter}
        priceFrom={priceFrom}
        onPriceFromChange={setPriceFrom}
        priceTo={priceTo}
        onPriceToChange={setPriceTo}
        concentrationFrom={concentrationFrom}
        onConcentrationFromChange={setConcentrationFrom}
        concentrationTo={concentrationTo}
        onConcentrationToChange={setConcentrationTo}
        onClearFilters={handleClearFilters}
        summary={summary}
      />

      {/* Products Table */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b4417]"></div>
        </div>
      ) : (
        <ProductsTable
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onAddPromotion={handleAddPromotionToProduct}
        />
      )}

      {/* Pagination */}
      {pagination.totalItems > 0 && (
        <ProductPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
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
