# Ví dụ sử dụng SEO trong các trang

## Ví dụ 1: Trang sản phẩm động

```tsx
// app/products/[slug]/page.tsx
import { generateMetadata, generateProductStructuredData, generateBreadcrumbStructuredData } from '@/config/seo';
import type { Metadata } from 'next';

// Generate metadata cho trang sản phẩm
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  return generateMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
    image: product.image,
    keywords: ['wine', product.category, product.brand],
  });
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);
  
  // Structured data cho sản phẩm
  const productSchema = generateProductStructuredData({
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    currency: 'VND',
    sku: product.sku,
    brand: product.brand,
    category: product.category,
    availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
  });

  // Breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: 'Trang chủ', url: '/' },
    { name: 'Sản phẩm', url: '/products' },
    { name: product.category, url: `/products?category=${product.category}` },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  return (
    <>
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Content */}
      <article>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        {/* ... rest of your product page */}
      </article>
    </>
  );
}
```

## Ví dụ 2: Trang danh sách sản phẩm

```tsx
// app/products/page.tsx
import { generateMetadata } from '@/config/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ searchParams }): Promise<Metadata> {
  const category = searchParams?.category || 'all';
  const title = category === 'all' 
    ? 'Tất cả sản phẩm' 
    : `Sản phẩm ${category}`;
  
  return generateMetadata({
    title,
    description: `Khám phá bộ sưu tập ${category === 'all' ? 'rượu vang' : category} cao cấp của chúng tôi.`,
    path: category === 'all' ? '/products' : `/products?category=${category}`,
  });
}

export default function ProductsPage({ searchParams }) {
  // Your products listing page
  return <div>{/* Products list */}</div>;
}
```

## Ví dụ 3: Trang tĩnh (About, Contact)

```tsx
// app/about/page.tsx
import { generateMetadata } from '@/config/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Về chúng tôi',
  description: 'Tìm hiểu về Wine Store - cửa hàng rượu vang cao cấp hàng đầu Việt Nam.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div>
      <h1>Về chúng tôi</h1>
      {/* Your about page content */}
    </div>
  );
}
```

## Ví dụ 4: Trang không muốn index (Admin, Private)

```tsx
// app/admin/page.tsx
import { generateMetadata } from '@/config/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Admin Dashboard',
  description: 'Admin dashboard',
  path: '/admin',
  noIndex: true, // Quan trọng: Không cho search engine index
});

export default function AdminPage() {
  return <div>{/* Admin content */}</div>;
}
```

## Ví dụ 5: Trang với Collection Structured Data

```tsx
// app/collections/[slug]/page.tsx
export default function CollectionPage({ params }) {
  const collection = await getCollection(params.slug);
  const products = await getCollectionProducts(params.slug);

  // Collection structured data
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: absoluteUrl(`/collections/${collection.slug}`),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          url: absoluteUrl(`/products/${product.slug}`),
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {/* Collection page content */}
    </>
  );
}
```

## Lưu ý quan trọng

1. **Luôn sử dụng `generateMetadata`** cho các trang động để đảm bảo SEO tốt
2. **Thêm structured data** cho các trang quan trọng (products, collections, articles)
3. **Sử dụng `noIndex: true`** cho các trang private/admin
4. **Cập nhật sitemap** khi thêm routes mới
5. **Test structured data** bằng Google Rich Results Test trước khi deploy

