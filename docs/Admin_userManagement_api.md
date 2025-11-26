# API Documentation - User Management (Admin)

## Authentication
Tất cả API yêu cầu token xác thực trong header:
```
Authorization: Bearer {access_token}
```
Role required: **Admin (role=2)**

---

## 1. Lấy danh sách Users

### `GET /api/admin/users`

**Query Parameters:**
```
page: int (default: 1)
limit: int (default: 20, max: 100)
role: int (0|1|2) - Filter theo role
status: int (-1|0|1) - Filter theo status
search: string - Tìm kiếm theo email, tên, số điện thoại
sort_by: string (created_at|last_login_at|email)
sort_order: string (asc|desc)
```

**Request Example:**
```http
GET /api/admin/users?page=1&limit=20&role=0&status=1&search=nguyen&sort_by=created_at&sort_order=desc
Authorization: Bearer eyJhbGc...
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "account": {
          "id": 1,
          "email": "nguyen@example.com",
          "role": 0,
          "role_name": "Customer",
          "status": 1,
          "status_name": "Active",
          "last_login_at": "2024-11-26T10:30:00Z",
          "created_at": "2024-01-15T08:00:00Z"
        },
        "user_info": {
          "avatar": "https://cdn.example.com/avatars/user1.jpg",
          "first_name": "Nguyễn",
          "last_name": "Văn A",
          "phone_number": "0901234567",
          "date_of_birth": "1990-05-15",
          "gender": 1,
          "gender_name": "Male"
        },
        "stats": {
          "total_orders": 15,
          "total_spent": 25000000,
          "address_count": 2
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 150,
      "total_pages": 8
    }
  }
}
```

---

## 2. Lấy chi tiết User

### `GET /api/admin/users/{user_id}`

**Path Parameters:**
- `user_id`: bigint (required)

**Request Example:**
```http
GET /api/admin/users/123
Authorization: Bearer eyJhbGc...
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 123,
    "account": {
      "id": 123,
      "email": "customer@example.com",
      "role": 0,
      "status": 1,
      "last_login_at": "2024-11-26T10:30:00Z",
      "created_at": "2024-01-15T08:00:00Z",
      "updated_at": "2024-11-20T14:22:00Z"
    },
    "user_info": {
      "avatar": "https://cdn.example.com/avatars/user123.jpg",
      "first_name": "Nguyễn",
      "last_name": "Văn A",
      "phone_number": "0901234567",
      "date_of_birth": "1990-05-15",
      "gender": 1,
      "created_at": "2024-01-15T08:00:00Z",
      "updated_at": "2024-02-10T09:15:00Z"
    },
    "addresses": [
      {
        "id": 1,
        "full_name": "Nguyễn Văn A",
        "phone_number": "0901234567",
        "address_line": "123 Đường ABC",
        "ward": "Phường 1",
        "district": "Quận 1",
        "city": "TP.HCM",
        "is_default": true
      }
    ],
    "order_stats": {
      "total_orders": 15,
      "completed_orders": 12,
      "cancelled_orders": 2,
      "total_spent": 25000000,
      "avg_order_value": 1666667
    }
  }
}
```

**Response 404:**
```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "Không tìm thấy user với ID này"
  }
}
```

---

## 3. Tạo User mới

### `POST /api/admin/users`

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "role": 0,
  "status": 1,
  "user_info": {
    "first_name": "Trần",
    "last_name": "Thị B",
    "phone_number": "0912345678",
    "date_of_birth": "1995-08-20",
    "gender": 2
  }
}
```

**Validation Rules:**
- `email`: required, email format, unique
- `password`: required, min 8 chars, bao gồm chữ hoa, chữ thường, số
- `role`: required, enum (0|1|2)
- `status`: optional, enum (-1|0|1), default: 1
- `phone_number`: optional, format 10-11 số

**Response 201:**
```json
{
  "success": true,
  "message": "Tạo user thành công",
  "data": {
    "id": 456,
    "account_id": 456,
    "email": "newuser@example.com",
    "role": 0,
    "status": 1,
    "created_at": "2024-11-26T15:30:00Z"
  }
}
```

**Response 400:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": {
      "email": ["Email đã tồn tại trong hệ thống"],
      "password": ["Mật khẩu phải có ít nhất 8 ký tự"]
    }
  }
}
```

---

## 4. Cập nhật thông tin User

### `PUT /api/admin/users/{user_id}`

**Request Body:**
```json
{
  "email": "updated@example.com",
  "role": 1,
  "status": 1,
  "user_info": {
    "first_name": "Nguyễn",
    "last_name": "Văn C",
    "phone_number": "0923456789",
    "date_of_birth": "1992-03-10",
    "gender": 1,
    "avatar": "https://cdn.example.com/new-avatar.jpg"
  }
}
```

**Note:** Tất cả fields đều optional, chỉ gửi những field cần update

**Response 200:**
```json
{
  "success": true,
  "message": "Cập nhật user thành công",
  "data": {
    "id": 123,
    "account_id": 123,
    "email": "updated@example.com",
    "role": 1,
    "status": 1,
    "updated_at": "2024-11-26T16:00:00Z"
  }
}
```

---

## 5. Thay đổi Status User

### `PATCH /api/admin/users/{user_id}/status`

**Request Body:**
```json
{
  "status": 0,
  "reason": "Vi phạm chính sách sử dụng"
}
```

**Status Values:**
- `-1`: Locked (Khóa tài khoản)
- `0`: Inactive (Vô hiệu hóa)
- `1`: Active (Hoạt động)

**Response 200:**
```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công",
  "data": {
    "user_id": 123,
    "old_status": 1,
    "new_status": 0,
    "updated_at": "2024-11-26T16:15:00Z"
  }
}
```

---

## 6. Thay đổi Role User

### `PATCH /api/admin/users/{user_id}/role`

**Request Body:**
```json
{
  "role": 1,
  "note": "Thăng cấp lên Seller"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Cập nhật role thành công",
  "data": {
    "user_id": 123,
    "old_role": 0,
    "new_role": 1,
    "updated_at": "2024-11-26T16:20:00Z"
  }
}
```

---

## 7. Reset Password cho User

### `POST /api/admin/users/{user_id}/reset-password`

**Request Body:**
```json
{
  "new_password": "NewSecurePass123!",
  "send_email": true
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Reset password thành công",
  "data": {
    "user_id": 123,
    "email_sent": true,
    "reset_at": "2024-11-26T16:25:00Z"
  }
}
```

---

## 8. Xóa User (Soft Delete)

### `DELETE /api/admin/users/{user_id}`

**Query Parameters:**
```
force: boolean (default: false) - true = hard delete, false = soft delete
```

**Request Example:**
```http
DELETE /api/admin/users/123?force=false
Authorization: Bearer eyJhbGc...
```

**Response 200:**
```json
{
  "success": true,
  "message": "Xóa user thành công",
  "data": {
    "user_id": 123,
    "delete_type": "soft",
    "deleted_at": "2024-11-26T16:30:00Z"
  }
}
```

**Response 400:**
```json
{
  "success": false,
  "error": {
    "code": "CANNOT_DELETE",
    "message": "Không thể xóa user có đơn hàng đang xử lý"
  }
}
```

---

## 9. Export danh sách Users

### `GET /api/admin/users/export`

**Query Parameters:**
```
format: string (csv|xlsx|pdf)
role: int (optional)
status: int (optional)
from_date: string (YYYY-MM-DD)
to_date: string (YYYY-MM-DD)
```

**Response 200:**
```
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
Content-Disposition: attachment; filename="users_export_20241126.xlsx"

[Binary File Data]
```

---

## 10. Lấy Activity Log của User

### `GET /api/admin/users/{user_id}/activities`

**Query Parameters:**
```
page: int (default: 1)
limit: int (default: 50)
type: string (login|order|profile_update|...)
from_date: string
to_date: string
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": 1001,
        "user_id": 123,
        "type": "login",
        "description": "Đăng nhập từ IP 192.168.1.1",
        "ip_address": "192.168.1.1",
        "user_agent": "Mozilla/5.0...",
        "created_at": "2024-11-26T10:30:00Z"
      },
      {
        "id": 1002,
        "user_id": 123,
        "type": "order",
        "description": "Đặt đơn hàng #ORD123456",
        "reference_id": 456,
        "reference_type": "order",
        "created_at": "2024-11-26T11:15:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 50,
      "total": 120
    }
  }
}
```

---

## Common Error Responses

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token không hợp lệ hoặc đã hết hạn"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Bạn không có quyền truy cập chức năng này"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Đã có lỗi xảy ra, vui lòng thử lại sau"
  }
}
```
