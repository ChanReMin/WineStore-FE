import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gán khuyến mãi cho sản phẩm | Seller",
  description:
    "Kéo thả để gán các chương trình khuyến mãi cho sản phẩm của bạn.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PromotionAssignmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
