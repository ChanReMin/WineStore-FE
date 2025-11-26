import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sản phẩm - Wine Store",
  description:
    "Explore our collection of premium wines from around the world. Search and filter by brand, price, concentration and more.",
  keywords:
    "wine, premium wine, French wine, Australian wine, American wine, luxury wine",
  openGraph: {
    title: "Sản phẩm - Wine Store",
    description:
      "Explore our collection of premium wines from around the world. Search and filter by brand, price, concentration and more.",
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
