"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "CUSTOMER" | "SELLER" | "ADMIN";
  allowedRoles?: Array<"CUSTOMER" | "SELLER" | "ADMIN">; // Support multiple roles
}

export const ProtectedRoute = ({
  children,
  requiredRole,
  allowedRoles,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Small delay to allow store to hydrate from localStorage
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.push("/");
        return;
      }

      // Check role permissions
      const hasRequiredRole = allowedRoles
        ? allowedRoles.includes(user?.role as any)
        : requiredRole
          ? user?.role === requiredRole
          : true;

      if (!hasRequiredRole) {
        router.push("/unauthorized");
        return;
      }

      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, requiredRole, allowedRoles, router]);

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Don't render if wrong role
  const hasRequiredRole = allowedRoles
    ? allowedRoles.includes(user?.role as any)
    : requiredRole
      ? user?.role === requiredRole
      : true;

  if (!hasRequiredRole) {
    return null;
  }

  return <>{children}</>;
};
