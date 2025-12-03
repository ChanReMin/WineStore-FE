import { Metadata } from "next";
import UserManagementList from "@/components/admin/user-management/UserManagementList";

export const metadata: Metadata = {
  title: "Quản lý người dùng | Admin",
  description: "Quản lý người dùng, phân quyền và vai trò trong hệ thống.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UserManagementPage() {
  return <UserManagementList />;
}
