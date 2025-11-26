1.1. Tổng quan hệ thống 

GET /api/admin/dashboard/system-overview?start_date=2024-11-01&end_date=2024-11-30 

Headers: Authorization: Bearer {access_token} 

Response (200 OK): 

{ 

  "success": true, 

  "data": { 

    "period": { 

      "start_date": "2024-11-01", 

      "end_date": "2024-11-30" 

    }, 

    "business_metrics": { 

      "total_revenue": 250000000, 

      "gross_profit": 75000000, 

      "profit_margin_percent": 30, 

      "total_orders": 150, 

      "average_order_value": 1666667, 

      "conversion_rate": 3.2 

    }, 

    "users": { 

      "total_users": 1250, 

      "customers": 1200, 

      "sellers": 45, 

      "seller": 4, 

      "admins": 1, 

      "new_this_month": 85, 

      "active_users": 890, 

      "pending_seller_requests": 8 

    }, 

    "products": { 

      "total": 450, 

      "active": 442, 

      "pending_approval": 15, 

      "rejected": 3, 

      "out_of_stock": 8 

    }, 

    "orders": { 

      "total": 150, 

      "by_status": { 

        "pending": 10, 

        "confirmed": 15, 

        "packaging": 8, 

        "shipping": 20, 

        "delivered": 85, 

        "cancelled": 12 

      }, 

      "cancellation_rate": 8 

    }, 

    "inventory": { 

      "total_value": 5000000000, 

      "total_quantity": 8500, 

      "total_warehouses": 3, 

      "low_stock_products": 25, 

      "out_of_stock_products": 8 

    }, 

    "system_health": { 

      "database_size_mb": 2450, 

      "total_images": 1250, 

      "storage_used_gb": 15.6, 

      "api_calls_today": 45890, 

      "average_response_time_ms": 245 

    } 

  } 

} 

1.2. Thống kê doanh thu chi tiết 

GET /api/admin/dashboard/revenue-analytics?start_date=2024-11-01&end_date=2024-11-30&group_by=day 

Headers: Authorization: Bearer {access_token} 

Response (200 OK): 

{ 

  "success": true, 

  "data": { 

    "revenue_chart": [ 

      { 

        "date": "2024-11-01", 

        "revenue": 8500000, 

        "orders": 5, 

        "profit": 2550000, 

        "customers": 4 

      } 

    ], 

    "payment_methods": { 

      "COD": { 

        "total": 150000000, 

        "percentage": 60, 

        "orders": 90 

      }, 

      "VNPAY": { 

        "total": 70000000, 

        "percentage": 28, 

        "orders": 42 

      }, 

      "MOMO": { 

        "total": 30000000, 

        "percentage": 12, 

        "orders": 18 

      } 

    }, 

    "categories_performance": [ 

      { 

        "category_id": 5, 

        "category_name": "Rượu vang đỏ", 

        "revenue": 180000000, 

        "orders": 95, 

        "percentage": 72 

      }, 

      { 

        "category_id": 6, 

        "category_name": "Rượu vang trắng", 

        "revenue": 50000000, 

        "orders": 35, 

        "percentage": 20 

      } 

    ], 

    "regions_performance": [ 

      { 

        "region": "TP. Hồ Chí Minh", 

        "revenue": 120000000, 

        "orders": 75, 

        "percentage": 48 

      }, 

      { 

        "region": "Hà Nội", 

        "revenue": 90000000, 

        "orders": 55, 

        "percentage": 36 

      } 

    ] 

  } 

} 

1.3. Thống kê người dùng nâng cao 

GET /api/admin/dashboard/user-analytics?start_date=2024-11-01&end_date=2024-11-30 

Headers: Authorization: Bearer {access_token} 

Response (200 OK): 

{ 

  "success": true, 

  "data": { 

    "user_growth": [ 

      { 

        "date": "2024-11-01", 

        "new_users": 3, 

        "total_users": 1165 

      }, 

      { 

        "date": "2024-11-02", 

        "new_users": 5, 

        "total_users": 1170 

      } 

    ], 

    "user_segments": { 

      "vip": { 

        "count": 25, 

        "total_spent": 500000000, 

        "average_order_value": 20000000 

      }, 

      "regular": { 

        "count": 450, 

        "total_spent": 450000000, 

        "average_order_value": 1000000 

      }, 

      "new": { 

        "count": 725, 

        "total_spent": 145000000, 

        "average_order_value": 200000 

      } 

    }, 

    "retention_metrics": { 

      "day_1": 85, 

      "day_7": 65, 

      "day_30": 45, 

      "day_90": 32 

    }, 

    "acquisition_channels": [ 

      { 

        "channel": "Organic Search", 

        "users": 450, 

        "percentage": 36 

      }, 

      { 

        "channel": "Social Media", 

        "users": 350, 

        "percentage": 28 

      }, 

      { 

        "channel": "Direct", 

        "users": 300, 

        "percentage": 24 

      } 

    ] 

  } 

} 