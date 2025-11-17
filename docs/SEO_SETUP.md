# Hướng dẫn Setup SEO cho Wine Store

## Tổng quan

Dự án đã được cấu hình SEO đầy đủ với các tính năng sau:

### ✅ Các tính năng đã được setup

1. **Metadata & Open Graph** - Tối ưu cho social media sharing
2. **Structured Data (JSON-LD)** - Schema.org markup cho Organization, WebSite, Store
3. **Sitemap.xml** - Tự động generate sitemap
4. **Robots.txt** - Cấu hình crawler
5. **Manifest.json** - PWA support
6. **Helper Functions** - Các hàm tiện ích cho metadata động

## Cấu hình môi trường

Tạo file `.env.local` và thêm các biến sau:

```env
# Site URL - Bắt buộc cho SEO
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Search Console Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_verification_code

# Bing Webmaster Tools Verification
NEXT_PUBLIC_BING_SITE_VERIFICATION=your_bing_verification_code

# Facebook Domain Verification
NEXT_PUBLIC_FACEBOOK_SITE_VERIFICATION=your_facebook_verification_code
```

## Sử dụng trong các trang

### 1. Sử dụng generateMetadata cho trang động

```tsx
import { generateMetadata } from '@/config/seo';

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  return generateMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
    image: product.image,
    keywords: ['wine', product.category],
  });
}
```

### 2. Thêm Structured Data cho sản phẩm

```tsx
import { generateProductStructuredData } from '@/config/seo';

export default function ProductPage({ product }) {
  const productSchema = generateProductStructuredData({
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price,
    currency: 'VND',
    sku: product.sku,
    category: product.category,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Your product page content */}
    </>
  );
}
```

### 3. Thêm Breadcrumb Structured Data

```tsx
import { generateBreadcrumbStructuredData } from '@/config/seo';

export default function ProductPage({ product }) {
  const breadcrumbSchema = generateBreadcrumbStructuredData([
    { name: 'Trang chủ', url: '/' },
    { name: 'Sản phẩm', url: '/products' },
    { name: product.category, url: `/products?category=${product.category}` },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Your breadcrumb UI */}
    </>
  );
}
```

### 4. Cập nhật Sitemap với dynamic routes

Mở file `app/sitemap.ts` và uncomment phần dynamic routes:

```typescript
async function getDynamicRoutes() {
  const products = await fetchProducts();
  return products.map((product) => ({
    path: `/products/${product.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
    lastModified: product.updatedAt,
  }));
}
```

## Kiểm tra SEO

### 1. Kiểm tra Metadata
- Mở DevTools → Elements → `<head>` để xem metadata tags
- Sử dụng [Google Rich Results Test](https://search.google.com/test/rich-results)

### 2. Kiểm tra Structured Data
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### 3. Kiểm tra Sitemap
- Truy cập: `https://your-domain.com/sitemap.xml`
- Submit lên Google Search Console

### 4. Kiểm tra Robots.txt
- Truy cập: `https://your-domain.com/robots.txt`

## Tối ưu thêm

### 1. Tạo Open Graph Image
Tạo file `/public/og-image.jpg` với kích thước 1200x630px cho social sharing.

### 2. Tạo Favicon và Icons
- `/public/favicon.ico`
- `/public/icon-192.png` (192x192px)
- `/public/icon-512.png` (512x512px)
- `/public/apple-touch-icon.png` (180x180px)

### 3. Submit sitemap lên Search Engines
- **Google**: [Google Search Console](https://search.google.com/search-console)
- **Bing**: [Bing Webmaster Tools](https://www.bing.com/webmasters)

### 4. Cấu hình Analytics
Thêm Google Analytics hoặc các tracking tools khác vào `app/layout.tsx`

## Best Practices

1. ✅ Mỗi trang nên có title và description unique
2. ✅ Sử dụng canonical URLs để tránh duplicate content
3. ✅ Tối ưu images với Next.js Image component
4. ✅ Sử dụng semantic HTML
5. ✅ Đảm bảo mobile-friendly (responsive design)
6. ✅ Tối ưu page speed
7. ✅ Sử dụng HTTPS
8. ✅ Thêm alt text cho tất cả images

## Troubleshooting

### Metadata không hiển thị đúng
- Kiểm tra `NEXT_PUBLIC_SITE_URL` trong `.env.local`
- Đảm bảo đã build lại project sau khi thay đổi config

### Sitemap không cập nhật
- Clear cache và rebuild: `npm run build`
- Kiểm tra console logs khi generate sitemap

### Structured Data không validate
- Kiểm tra JSON syntax
- Sử dụng [Schema.org Validator](https://validator.schema.org/)

