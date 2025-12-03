import type { Metadata } from "next";
import PromotionsManagement from "@/components/seller/promotion/PromotionsManagement";

export const metadata: Metadata = {
  title: "Quản lý khuyến mãi | Seller",
  description:
    "Tạo và quản lý các chương trình khuyến mãi cho sản phẩm của bạn.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PromotionsPage() {
  return <PromotionsManagement />;
}
