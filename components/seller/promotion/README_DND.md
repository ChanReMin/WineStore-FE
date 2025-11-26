# Promotion Assignment với Drag & Drop

## Tổng quan

Hệ thống drag-and-drop để gán khuyến mãi vào sản phẩm sử dụng **@dnd-kit** library.

## Cấu trúc Components

### 1. **PromotionProductDnD** (Main Component)
- Component chính quản lý toàn bộ logic drag & drop
- Sử dụng `useState` để quản lý state
- File: `components/seller/promotion/PromotionProductDnD.tsx`

### 2. **PromotionProductDnDWithStore** (Alternative)
- Tương tự như trên nhưng sử dụng Zustand store
- Tốt hơn cho ứng dụng lớn cần share state
- File: `components/seller/promotion/PromotionProductDnDWithStore.tsx`

### 3. **PromotionList**
- Hiển thị danh sách khuyến mãi có thể kéo
- Highlight các promotion đã được gán
- File: `components/seller/promotion/PromotionList.tsx`

### 4. **DraggablePromotionItem**
- Item khuyến mãi có thể kéo
- Sử dụng `useDraggable` hook
- Hiển thị: name, code, discount, dates
- File: `components/seller/promotion/DraggablePromotionItem.tsx`

### 5. **ProductPromotionZone**
- Khu vực chứa danh sách sản phẩm
- File: `components/seller/promotion/ProductPromotionZone.tsx`

### 6. **DroppableProductItem**
- Item sản phẩm có thể nhận promotion
- Sử dụng `useDroppable` hook
- Hiển thị các promotion đã gán
- File: `components/seller/promotion/DroppableProductItem.tsx`

### 7. **DroppableProductItemSortable** (Advanced)
- Version nâng cao với khả năng sắp xếp promotion trong product
- Sử dụng `@dnd-kit/sortable`
- File: `components/seller/promotion/DroppableProductItemSortable.tsx`

### 8. **SortablePromotionItem**
- Promotion item có thể sắp xếp trong product
- Có handle để kéo thả
- File: `components/seller/promotion/SortablePromotionItem.tsx`

## Zustand Store

File: `stores/promotionAssignmentStore.ts`

### State:
```typescript
{
  products: Product[];
  setProducts: (products: Product[]) => void;
  addPromotionToProduct: (productId: number, promotion: Promotion) => boolean;
  removePromotionFromProduct: (productId: number, promotionId: number) => void;
  getAssignedPromotionIds: () => Set<number>;
  resetProducts: (initialProducts: Product[]) => void;
}
```

## Cách sử dụng

### Basic (với useState):

```tsx
import { PromotionProductDnD } from "@/components/seller/promotion/PromotionProductDnD";

<PromotionProductDnD
  promotions={promotions}
  initialProducts={products}
/>
```

### Advanced (với Zustand):

```tsx
import { PromotionProductDnDWithStore } from "@/components/seller/promotion/PromotionProductDnDWithStore";

<PromotionProductDnDWithStore
  promotions={promotions}
  initialProducts={products}
/>
```

## Features

### ✅ Đã implement:

1. **Drag & Drop cơ bản**
   - Kéo promotion từ list sang product
   - Highlight drop zone khi hover
   - Animation mượt mà

2. **Validation**
   - Không cho gán trùng promotion
   - Toast notification cho mọi action

3. **Visual Feedback**
   - Highlight promotion đã được gán
   - Drag overlay với rotation effect
   - Smooth transitions

4. **Remove Promotion**
   - Click X để xóa promotion khỏi product
   - Hover effect để hiện nút xóa

5. **Responsive Design**
   - Grid layout responsive
   - Scroll cho danh sách dài

### 🚀 Advanced Features (Optional):

1. **Sortable Promotions**
   - Sắp xếp thứ tự promotion trong product
   - Sử dụng `DroppableProductItemSortable`

2. **State Management**
   - Zustand store cho global state
   - Dễ dàng sync với backend

## Animation Details

### Drag Start:
- Opacity giảm xuống 0.5
- Scale lên 1.05
- Rotate 3 degrees

### Drag Over:
- Border color chuyển sang blue
- Background chuyển sang blue-50
- Scale lên 1.02

### Drop Success:
- Fade-in animation
- Slide-in from top
- Duration: 300ms

## Customization

### Thay đổi màu sắc:

```tsx
// Trong DroppableProductItem.tsx
className={`
  ${isOver ? "border-blue-500 bg-blue-50" : "border-gray-200"}
`}
```

### Thay đổi animation:

```tsx
// Trong DragOverlay
<div className="rotate-3 scale-105"> // Thay đổi rotate và scale
  <DraggablePromotionItem promotion={activePromotion} />
</div>
```

### Thay đổi activation distance:

```tsx
useSensor(PointerSensor, {
  activationConstraint: {
    distance: 8, // Thay đổi số này
  },
})
```

## Integration với Backend

### Save promotions:

```typescript
const handleSave = async () => {
  const productPromotions = products.map(product => ({
    product_id: product.id,
    promotion_ids: product.promotions.map(p => p.id)
  }));

  await api.post('/seller/product-promotions', { data: productPromotions });
};
```

### Load existing assignments:

```typescript
useEffect(() => {
  const loadData = async () => {
    const response = await api.get('/seller/product-promotions');
    setProducts(response.data.products);
  };
  loadData();
}, []);
```

## Troubleshooting

### Promotion không kéo được:
- Kiểm tra `activationConstraint.distance`
- Đảm bảo có `{...listeners}` và `{...attributes}`

### Drop không hoạt động:
- Kiểm tra `id` của droppable phải unique
- Đảm bảo có `data` prop với product info

### Animation không mượt:
- Thêm `transition-all duration-300` vào className
- Kiểm tra CSS conflicts

## Dependencies

```json
{
  "@dnd-kit/core": "^6.x",
  "@dnd-kit/sortable": "^8.x",
  "@dnd-kit/utilities": "^3.x",
  "zustand": "^5.x",
  "react-toastify": "^11.x"
}
```

## Page Route

Truy cập tại: `/[locale]/seller/promotion-assignment`

File: `app/[locale]/seller/promotion-assignment/page.tsx`
