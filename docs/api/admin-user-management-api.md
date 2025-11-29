# API Documentation - Admin User Management

## Tổng quan
Tài liệu này định nghĩa các API endpoints cho tính năng quản lý người dùng (User Management) trong Admin Dashboard.

---

## 1. Lấy danh sách người dùng (Get Users List)

### Endpoint
```
GET /api/admin/users
```

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | No | Số trang (default: 1) |
| limit | number | No | Số lượng user mỗi trang (default: 10) |
| search | string | No | Tìm kiếm theo tên, email, phone |
| role | string | No | Lọc theo vai trò: 'buyer', 'seller', 'admin' |
| status | string | No | Lọc theo trạng thái: 'active', 'inactive', 'banned' |
| sortBy | string | No | Sắp xếp theo: 'createdAt', 'name', 'email' |
| sortOrder | string | No | Thứ tự: 'asc', 'desc' (default: 'desc') |

### Response Success (200)
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "email": "user@example.com",
        "name": "Nguyen Van A",
        "phone": "0901234567",
        "role": "buyer",
        "status": "active",
        "avatar": "https://example.com/avatar.jpg",
        "emailVerified": true,
        "createdAt": "2024-01-15T10:30:00Z",
        "lastLogin": "2024-11-28T08:20:00Z",
        "totalOrders": 15,
        "totalSpent": 5000000
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalUsers": 95,
      "limit": 10
    }
  }
}
```

---

## 2. Lấy chi tiết người dùng (Get User Detail)

### Endpoint
```
GET /api/admin/users/:userId
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | ID của người dùng |

### Response Success (200)
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "Nguyen Van A",
    "phone": "0901234567",
    "role": "buyer",
    "status": "active",
    "avatar": "https://example.com/avatar.jpg",
    "emailVerified": true,
    "address": {
      "street": "123 Nguyen Hue",
      "ward": "Ben Nghe",
      "district": "Quan 1",
      "city": "Ho Chi Minh",
      "country": "Vietnam"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-11-20T14:15:00Z",
    "lastLogin": "2024-11-28T08:20:00Z",
    "statistics": {
      "totalOrders": 15,
      "totalSpent": 5000000,
      "totalProducts": 0,
      "totalReviews": 8
    },
    "notes": "VIP customer"
  }
}
```

---

## 3. Cập nhật thông tin người dùng (Update User)

### Endpoint
```
PUT /api/admin/users/:userId
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | ID của người dùng |

### Request Body
```json
{
  "name": "Nguyen Van A",
  "phone": "0901234567",
  "role": "seller",
  "status": "active",
  "emailVerified": true,
  "notes": "Updated notes"
}
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Cập nhật thông tin người dùng thành công",
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "Nguyen Van A",
    "phone": "0901234567",
    "role": "seller",
    "status": "active",
    "updatedAt": "2024-11-28T10:30:00Z"
  }
}
```

---

## 4. Thay đổi trạng thái người dùng (Change User Status)

### Endpoint
```
PATCH /api/admin/users/:userId/status
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | ID của người dùng |

### Request Body
```json
{
  "status": "banned",
  "reason": "Vi phạm chính sách"
}
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Thay đổi trạng thái người dùng thành công",
  "data": {
    "id": "user_123",
    "status": "banned",
    "updatedAt": "2024-11-28T10:30:00Z"
  }
}
```

---

## 5. Xóa người dùng (Delete User)

### Endpoint
```
DELETE /api/admin/users/:userId
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | ID của người dùng |

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| permanent | boolean | No | Xóa vĩnh viễn (true) hoặc soft delete (false, default) |

### Response Success (200)
```json
{
  "success": true,
  "message": "Xóa người dùng thành công"
}
```

---

## 6. Khôi phục người dùng đã xóa (Restore User)

### Endpoint
```
POST /api/admin/users/:userId/restore
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | ID của người dùng đã bị xóa |

### Response Success (200)
```json
{
  "success": true,
  "message": "Khôi phục người dùng thành công",
  "data": {
    "id": "user_123",
    "status": "active",
    "restoredAt": "2024-11-28T10:30:00Z"
  }
}
```

---

## 7. Reset mật khẩu người dùng (Reset User Password)

### Endpoint
```
POST /api/admin/users/:userId/reset-password
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | ID của người dùng |

### Request Body
```json
{
  "sendEmail": true
}
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Đã gửi email reset mật khẩu cho người dùng",
  "data": {
    "resetToken": "temp_token_123",
    "expiresAt": "2024-11-28T12:30:00Z"
  }
}
```

---

## 8. Lấy lịch sử hoạt động người dùng (Get User Activity Logs)

### Endpoint
```
GET /api/admin/users/:userId/activities
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | ID của người dùng |

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | No | Số trang (default: 1) |
| limit | number | No | Số lượng log mỗi trang (default: 20) |
| type | string | No | Loại hoạt động: 'login', 'order', 'product', 'profile' |

### Response Success (200)
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "activity_123",
        "userId": "user_123",
        "type": "login",
        "action": "User logged in",
        "ipAddress": "192.168.1.1",
        "userAgent": "Mozilla/5.0...",
        "createdAt": "2024-11-28T08:20:00Z"
      },
      {
        "id": "activity_124",
        "userId": "user_123",
        "type": "order",
        "action": "Created order #ORD-001",
        "metadata": {
          "orderId": "order_456",
          "amount": 500000
        },
        "createdAt": "2024-11-27T15:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalActivities": 95,
      "limit": 20
    }
  }
}
```

---

## 9. Thống kê người dùng (Get User Statistics)

### Endpoint
```
GET /api/admin/users/statistics
```

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| startDate | string | No | Ngày bắt đầu (ISO format) |
| endDate | string | No | Ngày kết thúc (ISO format) |

### Response Success (200)
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "activeUsers": 980,
    "inactiveUsers": 200,
    "bannedUsers": 70,
    "newUsersThisMonth": 45,
    "usersByRole": {
      "buyer": 1000,
      "seller": 200,
      "admin": 50
    },
    "userGrowth": [
      {
        "date": "2024-11-01",
        "count": 15
      },
      {
        "date": "2024-11-02",
        "count": 20
      }
    ]
  }
}
```

---

## 10. Export danh sách người dùng (Export Users)

### Endpoint
```
POST /api/admin/users/export
```

### Request Body
```json
{
  "format": "csv",
  "filters": {
    "role": "buyer",
    "status": "active",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31"
  },
  "fields": ["email", "name", "phone", "role", "status", "createdAt"]
}
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Export thành công",
  "data": {
    "downloadUrl": "https://example.com/exports/users_20241128.csv",
    "expiresAt": "2024-11-29T10:30:00Z",
    "totalRecords": 1250
  }
}
```

---

## 11. Gửi thông báo cho người dùng (Send Notification to User)

### Endpoint
```
POST /api/admin/users/:userId/notifications
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | ID của người dùng |

### Request Body
```json
{
  "title": "Thông báo quan trọng",
  "message": "Tài khoản của bạn đã được nâng cấp",
  "type": "info",
  "sendEmail": true
}
```

### Response Success (200)
```json
{
  "success": true,
  "message": "Gửi thông báo thành công",
  "data": {
    "notificationId": "notif_123",
    "sentAt": "2024-11-28T10:30:00Z"
  }
}
```

---

## 12. Bulk Actions - Thao tác hàng loạt

### Endpoint
```
POST /api/admin/users/bulk-actions
```

### Request Body
```json
{
  "action": "update_status",
  "userIds": ["user_123", "user_456", "user_789"],
  "data": {
    "status": "active"
  }
}
```

### Supported Actions
- `update_status`: Cập nhật trạng thái
- `update_role`: Cập nhật vai trò
- `delete`: Xóa người dùng
- `send_notification`: Gửi thông báo

### Response Success (200)
```json
{
  "success": true,
  "message": "Thực hiện thao tác hàng loạt thành công",
  "data": {
    "successCount": 3,
    "failedCount": 0,
    "results": [
      {
        "userId": "user_123",
        "success": true
      },
      {
        "userId": "user_456",
        "success": true
      },
      {
        "userId": "user_789",
        "success": true
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid request parameters",
  "details": {
    "field": "email",
    "message": "Email không hợp lệ"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Bạn cần đăng nhập để thực hiện thao tác này"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Bạn không có quyền truy cập tính năng này"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "User not found",
  "message": "Không tìm thấy người dùng"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Đã xảy ra lỗi, vui lòng thử lại sau"
}
```

---

## Authentication & Authorization

Tất cả các API endpoints yêu cầu:
- **Authentication**: Bearer token trong header `Authorization: Bearer <token>`
- **Authorization**: User phải có role `admin`

### Headers Required
```
Authorization: Bearer <admin_access_token>
Content-Type: application/json
```

---

## Rate Limiting

- **Limit**: 100 requests/phút cho mỗi admin user
- **Export API**: 5 requests/phút

---

## Notes

1. Tất cả các timestamps sử dụng ISO 8601 format
2. Soft delete được áp dụng mặc định, có thể permanent delete nếu cần
3. Activity logs được lưu tự động cho mọi thao tác quan trọng
4. Export file có thời hạn 24 giờ
5. Bulk actions giới hạn tối đa 100 users mỗi lần