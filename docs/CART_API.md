CART MANAGEMENT 

Xem giỏ hàng 

GET /api/cart 

Headers: Authorization: Bearer {access_token} 

Response (200 OK): 

{ 

  "success": true, 

  "data": { 

    "cart_id": 789, 

    "user_id": 456, 

    "items": [ 

      { 

        "id": 1, 

        "product": { 

          "id": 1001, 

          "name": "Chateau Margaux 2015", 

          "slug": "chateau-margaux-2015", 

          "sku": "WN-CHM-2015", 

          "image": "https://cdn.example.com/products/1001_1.jpg", 

          "price": 15000000, 

          "in_stock": true, 

          "max_quantity": 45 

        }, 

        "quantity": 2, 

        "unit_price": 15000000, 

        "line_total": 30000000, 

        "added_at": "2024-11-20T10:30:00Z" 

      }, 

      { 

        "id": 2, 

        "product": { 

          "id": 1002, 

          "name": "Chateau Lafite Rothschild 2016", 

          "slug": "chateau-lafite-rothschild-2016", 

          "image": "https://cdn.example.com/products/1002_1.jpg", 

          "price": 20000000, 

          "in_stock": true, 

          "max_quantity": 30 

        }, 

        "quantity": 1, 

        "unit_price": 20000000, 

        "line_total": 20000000, 

        "added_at": "2024-11-21T14:15:00Z" 

      } 

    ], 

    "summary": { 

      "total_items": 2, 

      "total_quantity": 3, 

      "subtotal": 50000000, 

      "estimated_shipping": 0, 

      "estimated_total": 50000000 

    }, 

    "updated_at": "2024-11-21T14:15:00Z" 

  } 

} 

 

Thêm sản phẩm vào giỏ hàng 

POST /api/cart/items 

Headers: Authorization: Bearer {access_token} 

Request Body: 

{ 

  "product_id": 1001, 

  "quantity": 2 

} 

Response (201 Created): 

{ 

  "success": true, 

  "message": "Đã thêm sản phẩm vào giỏ hàng", 

  "data": { 

    "cart_item_id": 1, 

    "product_id": 1001, 

    "quantity": 2, 

    "unit_price": 15000000, 

    "line_total": 30000000 

  } 

} 

Cập nhật số lượng sản phẩm trong giỏ 

PUT /api/cart/items/{cart_item_id} 

Headers: Authorization: Bearer {access_token} 

Request Body: 

{ 

  "quantity": 5 

} 

Response (200 OK): 

{ 

  "success": true, 

  "message": "Đã cập nhật số lượng", 

  "data": { 

    "cart_item_id": 1, 

    "quantity": 5, 

    "line_total": 75000000 

  } 

} 

 

Xóa sản phẩm khỏi giỏ hàng 

DELETE /api/cart/items/{cart_item_id} 

Headers: Authorization: Bearer {access_token} 

Response (200 OK): 

{ 

  "success": true, 

  "message": "Đã xóa sản phẩm khỏi giỏ hàng" 

} 

 

Xóa toàn bộ giỏ hàng 

DELETE /api/cart 

Headers: Authorization: Bearer {access_token} 

Response (200 OK): 

{ 

  "success": true, 

  "message": "Đã xóa toàn bộ giỏ hàng" 

} 