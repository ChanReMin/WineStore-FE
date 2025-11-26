## 🔴 ADMIN APIs - FULL

### 1. Xem Tất Cả Warehouse Requests

**Endpoint:**
```http
GET /api/admin/warehouses/requests?status=0&page=1&limit=20
Authorization: Bearer {admin_token}
```

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| status | int | No | 0=pending, 1=active, 2=banned |
| manager_id | bigint | No | Filter theo seller |
| page | int | No | Số trang (default: 1) |
| limit | int | No | Số lượng/trang (default: 20) |
| search | string | No | Tìm kiếm |
| sort_by | string | No | created_at, name |
| sort_order | string | No | asc, desc (default) |

**Response 200:**
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "id": 15,
        "name": "Kho rượu vang Quận 1",
        "location": "123 Nguyễn Huệ, Quận 1, TP.HCM",
        "description": "Kho chuyên rượu vang nhập khẩu Pháp, Italy",
        "status": 0,
        "manager": {
          "id": 5,
          "email": "seller@example.com",
          "first_name": "Nguyễn",
          "last_name": "Văn A",
          "phone_number": "0901234567"
        },
        "created_at": "2024-11-26T10:30:00Z",
        "updated_at": "2024-11-26T10:30:00Z"
      },
      {
        "id": 16,
        "name": "Kho rượu vang Quận 7",
        "location": "789 Nguyễn Văn Linh, Quận 7, TP.HCM",
        "description": "Kho chi nhánh phía Nam",
        "status": 0,
        "manager": {
          "id": 8,
          "email": "seller2@example.com",
          "first_name": "Trần",
          "last_name": "Thị B",
          "phone_number": "0912345678"
        },
        "created_at": "2024-11-26T09:00:00Z",
        "updated_at": "2024-11-26T09:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "total_items": 2,
      "per_page": 20,
      "has_next": false,
      "has_prev": false
    }
  }
}
```

---

### 2. Duyệt Warehouse Request (Approve)

**Endpoint:**
```http
PATCH /api/admin/warehouses/{warehouse_id}/approve
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "note": "Đã kiểm tra địa điểm và hồ sơ hợp lệ" // optional - có thể gửi vào notification
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Đã phê duyệt kho thành công",
  "data": {
    "id": 15,
    "name": "Kho rượu vang Quận 1",
    "location": "123 Nguyễn Huệ, Quận 1, TP.HCM",
    "status": 1,
    "manager_id": 5,
    "updated_at": "2024-11-26T11:30:00Z"
  }
}
```

**Response 400 - Already Approved:**
```json
{
  "success": false,
  "message": "Kho đã được phê duyệt trước đó"
}
```

**Response 404:**
```json
{
  "success": false,
  "message": "Không tìm thấy warehouse request"
}
```

---

### 3. Từ Chối Warehouse Request (Reject)

**Endpoint:**
```http
PATCH /api/admin/warehouses/{warehouse_id}/reject
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "reason": "Địa chỉ không hợp lệ, thiếu giấy phép kinh doanh" // bắt buộc
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Đã từ chối yêu cầu tạo kho",
  "data": {
    "id": 15,
    "name": "Kho rượu vang Quận 1",
    "status": 0,
    "deleted": true,
    "rejection_note": "Lý do từ chối đã được gửi tới seller qua thông báo"
  }
}
```

> **Lưu ý:** Khi reject, có thể:
> - **Option 1:** Xóa luôn warehouse (soft delete hoặc hard delete)
> - **Option 2:** Giữ lại status=0 và gửi lý do qua notification
> 
> Tôi recommend **xóa luôn** và gửi lý do qua notification cho seller

**Response 400:**
```json
{
  "success": false,
  "message": "Vui lòng cung cấp lý do từ chối",
  "errors": {
    "reason": "Lý do từ chối là bắt buộc"
  }
}
```

---

### 4. Xem Tất Cả Warehouses (Admin Dashboard)

**Endpoint:**
```http
GET /api/admin/warehouses?status=1&manager_id=5&page=1&limit=20
Authorization: Bearer {admin_token}
```

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| status | int | No | Filter theo status |
| manager_id | bigint | No | Filter theo seller |
| search | string | No | Tìm kiếm |
| sort_by | string | No | name, created_at, updated_at |
| sort_order | string | No | asc, desc |
| page | int | No | Số trang |
| limit | int | No | Số lượng/trang |

**Response 200:**
```json
{
  "success": true,
  "data": {
    "warehouses": [
      {
        "id": 12,
        "name": "Kho rượu vang Tân Bình",
        "location": "456 Hoàng Văn Thụ, Tân Bình, TP.HCM",
        "description": "Kho tổng",
        "status": 1,
        "manager": {
          "id": 5,
          "email": "seller@example.com",
          "first_name": "Nguyễn",
          "last_name": "Văn A",
          "phone_number": "0901234567"
        },
        "inventory_summary": {
          "total_products": 150,
          "total_quantity": 5000,
          "total_value": 2500000000
        },
        "created_at": "2024-11-15T10:00:00Z",
        "updated_at": "2024-11-20T08:00:00Z"
      },
      {
        "id": 13,
        "name": "Kho rượu vang Quận 3",
        "location": "321 Võ Văn Tần, Quận 3, TP.HCM",
        "description": "Kho chi nhánh",
        "status": 1,
        "manager": {
          "id": 5,
          "email": "seller@example.com",
          "first_name": "Nguyễn",
          "last_name": "Văn A",
          "phone_number": "0901234567"
        },
        "inventory_summary": {
          "total_products": 80,
          "total_quantity": 2000,
          "total_value": 1200000000
        },
        "created_at": "2024-11-18T14:00:00Z",
        "updated_at": "2024-11-25T10:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 85,
      "per_page": 20,
      "has_next": true,
      "has_prev": false
    }
  }
}
```

---

### 5. Xem Chi Tiết 1 Warehouse (Admin)

**Endpoint:**
```http
GET /api/admin/warehouses/{warehouse_id}
Authorization: Bearer {admin_token}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "id": 12,
    "name": "Kho rượu vang Tân Bình",
    "location": "456 Hoàng Văn Thụ, Tân Bình, TP.HCM",
    "description": "Kho tổng",
    "status": 1,
    "manager": {
      "id": 5,
      "account_id": 10,
      "email": "seller@example.com",
      "first_name": "Nguyễn",
      "last_name": "Văn A",
      "phone_number": "0901234567",
      "role": 1,
      "created_at": "2024-01-15T10:00:00Z"
    },
    "inventory": {
      "total_products": 150,
      "total_quantity": 5000,
      "total_value": 2500000000,
      "low_stock_products": 12,
      "out_of_stock_products": 3
    },
    "statistics": {
      "total_orders_from_this_warehouse": 520,
      "total_revenue": 8500000000,
      "last_30_days_orders": 45
    },
    "recent_logs": [
      {
        "id": 1001,
        "type": "IN",
        "product_name": "Rượu vang đỏ Bordeaux 2020",
        "quantity": 50,
        "user_name": "Nguyễn Văn A",
        "created_at": "2024-11-25T14:00:00Z"
      },
      {
        "id": 1002,
        "type": "OUT",
        "product_name": "Rượu vang trắng Chardonnay",
        "quantity": -20,
        "reference_id": 1234,
        "reference_type": "order",
        "user_name": "Nguyễn Văn A",
        "created_at": "2024-11-25T16:30:00Z"
      }
    ],
    "created_at": "2024-11-15T10:00:00Z",
    "updated_at": "2024-11-20T08:00:00Z"
  }
}
```

---

### 6. Khóa/Cấm Warehouse (Ban)

**Endpoint:**
```http
PATCH /api/admin/warehouses/{warehouse_id}/ban
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "reason": "Vi phạm quy định lưu trữ, không đảm bảo an toàn thực phẩm" // bắt buộc
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Đã khóa kho thành công",
  "data": {
    "id": 12,
    "name": "Kho rượu vang Tân Bình",
    "status": 2,
    "manager_id": 5,
    "updated_at": "2024-11-26T12:00:00Z",
    "ban_note": "Lý do khóa đã được gửi tới seller qua thông báo"
  }
}
```

**Response 400:**
```json
{
  "success": false,
  "message": "Vui lòng cung cấp lý do khóa kho",
  "errors": {
    "reason": "Lý do khóa là bắt buộc"
  }
}
```

**Response 400 - Already Banned:**
```json
{
  "success": false,
  "message": "Kho đã bị khóa trước đó"
}
```

---

### 7. Kích Hoạt Lại Warehouse (Unban)

**Endpoint:**
```http
PATCH /api/admin/warehouses/{warehouse_id}/unban
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "note": "Đã khắc phục vi phạm, cho phép hoạt động lại" // optional
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Đã kích hoạt lại kho thành công",
  "data": {
    "id": 12,
    "name": "Kho rượu vang Tân Bình",
    "status": 1,
    "manager_id": 5,
    "updated_at": "2024-11-26T14:00:00Z"
  }
}
```

**Response 400:**
```json
{
  "success": false,
  "message": "Kho không ở trạng thái bị khóa"
}
```

---

### 8. Thống Kê Toàn Bộ Warehouses (Admin Dashboard)

**Endpoint:**
```http
GET /api/admin/warehouses/statistics
Authorization: Bearer {admin_token}
```

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| manager_id | bigint | No | Filter theo seller |
| from_date | date | No | Từ ngày (YYYY-MM-DD) |
| to_date | date | No | Đến ngày (YYYY-MM-DD) |

**Response 200:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total_warehouses": 85,
      "active_warehouses": 78,
      "pending_warehouses": 5,
      "banned_warehouses": 2
    },
    "inventory": {
      "total_products": 12500,
      "total_quantity": 350000,
      "total_inventory_value": 175000000000
    },
    "by_status": [
      {
        "status": 1,
        "status_label": "Đang hoạt động",
        "count": 78,
        "percentage": 91.76
      },
      {
        "status": 0,
        "status_label": "Chờ duyệt",
        "count": 5,
        "percentage": 5.88
      },
      {
        "status": 2,
        "status_label": "Bị khóa",
        "count": 2,
        "percentage": 2.35
      }
    ],
    "top_warehouses": [
      {
        "id": 5,
        "name": "Kho trung tâm Q1",
        "manager_name": "Nguyễn Văn A",
        "total_value": 25000000000,
        "total_products": 2500
      },
      {
        "id": 8,
        "name": "Kho Tân Bình",
        "manager_name": "Trần Thị B",
        "total_value": 18000000000,
        "total_products": 1800
      }
    ],
    "recent_requests": [
      {
        "id": 15,
        "name": "Kho rượu vang Quận 1",
        "manager_name": "Nguyễn Văn A",
        "status": 0,
        "created_at": "2024-11-26T10:30:00Z"
      }
    ]
  }
}
```

---

### 9. Cập Nhật Warehouse (Admin)

**Endpoint:**
```http
PUT /api/admin/warehouses/{warehouse_id}
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Kho rượu vang Tân Bình - Cập nhật",
  "location": "456 Hoàng Văn Thụ, Phường 4, Tân Bình, TP.HCM",
  "description": "Kho tổng - admin cập nhật",
  "manager_id": 8  // optional - chuyển warehouse cho seller khác
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Cập nhật kho thành công",
  "data": {
    "id": 12,
    "name": "Kho rượu vang Tân Bình - Cập nhật",
    "location": "456 Hoàng Văn Thụ, Phường 4, Tân Bình, TP.HCM",
    "description": "Kho tổng - admin cập nhật",
    "status": 1,
    "manager_id": 8,
    "updated_at": "2024-11-26T15:00:00Z"
  }
}
```

---

### 10. Xóa Warehouse (Admin - Soft Delete)

**Endpoint:**
```http
DELETE /api/admin/warehouses/{warehouse_id}
Authorization: Bearer {admin_token}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Đã xóa kho thành công"
}
```

**Response 400:**
```json
{
  "success": false,
  "message": "Không thể xóa kho đang có hàng trong kho. Vui lòng chuyển hàng trước."
}
```