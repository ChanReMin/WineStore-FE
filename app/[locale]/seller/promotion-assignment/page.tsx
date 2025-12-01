"use client";

import { useState, useEffect } from "react";
import { PromotionProductDnD } from "@/components/seller/promotion/PromotionProductDnD";
import type { Promotion } from "@/types/promotion";
import { useTranslations } from "next-intl";
import { fetchPromotions } from "@/services/promotionService";
import { fetchProducts } from "@/services/productService";
import type { Product } from "@/types/product";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductWithPromotions {
  id: number;
  name: string;
  price: number;
  promotions: Promotion[];
}

export default function PromotionAssignmentPage() {
  const t = useTranslations("seller.promotions.assignment");
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [products, setProducts] = useState<ProductWithPromotions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination state for promotions
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(5);
  
  // Pagination state for products
  const [productCurrentPage, setProductCurrentPage] = useState(1);
  const [productTotalPages, setProductTotalPages] = useState(1);
  const [productTotalItems, setProductTotalItems] = useState(0);
  const [productPerPage, setProductPerPage] = useState(10);

  useEffect(() => {
    loadData();
  }, [currentPage, productCurrentPage]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [promotionsResponse, productsResponse] = await Promise.all([
        fetchPromotions({ status: 1, limit: perPage, page: currentPage }), // Only active promotions
        fetchProducts({ status: 1, limit: productPerPage, page: productCurrentPage }), // Only approved products with promotions
      ]);

      setPromotions(promotionsResponse.data.promotions);
      
      // Update pagination info for promotions
      if (promotionsResponse.data.pagination) {
        setTotalPages(promotionsResponse.data.pagination.total_pages);
        setTotalItems(promotionsResponse.data.pagination.total_items);
        if (promotionsResponse.data.pagination.per_page) {
          setPerPage(promotionsResponse.data.pagination.per_page);
        }
      }
      
      // Update pagination info for products
      if (productsResponse.data.pagination) {
        setProductTotalPages(productsResponse.data.pagination.totalPages);
        setProductTotalItems(productsResponse.data.pagination.totalItems);
      }

      // Transform products to include promotions
      const productsWithPromotions: ProductWithPromotions[] =
        productsResponse.data.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          promotions: product.promotions || [],
        }));

      setProducts(productsWithPromotions);
    } catch (error: any) {
      console.error("Error loading data:", error);
      toast.error(
        error?.response?.data?.message || "Không thể tải dữ liệu"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleProductPageChange = (page: number) => {
    if (page >= 1 && page <= productTotalPages) {
      setProductCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-[1800px] mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
            <p className="text-sm text-gray-600 mt-1">{t("subtitle")}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-gray-600 mt-4">Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
              <p className="text-sm text-gray-600 mt-1">{t("subtitle")}</p>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Showing {promotions.length} of {totalItems} promotions
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <PromotionProductDnD
          promotions={promotions}
          initialProducts={products}
          onDataChange={loadData}
          productPagination={{
            currentPage: productCurrentPage,
            totalPages: productTotalPages,
            totalItems: productTotalItems,
            onPageChange: handleProductPageChange,
          }}
        />
      </div>
    </div>
  );
}
