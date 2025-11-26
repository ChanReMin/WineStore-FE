import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbStructuredData,
} from "@/config/seo";
import { blogPosts } from "@/lib/blogData";
import BlogDetailClient from "@/components/blog/BlogDetailClient";

interface BlogDetailPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  // Use slug as title for metadata since we use translation keys
  return generateSEOMetadata({
    title: `Blog - ${slug}`,
    description: "Wine Store Blog",
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home Page", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.slug, url: `/blog/${post.slug}` },
  ]);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.slug,
    description: "Wine Store Blog Post",
    image: post.image,
    author: {
      "@type": "Person",
      name: "Wine Store",
    },
    publisher: {
      "@type": "Organization",
      name: "Wine Store",
      logo: {
        "@type": "ImageObject",
        url: "/icons/logo.svg",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <BlogDetailClient post={post} />
    </>
  );
}
