# Fix: Objects are not valid as a React child

## Vấn đề

Lỗi: `Objects are not valid as a React child (found: object with keys {id, name})`

## Nguyên nhân

API trả về `category` và `brand` dưới dạng object thay vì string:

```json
{
  "category": {
    "id": 1,
    "name": "Category Name"
  },
  "brand": {
    "id": 1,
    "name": "Brand Name"
  }
}
```

Trong khi code đang cố render trực tiếp:
```jsx
<p>{product.category}</p>  // ❌ Lỗi nếu category là object
<p>{product.brand}</p>      // ❌ Lỗi nếu brand là object
```

## Giải pháp

### 1. Cập nhật Type Definition

**File:** `types/product.ts`

```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string | { id: number; name: string };  // ✅ Hỗ trợ cả 2
  categoryId: number;
  brand: string | { id: number; name: string };     // ✅ Hỗ trợ cả 2
  brandId: number;
  // ... other fields
}
```

### 2. Cập nhật Render Logic

**File:** `components/admin/product-approval/ProductApprovalList.tsx`

```jsx
// ❌ Trước
<p>{product.category}</p>
<p>{product.brand}</p>

// ✅ Sau
<p>
  {typeof product.category === 'string' 
    ? product.category 
    : product.category?.name || 'N/A'}
</p>
<p>
  {typeof product.brand === 'string' 
    ? product.brand 
    : product.brand?.name || 'N/A'}
</p>
```

**File:** `components/admin/product-approval/ProductDetailModal.tsx`

Áp dụng logic tương tự cho tất cả nơi render `category` và `brand`.

## Các file đã cập nhật

1. ✅ `types/product.ts` - Cập nhật interface
2. ✅ `components/admin/product-approval/ProductApprovalList.tsx` - 2 nơi
3. ✅ `components/admin/product-approval/ProductDetailModal.tsx` - 4 nơi

## Testing

### Test với String Response
```json
{
  "category": "Red Wine",
  "brand": "Chateau Margaux"
}
```
✅ Hiển thị: "Red Wine", "Chateau Margaux"

### Test với Object Response
```json
{
  "category": { "id": 1, "name": "Red Wine" },
  "brand": { "id": 5, "name": "Chateau Margaux" }
}
```
✅ Hiển thị: "Red Wine", "Chateau Margaux"

### Test với Null/Undefined
```json
{
  "category": null,
  "brand": undefined
}
```
✅ Hiển thị: "N/A", "N/A"

## Lợi ích

✅ **Flexible**: Hỗ trợ cả string và object từ API
✅ **Safe**: Không crash khi data format thay đổi
✅ **Fallback**: Hiển thị "N/A" khi không có data
✅ **Type-safe**: TypeScript biết được cả 2 format

## Lưu ý cho Backend

Nên thống nhất format response:

**Option 1: Chỉ trả string** (Đơn giản hơn)
```json
{
  "category": "Red Wine",
  "categoryId": 1,
  "brand": "Chateau Margaux",
  "brandId": 5
}
```

**Option 2: Chỉ trả object** (Nhiều thông tin hơn)
```json
{
  "category": { "id": 1, "name": "Red Wine" },
  "brand": { "id": 5, "name": "Chateau Margaux" }
}
```

Frontend hiện tại đã hỗ trợ cả 2 format! 🎉
