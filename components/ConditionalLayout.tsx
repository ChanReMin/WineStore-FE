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

  // Ẩn Header và Footer khi ở trang seller
  const isSellerPage = pathname?.startsWith("/seller");

  return (
    <>
      {!isSellerPage && <Header />}
      {children}
      {!isSellerPage && <Footer />}
    </>
  );
}
