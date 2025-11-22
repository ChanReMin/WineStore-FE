"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import SellerSidebar from "@/components/seller/shared/SellerSidebar";
import SellerHeader from "@/components/seller/shared/SellerHeader";
import { LoaderOne } from "@/components/ui/loader";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuth();
  const authLoading = false; // Auth loading is handled by Zustand store
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    // Check if user is a seller
    if (user?.role !== "SELLER" && user?.role !== "ADMIN") {
      // Show error and redirect after 2 seconds
      setIsLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 2000);
      return;
    }

    setIsLoading(false);
  }, [authLoading, isAuthenticated, user, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-50">
       <LoaderOne />
      </div>
    );
  }

  // Access denied for non-sellers
  if (user?.role !== "SELLER" && user?.role !== "ADMIN") {
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
              Access denied
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              You do not have permission to access the seller dashboard.
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
