import { Metadata } from "next";
import SellerManagementList from "@/components/admin/seller-management/SellerManagementList";

export const metadata: Metadata = {
  title: "Seller Management | Admin Dashboard",
  description: "Manage sellers and seller members",
};

export default function SellerManagementPage() {
  return <SellerManagementList />;
}
