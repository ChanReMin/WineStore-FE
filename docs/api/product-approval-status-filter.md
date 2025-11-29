# Cập nhật: Thêm Status Filter vào API

## Thay đổi

### 1. API Endpoint
**Trước:**
```
GET /api/v1/products?page=1&limit=10
```

**Sau:**
```
GET /api/v1/products?page=1&limit=10&status=0
```

### 2. Query Parameters
- `status` (optional): Filter theo trạng thái
  - Không truyền: Lấy tất cả sản phẩm
  - `0`: Pending (Chờ duyệt)
  - `1`: Approved (Đã duyệt)
  - `2`: Banned (Bị cấm)

### 3. Service Update
**File:** `services/productService.ts`

```typescript
export const fetchProducts = async (params?: {
  page?: number;
  limit?: number;
  status?: number; // NEW: 0: pending, 1: approved, 2: banned
}): Promise<ProductResponse> => {
  const { page = 1, limit = 10, status } = params || {};
  
  let url = `/api/v1/products?page=${page}&limit=${limit}`;
  
  // Add status filter if provided
  if (status !== undefined) {
    url += `&status=${status}`;
  }
  
  const response = await axiosInstance.get<ProductResponse>(url);
  return response.data;
};
```

### 4. Component Update
**File:** `components/admin/product-approval/ProductApprovalList.tsx`

**Trước:** Filter chỉ hoạt động client-side
```typescript
// Filter by status if needed
let filteredProducts = response.data.products;
if (statusFilter !== "all") {
  filteredProducts = filteredProducts.filter(
    (p) => p.status === statusFilter
  );
}
```

**Sau:** Filter gửi lên server
```typescript
const params: any = {
  page,
  limit: 10,
};

// Add status filter to API params
if (statusFilter !== "all") {
  params.status = statusFilter;
}

const response = await fetchProducts(params);
```

## Cách hoạt động

1. **User chọn filter "All"**:
   - Không gửi `status` param
   - API trả về tất cả sản phẩm

2. **User chọn filter "Pending"**:
   - Gửi `status=0`
   - API chỉ trả về sản phẩm có status = 0

3. **User chọn filter "Approved"**:
   - Gửi `status=1`
   - API chỉ trả về sản phẩm có status = 1

4. **User chọn filter "Banned"**:
   - Gửi `status=2`
   - API chỉ trả về sản phẩm có status = 2

## Lợi ích

✅ **Performance**: Giảm tải dữ liệu không cần thiết từ server
✅ **Pagination chính xác**: Phân trang dựa trên kết quả đã filter
✅ **Scalability**: Xử lý được lượng lớn dữ liệu
✅ **Consistency**: Filter logic ở một nơi (backend)

## Testing

```bash
# Test All products
curl "http://localhost:3000/api/v1/products?page=1&limit=10"

# Test Pending only
curl "http://localhost:3000/api/v1/products?page=1&limit=10&status=0"

# Test Approved only
curl "http://localhost:3000/api/v1/products?page=1&limit=10&status=1"

# Test Banned only
curl "http://localhost:3000/api/v1/products?page=1&limit=10&status=2"
```
