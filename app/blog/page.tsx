import type { Metadata } from 'next';
import { generateMetadata } from '@/config/seo';
import BlogListingClient from '@/components/blog/BlogListingClient';

export const metadata: Metadata = generateMetadata({
  title: 'Wine Knowledge Blog',
  description: 'Khám phá kiến thức về rượu vang, từ cách phân biệt các loại vang, nghệ thuật thưởng thức đến cách bảo quản và kết hợp với món ăn.',
  path: '/blog',
  keywords: [
    'wine knowledge',
    'wine education',
    'wine tasting',
    'wine pairing',
    'wine storage',
    'kiến thức rượu vang',
    'cách thưởng thức vang',
    'wine blog',
  ],
});

export default function BlogPage() {
  return <BlogListingClient />;
}
