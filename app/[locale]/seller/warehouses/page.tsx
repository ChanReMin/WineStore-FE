import type { Metadata } from "next";
import WarehouseManagement from "@/components/seller/warehouse/WarehouseManagement";

export const metadata: Metadata = {
  title: "Quản lý kho hàng | Seller",
  description: "Quản lý các kho hàng, địa điểm lưu trữ sản phẩm.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SellerWarehousesPage() {
  return <WarehouseManagement />;
}
