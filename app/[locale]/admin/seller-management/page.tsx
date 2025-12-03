import { Metadata } from "next";
import SellerManagementList from "@/components/admin/seller-management/SellerManagementList";

export const metadata: Metadata = {
  title: "Quản lý Seller | Admin",
  description: "Quản lý các seller và thành viên của seller trong hệ thống.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SellerManagementPage() {
  return <SellerManagementList />;
}
