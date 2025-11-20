import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm - Wine Store",
  description:
    "Khám phá bộ sưu tập rượu vang cao cấp từ khắp nơi trên thế giới. Tìm kiếm và lọc theo thương hiệu, giá cả, nồng độ và nhiều tiêu chí khác.",
  keywords: "rượu vang, wine, vang pháp, vang úc, vang mỹ, rượu cao cấp",
  openGraph: {
    title: "Sản phẩm - Wine Store",
    description:
      "Khám phá bộ sưu tập rượu vang cao cấp từ khắp nơi trên thế giới",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
