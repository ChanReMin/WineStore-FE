# 📚 Wine Knowledge Blog - Hướng Dẫn Nhanh

## Giới Thiệu

Trang blog Wine Knowledge được thiết kế để chia sẻ kiến thức về rượu vang, tăng SEO và thu hút khách hàng. Blog có:

✨ **Thiết kế hiện đại** với animation mượt mà  
🎨 **UI/UX chuyên nghiệp** phù hợp với wine store  
🚀 **SEO tối ưu** với structured data  
📱 **Responsive** trên mọi thiết bị  

## Cấu Trúc

```
/blog                    → Trang danh sách blog
/blog/[slug]            → Trang chi tiết bài viết
components/blog/        → Blog components
lib/blogData.ts         → Dữ liệu blog
```

## Thêm Bài Viết Mới

Mở file `lib/blogData.ts` và thêm:

```typescript
{
  slug: 'url-bai-viet',
  title: 'Tiêu Đề',
  excerpt: 'Mô tả ngắn...',
  content: '',
  image: '/wines/wine-1.jpg',
  category: 'education', // tasting, pairing, storage, education, regions
  categoryLabel: 'Kiến thức',
  author: 'Tên Tác Giả',
  date: 'DD/MM/YYYY',
  readTime: 'X phút đọc',
  tags: ['tag1', 'tag2'],
}
```

## Danh Mục

- **Thưởng thức** (tasting)
- **Kết hợp món ăn** (pairing)
- **Bảo quản** (storage)
- **Kiến thức** (education)
- **Vùng miền** (regions)

## Animation Features

- ✨ Parallax hero images
- 🎭 Hover effects trên cards
- 🌊 Smooth scroll animations
- 🎨 Gradient backgrounds động
- 🔄 Category filter transitions

## SEO

Mỗi bài viết tự động có:
- Meta tags tối ưu
- Open Graph & Twitter Cards
- Structured data (BlogPosting, Breadcrumb)
- Canonical URLs

## Màu Sắc

- Primary: `#8b2635` (Burgundy)
- Accent: `#d4af37` (Gold)
- Background: `#120906` (Dark)

---

Chi tiết đầy đủ xem tại `BLOG_SETUP.md`
