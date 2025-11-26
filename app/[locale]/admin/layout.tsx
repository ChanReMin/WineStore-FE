"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import AdminSidebar from "@/components/admin/shared/AdminSidebar";
import AdminHeader from "@/components/admin/shared/AdminHeader";
import { LoaderOne } from "@/components/ui/loader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("admin.layout");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Đợi một chút để auth state được restore từ localStorage
    const timer = setTimeout(() => {
      // Check if user is authenticated
      if (!isAuthenticated) {
        router.push(`/${locale}`);
        return;
      }

      // Check if user is an admin
      if (user?.role !== "ADMIN") {
        setIsLoading(false);
        setTimeout(() => {
          router.push(`/${locale}`);
        }, 2000);
        return;
      }

      setIsLoading(false);
    }, 100); // Đợi 100ms để state được restore

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router, locale]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-50">
        <LoaderOne />
      </div>
    );
  }

  // Access denied for non-admins
  if (user?.role !== "ADMIN") {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-red-200 bg-white p-8 shadow-lg">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-neutral-900">
              Access Denied
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              You do not have permission to access the admin panel.
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Redirecting to homepage...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout flex h-screen overflow-hidden bg-neutral-50">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
