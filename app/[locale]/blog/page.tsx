import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/config/seo";
import BlogListingClient from "@/components/blog/BlogListingClient";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Wine Knowledge Blog",
    description:
      "Discover knowledge about wine, from how to distinguish types of wine, the art of enjoying it, to how to preserve it and combine it with dishes.",
    path: "/blog",
    keywords: [
      "wine knowledge",
      "wine education",
      "wine tasting",
      "wine pairing",
      "wine storage",
      "kiến thức rượu vang",
      "cách thưởng thức vang",
      "wine blog",
    ],
  });
}

export default function BlogPage() {
  return <BlogListingClient />;
}
