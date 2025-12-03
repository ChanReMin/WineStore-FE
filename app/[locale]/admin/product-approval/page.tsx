import type { Metadata } from "next";
import ProductApprovalList from "@/components/admin/product-approval/ProductApprovalList";

export const metadata: Metadata = {
  title: "Phê duyệt sản phẩm | Admin",
  description: "Quản lý và phê duyệt sản phẩm mới từ seller.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProductApprovalPage() {
  return <ProductApprovalList />;
}
