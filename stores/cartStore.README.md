# Cart Store - Optimized with Debouncing

## Tối ưu hóa API Calls

### Vấn đề trước đây
- Mỗi lần click tăng/giảm số lượng → 1 API call
- User click liên tục 5 lần → 5 API requests
- Tốn băng thông, tăng load server, UX chậm

### Giải pháp hiện tại: Optimistic Update + Debouncing

#### 1. **Optimistic Update**
- UI cập nhật ngay lập tức khi user click
- Không cần đợi API response
- UX mượt mà, phản hồi nhanh

#### 2. **Debounced API Sync**
- API call được trì hoãn 800ms
- Nếu user click liên tục, chỉ gọi API 1 lần cuối cùng
- Giảm số lượng requests xuống đáng kể

#### 3. **Error Handling**
- Nếu API fail, rollback về dữ liệu từ server
- User vẫn thấy thông báo lỗi rõ ràng

### Ví dụ

**Trước:**
```
User: Click + 5 lần liên tục
→ 5 API calls ngay lập tức
→ UI đợi từng response
```

**Sau:**
```
User: Click + 5 lần liên tục
→ UI cập nhật ngay 5 lần (smooth)
→ Chỉ 1 API call sau 800ms kể từ lần click cuối
→ Sync với server
```

### Lợi ích

✅ **Giảm 80-90% số lượng API calls** khi user thao tác liên tục
✅ **UX tốt hơn** - UI phản hồi ngay lập tức
✅ **Giảm load server** - Ít requests hơn
✅ **Tiết kiệm băng thông** - Đặc biệt quan trọng trên mobile

### API Endpoints

- `PUT /api/v1/cart/items/{cartItemId}` - Update quantity
- `DELETE /api/v1/cart/items/{cartItemId}` - Remove item
- `GET /api/v1/cart` - Fetch cart (fallback)

### Flush Pending Updates

Khi navigate đến checkout, tất cả pending updates sẽ được flush để đảm bảo dữ liệu đồng bộ:

```typescript
const { flushPendingUpdates } = useCartStore.getState();
await flushPendingUpdates();
```

### Configuration

Debounce delay: **800ms** (có thể điều chỉnh trong `updateCartItem`)

```typescript
const timer = setTimeout(async () => {
  // Sync with server
}, 800); // ← Thay đổi giá trị này nếu cần
```
