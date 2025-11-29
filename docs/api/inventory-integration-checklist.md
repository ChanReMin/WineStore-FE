# Inventory Integration Checklist

## Quick Reference: API vs UI Gap Analysis

### 🔴 CRITICAL ISSUES (Cần làm ngay)

#### 1. Warehouse Management API - HOÀN TOÀN THIẾU
```
❌ GET    /api/v1/warehouses
❌ GET    /api/v1/warehouses/{id}
❌ GET    /api/v1/warehouses/statistics
❌ POST   /api/v1/warehouses
❌ PUT    /api/v1/warehouses/{id}
❌ DELETE /api/v1/warehouses/{id}
```
**Impact**: Trang `/seller/warehouses` không thể hoạt động  
**Status**: Đang dùng mock data  
**Action**: Backend cần implement ASAP

#### 2. Summary Endpoints - THIẾU
```
❌ GET /api/v1/inventory/summary
❌ GET /api/v1/inventory/logs/summary
```
**Impact**: UI phải tính toán summary từ toàn bộ data (chậm)  
**Current**: Client-side calculation  
**Action**: Backend thêm endpoints này

#### 3. Inventory API - CHƯA IMPLEMENT
```
✅ Có trong docs nhưng chưa implement thực tế:
   - GET  /api/v1/inventory
   - GET  /api/v1/inventory/{id}
   - PUT  /api/v1/inventory/{id}
   - POST /api/v1/inventory
```
**Status**: UI đang dùng mock data  
**Action**: Backend implement theo docs

#### 4. Inventory Logs API - CHƯA IMPLEMENT
```
✅ Có trong docs nhưng chưa implement thực tế:
   - GET /api/v1/inventory/logs
```
**Status**: UI đang dùng mock data  
**Action**: Backend implement theo docs

---

### 🟡 IMPORTANT ISSUES (Cần làm sớm)

#### 5. Data Structure Inconsistencies

**Inventory Item - Thiếu fields:**
```typescript
// API có nhưng UI không dùng:
- quantityReserved: number
- quantityAvailable: number
- quantityIncoming: number
- locationInWarehouse: string
- lastUpdatedBy: string
- product.sku: string
- product.image: string
- warehouse.address: string
```

**Inventory Log - Cấu trúc khác nhau:**
```typescript
// API trả về object, UI dùng string:
API:  warehouse: { id, name, location, address }
UI:   warehouse: string

API:  product: { id, name, sku, price, image }
UI:   product: string

// API có fields UI không có:
- quantityBefore: number
- quantityAfter: number
- referenceCode: string
- typeText: string
```

**Action**: 
- Frontend update types để match API
- Backend đảm bảo trả đúng structure

#### 6. Inventory Alerts - UI THIẾU
```
✅ API: GET /api/v1/inventory/alerts
❌ UI: Không có trang/component
```
**Action**: Frontend tạo alerts dashboard

#### 7. Export Functionality - API THIẾU
```
❌ GET /api/v1/inventory/export
❌ GET /api/v1/inventory/logs/export
```
**Current**: UI có nút nhưng không hoạt động  
**Action**: Backend thêm export endpoints

---

### 🟢 NICE TO HAVE (Có thể làm sau)

#### 8. Inventory Transfer - UI THIẾU
```
✅ API: POST /api/v1/inventory/transfer
❌ UI: Không có form
```

#### 9. Stock Take - UI THIẾU
```
✅ API: POST /api/v1/inventory/stock-take
❌ UI: Không có trang
```

#### 10. Brands Management - UI THIẾU
```
✅ API: GET/POST /api/v1/brands
❌ UI: Không có trang
```

#### 11. Date Range Filter - UI THIẾU
```
✅ API: Có support from_date, to_date
❌ UI: Không có date picker
```

---

## IMPLEMENTATION ROADMAP

### Week 1-2: Critical APIs
- [ ] Implement Warehouse Management API (6 endpoints)
- [ ] Implement Inventory API (connect to real DB)
- [ ] Implement Inventory Logs API (connect to real DB)
- [ ] Add Summary endpoints (2 endpoints)
- [ ] Fix data structure inconsistencies
- [ ] Add proper validation & error handling

### Week 3-4: Important Features
- [ ] Implement Inventory Alerts UI
- [ ] Add Export endpoints (2 endpoints)
- [ ] Add Date Range Filter UI
- [ ] Implement server-side filtering
- [ ] Add loading & error states
- [ ] Integration testing

### Week 5-6: Nice to Have
- [ ] Implement Transfer Inventory UI
- [ ] Implement Stock Take UI & API integration
- [ ] Implement Brands Management UI
- [ ] Add advanced inventory fields
- [ ] Performance optimization
- [ ] Real-time updates (WebSocket)

---

## API ENDPOINTS CHECKLIST

### ✅ Có trong Docs
```
GET    /api/v1/inventory
GET    /api/v1/inventory/{inventoryId}
POST   /api/v1/inventory
PUT    /api/v1/inventory/{inventoryId}
DELETE /api/v1/inventory/{id}
GET    /api/v1/inventory/logs
GET    /api/v1/inventory/alerts
POST   /api/v1/inventory/transfer
POST   /api/v1/inventory/stock-take
GET    /api/v1/inventory/status
GET    /api/v1/brands
POST   /api/v1/brands
```

### ❌ Thiếu trong Docs (Cần thêm)
```
# Warehouse Management
GET    /api/v1/warehouses
GET    /api/v1/warehouses/{id}
GET    /api/v1/warehouses/statistics
POST   /api/v1/warehouses
PUT    /api/v1/warehouses/{id}
DELETE /api/v1/warehouses/{id}

# Summary
GET    /api/v1/inventory/summary
GET    /api/v1/inventory/logs/summary

# Export
GET    /api/v1/inventory/export
GET    /api/v1/inventory/logs/export

# Bulk Operations (Optional)
POST   /api/v1/inventory/bulk-update
POST   /api/v1/inventory/bulk-transfer
```

---

## UI PAGES CHECKLIST

### ✅ Đã Có
```
/seller/warehouses          - Warehouse Management
/seller/inventory           - Inventory List
/seller/inventory-logs      - Transaction Logs
```

### ❌ Cần Thêm
```
/seller/inventory/alerts    - Inventory Alerts Dashboard
/seller/stock-take          - Stock Take Page
/seller/brands              - Brands Management
```

### ⚠️ Cần Cải Thiện
```
/seller/inventory           - Thêm Transfer, Export
/seller/inventory-logs      - Thêm Date Filter, Export
```

---

## DATA FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────┐
│                    SELLER DASHBOARD                      │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Warehouses  │    │  Inventory   │    │     Logs     │
│              │    │              │    │              │
│ ❌ No API    │    │ ✅ Has API   │    │ ✅ Has API   │
│ ✅ Has UI    │    │ ✅ Has UI    │    │ ✅ Has UI    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                   │                   │
        │                   ├───────────────────┤
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Alerts     │    │  Transfer    │    │  Stock Take  │
│              │    │              │    │              │
│ ✅ Has API   │    │ ✅ Has API   │    │ ✅ Has API   │
│ ❌ No UI     │    │ ❌ No UI     │    │ ❌ No UI     │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## TESTING CHECKLIST

### Backend Testing
- [ ] All warehouse endpoints work correctly
- [ ] Inventory CRUD operations
- [ ] Logs are created for all transactions
- [ ] Alerts are generated automatically
- [ ] Transfer validates stock availability
- [ ] Stock take creates adjustment logs
- [ ] Pagination works correctly
- [ ] Filters work correctly
- [ ] Error handling is consistent
- [ ] Validation rules are enforced

### Frontend Testing
- [ ] Warehouse list loads and filters work
- [ ] Inventory list loads and filters work
- [ ] Stock In/Out modal works
- [ ] Logs list loads and filters work
- [ ] Summary cards show correct data
- [ ] Pagination works on all pages
- [ ] Loading states display correctly
- [ ] Error messages display correctly
- [ ] Mobile responsive
- [ ] Performance with large datasets

### Integration Testing
- [ ] Create warehouse → appears in list
- [ ] Stock In → inventory increases → log created
- [ ] Stock Out → inventory decreases → log created
- [ ] Low stock → alert created
- [ ] Transfer → both warehouses updated → logs created
- [ ] Stock take → adjustments applied → logs created
- [ ] Export → file downloads correctly
- [ ] Real-time updates work (if implemented)

---

## QUICK WINS (Có thể làm ngay)

1. **Add Summary Endpoints** (2-3 hours)
   - Tính toán ở server thay vì client
   - Cải thiện performance đáng kể

2. **Fix Data Structures** (1-2 hours)
   - Update TypeScript types
   - Ensure consistency

3. **Add Loading States** (1 hour)
   - Better UX while waiting for API

4. **Add Error Handling** (2 hours)
   - Display meaningful error messages
   - Retry logic

5. **Implement Date Filter UI** (2-3 hours)
   - API đã support, chỉ cần UI

---

## CONTACT & RESOURCES

- **API Documentation**: `docs/api/inventory-api-docs.md`
- **Gap Analysis**: `docs/api/inventory-api-ui-gap-analysis.md`
- **UI Components**: `components/seller/inventory/`, `components/seller/warehouse/`
- **Mock Data**: `lib/inventory.mock.ts`, `lib/inventoryLogs.mock.ts`, `lib/sellerWarehouse.ts`
- **Types**: `types/inventory.ts`

---

**Last Updated**: 2024-11-28  
**Version**: 1.0  
**Status**: 🔴 Critical gaps identified - Action required
