import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story - Wine Store",
  description:
    "Discover the journey of Wine Store since 1970. Learn about our passion for exceptional wines, our expert team, and our commitment to bringing the world's finest wines to your table.",
  openGraph: {
    title: "Our Story - Wine Store",
    description:
      "50+ years of passion, craftsmanship, and dedication to exceptional wines. Meet our team and discover what makes us different.",
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
