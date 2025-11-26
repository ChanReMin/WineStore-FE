Dựa vào schema database của bạn, tôi thấy hệ thống chưa có bảng **sellers** riêng biệt. Tuy nhiên, tôi hiểu bạn muốn quản lý **người bán/seller** (những người có vai trò bán hàng hoặc quản lý).

Trong schema hiện tại, có thể "seller" là:
- **seller** (role=1 trong bảng `accounts`)
- **Warehouse Manager** (quản lý kho hàng)

Dưới đây là các API cần thiết để **Admin quản lý Sellers/seller**:

---

## 📋 **API Documentation - Quản lý Sellers (seller)**

### **1. Lấy danh sách Sellers**
```http
GET /api/admin/sellers
```

**Headers:**
```json
{
  "Authorization": "Bearer {admin_access_token}",
  "Content-Type": "application/json"
}
```

**Query Parameters:**
| Tham số | Kiểu | Bắt buộc | Mô tả |
|---------|------|----------|-------|
| page | integer | Không | Số trang (mặc định: 1) |
| limit | integer | Không | Số bản ghi/trang (mặc định: 20) |
| search | string | Không | Tìm kiếm theo email, tên |
| status | integer | Không | Lọc theo trạng thái (0=inactive, 1=active, -1=locked) |
| role | integer | Không | Lọc theo vai trò (1=seller, 2=admin) |

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "sellers": [
      {
        "id": 1,
        "account_id": 5,
        "email": "seller01@wineshop.com",
        "role": 1,
        "status": 1,
        "first_name": "Nguyễn",
        "last_name": "Văn A",
        "phone_number": "0901234567",
        "avatar": "https://cdn.example.com/avatar1.jpg",
        "date_of_birth": "1990-05-15",
        "gender": 1,
        "last_login_at": "2024-11-26T10:30:00Z",
        "created_at": "2024-01-15T08:00:00Z",
        "managed_warehouses": [
          {
            "warehouse_id": 1,
            "warehouse_name": "Kho Hà Nội"
          }
        ]
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_records": 98,
      "limit": 20
    }
  }
}
```

---

### **2. Xem chi tiết Seller**
```http
GET /api/admin/sellers/{seller_id}
```

**Headers:**
```json
{
  "Authorization": "Bearer {admin_access_token}"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "account_id": 5,
    "email": "seller01@wineshop.com",
    "role": 1,
    "status": 1,
    "first_name": "Nguyễn",
    "last_name": "Văn A",
    "phone_number": "0901234567",
    "avatar": "https://cdn.example.com/avatar1.jpg",
    "date_of_birth": "1990-05-15",
    "gender": 1,
    "last_login_at": "2024-11-26T10:30:00Z",
    "created_at": "2024-01-15T08:00:00Z",
    "updated_at": "2024-11-20T14:22:00Z",
    "managed_warehouses": [
      {
        "warehouse_id": 1,
        "warehouse_name": "Kho Hà Nội",
        "location": "Số 123, Đường ABC, Hà Nội"
      }
    ],
    "statistics": {
      "total_orders_handled": 245,
      "total_revenue": 125000000,
      "average_rating": 4.5
    }
  }
}
```

---

### **3. Tạo Seller mới**
```http
POST /api/admin/sellers
```

**Headers:**
```json
{
  "Authorization": "Bearer {admin_access_token}",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "email": "newseller@wineshop.com",
  "password": "SecurePass123!",
  "role": 1,
  "first_name": "Trần",
  "last_name": "Thị B",
  "phone_number": "0912345678",
  "date_of_birth": "1995-08-20",
  "gender": 2,
  "warehouse_ids": [1, 3]
}
```

**Validation Rules:**
- `email`: Bắt buộc, định dạng email hợp lệ, unique
- `password`: Bắt buộc, tối thiểu 8 ký tự, có chữ hoa, chữ thường, số
- `role`: Bắt buộc, 1=seller, 2=admin
- `phone_number`: Tùy chọn, định dạng số điện thoại VN
- `warehouse_ids`: Tùy chọn, mảng các warehouse ID

**Response Success (201):**
```json
{
  "success": true,
  "message": "Tạo seller thành công",
  "data": {
    "id": 125,
    "account_id": 308,
    "email": "newseller@wineshop.com",
    "role": 1,
    "status": 1,
    "first_name": "Trần",
    "last_name": "Thị B",
    "created_at": "2024-11-26T15:30:00Z"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["Email đã tồn tại trong hệ thống"],
    "password": ["Mật khẩu phải có ít nhất 8 ký tự"]
  }
}
```

---

### **4. Cập nhật thông tin Seller**
```http
PUT /api/admin/sellers/{seller_id}
```

**Headers:**
```json
{
  "Authorization": "Bearer {admin_access_token}",
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "first_name": "Trần",
  "last_name": "Thị B",
  "phone_number": "0912345678",
  "date_of_birth": "1995-08-20",
  "gender": 2,
  "role": 1,
  "status": 1,
  "warehouse_ids": [1, 2]
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Cập nhật thông tin seller thành công",
  "data": {
    "id": 125,
    "account_id": 308,
    "email": "newseller@wineshop.com",
    "first_name": "Trần",
    "last_name": "Thị B",
    "updated_at": "2024-11-26T16:45:00Z"
  }
}
```

---

### **5. Thay đổi mật khẩu Seller**
```http
PUT /api/admin/sellers/{seller_id}/password
```

**Request Body:**
```json
{
  "new_password": "NewSecurePass456!",
  "confirm_password": "NewSecurePass456!"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Đổi mật khẩu thành công"
}
```

---

### **6. Thay đổi trạng thái Seller**
```http
PATCH /api/admin/sellers/{seller_id}/status
```

**Request Body:**
```json
{
  "status": 0
}
```

**Giá trị status:**
- `1`: Active (hoạt động)
- `0`: Inactive (tạm ngưng)
- `-1`: Locked (khóa tài khoản)

**Response Success (200):**
```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công",
  "data": {
    "seller_id": 125,
    "status": 0
  }
}
```

---

### **7. Xóa Seller (Soft Delete)**
```http
DELETE /api/admin/sellers/{seller_id}
```

**Headers:**
```json
{
  "Authorization": "Bearer {admin_access_token}"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Xóa seller thành công"
}
```

**Note:** Nên dùng soft delete (set status = 0 hoặc -1) thay vì xóa vĩnh viễn

## 🔒 **Authentication & Authorization**

**Admin phải có:**
- `role = 2` (admin) trong bảng `accounts`
- Access token hợp lệ với quyền admin

**Error Responses:**

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Token không hợp lệ hoặc đã hết hạn"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Bạn không có quyền truy cập tài nguyên này"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Không tìm thấy seller"
}
```

---

