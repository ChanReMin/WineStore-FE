# Inventory Management API Documentation

## Base URL
```
/api/v1
```

## Authentication
All endpoints require authentication. Include the authentication token in the request headers.

---

## Table of Contents
1. [Inventory Management](#inventory-management)
2. [Inventory Logs](#inventory-logs)
3. [Inventory Alerts](#inventory-alerts)
4. [Inventory Transfer](#inventory-transfer)
5. [Stock Take](#stock-take)
6. [Inventory Status](#inventory-status)
7. [Brands](#brands)

---

## Inventory Management

### 1. Get Inventory List

Get a paginated list of inventory items with optional filters.

**Endpoint:** `GET /api/v1/inventory`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number |
| `limit` | integer | No | 20 | Items per page |
| `warehouseId` | integer | No | - | Filter by warehouse ID |
| `productId` | integer | No | - | Filter by product ID |
| `status` | string | No | - | Filter by status |
| `search` | string | No | - | Search query |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "inventory": [
      {
        "id": 0,
        "warehouse": {
          "id": 0,
          "name": "string",
          "location": "string",
          "address": "string"
        },
        "product": {
          "id": 0,
          "name": "string",
          "sku": "string",
          "price": 0,
          "image": "string"
        },
        "quantityOnHand": 0,
        "safetyStock": 0,
        "quantityReserved": 0,
        "quantityAvailable": 0,
        "status": "string",
        "lastUpdatedAt": "2025-11-28T04:23:05.026Z",
        "lastUpdatedBy": "string"
      }
    ],
    "pagination": {
      "currentPage": 0,
      "totalPages": 0,
      "totalItems": 0
    },
    "summary": {
      "totalProducts": 0,
      "inStock": 0,
      "lowStock": 0,
      "outOfStock": 0,
      "totalValue": 0
    }
  }
}
```

**Example Request:**
```bash
GET /api/v1/inventory?page=1&limit=20&warehouseId=1&status=inStock
```

---

### 2. Get Inventory Detail

Get detailed information about a specific inventory item.

**Endpoint:** `GET /api/v1/inventory/{inventoryId}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inventoryId` | integer | Yes | Inventory ID |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "warehouse": {
      "id": 0,
      "name": "string",
      "location": "string",
      "address": "string",
      "manager": "string",
      "phone": "string"
    },
    "product": {
      "id": 0,
      "name": "string",
      "sku": "string",
      "price": 0,
      "costPrice": 0,
      "image": "string"
    },
    "quantityOnHand": 0,
    "safetyStock": 0,
    "quantityReserved": 0,
    "quantityAvailable": 0,
    "quantityIncoming": 0,
    "status": "string",
    "locationInWarehouse": "string",
    "lastStockIn": {
      "date": "2025-11-28T04:23:05.009Z",
      "quantity": 0,
      "note": "string"
    },
    "lastStockOut": {
      "date": "2025-11-28T04:23:05.010Z",
      "quantity": 0,
      "note": "string"
    },
    "lastUpdatedAt": "2025-11-28T04:23:05.010Z",
    "lastUpdatedBy": "string"
  }
}
```

**Example Request:**
```bash
GET /api/v1/inventory/123
```

---

### 3. Create Inventory Transaction

Create a new inventory transaction (stock in/out).

**Endpoint:** `POST /api/v1/inventory`

**Request Body:**

```json
{
  "warehouseId": 0,
  "productId": 0,
  "type": "string",
  "quantity": 1,
  "shipmentId": 0,
  "note": "string",
  "referenceCode": "string",
  "typeEnum": "0"
}
```

**Request Body Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `warehouseId` | integer | Yes | Warehouse ID |
| `productId` | integer | Yes | Product ID |
| `type` | string | Yes | Transaction type |
| `quantity` | integer | Yes | Quantity (min: 1) |
| `shipmentId` | integer | No | Shipment ID (optional) |
| `note` | string | No | Note |
| `referenceCode` | string | No | Reference code |
| `typeEnum` | string | No | Type enum value |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "type": "string",
    "typeText": "string",
    "warehouse": {
      "id": 0,
      "name": "string",
      "location": "string",
      "address": "string"
    },
    "product": {
      "id": 0,
      "name": "string",
      "sku": "string",
      "price": 0,
      "image": "string"
    },
    "quantityBefore": 0,
    "quantityChange": 0,
    "quantityAfter": 0,
    "note": "string",
    "referenceCode": "string",
    "createdBy": "string",
    "createdAt": "2025-11-28T04:23:05.076Z"
  }
}
```

**Example Request:**
```bash
POST /api/v1/inventory
Content-Type: application/json

{
  "warehouseId": 1,
  "productId": 5,
  "type": "in",
  "quantity": 50,
  "note": "Received from supplier",
  "referenceCode": "PO-2024-001"
}
```

---

### 4. Update Inventory

Update inventory quantity (stock in/out).

**Endpoint:** `PUT /api/v1/inventory/{inventoryId}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inventoryId` | integer | Yes | Inventory ID |

**Request Body:**

```json
{
  "type": "in",
  "quantity": 1,
  "note": "string",
  "referenceCode": "string"
}
```

**Request Body Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Transaction type ("in" or "out") |
| `quantity` | integer | Yes | Quantity to add/subtract |
| `note` | string | No | Note |
| `referenceCode` | string | No | Reference code |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "inventoryId": 0,
    "warehouseId": 0,
    "productId": 0,
    "oldQuantity": 0,
    "newQuantity": 0,
    "quantityChange": 0,
    "type": "string",
    "logId": 0,
    "updatedAt": "2025-11-28T04:23:05.101Z"
  }
}
```

**Example Request:**
```bash
PUT /api/v1/inventory/123
Content-Type: application/json

{
  "type": "in",
  "quantity": 10,
  "note": "Restocked inventory"
}
```

---

### 5. Delete Inventory

Delete an inventory item.

**Endpoint:** `DELETE /api/v1/inventory/{id}`

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Inventory ID |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {}
}
```

**Example Request:**
```bash
DELETE /api/v1/inventory/123
```

---

## Inventory Logs

### 6. Get Inventory Logs

Get a paginated list of inventory transaction logs.

**Endpoint:** `GET /api/v1/inventory/logs`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number |
| `limit` | integer | No | 20 | Items per page |
| `warehouseId` | integer | No | - | Filter by warehouse ID |
| `product_id` | integer | No | - | Filter by product ID |
| `type` | string | No | - | Filter by transaction type |
| `from_date` | string | No | - | Start date (ISO 8601 format) |
| `to_date` | string | No | - | End date (ISO 8601 format) |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "logs": [
      {
        "id": 0,
        "type": "string",
        "typeText": "string",
        "warehouse": {
          "id": 0,
          "name": "string",
          "location": "string",
          "address": "string"
        },
        "product": {
          "id": 0,
          "name": "string",
          "sku": "string",
          "price": 0,
          "image": "string"
        },
        "quantityBefore": 0,
        "quantityChange": 0,
        "quantityAfter": 0,
        "note": "string",
        "referenceCode": "string",
        "createdBy": "string",
        "createdAt": "2025-11-28T04:23:05.060Z"
      }
    ],
    "pagination": {
      "currentPage": 0,
      "totalPages": 0,
      "totalItems": 0
    }
  }
}
```

**Example Request:**
```bash
GET /api/v1/inventory/logs?page=1&limit=20&warehouseId=1&type=IN&from_date=2024-01-01&to_date=2024-12-31
```

---

### 7. Get Inventory Log Detail

Get detailed information about a specific inventory log.

**Endpoint:** `GET /api/v1/inventory/{id}`

> **Note:** This endpoint appears to return inventory log detail based on the response structure.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Log ID |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "type": "string",
    "typeText": "string",
    "warehouse": {
      "id": 0,
      "name": "string",
      "location": "string",
      "address": "string"
    },
    "product": {
      "id": 0,
      "name": "string",
      "sku": "string",
      "price": 0,
      "image": "string"
    },
    "quantityBefore": 0,
    "quantityChange": 0,
    "quantityAfter": 0,
    "note": "string",
    "referenceCode": "string",
    "createdBy": "string",
    "createdAt": "2025-11-28T04:23:05.037Z"
  }
}
```

---

## Inventory Alerts

### 8. Get Inventory Alerts

Get inventory alerts (low stock, out of stock, etc.).

**Endpoint:** `GET /api/v1/inventory/alerts`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | Filter by alert type |
| `warehouseId` | integer | No | Filter by warehouse ID |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "alerts": [
      {
        "id": 0,
        "type": "string",
        "typeText": "string",
        "severity": "string",
        "warehouse": {
          "id": 0,
          "name": "string",
          "location": "string",
          "address": "string"
        },
        "product": {
          "id": 0,
          "name": "string",
          "sku": "string",
          "price": 0,
          "image": "string"
        },
        "currentQuantity": 0,
        "safetyStock": 0,
        "message": "string",
        "createdAt": "2025-11-28T04:23:05.068Z"
      }
    ],
    "summary": {
      "totalAlerts": 0,
      "critical": 0,
      "warning": 0
    }
  }
}
```

**Example Request:**
```bash
GET /api/v1/inventory/alerts?warehouseId=1&type=low_stock
```

---

## Inventory Transfer

### 9. Transfer Inventory

Transfer inventory between warehouses.

**Endpoint:** `POST /api/v1/inventory/transfer`

**Request Body:**

```json
{
  "productId": 0,
  "fromWarehouseId": 0,
  "toWarehouseId": 0,
  "quantity": 0,
  "note": "string"
}
```

**Request Body Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `productId` | integer | Yes | Product ID |
| `fromWarehouseId` | integer | Yes | Source warehouse ID |
| `toWarehouseId` | integer | Yes | Destination warehouse ID |
| `quantity` | integer | Yes | Quantity to transfer |
| `note` | string | No | Transfer note |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "transferId": 0,
    "transferCode": "string",
    "productId": 0,
    "fromWarehouseId": 0,
    "toWarehouseId": 0,
    "quantity": 0,
    "status": "string",
    "statusText": "string",
    "createdAt": "2025-11-28T04:23:05.085Z"
  }
}
```

**Example Request:**
```bash
POST /api/v1/inventory/transfer
Content-Type: application/json

{
  "productId": 5,
  "fromWarehouseId": 1,
  "toWarehouseId": 2,
  "quantity": 20,
  "note": "Transfer to main warehouse"
}
```

---

## Stock Take

### 10. Stock Take

Perform stock take (inventory count/adjustment).

**Endpoint:** `POST /api/v1/inventory/stock-take`

**Request Body:**

```json
{
  "warehouseId": 0,
  "items": [
    {
      "productId": 0,
      "systemQuantity": 0,
      "actualQuantity": 0,
      "note": "string"
    }
  ],
  "note": "string"
}
```

**Request Body Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `warehouseId` | integer | Yes | Warehouse ID |
| `items` | array | Yes | Array of stock take items |
| `items[].productId` | integer | Yes | Product ID |
| `items[].systemQuantity` | integer | Yes | System quantity |
| `items[].actualQuantity` | integer | Yes | Actual counted quantity |
| `items[].note` | string | No | Item note |
| `note` | string | No | Overall note |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "stockTakeId": 0,
    "warehouseId": 0,
    "totalItems": 0,
    "itemsAdjusted": 0,
    "adjustments": [
      {
        "productId": 0,
        "difference": 0,
        "note": "string"
      }
    ],
    "createdAt": "2025-11-28T04:23:05.090Z"
  }
}
```

**Example Request:**
```bash
POST /api/v1/inventory/stock-take
Content-Type: application/json

{
  "warehouseId": 1,
  "items": [
    {
      "productId": 5,
      "systemQuantity": 100,
      "actualQuantity": 98,
      "note": "Found 2 damaged items"
    },
    {
      "productId": 6,
      "systemQuantity": 50,
      "actualQuantity": 52,
      "note": "Found extra items"
    }
  ],
  "note": "Monthly stock take - Warehouse 1"
}
```

---

## Inventory Status

### 11. Get Inventory Status

Get inventory status for a specific product in a warehouse.

**Endpoint:** `GET /api/v1/inventory/status`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `product_id` | integer | Yes | Product ID |
| `warehouseId` | integer | Yes | Warehouse ID |

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "string",
  "data": {
    "productId": 0,
    "productName": "string",
    "warehouseId": 0,
    "warehouseName": "string",
    "quantityOnHand": 0,
    "safetyStock": 0,
    "isLowStock": true,
    "lastUpdatedAt": "2025-11-28T04:23:05.051Z"
  }
}
```

**Example Request:**
```bash
GET /api/v1/inventory/status?product_id=5&warehouseId=1
```

---

## Brands

### 12. Get Brands

Get list of all brands.

**Endpoint:** `GET /api/v1/brands`

**Response:** `200 OK`

```json
[
  {
    "id": 0,
    "name": "string",
    "country": "string",
    "description": "string"
  }
]
```

**Example Request:**
```bash
GET /api/v1/brands
```

---

### 13. Create Brand

Create a new brand.

**Endpoint:** `POST /api/v1/brands`

**Request Body:**

```json
{
  "name": "string",
  "country": "string",
  "description": "string"
}
```

**Request Body Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Brand name |
| `country` | string | Yes | Country of origin |
| `description` | string | No | Brand description |

**Response:** `200 OK`

```json
{
  "id": 0,
  "name": "string",
  "country": "string",
  "description": "string"
}
```

**Example Request:**
```bash
POST /api/v1/brands
Content-Type: application/json

{
  "name": "Château Margaux",
  "country": "France",
  "description": "Premium French wine brand"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid request parameters",
  "error": "Validation error details"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized",
  "error": "Authentication required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found",
  "error": "The requested resource does not exist"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Server error details"
}
```

---

## Notes

1. All dates are in ISO 8601 format (e.g., `2025-11-28T04:23:05.009Z`)
2. All monetary values are in the smallest currency unit (e.g., VND)
3. Pagination defaults: `page=1`, `limit=20`
4. Transaction types: `IN`, `OUT`, `ADJUST`, `RETURN`
5. Inventory status values: `inStock`, `lowStock`, `outOfStock`
6. Alert severity: `critical`, `warning`

---

## Changelog

- **2025-11-28**: Initial API documentation
```

Tạo file `docs/api/inventory-api-docs.md` với nội dung trên. File này có:
- Cấu trúc rõ ràng theo từng endpoint
- Bảng mô tả parameters
- Ví dụ request/response
- Error handling
- Notes và best practices

Bạn có muốn tôi tạo file này không? (Cần chuyển sang agent mode để tạo file)