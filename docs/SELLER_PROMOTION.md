 Promotion Management


 15. Lấy danh sách khuyến mãi

**Endpoint**: `GET /seller/promotions`

**Quyền**: SELLER

**Mô tả**: Lấy danh sách khuyến mãi do seller tạo

**Query Parameters**:
- `page`: Số trang
- `limit`: Số khuyến mãi/trang
- `status`: Lọc theo trạng thái (1=active, 0=inactive)

**Response Success** (200):
{
"success": true,
"data": {
"promotions": [
{
"id": 1,
"code": "SUMMER2024",
"name": "Giảm giá mùa hè",
"description": "Giảm 10% cho đơn từ 1 triệu",
"discount_type": 1,
"discount_value": 10,
"start_date": "2024-06-01T00:00:00Z",
"end_date": "2024-08-31T23:59:59Z",
"max_usage": 1000,
"used_count": 345,
"status": 1,
"created_at": "2024-05-01T00:00:00Z"
}
],
"pagination": {
"current_page": 1,
"total_pages": 3,
"total_items": 50
}
}
}
16. Tạo khuyến mãi

**Endpoint**: `POST /seller/promotions`

**Quyền**: SELLER

**Mô tả**: Tạo mã khuyến mãi cho sản phẩm của seller

**Request Body**:
{
"code": "NEWYEAR2025",
"name": "Khuyến mãi năm mới",
"description": "Giảm 15% cho đơn hàng từ 2 triệu",
"discount_type": 1,
"discount_value": 15,
"start_date": "2025-01-01T00:00:00Z",
"end_date": "2025-01-31T23:59:59Z",
"max_usage": 500,
"product_ids": [1, 2, 3]
}

**Response Success** (201):
{
"success": true,
"message": "Tạo khuyến mãi thành công",
"data": {
"id": 2,
"code": "NEWYEAR2025",
"status": 1
}
}
17. Cập nhật khuyến mãi

**Endpoint**: `PUT /seller/promotions/{promotion_id}`

**Quyền**: SELLER

**Request Body**:
{
"name": "Khuyến mãi năm mới (cập nhật)",
"discount_value": 20,
"max_usage": 1000,
"status": 1
}
**Response Success** (200):
{
"success": true,
"message": "Cập nhật khuyến mãi thành công"
}
### 18. Xóa khuyến mãi

**Endpoint**: `DELETE /seller/promotions/{promotion_id}`

**Quyền**: SELLER

**Response Success** (200):
{
"success": true,
"message": "Xóa khuyến mãi thành công"
}
### 19. Chi tiết khuyến mãi

**Endpoint**: `GET /seller/promotions/{promotion_id}`

**Quyền**: SELLER

**Response Success** (200):
{
"success": true,
"data": {
"id": 1,
"code": "SUMMER2024",
"name": "Giảm giá mùa hè",
"description": "Giảm 10% cho đơn từ 1 triệu",
"discount_type": 1,
"discount_value": 10,
"start_date": "2024-06-01T00:00:00Z",
"end_date": "2024-08-31T23:59:59Z",
"max_usage": 1000,
"used_count": 345,
"status": 1,
"applicable_products": [
{
"id": 1,
"name": "Château Margaux 2015",
"price": 5940000
},
{
"id": 2,
"name": "Bordeaux 2018",
"price": 3500000
}
],
"created_at": "2024-05-01T00:00:00Z"
}
}
### 20. Thống kê sử dụng khuyến mãi

**Endpoint**: `GET /seller/promotions/{promotion_id}/statistics`

**Quyền**: SELLER

**Response Success** (200):
{
"success": true,
"data": {
"promotion_id": 1,
"promotion_code": "SUMMER2024",
"total_usage": 345,
"max_usage": 1000,
"remaining_usage": 655,
"total_discount_amount": 125000000,
"total_orders": 345,
"usage_by_date": [
{
"date": "2024-06-01",
"usage_count": 15,
"discount_amount": 5400000
}
]
}
}
  ]
}