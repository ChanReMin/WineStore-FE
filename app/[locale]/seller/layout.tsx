"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import SellerSidebar from "@/components/seller/shared/SellerSidebar";
import SellerHeader from "@/components/seller/shared/SellerHeader";
import { LoaderOne } from "@/components/ui/loader";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("seller.layout");
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

      // Check if user is a seller
      if (user?.role !== "SELLER" && user?.role !== "ADMIN") {
        // Show error and redirect after 2 seconds
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

  return (
    <div className="seller-layout flex h-screen overflow-hidden bg-neutral-50">
      {/* Sidebar */}
      <SellerSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <SellerHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
