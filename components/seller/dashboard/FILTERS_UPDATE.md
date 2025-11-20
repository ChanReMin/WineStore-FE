# Product Filters - Cập nhật mới

## Các bộ lọc đã thêm

### 1. Lọc theo Danh mục (Category)
- Dropdown chọn danh mục sản phẩm
- Mock data: Rượu vang đỏ, Rượu vang trắng, Rượu vang hồng, Champagne, Rượu vang ngọt
- Sẽ thay thế bằng API: `GET /categories`

### 2. Lọc theo Thương hiệu (Brand)
- Dropdown chọn thương hiệu
- Mock data: Château Margaux, Penfolds, Opus One, Dom Pérignon, Screaming Eagle
- Sẽ thay thế bằng API: `GET /brands`

### 3. Lọc theo Khoảng giá (Price Range)
- Input "Từ" và "Đến" để nhập giá min/max
- Đơn vị: VNĐ
- Lọc sản phẩm có giá trong khoảng đã chọn

### 4. Lọc theo Nồng độ (Concentration Range)
- Input "Từ" và "Đến" để nhập nồng độ min/max
- Đơn vị: % (phần trăm)
- Step: 0.1
- Range: 0-100%

### 5. Nút Xóa bộ lọc
- Hiển thị khi có ít nhất 1 bộ lọc nâng cao được áp dụng
- Click để reset tất cả bộ lọc nâng cao về mặc định

## Cấu trúc UI

```
┌─────────────────────────────────────────────────────────┐
│ [Search Input]              [Status Filters Buttons]    │
├─────────────────────────────────────────────────────────┤
│ [Category ▼] [Brand ▼] [Price From-To] [Conc. From-To] │
│                                      [Xóa bộ lọc] ←     │
└─────────────────────────────────────────────────────────┘
```

## Cập nhật Mock Data

Đã thêm các trường mới vào `lib/products.mock.ts`:
- `category_id`: number - ID danh mục
- `brand_id`: number - ID thương hiệu  
- `concentration`: number - Nồng độ rượu (%)

## Cập nhật Types

File `types/product.ts` đã được cập nhật với các trường:
```typescript
export interface Product {
  // ... existing fields
  category_id: number;
  brand_id: number;
  concentration: number;
}
```

## Logic lọc

Tất cả các bộ lọc hoạt động kết hợp (AND logic):
- Tìm kiếm text: Lọc theo tên, brand, category
- Status: Lọc theo trạng thái (Chờ duyệt, Đang bán, Bị cấm)
- Category: Lọc theo category_id
- Brand: Lọc theo brand_id
- Price: Lọc sản phẩm có giá >= priceFrom VÀ <= priceTo
- Concentration: Lọc sản phẩm có nồng độ >= concentrationFrom VÀ <= concentrationTo

## Tích hợp API (TODO)

Khi có API thực tế, cần:

1. Thay thế mock categories:
```typescript
// Thay vì mockCategories
const { data: categories } = await fetch('/api/categories');
```

2. Thay thế mock brands:
```typescript
// Thay vì mockBrands
const { data: brands } = await fetch('/api/brands');
```

3. Gửi filters lên server:
```typescript
const params = new URLSearchParams({
  search: searchQuery,
  status: statusFilter,
  category_id: categoryFilter,
  brand_id: brandFilter,
  price_from: priceFrom,
  price_to: priceTo,
  concentration_from: concentrationFrom,
  concentration_to: concentrationTo,
});
const response = await fetch(`/api/seller/products?${params}`);
```

## Responsive Design

- Mobile: Filters xếp dọc (1 column)
- Tablet: 2 columns
- Desktop: 4 columns

## Color Scheme

Giữ nguyên theme Wine Store:
- Primary: `#3b4417`
- Border: `#d4d6b4`
- Background: `#f5f3e8`
- Text: `#7a8451`
