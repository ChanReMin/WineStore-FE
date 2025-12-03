import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi - Wine Store",
  description:
    "Tìm hiểu về Wine Store - Hành trình đam mê rượu vang cao cấp, sứ mệnh và giá trị cốt lõi của chúng tôi.",
  keywords: ["về chúng tôi", "wine store", "câu chuyện", "sứ mệnh", "giá trị"],
  openGraph: {
    title: "Về chúng tôi - Wine Store",
    description:
      "Tìm hiểu về Wine Store - Hành trình đam mê rượu vang cao cấp.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
