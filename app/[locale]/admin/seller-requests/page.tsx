import type { Metadata } from "next";
import SellerRequests from "@/components/admin/seller-requests/SellerRequests";

export const metadata: Metadata = {
  title: "Yêu cầu trở thành Seller | Admin",
  description: "Xét duyệt các yêu cầu đăng ký trở thành seller từ người dùng.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SellerRequestsPage() {
  return <SellerRequests />;
}
