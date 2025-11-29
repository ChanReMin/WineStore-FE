# Phân Tích Khoảng Cách API - UI: Inventory Management

## Tổng Quan

Tài liệu này phân tích chi tiết sự khớp giữa API Documentation (`inventory-api-docs.md`) và các trang UI thực tế của seller:
- `/seller/warehouses` - Quản lý kho
- `/seller/inventory` - Quản lý tồn kho
- `/seller/inventory-logs` - Lịch sử giao dịch kho

---

## 1. WAREHOUSES PAGE (`/seller/warehouses`)

### ✅ Đã Có API

#### 1.1. Get Warehouses List
- **API**: `GET /api/v1/warehouses` (THIẾU trong docs)
- **UI Cần**: ✅ Đã implement trong `lib/sellerWarehouse.ts`
- **Params UI sử dụng**:
  - `status`: filter theo trạng thái (0=pending, 1=active, 2=banned)
  - `search`: tìm kiếm theo tên/địa chỉ
  - `page`, `limit`: phân trang
- **Response UI cần**:
  ```typescript
  {
    warehouses: Warehouse[],
    pagination: { currentPage, totalPages, totalItems, perPage, has_next, has_prev },
    summary: { totalWarehouses, active, pending, banned }
  }
  ```

#### 1.2. Get Warehouse Statistics
- **API**: `GET /api/v1/warehouses/statistics` (THIẾU trong docs)
- **UI Cần**: ✅ Đã implement
- **Response UI cần**:
  ```typescript
  {
    totalWarehouses: number,
    active_warehouses: number,
    pending_warehouses: number,
    banned_warehouses: number,
    totalInventory_value: number,
    totalProducts: number,
    totalquantity: number,
    warehouses_byStatus: Array<{status, count, label}>
  }
  ```

#### 1.3. Get Warehouse Detail
- **API**: `GET /api/v1/warehouses/{id}` (THIẾU trong docs)
- **UI Cần**: ✅ Đã implement
- **Response UI cần**:
  ```typescript
  {
    ...Warehouse,
    inventory: {
      totalProducts: number,
      totalquantity: number,
      total_value: number,
      lowStockProducts: number
    },
    recent_logs: Array<{
      id, type, productName, quantity, createdAt
    }>
  }
  ```

#### 1.4. Create Warehouse
- **API**: `POST /api/v1/warehouses` (THIẾU trong docs)
- **UI Cần**: ✅ Đã implement
- **Request Body**:
  ```typescript
  {
    name: string,
    location: string,
    description: string
  }
  ```

#### 1.5. Update Warehouse
- **API**: `PUT /api/v1/warehouses/{id}` (THIẾU trong docs)
- **UI Cần**: ✅ Đã implement
- **Request Body**: Same as Create

#### 1.6. Delete Warehouse
- **API**: `DELETE /api/v1/warehouses/{id}` (THIẾU trong docs)
- **UI Cần**: ✅ Đã implement
- **Constraint**: Chỉ xóa được kho có status = 0 (pending)

### ❌ THIẾU HOÀN TOÀN

**Toàn bộ Warehouse Management API không có trong docs!**

---

## 2. INVENTORY PAGE (`/seller/inventory`)

### ✅ Đã Có API (Khớp với Docs)

#### 2.1. Get Inventory List
- **API**: ✅ `GET /api/v1/inventory` (Có trong docs)
- **UI Params**:
  - `page`, `limit`: phân trang ✅
  - `warehouseId`: filter theo kho ✅
  - `status`: filter theo trạng thái ✅
  - `search`: tìm kiếm ✅
- **Response**: ✅ Khớp với docs

#### 2.2. Get Inventory Detail
- **API**: ✅ `GET /api/v1/inventory/{inventoryId}` (Có trong docs)
- **UI**: Chưa sử dụng (có thể cần cho modal detail)

### ⚠️ CÓ NHƯNG KHÔNG KHỚP

#### 2.3. Update Inventory (Stock In/Out)
- **API Docs**: `PUT /api/v1/inventory/{inventoryId}`
- **Request Body Docs**:
  ```json
  {
    "type": "in" | "out",
    "quantity": number,
    "note": string,
    "referenceCode": string
  }
  ```
- **UI Cần** (từ `UpdateInventoryModal`):
  ```typescript
  {
    type: "in" | "out",
    quantity: number,
    note: string
  }
  ```
- **✅ Khớp** - UI không dùng `referenceCode` (optional)

### ❌ THIẾU TRONG DOCS

#### 2.4. Get Inventory Summary
- **API**: `GET /api/v1/inventory/summary` (THIẾU)
- **UI Cần**: Summary cards hiển thị:
  ```typescript
  {
    totalProducts: number,
    inStock: number,
    lowStock: number,
    outOfStock: number,
    totalValue: number
  }
  ```
- **Giải pháp hiện tại**: UI tính toán từ data list (không tối ưu)
- **Nên có**: Endpoint riêng để lấy summary

### 🔍 THIẾU FEATURES TRONG UI

#### 2.5. Create Inventory Transaction
- **API**: ✅ `POST /api/v1/inventory` (Có trong docs)
- **UI**: ❌ Không có form tạo inventory mới
- **Lý do**: UI chỉ update inventory có sẵn, không tạo mới

#### 2.6. Delete Inventory
- **API**: ✅ `DELETE /api/v1/inventory/{id}` (Có trong docs)
- **UI**: ❌ Không có nút xóa inventory
- **Lý do**: Có thể không cho phép xóa từ UI

---

## 3. INVENTORY LOGS PAGE (`/seller/inventory-logs`)

### ✅ Đã Có API (Khớp với Docs)

#### 3.1. Get Inventory Logs
- **API**: ✅ `GET /api/v1/inventory/logs` (Có trong docs)
- **UI Params**:
  - `page`, `limit`: phân trang ✅
  - `warehouseId`: filter theo kho ✅
  - `type`: filter theo loại giao dịch ✅
  - `from_date`, `to_date`: filter theo ngày ❌ (UI chưa có)
- **Response**: ✅ Khớp với docs

### ❌ THIẾU TRONG DOCS

#### 3.2. Get Logs Summary
- **API**: `GET /api/v1/inventory/logs/summary` (THIẾU)
- **UI Cần**: Summary cards hiển thị:
  ```typescript
  {
    total: number,
    stockIn: number,
    stockOut: number,
    adjustments: number,
    returns: number,
    totalStockIn: number,
    totalStockOut: number,
    netChange: number
  }
  ```
- **Giải pháp hiện tại**: UI tính toán từ data list (không tối ưu)
- **Nên có**: Endpoint riêng để lấy summary

### 🔍 THIẾU FEATURES TRONG UI

#### 3.3. Export Report
- **UI**: Có nút "Export Report" nhưng chưa implement
- **API Cần**: `GET /api/v1/inventory/logs/export` (THIẾU)
- **Params**:
  - `format`: "csv" | "excel" | "pdf"
  - `from_date`, `to_date`
  - `warehouseId`, `type`
- **Response**: File download

#### 3.4. Date Range Filter
- **UI**: Chưa có date picker
- **API**: Có support `from_date`, `to_date` ✅
- **Cần thêm**: UI component cho date range filter

---

## 4. FEATURES TRONG API DOCS NHƯNG CHƯA CÓ UI

### 4.1. Inventory Alerts
- **API**: ✅ `GET /api/v1/inventory/alerts`
- **UI**: ❌ Không có trang/component hiển thị alerts
- **Nên có**: 
  - Badge/notification hiển thị số alerts
  - Modal/page để xem chi tiết alerts
  - Filter theo type và warehouse

### 4.2. Inventory Transfer
- **API**: ✅ `POST /api/v1/inventory/transfer`
- **UI**: ❌ Không có form chuyển kho
- **Nên có**:
  - Modal "Transfer Inventory"
  - Select source warehouse
  - Select destination warehouse
  - Input quantity
  - Validation

### 4.3. Stock Take
- **API**: ✅ `POST /api/v1/inventory/stock-take`
- **UI**: ❌ Không có trang kiểm kê
- **Nên có**:
  - Page `/seller/stock-take`
  - Form nhập số lượng thực tế
  - So sánh với số lượng hệ thống
  - Tự động tạo adjustment logs

### 4.4. Inventory Status Check
- **API**: ✅ `GET /api/v1/inventory/status`
- **UI**: ❌ Không sử dụng
- **Có thể dùng**: Quick check status của 1 product tại 1 warehouse

### 4.5. Brands Management
- **API**: ✅ `GET /api/v1/brands`, `POST /api/v1/brands`
- **UI**: ❌ Không có trang quản lý brands
- **Nên có**: Page `/seller/brands` hoặc section trong settings

---

## 5. DATA STRUCTURE GAPS

### 5.1. Inventory Item

**API Response** (từ docs):
```typescript
{
  id: number,
  warehouse: { id, name, location, address },
  product: { id, name, sku, price, image },
  quantityOnHand: number,
  safetyStock: number,
  quantityReserved: number,      // ❌ UI không có
  quantityAvailable: number,     // ❌ UI không có
  quantityIncoming: number,      // ❌ UI không có (chỉ có trong detail)
  status: string,
  locationInWarehouse: string,   // ❌ UI không có (chỉ có trong detail)
  lastUpdatedAt: string,
  lastUpdatedBy: string          // ❌ UI không có
}
```

**UI Data** (từ types/inventory.ts):
```typescript
{
  id: number,
  warehouse: { id, name, location },  // ❌ Thiếu address
  product: { id, name, price },       // ❌ Thiếu sku, image
  quantityOnHand: number,
  safetyStock: number,
  status: "inStock" | "lowStock" | "outOfStock",
  lastUpdatedAt: string
}
```

### 5.2. Inventory Log

**API Response** (từ docs):
```typescript
{
  id: number,
  type: string,
  typeText: string,
  warehouse: { id, name, location, address },
  product: { id, name, sku, price, image },
  quantityBefore: number,
  quantityChange: number,
  quantityAfter: number,
  note: string,
  referenceCode: string,
  createdBy: string,
  createdAt: string
}
```

**UI Data** (từ mock):
```typescript
{
  id: number,
  warehouse: string,              // ❌ Chỉ là string, không phải object
  product: string,                // ❌ Chỉ là string, không phải object
  type: "IN" | "OUT" | "ADJUST" | "RETURN",
  quantity: number,               // ❌ Không có quantityBefore/After
  user: string,                   // ✅ Tương đương createdBy
  note: string,
  createdAt: string
}
```

### 5.3. Warehouse

**API Cần** (từ UI):
```typescript
{
  id: number,
  name: string,
  location: string,
  description: string,
  status: 0 | 1 | 2,
  manager_id: number,
  createdAt: string,
  updatedAt: string,
  inventory_summary: {
    totalProducts: number,
    totalquantity: number
  }
}
```

**❌ Hoàn toàn thiếu trong API docs**

---

## 6. MISSING API ENDPOINTS (Cần Bổ Sung)

### 6.1. Warehouse Management (Ưu tiên CAO)
```
GET    /api/v1/warehouses
GET    /api/v1/warehouses/{id}
GET    /api/v1/warehouses/statistics
POST   /api/v1/warehouses
PUT    /api/v1/warehouses/{id}
DELETE /api/v1/warehouses/{id}
```

### 6.2. Summary Endpoints (Ưu tiên CAO)
```
GET /api/v1/inventory/summary
  - Trả về tổng hợp: totalProducts, inStock, lowStock, outOfStock, totalValue
  
GET /api/v1/inventory/logs/summary
  - Trả về tổng hợp: total, stockIn, stockOut, adjustments, returns, netChange
```

### 6.3. Export Endpoints (Ưu tiên TRUNG BÌNH)
```
GET /api/v1/inventory/export
  - Export danh sách inventory
  - Params: format, warehouseId, status
  
GET /api/v1/inventory/logs/export
  - Export lịch sử giao dịch
  - Params: format, from_date, to_date, warehouseId, type
```

### 6.4. Bulk Operations (Ưu tiên THẤP)
```
POST /api/v1/inventory/bulk-update
  - Cập nhật nhiều inventory items cùng lúc
  
POST /api/v1/inventory/bulk-transfer
  - Chuyển nhiều products cùng lúc
```

---

## 7. MISSING UI FEATURES (Cần Bổ Sung)

### 7.1. Ưu Tiên CAO

#### A. Inventory Alerts Dashboard
- **Page**: `/seller/inventory/alerts`
- **Features**:
  - Hiển thị danh sách alerts (low stock, out of stock)
  - Filter theo severity (critical, warning)
  - Filter theo warehouse
  - Quick action: Stock In từ alert

#### B. Date Range Filter (Inventory Logs)
- **Component**: DateRangePicker
- **Location**: `/seller/inventory-logs`
- **Features**:
  - Select from_date, to_date
  - Preset ranges (Today, This Week, This Month, Custom)

#### C. Export Functionality
- **Location**: `/seller/inventory` và `/seller/inventory-logs`
- **Features**:
  - Export to CSV/Excel
  - Include current filters
  - Download file

### 7.2. Ưu Tiên TRUNG BÌNH

#### D. Inventory Transfer
- **Component**: TransferInventoryModal
- **Location**: `/seller/inventory`
- **Features**:
  - Select product
  - Select from/to warehouse
  - Input quantity
  - Validation (enough stock)
  - Show transfer history

#### E. Stock Take
- **Page**: `/seller/stock-take`
- **Features**:
  - Select warehouse
  - List all products in warehouse
  - Input actual quantity
  - Show difference (system vs actual)
  - Bulk submit adjustments
  - Generate stock take report

### 7.3. Ưu Tiên THẤP

#### F. Brands Management
- **Page**: `/seller/brands`
- **Features**:
  - List brands
  - Create/Edit/Delete brand
  - Filter by country

#### G. Advanced Inventory Features
- **Reserved Quantity**: Hiển thị số lượng đã đặt trước
- **Available Quantity**: Hiển thị số lượng có thể bán
- **Incoming Quantity**: Hiển thị số lượng đang về
- **Location in Warehouse**: Hiển thị vị trí trong kho

---

## 8. API RESPONSE IMPROVEMENTS

### 8.1. Thêm Metadata
```typescript
// Tất cả list endpoints nên có
{
  success: boolean,
  message: string,
  data: {
    items: T[],
    pagination: {...},
    summary: {...},      // ✅ Đã có
    filters: {           // ❌ Nên thêm
      applied: {...},
      available: {...}
    }
  },
  meta: {               // ❌ Nên thêm
    timestamp: string,
    requestId: string,
    version: string
  }
}
```

### 8.2. Consistent Error Format
```typescript
{
  success: false,
  message: string,
  error: {
    code: string,        // e.g., "INSUFFICIENT_STOCK"
    details: any,
    field: string        // Field gây lỗi (nếu có)
  }
}
```

### 8.3. Include Related Data
```typescript
// GET /api/v1/inventory/{id} nên include
{
  ...inventory,
  recentLogs: Log[],           // 5 logs gần nhất
  relatedAlerts: Alert[],      // Alerts liên quan
  transferHistory: Transfer[]  // Lịch sử chuyển kho
}
```

---

## 9. VALIDATION & BUSINESS RULES

### 9.1. Stock Out Validation
- ❌ API docs không nêu rõ validation
- ✅ UI có validate: `quantity <= quantityOnHand`
- **Nên có trong API**:
  - Check available quantity (onHand - reserved)
  - Return error code: `INSUFFICIENT_STOCK`

### 9.2. Warehouse Status Rules
- ✅ UI có rules: Chỉ update/delete warehouse theo status
- ❌ API docs không nêu rõ
- **Nên document**:
  - Pending (0): Có thể edit, delete
  - Active (1): Chỉ có thể edit
  - Banned (2): Không thể edit, delete

### 9.3. Safety Stock Rules
- ❌ Không có trong API docs
- ✅ UI có logic: `quantityOnHand < safetyStock` → lowStock
- **Nên có API**:
  - Auto create alert khi < safety stock
  - Configurable safety stock threshold

---

## 10. PERFORMANCE CONSIDERATIONS

### 10.1. Pagination
- ✅ API có support pagination
- ⚠️ UI load toàn bộ data rồi filter client-side (không tối ưu)
- **Nên**: Filter ở server-side

### 10.2. Summary Calculation
- ❌ UI tính summary từ toàn bộ data
- **Nên**: API trả về summary riêng (đã đề xuất ở mục 6.2)

### 10.3. Real-time Updates
- ❌ Không có WebSocket/SSE
- **Nên có**: Real-time notification khi:
  - Inventory thay đổi
  - Alert mới
  - Transfer completed

---

## 11. SECURITY & PERMISSIONS

### 11.1. Thiếu trong API Docs
- ❌ Không nêu rõ permissions
- **Nên có**:
  - Seller chỉ xem/edit warehouses của mình
  - Admin có thể approve/ban warehouse
  - Role-based access control

### 11.2. Audit Trail
- ⚠️ API có `createdBy`, `lastUpdatedBy`
- ❌ UI không hiển thị
- **Nên**: Hiển thị user thực hiện action

---

## 12. RECOMMENDATIONS

### 12.1. Ưu Tiên Triển Khai

#### Phase 1: Critical (1-2 tuần)
1. ✅ Implement Warehouse Management API (hoàn toàn thiếu)
2. ✅ Add Summary endpoints (tối ưu performance)
3. ✅ Fix data structure inconsistencies
4. ✅ Add proper validation & error handling

#### Phase 2: Important (2-3 tuần)
5. ✅ Implement Inventory Alerts UI
6. ✅ Add Date Range Filter
7. ✅ Implement Export functionality
8. ✅ Add Inventory Transfer feature

#### Phase 3: Nice to Have (3-4 tuần)
9. ✅ Implement Stock Take feature
10. ✅ Add Brands Management
11. ✅ Add advanced inventory fields
12. ✅ Implement real-time updates

### 12.2. API Documentation Updates
- ✅ Thêm toàn bộ Warehouse Management section
- ✅ Thêm Summary endpoints
- ✅ Thêm Export endpoints
- ✅ Document validation rules
- ✅ Document permissions
- ✅ Add error code reference
- ✅ Add examples cho mọi endpoint

### 12.3. UI Improvements
- ✅ Sử dụng đúng data structure từ API
- ✅ Implement server-side filtering
- ✅ Add loading states
- ✅ Add error handling
- ✅ Add success/error notifications
- ✅ Improve mobile responsiveness

---

## 13. SUMMARY TABLE

| Feature | API Docs | API Implemented | UI Implemented | Priority |
|---------|----------|-----------------|----------------|----------|
| **Warehouses** |
| List Warehouses | ❌ | ✅ (mock) | ✅ | 🔴 HIGH |
| Warehouse Detail | ❌ | ✅ (mock) | ✅ | 🔴 HIGH |
| Create Warehouse | ❌ | ✅ (mock) | ✅ | 🔴 HIGH |
| Update Warehouse | ❌ | ✅ (mock) | ✅ | 🔴 HIGH |
| Delete Warehouse | ❌ | ✅ (mock) | ✅ | 🔴 HIGH |
| Warehouse Statistics | ❌ | ✅ (mock) | ✅ | 🔴 HIGH |
| **Inventory** |
| List Inventory | ✅ | ❌ | ✅ (mock) | 🔴 HIGH |
| Inventory Detail | ✅ | ❌ | ⚠️ | 🟡 MEDIUM |
| Update Stock | ✅ | ❌ | ✅ (mock) | 🔴 HIGH |
| Create Inventory | ✅ | ❌ | ❌ | 🟢 LOW |
| Delete Inventory | ✅ | ❌ | ❌ | 🟢 LOW |
| Inventory Summary | ❌ | ❌ | ✅ (calc) | 🔴 HIGH |
| **Inventory Logs** |
| List Logs | ✅ | ❌ | ✅ (mock) | 🔴 HIGH |
| Logs Summary | ❌ | ❌ | ✅ (calc) | 🔴 HIGH |
| Export Logs | ❌ | ❌ | ⚠️ (UI only) | 🟡 MEDIUM |
| **Alerts** |
| Get Alerts | ✅ | ❌ | ❌ | 🔴 HIGH |
| **Transfer** |
| Transfer Inventory | ✅ | ❌ | ❌ | 🟡 MEDIUM |
| **Stock Take** |
| Stock Take | ✅ | ❌ | ❌ | 🟡 MEDIUM |
| **Brands** |
| List Brands | ✅ | ❌ | ❌ | 🟢 LOW |
| Create Brand | ✅ | ❌ | ❌ | 🟢 LOW |

**Legend:**
- ✅ = Có đầy đủ
- ⚠️ = Có nhưng chưa hoàn chỉnh
- ❌ = Không có
- 🔴 HIGH = Ưu tiên cao
- 🟡 MEDIUM = Ưu tiên trung bình
- 🟢 LOW = Ưu tiên thấp

---

## 14. NEXT STEPS

### Cho Backend Team:
1. Review và implement Warehouse Management API
2. Thêm Summary endpoints
3. Chuẩn hóa data structures
4. Thêm validation và error handling
5. Update API documentation

### Cho Frontend Team:
1. Chờ Backend implement API thực
2. Chuẩn bị UI cho Alerts, Transfer, Stock Take
3. Implement Date Range Filter
4. Implement Export functionality
5. Refactor để sử dụng server-side filtering

### Cho QA Team:
1. Test integration giữa API và UI
2. Verify data consistency
3. Test edge cases và error handling
4. Performance testing với large datasets

---

**Ngày tạo**: 2024-11-28  
**Phiên bản**: 1.0  
**Tác giả**: Kiro AI Assistant
