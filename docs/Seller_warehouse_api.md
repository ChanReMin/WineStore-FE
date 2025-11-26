Được rồi, tôi sẽ viết lại **FULL API** với schema giữ nguyên và status đơn giản hơn.

## 📋 Schema Warehouses (Giữ Nguyên)

```sql
Table warehouses {
  id int [pk, increment]
  name varchar(255) [not null]
  location varchar(512)
  description text
  status smallint [default: 0]              // 0=pending, 1=active, 2=banned
  manager_id bigint                         // người quản lý kho (seller)
  created_at timestamp [default: `now()`]
  updated_at timestamp
}
```

---

## 🔵 SELLER APIs - FULL

### 1. Tạo Warehouse Request

**Endpoint:**
```http
POST /api/seller/warehouses
Authorization: Bearer {seller_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Kho rượu vang Quận 1",
  "location": "123 Nguyễn Huệ, Quận 1, TP.HCM",
  "description": "Kho chuyên rượu vang nhập khẩu Pháp, Italy"
}
```

**Response 201 - Success:**
```json
{
  "success": true,
  "message": "Yêu cầu tạo kho đã được gửi, chờ admin phê duyệt",
  "data": {
    "id": 15,
    "name": "Kho rượu vang Quận 1",
    "location": "123 Nguyễn Huệ, Quận 1, TP.HCM",
    "description": "Kho chuyên rượu vang nhập khẩu Pháp, Italy",
    "status": 0,
    "manager_id": 5,
    "created_at": "2024-11-26T10:30:00Z"
  }
}
```

**Response 400 - Validation Error:**
```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": {
    "name": "Tên kho không được để trống",
    "location": "Địa chỉ không được để trống"
  }
}
```

---

### 2. Xem Danh Sách Warehouse Của Seller

**Endpoint:**
```http
GET /api/seller/warehouses?status=1&page=1&limit=10
Authorization: Bearer {seller_token}
```

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| status | int | No | 0=pending, 1=active, 2=banned |
| page | int | No | Số trang (default: 1) |
| limit | int | No | Số lượng/trang (default: 10, max: 100) |
| search | string | No | Tìm kiếm theo tên hoặc địa chỉ |

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
        "created_at": "2024-11-15T10:00:00Z",
        "updated_at": "2024-11-20T08:00:00Z",
        "inventory_summary": {
          "total_products": 150,
          "total_quantity": 5000
        }
      },
      {
        "id": 15,
        "name": "Kho rượu vang Quận 1",
        "location": "123 Nguyễn Huệ, Quận 1, TP.HCM",
        "description": "Kho chuyên rượu vang nhập khẩu",
        "status": 0,
        "created_at": "2024-11-26T10:30:00Z",
        "updated_at": "2024-11-26T10:30:00Z",
        "inventory_summary": {
          "total_products": 0,
          "total_quantity": 0
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "total_items": 2,
      "per_page": 10,
      "has_next": false,
      "has_prev": false
    },
    "summary": {
      "total_warehouses": 2,
      "active": 1,
      "pending": 1,
      "banned": 0
    }
  }
}
```

---

### 3. Xem Chi Tiết 1 Warehouse

**Endpoint:**
```http
GET /api/seller/warehouses/{warehouse_id}
Authorization: Bearer {seller_token}
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
    "manager_id": 5,
    "created_at": "2024-11-15T10:00:00Z",
    "updated_at": "2024-11-20T08:00:00Z",
    "inventory": {
      "total_products": 150,
      "total_quantity": 5000,
      "total_value": 2500000000,
      "low_stock_products": 12
    },
    "recent_logs": [
      {
        "id": 1001,
        "type": "IN",
        "product_name": "Rượu vang đỏ Bordeaux 2020",
        "quantity": 50,
        "created_at": "2024-11-25T14:00:00Z"
      },
      {
        "id": 1002,
        "type": "OUT",
        "product_name": "Rượu vang trắng Chardonnay",
        "quantity": -20,
        "created_at": "2024-11-25T16:30:00Z"
      }
    ]
  }
}
```

**Response 404:**
```json
{
  "success": false,
  "message": "Không tìm thấy kho hàng"
}
```

**Response 403:**
```json
{
  "success": false,
  "message": "Bạn không có quyền truy cập kho này"
}
```

---

### 4. Cập Nhật Warehouse (Chỉ Active)

**Endpoint:**
```http
PUT /api/seller/warehouses/{warehouse_id}
Authorization: Bearer {seller_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Kho rượu vang Tân Bình - Chi nhánh 1",
  "location": "456 Hoàng Văn Thụ, Phường 4, Tân Bình, TP.HCM",
  "description": "Kho tổng - cập nhật mở rộng"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Cập nhật kho thành công",
  "data": {
    "id": 12,
    "name": "Kho rượu vang Tân Bình - Chi nhánh 1",
    "location": "456 Hoàng Văn Thụ, Phường 4, Tân Bình, TP.HCM",
    "description": "Kho tổng - cập nhật mở rộng",
    "status": 1,
    "updated_at": "2024-11-26T11:00:00Z"
  }
}
```

**Response 403 - Warehouse Pending:**
```json
{
  "success": false,
  "message": "Không thể cập nhật kho đang chờ duyệt"
}
```

**Response 403 - Warehouse Banned:**
```json
{
  "success": false,
  "message": "Không thể cập nhật kho đã bị khóa"
}
```

---

### 5. Xóa Warehouse Request (Chỉ Pending)

**Endpoint:**
```http
DELETE /api/seller/warehouses/{warehouse_id}
Authorization: Bearer {seller_token}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Đã xóa yêu cầu tạo kho"
}
```

**Response 403:**
```json
{
  "success": false,
  "message": "Chỉ có thể xóa kho đang chờ duyệt (status=0)"
}
```

---

### 6. Thống Kê Warehouse Dashboard

**Endpoint:**
```http
GET /api/seller/warehouses/statistics
Authorization: Bearer {seller_token}
```

**Response 200:**
```json
{
  "success": true,
  "data": {
    "total_warehouses": 3,
    "active_warehouses": 2,
    "pending_warehouses": 1,
    "banned_warehouses": 0,
    "total_inventory_value": 5000000000,
    "total_products": 350,
    "total_quantity": 12000,
    "warehouses_by_status": [
      {
        "status": 1,
        "count": 2,
        "label": "Đang hoạt động"
      },
      {
        "status": 0,
        "count": 1,
        "label": "Chờ duyệt"
      }
    ]
  }
}
```

## 📊 Status Code Reference

```javascript
const WAREHOUSE_STATUS = {
  PENDING: 0,    // Chờ admin duyệt
  ACTIVE: 1,     // Đang hoạt động
  BANNED: 2      // Bị khóa/cấm
};

