# WineStore API Documentation

Tài liệu API đầy đủ cho hệ thống WineStore - nền tảng thương mại điện tử bán rượu vang.

## 📚 Cấu trúc tài liệu

### 🎯 Quy ước chung
- **[API_OVERVIEW.md](./API_OVERVIEW.md)** - Quy ước API, authentication, response format, hybrid approach

### 🔐 Authentication
- **[API_AUTHENTICATION.md](./API_AUTHENTICATION.md)** - Đăng ký, đăng nhập, refresh token, quên mật khẩu

### 🛍️ Core APIs (Role-aware)
Các APIs này sử dụng **hybrid approach** - endpoint chung nhưng response khác nhau theo role:

- **[API_PRODUCTS.md](./API_PRODUCTS.md)** - Quản lý sản phẩm
  - Customer: Xem sản phẩm công khai
  - Seller: Xem với thông tin quản lý (cost, inventory, status)
  - Seller WRITE: Tạo/sửa/xóa sản phẩm

- **[API_ORDERS.md](./API_ORDERS.md)** - Quản lý đơn hàng
  - Customer: Xem đơn hàng của mình, tạo đơn, hủy, trả hàng
  - Seller: Xem đơn hàng shop mình, xác nhận, vận chuyển, xử lý trả hàng

- **[API_CART.md](./API_CART.md)** - Giỏ hàng
  - Quản lý giỏ hàng, áp dụng mã giảm giá

- **[API_PROFILE.md](./API_PROFILE.md)** - Hồ sơ & địa chỉ
  - Quản lý thông tin cá nhân, địa chỉ giao hàng

### 💳 Payment
- **[API_PAYMENTS.md](./API_PAYMENTS.md)** - Tích hợp thanh toán VNPay, COD, MoMo

### 📊 Seller Management
- **[API_SELLER_DASHBOARD.md](./API_SELLER_DASHBOARD.md)** - Dashboard, thống kê, báo cáo
- **[API_SELLER_INVENTORY.md](./API_SELLER_INVENTORY.md)** - Quản lý kho, xuất nhập, kiểm kê
- **[API_SELLER_PROMOTIONS.md](./API_SELLER_PROMOTIONS.md)** - Quản lý khuyến mãi

---

## 🎨 API Design - Hybrid Approach

### Tại sao Hybrid?

Thay vì tạo 2 endpoints riêng biệt:
```
❌ GET /api/products          → Customer
❌ GET /api/seller/products   → Seller
```

Chúng ta sử dụng **1 endpoint chung**:
```
✅ GET /api/products          → Response khác nhau dựa trên role trong token
```

### Lợi ích

1. **Giảm số lượng endpoints** - Dễ maintain
2. **Flexible** - Backend kiểm soát data trả về
3. **Clear separation** - WRITE operations vẫn tách riêng
4. **Better UX** - Consistent URL structure

### Khi nào dùng endpoint chung?

✅ **READ operations (GET)**
- Xem danh sách (products, orders)
- Xem chi tiết
- Xem thống kê

### Khi nào tách riêng?

✅ **WRITE operations (POST/PUT/DELETE)**
- Tạo/sửa/xóa sản phẩm → `/api/seller/products`
- Xác nhận đơn hàng → `/api/seller/orders/:id/confirm`
- Tạo khuyến mãi → `/api/seller/promotions`

---

## 📊 Tổng quan APIs

### Tổng số endpoints: ~80+ APIs

#### Authentication (8 APIs)
- Đăng ký/đăng nhập
- Refresh token
- Quên/đặt lại mật khẩu
- Xác thực email

#### Products (12 APIs)
- Danh sách & chi tiết sản phẩm (role-aware)
- Danh mục & thương hiệu
- Đánh giá sản phẩm
- Seller: Tạo/sửa/xóa sản phẩm

#### Cart (8 APIs)
- Xem/thêm/sửa/xóa giỏ hàng
- Áp dụng mã giảm giá
- Validate giỏ hàng

#### Orders (10 APIs)
- Danh sách & chi tiết (role-aware)
- Customer: Tạo, hủy, trả hàng
- Seller: Xác nhận, vận chuyển, xử lý

#### Profile (9 APIs)
- Quản lý hồ sơ
- Quản lý địa chỉ
- Đổi mật khẩu

#### Payments (7 APIs)
- VNPay integration
- Danh sách phương thức
- Kiểm tra trạng thái

#### Seller Dashboard (9 APIs)
- Tổng quan dashboard
- Thống kê doanh thu
- Top products, customers
- Export báo cáo

#### Seller Inventory (10 APIs)
- Quản lý tồn kho
- Xuất nhập kho
- Kiểm kê, cảnh báo

#### Seller Promotions (11 APIs)
- CRUD khuyến mãi
- Thống kê hiệu quả
- Validate mã

---

## 🔑 Authentication & Authorization

### Roles
- **GUEST**: Khách không đăng nhập
- **CUSTOMER**: Khách hàng
- **SELLER**: Người bán
- **ADMIN**: Quản trị viên

### Token Types
- **Access Token**: 15 phút, gửi trong header
- **Refresh Token**: 7 ngày, lưu trong httpOnly cookie

### Header Format
```
Authorization: Bearer {access_token}
```

---

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Thành công",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Lỗi",
  "errors": [
    {
      "field": "email",
      "message": "Email không hợp lệ"
    }
  ]
}
```

---

## 🚀 Quick Start

### 1. Đăng ký/Đăng nhập
```bash
POST /api/auth/register
POST /api/auth/login
```

### 2. Xem sản phẩm
```bash
# Không cần token
GET /api/products

# Với token seller (xem thêm cost, inventory)
GET /api/products
Headers: Authorization: Bearer {seller_token}
```

### 3. Thêm vào giỏ hàng
```bash
POST /api/cart/items
Headers: Authorization: Bearer {customer_token}
Body: { "product_id": 1, "quantity": 2 }
```

### 4. Tạo đơn hàng
```bash
POST /api/orders
Headers: Authorization: Bearer {customer_token}
Body: { "shipping_address_id": 1, "payment_method_id": 1 }
```

### 5. Seller quản lý
```bash
# Xem đơn hàng
GET /api/orders
Headers: Authorization: Bearer {seller_token}

# Xác nhận đơn
PUT /api/seller/orders/1/confirm
Headers: Authorization: Bearer {seller_token}
```

---

## 🛠️ Backend Implementation

### Role Detection Middleware
```javascript
const detectRole = (req, res, next) => {
  req.userRole = req.user?.role || 'GUEST';
  req.viewType = req.userRole === 'SELLER' ? 'seller' : 'customer';
  next();
};
```

### Response Formatter
```javascript
const formatProduct = (product, viewType) => {
  const base = {
    id: product.id,
    name: product.name,
    price: product.price
  };
  
  if (viewType === 'seller') {
    return {
      ...base,
      cost_price: product.cost_price,
      profit_margin: calculateMargin(product.price, product.cost_price),
      status: product.status,
      inventory: product.inventory
    };
  }
  
  return base;
};
```

---

## 📖 Documentation

Mỗi file API bao gồm:
- ✅ HTTP Method & Endpoint
- ✅ Authentication requirements
- ✅ Request/Response format đầy đủ
- ✅ Error handling
- ✅ Examples
- ✅ Notes & best practices

---

## 🎯 Next Steps

1. **Backend Team**: Implement theo từng module
2. **Frontend Team**: Tích hợp APIs
3. **Testing**: Tạo Postman collection
4. **Documentation**: Cập nhật khi có thay đổi

---

## 📞 Support

Nếu có câu hỏi về API:
- Email: api-support@winestore.com
- Slack: #api-support
- Documentation: https://docs.winestore.com

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Status**: ✅ Production Ready

