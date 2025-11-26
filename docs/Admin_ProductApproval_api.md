Lấy danh sách sản phẩm chờ duyệt 

GET /api/admin/product-approvals?page=1&limit=20&status=pending 

Headers: Authorization: Bearer {access_token} 

Query Parameters: 

status: pending, approved, rejected, all 

seller_id: filter theo seller 

category_id: filter theo category 

sort: newest, oldest 

Response (200 OK): 

{ 

  "success": true, 

  "data": { 

    "products": [ 

      { 

        "id": 1050, 

        "name": "Chateau Margaux 2020", 

        "slug": "chateau-margaux-2020", 

        "sku": "WN-CHM-2020", 

        "category": { 

          "id": 5, 

          "name": "Rượu vang đỏ" 

        }, 

        "brand": { 

          "id": 3, 

          "name": "Chateau Margaux" 

        }, 

        "price": 16000000, 

        "base_price": 18000000, 

        "images": ["https://cdn.example.com/products/1050_1.jpg"], 

        "seller": { 

          "user_id": 456, 

          "full_name": "Nguyễn Văn A", 

          "email": "seller@example.com" 

        }, 

        "approval_status": "pending", 

        "approval_status_text": "Chờ duyệt", 

        "submitted_at": "2024-11-24T15:00:00Z", 

        "created_at": "2024-11-24T14:30:00Z" 

      } 

    ], 

    "pagination": { 

      "current_page": 1, 

      "total_pages": 1, 

      "total_items": 15 

    }, 

    "summary": { 

      "total_pending": 15, 

      "total_approved_today": 25, 

      "total_rejected_today": 3 

    } 

  } 

} 

4.2. Xem chi tiết sản phẩm chờ duyệt 

GET /api/admin/product-approvals/{product_id} 

Headers: Authorization: Bearer {access_token} 

Response (200 OK): 

{ 

  "success": true, 

  "data": { 

    "product": { 

      "id": 1050, 

      "name": "Chateau Margaux 2020", 

      "slug": "chateau-margaux-2020", 

      "sku": "WN-CHM-2020", 

      "category": { 

        "id": 5, 

        "name": "Rượu vang đỏ", 

        "parent_id": 1 

      }, 

      "brand": { 

        "id": 3, 

        "name": "Chateau Margaux", 

        "country": "France" 

      }, 

      "price": 16000000, 

      "base_price": 18000000, 

      "country_of_production": "France", 

      "grape_variety": "Cabernet Sauvignon, Merlot", 

      "concentration": 13.5, 

      "production_area": "Bordeaux", 

      "vintage_year": 2020, 

      "capacity_ml": 750, 

      "ideal_temperature": "16-18°C", 

      "storage_notes": "Nằm ngang, nhiệt độ ổn định", 

      "images": [ 

        "https://cdn.example.com/products/1050_1.jpg", 

        "https://cdn.example.com/products/1050_2.jpg" 

      ], 

      "description": "Chateau Margaux 2020...", 

      "status": 0, 

      "approval_status": "pending" 

    }, 

    "seller": { 

      "user_id": 456, 

      "account_id": 123, 

      "email": "seller@example.com", 

      "full_name": "Nguyễn Văn A", 

      "phone_number": "0912345678", 

      "total_products": 25, 

      "approved_products": 23, 

      "rejected_products": 1, 

      "seller_rating": 4.8 

    }, 

    "similar_products": [ 

      { 

        "id": 1001, 

        "name": "Chateau Margaux 2015", 

        "price": 15000000, 

        "status": "approved" 

      } 

    ], 

    "submission_history": [ 

      { 

        "action": "submitted", 

        "timestamp": "2024-11-24T15:00:00Z", 

        "note": "Gửi sản phẩm để duyệt" 

      } 

    ], 

    "submitted_at": "2024-11-24T15:00:00Z", 

    "created_at": "2024-11-24T14:30:00Z" 

  } 

} 

4.3. Duyệt sản phẩm 

PUT /api/admin/product-approvals/{product_id}/approve 

Headers: Authorization: Bearer {access_token} 

Request Body: 

{ 

  "note": "Sản phẩm đạt tiêu chuẩn, chấp thuận" 

} 

Response (200 OK): 

{ 

  "success": true, 

  "message": "Đã duyệt sản phẩm", 

  "data": { 

    "product_id": 1050, 

    "product_name": "Chateau Margaux 2020", 

    "approval_status": "approved", 

    "approved_by": { 

      "admin_id": 1, 

      "admin_name": "Admin User" 

    }, 

    "approved_at": "2024-11-25T10:30:00Z", 

    "status": 1 

  } 

} 

4.4. Từ chối sản phẩm 

PUT /api/admin/product-approvals/{product_id}/reject 

Headers: Authorization: Bearer {access_token} 

Request Body: 

{ 

  "reason": "Thông tin không đầy đủ", 

  "note": "Thiếu thông tin về xuất xứ và giấy tờ chứng nhận. Vui lòng bổ sung." 

} 

Response (200 OK): 

{ 

  "success": true, 

  "message": "Đã từ chối sản phẩm", 

  "data": { 

    "product_id": 1050, 

    "product_name": "Chateau Margaux 2020", 

    "approval_status": "rejected", 

    "rejected_by": { 

      "admin_id": 1, 

      "admin_name": "Admin User" 

    }, 

    "rejected_at": "2024-11-25T10:30:00Z", 

    "reason": "Thông tin không đầy đủ", 

    "status": 0 

  } 

} 

4.5. Yêu cầu chỉnh sửa sản phẩm 

PUT /api/admin/product-approvals/{product_id}/request-changes 

Headers: Authorization: Bearer {access_token} 

Request Body: 

{ 

  "changes_required": [ 

    "Cập nhật hình ảnh chất lượng cao hơn", 

    "Bổ sung thông tin về giấy chứng nhận CO", 

    "Điều chỉnh giá bán phù hợp thị trường" 

  ], 

  "note": "Vui lòng chỉnh sửa theo yêu cầu trước ngày 30/11/2024" 

} 

Response (200 OK): 

{ 

  "success": true, 

  "message": "Đã gửi yêu cầu chỉnh sửa", 

  "data": { 

    "product_id": 1050, 

    "approval_status": "pending_changes", 

    "changes_requested": true, 

    "notification_sent": true 

  } 

} 