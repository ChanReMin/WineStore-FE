"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/Footer/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Ẩn Header và Footer khi ở trang seller hoặc admin
  const isSellerPage = pathname?.includes("/seller");
  const isAdminPage = pathname?.includes("/admin");
  const hideLayout = isSellerPage || isAdminPage;

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
