# ImageWithFallback Component

Component này tự động xử lý lỗi khi load ảnh và hiển thị placeholder khi ảnh không thể tải được.

## Sử dụng

```tsx
import ImageWithFallback from "@/components/ui/ImageWithFallback";

// Sử dụng cơ bản
<ImageWithFallback
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 640px) 100vw, 50vw"
  className="object-cover"
/>

// Với custom placeholder
<ImageWithFallback
  src={product.image}
  alt={product.name}
  fill
  placeholderSrc="/custom-placeholder.jpg"
  className="object-cover"
/>
```

## Props

- `src`: URL của ảnh chính
- `alt`: Text mô tả ảnh
- `fill`: Boolean - sử dụng fill layout của Next.js Image
- `width`, `height`: Kích thước ảnh (nếu không dùng fill)
- `sizes`: Responsive sizes
- `className`: CSS classes
- `priority`: Boolean - ưu tiên load ảnh
- `placeholderSrc`: URL của ảnh placeholder (mặc định: `/placeholder-wine.svg`)
- `onError`: Callback khi có lỗi

## Tính năng

- Tự động fallback sang placeholder khi ảnh chính không load được
- Hiển thị icon và text "No Image" nếu cả placeholder cũng lỗi
- Tương thích hoàn toàn với Next.js Image component
