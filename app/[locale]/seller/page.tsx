import type { Metadata } from "next";
import SellerDashboard from "@/components/seller/dashboard/SellerDashboard";

export const metadata: Metadata = {
  title: "Seller Dashboard",
  description: "Quản lý cửa hàng, sản phẩm, đơn hàng và doanh thu của bạn.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SellerDashboardPage() {
  return <SellerDashboard />;
}
