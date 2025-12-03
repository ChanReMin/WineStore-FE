import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết đơn hàng",
  description:
    "Xem chi tiết đơn hàng, trạng thái giao hàng và thông tin thanh toán.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
