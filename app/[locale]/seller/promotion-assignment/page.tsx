"use client";

import { useState, useEffect } from "react";
import { PromotionProductDnD } from "@/components/seller/promotion/PromotionProductDnD";
import type { Promotion } from "@/types/promotion";
import { useTranslations } from "next-intl";
import { fetchPromotions } from "@/services/promotionService";
import { fetchProducts } from "@/services/productService";
import type { Product } from "@/types/product";
import { toast } from "react-toastify";

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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [promotionsResponse, productsResponse] = await Promise.all([
        fetchPromotions({ status: 1, limit: 100 }), // Only active promotions
        fetchProducts({ status: 1, includePromotions: true, limit: 100 }), // Only approved products with promotions
      ]);

      setPromotions(promotionsResponse.data.promotions);

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
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-600 mt-1">{t("subtitle")}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <PromotionProductDnD
          promotions={promotions}
          initialProducts={products}
          onDataChange={loadData}
        />
      </div>
    </div>
  );
}
