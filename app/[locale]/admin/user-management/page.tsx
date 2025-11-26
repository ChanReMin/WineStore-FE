import { Metadata } from "next";
import UserManagementList from "@/components/admin/user-management/UserManagementList";

export const metadata: Metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage users, roles, and permissions",
};

export default function UserManagementPage() {
  return <UserManagementList />;
}
