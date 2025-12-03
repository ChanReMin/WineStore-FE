import { Metadata } from "next";
import WarehouseApprovalList from "@/components/admin/warehouse-approval/WarehouseApprovalList";

export const metadata: Metadata = {
  title: "Phê duyệt kho hàng | Admin",
  description: "Quản lý và phê duyệt yêu cầu tạo kho hàng từ seller.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WarehouseApprovalPage() {
  return <WarehouseApprovalList />;
}
