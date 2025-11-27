"use client";

import { PromotionProductDnD } from "@/components/seller/promotion/PromotionProductDnD";
import type { Promotion } from "@/types/promotion";
import { useTranslations } from "next-intl";

// Mock data
const mockPromotions: Promotion[] = [
  {
    id: 1,
    code: "SUMMER2024",
    name: "Giảm giá mùa hè",
    description: "Giảm 10% cho đơn hàng từ 1,000,000 VND",
    discounttype: 1,
    discountvalue: 10,
    startdate: "2024-06-01T00:00:00Z",
    enddate: "2024-08-31T23:59:59Z",
    maxusage: 1000,
    usedcount: 345,
    status: 1,
    createdAt: "2024-05-01T00:00:00Z",
  },
  {
    id: 2,
    code: "WINEFEST2024",
    name: "Lễ hội rượu vang",
    description: "Giảm 20% cho tất cả đơn hàng",
    discounttype: 1,
    discountvalue: 20,
    startdate: "2024-07-15T00:00:00Z",
    enddate: "2024-09-15T23:59:59Z",
    maxusage: 500,
    usedcount: 120,
    status: 1,
    createdAt: "2024-06-01T00:00:00Z",
  },
  {
    id: 3,
    code: "REDWINE2024",
    name: "Khuyến mãi rượu đỏ",
    description: "Giảm 5% khi mua từ 2 chai rượu đỏ trở lên",
    discounttype: 1,
    discountvalue: 5,
    startdate: "2024-05-01T00:00:00Z",
    enddate: "2024-06-30T23:59:59Z",
    maxusage: 300,
    usedcount: 85,
    status: 1,
    createdAt: "2024-04-20T00:00:00Z",
  },
  {
    id: 4,
    code: "PREMIUM2024",
    name: "Ưu đãi dòng cao cấp",
    description: "Giảm 1,000,000 VND cho chai trên 10,000,000 VND",
    discounttype: 2,
    discountvalue: 1000000,
    startdate: "2024-08-01T00:00:00Z",
    enddate: "2024-09-30T23:59:59Z",
    maxusage: 200,
    usedcount: 30,
    status: 1,
    createdAt: "2024-07-10T00:00:00Z",
  },
  {
    id: 5,
    code: "FLASHSALE",
    name: "Flash Sale cuối tuần",
    description: "Giảm 25% cho đơn hàng từ 3,000,000 VND",
    discounttype: 1,
    discountvalue: 25,
    startdate: "2024-09-05T00:00:00Z",
    enddate: "2024-09-07T23:59:59Z",
    maxusage: 100,
    usedcount: 65,
    status: 1,
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: 6,
    code: "NEWYEAR2025",
    name: "Chào năm mới",
    description: "Giảm 15% toàn bộ sản phẩm",
    discounttype: 1,
    discountvalue: 15,
    startdate: "2024-12-25T00:00:00Z",
    enddate: "2025-01-10T23:59:59Z",
    maxusage: 800,
    usedcount: 0,
    status: 1,
    createdAt: "2024-12-01T00:00:00Z",
  },
];

const mockProducts = [
  {
    id: 1,
    name: "Château Margaux 2015",
    price: 5940000,
    promotions: [],
  },
  {
    id: 2,
    name: "Bordeaux Grand Cru 2018",
    price: 3500000,
    promotions: [],
  },
  {
    id: 3,
    name: "Penfolds Grange Shiraz",
    price: 12000000,
    promotions: [],
  },
  {
    id: 4,
    name: "Dom Pérignon Vintage",
    price: 8500000,
    promotions: [],
  },
  {
    id: 5,
    name: "Barolo Riserva DOCG",
    price: 4200000,
    promotions: [],
  },
];

export default function PromotionAssignmentPage() {
  const t = useTranslations("seller.promotions.assignment");

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
          promotions={mockPromotions}
          initialProducts={mockProducts}
        />
      </div>
    </div>
  );
}
