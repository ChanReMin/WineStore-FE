# API Documentation - Pre-Checkout Flow

Trước khi checkout, customer cần thực hiện các bước sau:

---

## 1. Xem Giỏ Hàng

### Endpoint
```
GET /api/cart
```

### Description
Lấy thông tin giỏ hàng của customer hiện tại

### Authentication
- **Required**: Yes
- **Type**: Bearer Token (JWT)
- **Role**: Customer

### Request Headers
```
Authorization: Bearer {accessToken}
```

### Response

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "cartId": 456,
    "userId": 123,
    "items": [
      {
        "id": 789,
        "productId": 101,
        "productName": "Rượu Vang Đỏ Château Margaux 2015",
        "productSlug": "ruou-vang-do-chateau-margaux-2015",
        "productImage": "https://cdn.example.com/products/chateau-margaux.jpg",
        "sku": "WR-CHM-2015",
        "unitPrice": 15000000.00,
        "quantity": 2,
        "lineTotal": 30000000.00,
        "stockAvailable": 5,
        "isAvailable": true
      },
      {
        "id": 790,
        "productId": 102,
        "productName": "Rượu Vang Trắng Chardonnay Reserve",
        "productSlug": "ruou-vang-trang-chardonnay-reserve",
        "productImage": "https://cdn.example.com/products/chardonnay.jpg",
        "sku": "WW-CHR-2020",
        "unitPrice": 3500000.00,
        "quantity": 1,
        "lineTotal": 3500000.00,
        "stockAvailable": 10,
        "isAvailable": true
      }
    ],
    "summary": {
      "totalItems": 2,
      "totalquantity": 3,
      "subtotal": 33500000.00
    },
    "updatedAt": "2024-11-27T10:15:00Z"
  }
}
```

#### Empty Cart (200 OK)

```json
{
  "success": true,
  "data": {
    "cartId": 456,
    "userId": 123,
    "items": [],
    "summary": {
      "totalItems": 0,
      "totalquantity": 0,
      "subtotal": 0
    }
  }
}
```

---

## 2. Cập Nhật Số Lượng Sản Phẩm

### Endpoint
```
PUT /api/cart/items/{cartItemId}
```

### Description
Cập nhật số lượng của một sản phẩm trong giỏ hàng

### Authentication
- **Required**: Yes
- **Type**: Bearer Token (JWT)
- **Role**: Customer

### Request Headers
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `cartItemId` | bigint | ID của cart item cần cập nhật |

### Request Body

```json
{
  "quantity": 3
}
```

### Response

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Cập nhật giỏ hàng thành công",
  "data": {
    "id": 789,
    "productId": 101,
    "quantity": 3,
    "unitPrice": 15000000.00,
    "lineTotal": 45000000.00,
    "updatedAt": "2024-11-27T10:20:00Z"
  }
}
```

#### Error Response (400 Bad Request)

```json
{
  "success": false,
  "message": "Số lượng vượt quá tồn kho",
  "error": {
    "requested_quantity": 10,
    "available_quantity": 5
  }
}
```

---

## 3. Xóa Sản Phẩm Khỏi Giỏ

### Endpoint
```
DELETE /api/cart/items/{cartItemId}
```

### Description
Xóa một sản phẩm khỏi giỏ hàng

### Authentication
- **Required**: Yes
- **Type**: Bearer Token (JWT)
- **Role**: Customer

### Request Headers
```
Authorization: Bearer {accessToken}
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `cartItemId` | bigint | ID của cart item cần xóa |

### Response

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Đã xóa sản phẩm khỏi giỏ hàng"
}
```

---

## 4. Lấy Danh Sách Địa Chỉ Giao Hàng

### Endpoint
```
GET /api/user/addresses
```

### Description
Lấy tất cả địa chỉ giao hàng của customer

### Authentication
- **Required**: Yes
- **Type**: Bearer Token (JWT)
- **Role**: Customer

### Request Headers
```
Authorization: Bearer {accessToken}
```

### Response

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "addresses": [
      {
        "id": 123,
        "userId": 456,
        "fullName": "Nguyễn Văn A",
        "phoneNumber": "0912345678",
        "addressLine": "123 Nguyễn Huệ",
        "ward": "Phường Bến Nghé",
        "district": "Quận 1",
        "city": "TP. Hồ Chí Minh",
        "isDefault": true,
        "createdAt": "2024-01-15T08:00:00Z"
      },
      {
        "id": 124,
        "userId": 456,
        "fullName": "Nguyễn Văn A",
        "phoneNumber": "0912345678",
        "addressLine": "456 Lê Lợi",
        "ward": "Phường Bến Thành",
        "district": "Quận 1",
        "city": "TP. Hồ Chí Minh",
        "isDefault": false,
        "createdAt": "2024-03-20T10:30:00Z"
      }
    ],
    "total": 2
  }
}
```

---

## 5. Thêm Địa Chỉ Giao Hàng Mới

### Endpoint
```
POST /api/user/addresses
```

### Description
Tạo địa chỉ giao hàng mới cho customer

### Authentication
- **Required**: Yes
- **Type**: Bearer Token (JWT)
- **Role**: Customer

### Request Headers
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### Request Body

```json
{
  "fullName": "Nguyễn Văn A",
  "phoneNumber": "0912345678",
  "addressLine": "789 Trần Hưng Đạo",
  "ward": "Phường Cô Giang",
  "district": "Quận 1",
  "city": "TP. Hồ Chí Minh",
  "isDefault": false
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `fullName` | string | Yes | Tên người nhận (max 255) |
| `phoneNumber` | string | Yes | SĐT người nhận (max 20) |
| `addressLine` | string | Yes | Địa chỉ chi tiết (max 512) |
| `ward` | string | No | Phường/Xã (max 100) |
| `district` | string | No | Quận/Huyện (max 100) |
| `city` | string | Yes | Tỉnh/Thành phố (max 100) |
| `isDefault` | boolean | No | Đặt làm địa chỉ mặc định (default: false) |

### Response

#### Success Response (201 Created)

```json
{
  "success": true,
  "message": "Thêm địa chỉ thành công",
  "data": {
    "id": 125,
    "userId": 456,
    "fullName": "Nguyễn Văn A",
    "phoneNumber": "0912345678",
    "addressLine": "789 Trần Hưng Đạo",
    "ward": "Phường Cô Giang",
    "district": "Quận 1",
    "city": "TP. Hồ Chí Minh",
    "isDefault": false,
    "createdAt": "2024-11-27T10:25:00Z"
  }
}
```

---

## 6. Lấy Danh Sách Phương Thức Thanh Toán

### Endpoint
```
GET /api/payment-methods
```

### Description
Lấy tất cả phương thức thanh toán khả dụng

### Authentication
- **Required**: No (public API)

### Response

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "paymentMethods": [
      {
        "id": 1,
        "code": "COD",
        "name": "Thanh toán khi nhận hàng",
        "description": "Thanh toán bằng tiền mặt khi nhận hàng",
        "isActive": true
      },
      {
        "id": 2,
        "code": "VNPAY",
        "name": "Thanh toán qua VNPAY",
        "description": "Thanh toán online qua cổng VNPAY",
        "isActive": true
      },
      {
        "id": 3,
        "code": "MOMO",
        "name": "Ví điện tử MoMo",
        "description": "Thanh toán qua ví điện tử MoMo",
        "isActive": true
      },
      {
        "id": 4,
        "code": "BANK_TRANSFER",
        "name": "Chuyển khoản ngân hàng",
        "description": "Chuyển khoản trực tiếp vào tài khoản công ty",
        "isActive": true
      }
    ]
  }
}
```

---

## 7. Validate Mã Khuyến Mãi

### Endpoint
```
POST /api/promotions/validate
```

### Description
Kiểm tra và tính toán giảm giá từ mã khuyến mãi

### Authentication
- **Required**: Yes
- **Type**: Bearer Token (JWT)
- **Role**: Customer

### Request Headers
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### Request Body

```json
{
  "promotion_code": "SUMMER2024",
  "cart_total": 33500000.00,
  "productIds": [101, 102]
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `promotion_code` | string | Yes | Mã khuyến mãi cần validate |
| `cart_total` | decimal | Yes | Tổng giá trị giỏ hàng |
| `productIds` | array | Yes | Danh sách ID sản phẩm trong giỏ |

### Response

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Mã khuyến mãi hợp lệ",
  "data": {
    "promotion": {
      "id": 5,
      "code": "SUMMER2024",
      "name": "Giảm giá mùa hè 2024",
      "description": "Giảm 5% cho đơn hàng từ 10 triệu",
      "discounttype": 1,
      "discountTypeText": "Phần trăm",
      "discountvalue": 5.00,
      "min_order_amount": 10000000.00,
      "startdate": "2024-06-01T00:00:00Z",
      "enddate": "2024-08-31T23:59:59Z"
    },
    "applicable": true,
    "discountAmount": 1675000.00,
    "finalAmount": 31825000.00
  }
}
```

#### Error Response (400 Bad Request) - Không đủ điều kiện

```json
{
  "success": false,
  "message": "Mã khuyến mãi không áp dụng được",
  "error": "Đơn hàng chưa đạt giá trị tối thiểu 10,000,000đ"
}
```

#### Error Response (404 Not Found) - Mã không tồn tại

```json
{
  "success": false,
  "message": "Mã khuyến mãi không tồn tại hoặc đã hết hạn"
}
```

#### Error Response (400 Bad Request) - Đã hết lượt sử dụng

```json
{
  "success": false,
  "message": "Mã khuyến mãi đã hết lượt sử dụng"
}
```

---

## 8. Tính Phí Vận Chuyển

### Endpoint
```
POST /api/shipping/calculate
```

### Description
Tính phí vận chuyển dựa trên địa chỉ và giỏ hàng

### Authentication
- **Required**: Yes
- **Type**: Bearer Token (JWT)
- **Role**: Customer

### Request Headers
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### Request Body

```json
{
  "shippingAddress_id": 123,
  "cart_total": 33500000.00,
  "total_weight": 2250
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `shippingAddress_id` | bigint | Yes | ID địa chỉ giao hàng |
| `cart_total` | decimal | Yes | Tổng giá trị đơn hàng |
| `total_weight` | integer | No | Tổng khối lượng (gram) |

### Response

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "shippingFee": 50000.00,
    "estimatedDeliveryDays": 3,
    "freeShippingThreshold": 50000000.00,
    "note": "Miễn phí vận chuyển cho đơn hàng từ 50 triệu"
  }
}
```

---

## 9. Xem Trước Đơn Hàng (Pre-checkout Summary)

### Endpoint
```
POST /api/orders/preview
```

### Description
Xem tổng quan đơn hàng trước khi checkout chính thức

### Authentication
- **Required**: Yes
- **Type**: Bearer Token (JWT)
- **Role**: Customer

### Request Headers
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

### Request Body

```json
{
  "shippingAddress_id": 123,
  "promotion_code": "SUMMER2024",
  "paymentMethod_id": 1
}
```

### Response

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "productId": 101,
        "productName": "Rượu Vang Đỏ Château Margaux 2015",
        "quantity": 2,
        "unitPrice": 15000000.00,
        "lineTotal": 30000000.00
      },
      {
        "productId": 102,
        "productName": "Rượu Vang Trắng Chardonnay Reserve",
        "quantity": 1,
        "unitPrice": 3500000.00,
        "lineTotal": 3500000.00
      }
    ],
    "shippingAddress": {
      "fullName": "Nguyễn Văn A",
      "phoneNumber": "0912345678",
      "addressLine": "123 Nguyễn Huệ",
      "ward": "Phường Bến Nghé",
      "district": "Quận 1",
      "city": "TP. Hồ Chí Minh"
    },
    "paymentMethod": {
      "id": 1,
      "code": "COD",
      "name": "Thanh toán khi nhận hàng"
    },
    "promotion": {
      "code": "SUMMER2024",
      "name": "Giảm giá mùa hè 2024",
      "discountAmount": 1675000.00
    },
    "summary": {
      "subtotal": 33500000.00,
      "discountAmount": 1675000.00,
      "shippingFee": 50000.00,
      "totalAmount": 31875000.00
    }
  }
}
```

---

## Luồng Hoàn Chỉnh (Complete Flow)

```
1. GET /api/cart
   → Xem giỏ hàng hiện tại

2. PUT /api/cart/items/{id} (optional)
   → Cập nhật số lượng nếu cần

3. DELETE /api/cart/items/{id} (optional)
   → Xóa sản phẩm không muốn mua

4. GET /api/user/addresses
   → Lấy danh sách địa chỉ giao hàng
   
5. POST /api/user/addresses (nếu chưa có)
   → Thêm địa chỉ mới

6. GET /api/payment-methods
   → Chọn phương thức thanh toán

7. POST /api/promotions/validate (optional)
   → Kiểm tra mã giảm giá

8. POST /api/shipping/calculate (optional)
   → Xem phí vận chuyển

9. POST /api/orders/preview
   → Xem tổng quan trước khi đặt hàng

10. POST /api/orders/checkout
    → CHECKOUT - Tạo đơn hàng chính thức
```

## Notes

- Tất cả API (trừ `/api/payment-methods`) đều yêu cầu authentication
- Nên gọi API `preview` trước `checkout` để tránh bất ngờ về giá
- Validate mã khuyến mãi trước để hiển thị giá đúng cho user
- Cache danh sách payment methods vì ít thay đổi