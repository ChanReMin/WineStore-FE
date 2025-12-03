import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string; slug: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, slug, locale } = await params;

  // Có thể fetch product data ở đây để tạo dynamic metadata
  // const product = await fetchProductDetail(Number(id));

  return {
    title: `Chi tiết sản phẩm - Wine Store`,
    description: `Xem chi tiết sản phẩm ${slug}. Thông tin đầy đủ về rượu vang cao cấp, giá cả, xuất xứ và đánh giá.`,
    keywords: `${slug}, wine, rượu vang, premium wine, chi tiết sản phẩm`,
    openGraph: {
      title: `Chi tiết sản phẩm - Wine Store`,
      description: `Xem chi tiết sản phẩm ${slug}. Thông tin đầy đủ về rượu vang cao cấp.`,
      type: "website",
      url: `/${locale}/shop/${id}/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Chi tiết sản phẩm - Wine Store`,
      description: `Xem chi tiết sản phẩm ${slug}`,
    },
    alternates: {
      canonical: `/${locale}/shop/${id}/${slug}`,
      languages: {
        "vi-VN": `/vi/shop/${id}/${slug}`,
        "en-US": `/en/shop/${id}/${slug}`,
      },
    },
  };
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
