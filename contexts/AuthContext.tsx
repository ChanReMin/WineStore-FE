"use client";

import type { ReactNode } from "react";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";

// Provider đơn giản chỉ để wrap children
// Auth logic đã được chuyển sang Zustand store và useAuth hook
export function AuthProvider({ children }: { children: ReactNode }) {
  // Tự động refresh token trước khi hết hạn
  useTokenRefresh();

  return <>{children}</>;
}
