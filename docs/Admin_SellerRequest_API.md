# **2. ADMIN API**

---

# **2.1. Lấy danh sách yêu cầu nâng cấp Seller**

### **GET /api/admin/seller-requests**

### **Headers**

```
Authorization: Bearer {access_token}
```

### **Query Parameters**

| Param  | Type   | Default | Description                      |
| ------ | ------ | ------- | -------------------------------- |
| page   | number | 1       | Trang                            |
| limit  | number | 20      | Số phần tử mỗi trang             |
| status | string | all     | pending, approved, rejected, all |
| sort   | string | newest  | newest, oldest                   |

---

### **Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "id": 1001,
        "user": {
          "user_id": 456,
          "account_id": 123,
          "email": "user@example.com",
          "full_name": "Nguyễn Văn A",
          "phone_number": "0912345678",
          "avatar": "https://cdn.example.com/avatar.jpg"
        },
        "current_role": 0,
        "requested_role": 1,
        "status": "pending",
        "status_text": "Chờ duyệt",
        "created_at": "2024-11-20T10:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 1,
      "total_items": 8
    },
    "summary": {
      "total_requests": 50,
      "pending": 8,
      "approved": 35,
      "rejected": 7
    }
  }
}
```

---

# **2.2. Xem chi tiết yêu cầu nâng cấp**

### **GET /api/admin/seller-requests/{request_id}**

### **Headers**

```
Authorization: Bearer {access_token}
```

### **Response (200 OK)**

📌 **Đã xoá toàn bộ business_info vì customer không cung cấp giấy tờ.**

```json
{
  "success": true,
  "data": {
    "id": 1001,
    "user": {
      "user_id": 456,
      "account_id": 123,
      "email": "user@example.com",
      "full_name": "Nguyễn Văn A",
      "phone_number": "0912345678",
      "avatar": "https://cdn.example.com/avatar.jpg",
      "total_orders": 25,
      "total_spent": 75000000,
      "account_age_days": 180
    },
    "current_role": 0,
    "requested_role": 1,
    "reason": null,
    "status": "pending",
    "status_text": "Chờ duyệt",
    "created_at": "2024-11-20T10:00:00Z",
    "updated_at": "2024-11-20T10:00:00Z"
  }
}
```

---

# **2.3. Duyệt yêu cầu nâng cấp**

### **PUT /api/admin/seller-requests/{request_id}/approve**

### **Headers**

```
Authorization: Bearer {access_token}
```

### **Request Body**

```json
{
  "note": "Hồ sơ hợp lệ, chấp thuận nâng cấp."
}
```

### **Response (200 OK)**

```json
{
  "success": true,
  "message": "Đã duyệt yêu cầu nâng cấp",
  "data": {
    "request_id": 1001,
    "user_id": 456,
    "account_id": 123,
    "old_role": 0,
    "new_role": 1,
    "status": "approved",
    "approved_by": {
      "admin_id": 1,
      "admin_name": "Admin User"
    },
    "approved_at": "2024-11-25T10:30:00Z"
  }
}
```

---

# **2.4. Từ chối yêu cầu**

### **PUT /api/admin/seller-requests/{request_id}/reject**

### **Headers**

```
Authorization: Bearer {access_token}
```

### **Request Body**

```json
{
  "reason": "Không đủ điều kiện nâng cấp",
  "note": "Vui lòng liên hệ hỗ trợ để biết thêm chi tiết."
}
```

### **Response (200 OK)**

```json
{
  "success": true,
  "message": "Đã từ chối yêu cầu",
  "data": {
    "request_id": 1001,
    "user_id": 456,
    "status": "rejected",
    "rejected_by": {
      "admin_id": 1,
      "admin_name": "Admin User"
    },
    "rejected_at": "2024-11-25T10:30:00Z",
    "reason": "Không đủ điều kiện nâng cấp"
  }
}
```
