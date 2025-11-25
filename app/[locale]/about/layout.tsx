import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Us - Wine Store",
    description:
      "Learn about Wine Store's mission, values, and commitment to excellence. Discover what makes us the premier destination for wine enthusiasts worldwide.",
    openGraph: {
      title: "About Us - Wine Store",
      description:
        "Premium wine retail with expert curation, sustainable practices, and unparalleled customer service. Your trusted wine partner since 1970.",
      images: [
        {
          url: "/hero/slide-1.jpg",
          width: 1200,
          height: 630,
          alt: "Wine Store - About Us",
        },
      ],
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

