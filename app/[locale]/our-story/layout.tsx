import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story - Wine Store",
  description:
    "Discover the journey of Wine Store, from our founding in 1970 to becoming a trusted name in premium wine retail. Learn about our philosophy, heritage, and the passionate team behind every bottle.",
  openGraph: {
    title: "Our Story - Wine Store",
    description:
      "Five decades of passion, growth, and dedication to the art of wine. Discover our journey, values, and the team that makes it all possible.",
    images: [
      {
        url: "/hero/slide-6.jpg",
        width: 1200,
        height: 630,
        alt: "Wine Store - Our Story",
      },
    ],
  },
};

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
