import { Metadata } from "next";
import WarehouseApprovalList from "@/components/admin/warehouse-approval/WarehouseApprovalList";

export const metadata: Metadata = {
  title: "Warehouse Approval | Admin Dashboard",
  description: "Manage warehouse approval requests from sellers",
};

export default function WarehouseApprovalPage() {
  return <WarehouseApprovalList />;
}
