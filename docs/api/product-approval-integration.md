# Tích hợp API Product Approval

## Tổng quan
Đã tích hợp thành công các API quản lý sản phẩm vào trang admin/product-approval.

## API Endpoints đã tích hợp

### 1. Lấy danh sách sản phẩm
**Endpoint:** `GET /api/v1/products?page=1&limit=10&status=0`

**Query Parameters:**
- `page` (optional): Số trang, mặc định = 1
- `limit` (optional): Số items/trang, mặc định = 10
- `status` (optional): Filter theo trạng thái
  - Không truyền hoặc không có: Lấy tất cả
  - `0`: Pending (Chờ duyệt)
  - `1`: Approved (Đã duyệt)
  - `2`: Banned (Bị cấm)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "name": "test",
        "slug": "test",
        "description": "",
        "price": 5454.00,
        "profitMargin": 0,
        "category": {
          "id": 1,
          "name": "sữa"
        },
        "brand": {
          "id": 1,
          "name": "test"
        },
        "images": "https://via.placeholder.com/800x800?text=Upload+Failed",
        "status": 0,
        "statusText": "Pending",
        "totalInventory": 0,
        "inStock": false,
        "soldCount": 0,
        "ratingAverage": 0.00,
        "ratingCount": 0,
        "createdAt": "2025-11-28T09:28:12.203342",
        "updatedAt": "2025-11-28T09:28:12.248446"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "perPage": 10
    },
    "summary": {
      "total": 100,
      "pending": 20,
      "active": 70,
      "banned": 10
    }
  }
}
```

### 2. Lấy chi tiết sản phẩm
**Endpoint:** `GET /api/v1/products/{id}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "test",
    "slug": "test",
    "description": "",
    "price": 5454.00,
    "profitMargin": 0,
    "category": {
      "id": 1,
      "name": "sữa"
    },
    "brand": {
      "id": 1,
      "name": "test"
    },
    "images": "https://via.placeholder.com/800x800?text=Upload+Failed",
    "status": 0,
    "statusText": "Pending",
    "totalInventory": 0,
    "inStock": false,
    "soldCount": 0,
    "ratingAverage": 0.00,
    "ratingCount": 0,
    "createdAt": "2025-11-28T09:28:12.203342",
    "updatedAt": "2025-11-28T09:28:12.248446"
  }
}
```

### 3. Cập nhật trạng thái sản phẩm
**Endpoint:** `PUT /api/v1/products/{id}/status`

**Request Body:**
```json
{
  "status": 1,
  "note": "Optional note"
}
```

**Status values:**
- `0`: Pending (Chờ duyệt)
- `1`: Approved (Đã duyệt)
- `2`: Banned (Bị cấm)

**Response:**
```json
{
  "success": true,
  "message": "Product status updated successfully",
  "data": {
    "id": 1,
    "status": 1,
    "statusText": "Approved"
  }
}
```

## Files đã tạo/cập nhật

### 1. Service Layer
**File:** `services/productService.ts`

Các functions:
- `fetchProducts(params)` - Lấy danh sách sản phẩm với filter status
  - `params.page`: Số trang
  - `params.limit`: Số items/trang
  - `params.status`: Filter theo trạng thái (0, 1, 2)
- `fetchProductDetail(productId)` - Lấy chi tiết sản phẩm
- `updateProductStatus(productId, payload)` - Cập nhật trạng thái
- `approveProduct(productId, note)` - Duyệt sản phẩm (status = 1)
- `banProduct(productId, note)` - Cấm sản phẩm (status = 2)
- `setPendingProduct(productId, note)` - Đặt về pending (status = 0)

### 2. Components đã cập nhật

#### ProductApprovalList.tsx
- Sử dụng `fetchProducts()` thay vì mock data
- Gửi status filter lên server qua API params
- Hiển thị summary với 4 cards: Total, Pending, Active, Banned
- Filter theo status: All (không gửi status), Pending (0), Approved (1), Banned (2)
- Bảng hiển thị: Product, Category, Price, Inventory, Status, Created Date
- Tự động reload khi thay đổi status filter

#### ApproveModal.tsx
- Sử dụng `approveProduct()` từ productService
- Gửi note khi approve

#### RejectModal.tsx
- Đổi tên thành "Ban Product" (Cấm sản phẩm)
- Sử dụng `banProduct()` từ productService
- Kết hợp reason và note thành một message

#### ProductDetailModal.tsx
- Đơn giản hóa để phù hợp với dữ liệu API
- Loại bỏ các trường không có: images, seller info, grape variety, etc.
- Chỉ hiển thị: Product info, Category, Brand, Price, Concentration, Inventory
- Chỉ có 2 actions: Approve và Ban (không có Request Changes)

### 3. Translation Updates

#### messages/vi.json
Cập nhật các keys:
- `summary`: total, pending, active, banned
- `filters`: all, pending, approved, banned
- `status`: pending, approved, banned
- `table`: product, category, price, inventory, status, createdAt
- `actions`: viewDetail, approve, ban
- `detail`: Đơn giản hóa các fields
- `rejectModal`: Đổi thành "Cấm sản phẩm"

#### messages/en.json
Cập nhật tương tự với tiếng Anh

## Cách sử dụng

### 1. Xem danh sách sản phẩm
- Truy cập `/admin/product-approval`
- Xem summary cards với thống kê (Total, Pending, Active, Banned)
- Filter theo status:
  - **All**: Hiển thị tất cả sản phẩm (không gửi status param)
  - **Pending**: Chỉ sản phẩm chờ duyệt (status=0)
  - **Approved**: Chỉ sản phẩm đã duyệt (status=1)
  - **Banned**: Chỉ sản phẩm bị cấm (status=2)
- Search theo tên sản phẩm (client-side)
- Pagination với 10 items/page

### 2. Duyệt sản phẩm
- Click icon "Duyệt" (CheckCircle) trên sản phẩm có status = 0
- Nhập note (optional)
- Click "Duyệt" để confirm
- Sản phẩm sẽ chuyển sang status = 1 (Approved)

### 3. Cấm sản phẩm
- Click icon "Cấm" (XCircle) trên sản phẩm có status = 0
- Chọn lý do cấm
- Nhập note chi tiết (optional)
- Click "Cấm" để confirm
- Sản phẩm sẽ chuyển sang status = 2 (Banned)

### 4. Xem chi tiết
- Click icon "Xem" (Eye) để xem chi tiết sản phẩm
- Xem thông tin đầy đủ
- Có thể Approve hoặc Ban trực tiếp từ modal

## Lưu ý

1. **API Base URL**: Đảm bảo `NEXT_PUBLIC_API_BASE_URL` được cấu hình đúng trong `.env`

2. **Authentication**: Các API calls sử dụng `axiosInstance` đã được cấu hình với:
   - Access token trong header
   - Auto refresh token khi hết hạn
   - Redirect về login khi unauthorized

3. **Error Handling**: Tất cả API calls đều có try-catch để xử lý lỗi

4. **Loading States**: Hiển thị loading spinner khi đang fetch data hoặc submit

5. **Pagination**: Hỗ trợ phân trang với limit = 10 items/page

## Testing

Để test tích hợp:

1. Đảm bảo backend API đang chạy
2. Login với tài khoản admin
3. Truy cập `/admin/product-approval`
4. Thử các chức năng:
   - View list
   - Filter by status
   - Search products
   - Approve product
   - Ban product
   - View details

## Troubleshooting

### Lỗi 401 Unauthorized
- Kiểm tra access token
- Đảm bảo đã login
- Kiểm tra refresh token logic

### Lỗi 404 Not Found
- Kiểm tra API base URL
- Kiểm tra endpoint paths
- Kiểm tra product ID

### Data không hiển thị
- Kiểm tra response format từ API
- Kiểm tra console logs
- Kiểm tra network tab trong DevTools

### Lỗi "Objects are not valid as a React child"
- API có thể trả về `category` và `brand` dưới dạng object `{id, name}`
- Code đã được cập nhật để xử lý cả string và object
- Nếu vẫn gặp lỗi, kiểm tra các trường khác trong response
