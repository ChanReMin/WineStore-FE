# API PRODUCTS - WineStore

Tài liệu này mô tả các API liên quan đến sản phẩm rượu vang. APIs sử dụng **hybrid approach**: READ endpoints chung với response khác nhau theo role, WRITE endpoints tách riêng cho seller.

## Base URL
```
https://api.winestore.com/api
```

---

## READ APIs (Role-aware Response)

### 1. Danh sách sản phẩm

Lấy danh sách sản phẩm với response tùy chỉnh theo role.

#### Endpoint
```
GET /api/products
```

#### Authentication Required
Optional (response khác nhau dựa trên role)

#### Request Headers
```
Authorization: Bearer {access_token}  (optional)
```

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | No | Trang hiện tại (mặc định: 1) |
| limit | number | No | Số sản phẩm mỗi trang (mặc định: 20, max: 100) |
| search | string | No | Tìm kiếm theo tên hoặc SKU |
| category_id | number | No | Lọc theo danh mục |
| brand_id | number | No | Lọc theo thương hiệu |
| min_price | number | No | Giá tối thiểu |
| max_price | number | No | Giá tối đa |
| in_stock | boolean | No | Chỉ lấy sản phẩm còn hàng |
| status | number | No | Lọc theo trạng thái (chỉ seller: 0-3) |
| sort_by | string | No | Sắp xếp theo (price, created_at, name, popularity) |
| sort_order | string | No | Thứ tự (asc, desc) |
| role | string | No | Force view type (seller/customer) - ưu tiên role trong token |

#### Example Request
```
# Customer/Guest
GET /api/products?search=chateau&category_id=1&min_price=1000000

# Seller (với token role SELLER hoặc ?role=seller)
GET /api/products?status=0&sort_by=created_at
```

#### Response Success - Customer/Guest View (200 OK)
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "name": "Château Margaux 2015",
        "slug": "chateau-margaux-2015",
        "description": "Rượu vang đỏ cao cấp từ vùng Bordeaux, Pháp",
        "price": 5940000,
        "original_price": 6500000,
        "discount_percent": 8.6,
        "category": {
          "id": 1,
          "name": "Vang đỏ",
          "slug": "vang-do"
        },
        "brand": {
          "id": 1,
          "name": "Château Margaux"
        },
        "images": [
          {
            "url": "https://cdn.winestore.com/products/1_main.jpg",
            "is_primary": true
          }
        ],
        "concentration": 13.5,
        "volume": 750,
        "origin_country": "Pháp",
        "in_stock": true,
        "rating_average": 4.8,
        "rating_count": 125,
        "sold_count": 342
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 5,
      "total_items": 98,
      "per_page": 20
    }
  }
}
```

#### Response Success - Seller View (200 OK)
Khi có token với role SELLER, response bao gồm thêm thông tin quản lý:

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "name": "Château Margaux 2015",
        "slug": "chateau-margaux-2015",
        "sku": "WN-CHM-2015",
        "description": "Rượu vang đỏ cao cấp từ vùng Bordeaux, Pháp",
        "price": 5940000,
        "cost_price": 4500000,
        "profit_margin": 24.2,
        "original_price": 6500000,
        "category": {
          "id": 1,
          "name": "Vang đỏ"
        },
        "brand": {
          "id": 1,
          "name": "Château Margaux"
        },
        "images": [
          {
            "id": 1,
            "url": "https://cdn.winestore.com/products/1_main.jpg",
            "is_primary": true
          }
        ],
        "concentration": 13.5,
        "volume": 750,
        "status": 1,
        "status_text": "Active",
        "total_inventory": 45,
        "in_stock": true,
        "sold_count": 342,
        "rating_average": 4.8,
        "rating_count": 125,
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-11-20T14:30:00Z",
        "approved_at": "2024-01-16T09:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 3,
      "total_items": 45,
      "per_page": 20
    },
    "summary": {
      "total": 45,
      "pending": 2,
      "active": 38,
      "inactive": 3,
      "banned": 2
    }
  }
}
```

---

### 2. Chi tiết sản phẩm

Xem thông tin chi tiết một sản phẩm.

#### Endpoint
```
GET /api/products/{id}
```

#### Authentication Required
Optional (response khác nhau dựa trên role)

#### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | number | Yes | ID của sản phẩm |

#### Response Success - Customer View (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Château Margaux 2015",
    "slug": "chateau-margaux-2015",
    "description": "Rượu vang đỏ cao cấp từ vùng Bordeaux, Pháp",
    "full_description": "<p>Chi tiết đầy đủ về sản phẩm...</p>",
    "price": 5940000,
    "original_price": 6500000,
    "category": {
      "id": 1,
      "name": "Vang đỏ",
      "slug": "vang-do"
    },
    "brand": {
      "id": 1,
      "name": "Château Margaux",
      "description": "Thương hiệu rượu vang danh tiếng"
    },
    "images": [
      {
        "url": "https://cdn.winestore.com/products/1_main.jpg",
        "is_primary": true
      }
    ],
    "concentration": 13.5,
    "volume": 750,
    "origin_country": "Pháp",
    "origin_region": "Bordeaux",
    "vintage_year": 2015,
    "grape_variety": "Cabernet Sauvignon, Merlot",
    "taste_profile": {
      "sweetness": 2,
      "acidity": 7,
      "tannin": 8,
      "body": 9
    },
    "food_pairing": ["Thịt bò", "Pho mát", "Thịt cừu"],
    "serving_temperature": "16-18°C",
    "in_stock": true,
    "rating_average": 4.8,
    "rating_count": 125,
    "sold_count": 342,
    "seller": {
      "id": 5,
      "name": "Wine Premium Store",
      "rating": 4.9
    }
  }
}
```

#### Response Success - Seller View (200 OK)
Khi có token với role SELLER và là chủ sở hữu sản phẩm:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Château Margaux 2015",
    "slug": "chateau-margaux-2015",
    "sku": "WN-CHM-2015",
    "description": "Rượu vang đỏ cao cấp",
    "full_description": "<p>Chi tiết...</p>",
    "price": 5940000,
    "cost_price": 4500000,
    "profit_margin": 24.2,
    "original_price": 6500000,
    "category": { "id": 1, "name": "Vang đỏ" },
    "brand": { "id": 1, "name": "Château Margaux" },
    "images": [...],
    "concentration": 13.5,
    "volume": 750,
    "origin_country": "Pháp",
    "status": 1,
    "status_text": "Active",
    "inventory": [
      {
        "warehouse_id": 1,
        "warehouse_name": "Kho Hà Nội",
        "quantity": 25,
        "safety_stock": 10
      }
    ],
    "total_inventory": 45,
    "sold_count": 342,
    "rating_average": 4.8,
    "seo": {
      "meta_title": "Château Margaux 2015...",
      "meta_description": "Mua Château Margaux..."
    },
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-11-20T14:30:00Z",
    "approved_at": "2024-01-16T09:00:00Z"
  }
}
```

#### Response Error (404 Not Found)
```json
{
  "success": false,
  "message": "Không tìm thấy sản phẩm"
}
```

---

### 3. Danh mục sản phẩm

Lấy danh sách các danh mục rượu vang.

#### Endpoint
```
GET /api/categories
```

#### Authentication Required
No

#### Response Success (200 OK)
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": 1,
        "name": "Vang đỏ",
        "slug": "vang-do",
        "description": "Rượu vang đỏ từ nho đỏ",
        "image": "https://cdn.winestore.com/categories/red-wine.jpg",
        "products_count": 245
      }
    ]
  }
}
```

---

### 4. Thương hiệu rượu

Lấy danh sách các thương hiệu.

#### Endpoint
```
GET /api/brands
```

#### Authentication Required
No

#### Response Success (200 OK)
```json
{
  "success": true,
  "data": {
    "brands": [
      {
        "id": 1,
        "name": "Château Margaux",
        "slug": "chateau-margaux",
        "country": "Pháp",
        "products_count": 12
      }
    ]
  }
}
```

---

### 5. Đánh giá sản phẩm

Lấy danh sách đánh giá của sản phẩm.

#### Endpoint
```
GET /api/products/{id}/reviews
```

#### Authentication Required
No

#### Response Success (200 OK)
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": 1,
        "user": {
          "id": 10,
          "name": "Nguyễn Văn A",
          "avatar": "https://cdn.winestore.com/avatars/10.jpg"
        },
        "rating": 5,
        "title": "Rượu vang tuyệt vời!",
        "comment": "Chất lượng rất tốt",
        "images": [],
        "verified_purchase": true,
        "created_at": "2024-11-15T14:30:00Z"
      }
    ],
    "summary": {
      "rating_average": 4.8,
      "total_reviews": 125,
      "rating_distribution": {
        "5": 98,
        "4": 20,
        "3": 5,
        "2": 1,
        "1": 1
      }
    }
  }
}
```

---

### 6. Sản phẩm liên quan

Lấy sản phẩm liên quan/tương tự.

#### Endpoint
```
GET /api/products/{id}/related
```

#### Authentication Required
No

#### Response Success (200 OK)
```json
{
  "success": true,
  "data": {
    "products": [...]
  }
}
```

---

## WRITE APIs (Seller Only)

### 7. Tạo sản phẩm mới

Seller tạo sản phẩm mới.

#### Endpoint
```
POST /api/seller/products
```

#### Authentication Required
Yes (Seller role)

#### Request Body
```json
{
  "name": "Château Lafite Rothschild 2016",
  "sku": "WN-CLR-2016",
  "description": "Rượu vang đỏ cao cấp từ Pháp",
  "price": 8500000,
  "cost_price": 6000000,
  "category_id": 1,
  "brand_id": 2,
  "concentration": 13.0,
  "volume": 750,
  "images": [
    {
      "url": "https://cdn.winestore.com/products/temp_main.jpg",
      "is_primary": true
    }
  ]
}
```

#### Response Success (201 Created)
```json
{
  "success": true,
  "message": "Tạo sản phẩm thành công. Đang chờ admin duyệt",
  "data": {
    "id": 46,
    "name": "Château Lafite Rothschild 2016",
    "status": 0,
    "status_text": "Pending",
    "created_at": "2024-11-25T10:30:00Z"
  }
}
```

---

### 8. Cập nhật sản phẩm

Seller cập nhật thông tin sản phẩm của mình.

#### Endpoint
```
PUT /api/seller/products/{product_id}
```

#### Authentication Required
Yes (Seller role, owner only)

#### Request Body
Các fields tương tự như tạo mới, tất cả optional.

#### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Cập nhật sản phẩm thành công",
  "data": {
    "id": 1,
    "name": "Château Margaux 2015 (Updated)",
    "updated_at": "2024-11-25T10:35:00Z"
  }
}
```

---

### 9. Xóa sản phẩm

Seller xóa sản phẩm.

#### Endpoint
```
DELETE /api/seller/products/{product_id}
```

#### Authentication Required
Yes (Seller role, owner only)

#### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Xóa sản phẩm thành công"
}
```

---

### 10. Thay đổi trạng thái sản phẩm

Seller kích hoạt/ẩn sản phẩm.

#### Endpoint
```
PUT /api/seller/products/{product_id}/status
```

#### Authentication Required
Yes (Seller role, owner only)

#### Request Body
```json
{
  "status": 2
}
```

#### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công",
  "data": {
    "id": 1,
    "status": 2,
    "status_text": "Inactive"
  }
}
```

---

### 11. Upload ảnh sản phẩm

Seller upload ảnh cho sản phẩm.

#### Endpoint
```
POST /api/seller/products/images
```

#### Authentication Required
Yes (Seller role)

#### Request Body (multipart/form-data)
```
image: [file]
product_id: 1 (optional)
```

#### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Upload ảnh thành công",
  "data": {
    "id": 123,
    "url": "https://cdn.winestore.com/products/abc123.jpg",
    "thumbnail_url": "https://cdn.winestore.com/products/abc123_thumb.jpg"
  }
}
```

---

### 12. Thêm đánh giá sản phẩm

Customer thêm đánh giá (yêu cầu đã mua).

#### Endpoint
```
POST /api/products/{id}/reviews
```

#### Authentication Required
Yes (Customer role)

#### Request Body
```json
{
  "rating": 5,
  "title": "Rượu vang tuyệt vời!",
  "comment": "Chất lượng rất tốt",
  "images": []
}
```

#### Response Success (201 Created)
```json
{
  "success": true,
  "message": "Đánh giá đã được thêm thành công",
  "data": {
    "id": 126,
    "rating": 5,
    "verified_purchase": true,
    "created_at": "2024-11-25T10:30:00Z"
  }
}
```

---

## Backend Implementation Guide

### Role Detection Pattern

```javascript
// middleware/roleDetector.js
const detectRole = (req, res, next) => {
  // 1. Check token
  if (req.user) {
    req.userRole = req.user.role; // 'CUSTOMER', 'SELLER', 'ADMIN'
  } else {
    req.userRole = 'GUEST';
  }
  
  // 2. Check view query param (optional override)
  const requestedView = req.query.view;
  if (requestedView === 'seller' && req.userRole !== 'SELLER') {
    return res.status(403).json({
      success: false,
      message: 'Không có quyền truy cập seller view'
    });
  }
  
  req.viewType = requestedView || (req.userRole === 'SELLER' ? 'seller' : 'customer');
  next();
};

// routes/products.js
router.get('/api/products', optionalAuth, detectRole, async (req, res) => {
  const products = await getProducts(req.query, req.userRole);
  
  // Format response based on role
  const formattedProducts = products.map(product => 
    formatProduct(product, req.viewType)
  );
  
  res.json({ success: true, data: { products: formattedProducts } });
});
```

### Response Formatter

```javascript
const formatProduct = (product, viewType) => {
  const base = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    images: product.images,
    in_stock: product.in_stock,
    rating_average: product.rating_average
  };
  
  if (viewType === 'seller') {
    return {
      ...base,
      sku: product.sku,
      cost_price: product.cost_price,
      profit_margin: calculateMargin(product.price, product.cost_price),
      status: product.status,
      status_text: getStatusText(product.status),
      total_inventory: product.total_inventory,
      sold_count: product.sold_count,
      created_at: product.created_at,
      approved_at: product.approved_at
    };
  }
  
  return base; // customer/guest view
};
```

---

## Notes

### Product Status Values
| Value | Text | Description |
|-------|------|-------------|
| 0 | Pending | Chờ admin duyệt |
| 1 | Active | Đang hoạt động |
| 2 | Inactive | Tạm ẩn |
| 3 | Banned | Bị cấm |

### Permissions Summary

**Guest/Customer**:
- GET /api/products - Xem sản phẩm công khai
- GET /api/products/:id - Xem chi tiết
- POST /api/products/:id/reviews - Đánh giá (nếu đã mua)

**Seller**:
- Tất cả quyền của Customer
- GET /api/products - Xem với seller data (cost, inventory...)
- POST /api/seller/products - Tạo sản phẩm
- PUT /api/seller/products/:id - Cập nhật sản phẩm của mình
- DELETE /api/seller/products/:id - Xóa sản phẩm của mình

**Admin**:
- Tất cả quyền
- Approve/reject products
- Ban products

### Performance Considerations

- Cache customer view data (public)
- Don't cache seller view (real-time inventory)
- Use database views for optimized queries
- Index by seller_id, status, category_id
- Implement Redis caching for hot products

### Security

- Always verify ownership for seller operations
- Sanitize user input
- Rate limit upload endpoints
- Validate file types and sizes
- Use CDN for image serving

