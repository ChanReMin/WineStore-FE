"use client";

import type { ReactNode } from "react";

// Provider đơn giản chỉ để wrap children
// Auth logic đã được chuyển sang Zustand store và useAuth hook
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
