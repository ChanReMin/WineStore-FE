import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Quản trị hệ thống, theo dõi hoạt động và thống kê tổng quan.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
