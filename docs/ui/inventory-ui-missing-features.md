# Danh Sách Features Còn Thiếu Ở UI - Inventory Management

## 📊 TỔNG QUAN

Tài liệu này liệt kê chi tiết tất cả features còn thiếu ở UI, đã có API nhưng chưa implement giao diện.

---

## 🔴 PRIORITY 1: CRITICAL (Cần làm ngay)

### 1. INVENTORY ALERTS DASHBOARD ⚠️

**API đã có**: ✅ `GET /api/v1/inventory/alerts`

**Thiếu hoàn toàn**:
- ❌ Không có trang `/seller/inventory/alerts`
- ❌ Không có component hiển thị alerts
- ❌ Không có notification badge

**Cần implement**:

#### A. Alerts Page (`/seller/inventory/alerts`)
```typescript
// app/[locale]/seller/inventory/alerts/page.tsx
Features cần có:
- Danh sách alerts với pagination
- Filter theo type (low_stock, out_of_stock)
- Filter theo warehouse
- Filter theo severity (critical, warning)
- Sort theo date, severity
- Quick action: "Stock In" từ alert
- Mark as resolved
- Auto refresh mỗi 30s
```

#### B. Alert Badge Component
```typescript
// components/seller/AlertBadge.tsx
Location: Header/Sidebar
Features:
- Hiển thị số alerts chưa xem
- Dropdown preview 5 alerts gần nhất
- Link đến alerts page
- Real-time update (nếu có WebSocket)
```

#### C. Alert Card Component
```typescript
// components/seller/inventory/AlertCard.tsx
Features:
- Hiển thị product info
- Hiển thị warehouse
- Hiển thị current quantity vs safety stock
- Severity badge (critical/warning)
- Quick action buttons
- Timestamp
```

**Mockup Structure**:
```
┌─────────────────────────────────────────────┐
│  🔔 Inventory Alerts                        │
│  ┌─────────┬─────────┬─────────┬─────────┐ │
│  │ All (15)│Critical │Warning  │Resolved │ │
│  └─────────┴─────────┴─────────┴─────────┘ │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ 🔴 OUT OF STOCK                     │   │
│  │ Château Margaux 2015                │   │
│  │ Hanoi Warehouse                     │   │
│  │ Current: 0 | Safety: 10             │   │
│  │ [Stock In] [View Details]           │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ 🟡 LOW STOCK                        │   │
│  │ Penfolds Grange 2019                │   │
│  │ Hanoi Warehouse                     │   │
│  │ Current: 5 | Safety: 10             │   │
│  │ [Stock In] [View Details]           │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

### 2. DATE RANGE FILTER (Inventory Logs) 📅

**API đã có**: ✅ Support `from_date`, `to_date` params

**Thiếu ở UI**:
- ❌ Không có date picker component
- ❌ Không có preset ranges
- ❌ Không filter theo date

**Cần implement**:

#### A. DateRangePicker Component
```typescript
// components/seller/inventory/DateRangePicker.tsx
Location: /seller/inventory-logs

Features:
- Calendar popup để chọn from_date, to_date
- Preset ranges:
  - Today
  - Yesterday
  - Last 7 days
  - Last 30 days
  - This month
  - Last month
  - Custom range
- Clear button
- Apply button
- Display selected range
```

#### B. Update InventoryLogsFilters
```typescript
// components/seller/inventory/InventoryLogsFilters.tsx
Thêm:
- DateRangePicker component
- Display selected date range
- Clear date filter button
```

**Mockup**:
```
┌─────────────────────────────────────────────┐
│  Filters                                    │
│  ┌─────────────────────────────────────┐   │
│  │ 📅 Date Range                       │   │
│  │ [2024-11-01] to [2024-11-28]    [×] │   │
│  │                                     │   │
│  │ Quick Select:                       │   │
│  │ [Today] [Last 7 Days] [This Month] │   │
│  │ [Custom Range...]                   │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

---

### 3. EXPORT FUNCTIONALITY 📥

**API cần có**: ❌ `GET /api/v1/inventory/export`, `GET /api/v1/inventory/logs/export`

**Thiếu ở UI**:
- ⚠️ Có nút "Export" nhưng không hoạt động
- ❌ Không có modal chọn format
- ❌ Không có progress indicator

**Cần implement**:

#### A. Export Modal Component
```typescript
// components/seller/inventory/ExportModal.tsx
Location: /seller/inventory và /seller/inventory-logs

Features:
- Select format: CSV, Excel, PDF
- Select data range:
  - Current page
  - All filtered results
  - Custom range
- Include/exclude columns
- Progress bar khi export
- Download button
- Error handling
```

#### B. Export Button với Dropdown
```typescript
// Update existing export buttons
Features:
- Dropdown menu:
  - Export as CSV
  - Export as Excel
  - Export as PDF
- Show loading state
- Success notification
- Error notification
```

**Mockup**:
```
┌─────────────────────────────────────────────┐
│  Export Inventory                           │
│                                             │
│  Format:                                    │
│  ○ CSV    ● Excel    ○ PDF                 │
│                                             │
│  Data Range:                                │
│  ● Current page (10 items)                 │
│  ○ All filtered results (45 items)         │
│  ○ Custom range                             │
│                                             │
│  Columns:                                   │
│  ☑ Product Name    ☑ Warehouse             │
│  ☑ Quantity        ☑ Status                │
│  ☑ Value           ☑ Last Updated          │
│                                             │
│  [Cancel]              [Export] 📥          │
└─────────────────────────────────────────────┘
```

---

## 🟡 PRIORITY 2: IMPORTANT (Cần làm sớm)

### 4. INVENTORY TRANSFER 🔄

**API đã có**: ✅ `POST /api/v1/inventory/transfer`

**Thiếu hoàn toàn**:
- ❌ Không có button "Transfer" trong inventory page
- ❌ Không có modal transfer
- ❌ Không có trang transfer history

**Cần implement**:

#### A. Transfer Button
```typescript
// components/seller/inventory/InventoryTable.tsx
Location: Thêm vào action column

Features:
- Icon button "Transfer"
- Tooltip "Transfer to another warehouse"
- Open TransferModal
```

#### B. Transfer Modal Component
```typescript
// components/seller/inventory/TransferModal.tsx

Features:
- Display product info (read-only)
- Display current warehouse (read-only)
- Display current quantity (read-only)
- Select destination warehouse (dropdown)
- Input transfer quantity
- Validation:
  - quantity > 0
  - quantity <= available quantity
  - destination ≠ source
- Note/reason (optional)
- Preview: "Transfer X items from A to B"
- Submit button
- Loading state
- Success/error notification
```

#### C. Transfer History Tab
```typescript
// components/seller/inventory/TransferHistory.tsx
Location: Có thể là tab trong inventory page hoặc modal

Features:
- List recent transfers
- Filter by warehouse
- Filter by product
- Filter by date
- Status: pending, completed, cancelled
- Show transfer details
```

**Mockup**:
```
┌─────────────────────────────────────────────┐
│  Transfer Inventory                         │
│                                             │
│  Product: Château Margaux 2015              │
│  From: Hanoi Warehouse                      │
│  Available: 50 units                        │
│                                             │
│  To Warehouse: *                            │
│  ┌─────────────────────────────────────┐   │
│  │ Select warehouse...              ▼  │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Quantity: *                                │
│  ┌─────────────────────────────────────┐   │
│  │ 0                                   │   │
│  └─────────────────────────────────────┘   │
│  Max: 50 units                              │
│                                             │
│  Note:                                      │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Preview:                                   │
│  Transfer 20 units from Hanoi Warehouse     │
│  to Ho Chi Minh City Warehouse              │
│                                             │
│  [Cancel]              [Transfer] 🔄        │
└─────────────────────────────────────────────┘
```

---

### 5. INVENTORY DETAIL MODAL 🔍

**API đã có**: ✅ `GET /api/v1/inventory/{inventoryId}`

**Thiếu ở UI**:
- ❌ Không có button "View Details"
- ❌ Không có modal hiển thị chi tiết
- ❌ Không hiển thị các fields bổ sung

**Cần implement**:

#### A. View Details Button
```typescript
// components/seller/inventory/InventoryTable.tsx
Location: Thêm vào action column hoặc click vào row

Features:
- Icon button "View"
- Click row để xem detail
- Open InventoryDetailModal
```

#### B. Inventory Detail Modal
```typescript
// components/seller/inventory/InventoryDetailModal.tsx

Features hiển thị:
- Product info (name, SKU, price, cost price, image)
- Warehouse info (name, location, address, manager, phone)
- Quantity info:
  - On Hand
  - Reserved
  - Available (On Hand - Reserved)
  - Incoming
  - Safety Stock
- Status badge
- Location in warehouse
- Last stock in (date, quantity, note)
- Last stock out (date, quantity, note)
- Last updated (date, by whom)
- Recent logs (5 gần nhất)
- Quick actions: Stock In, Stock Out, Transfer
```

**Mockup**:
```
┌─────────────────────────────────────────────┐
│  Inventory Details                      [×] │
├─────────────────────────────────────────────┤
│  ┌─────────┐  Château Margaux 2015          │
│  │  IMAGE  │  SKU: CM-2015-001               │
│  │         │  Price: 5,940,000 VND           │
│  └─────────┘  Cost: 4,500,000 VND            │
│                                             │
│  📍 Warehouse                                │
│  Hanoi Warehouse                            │
│  456 Hoàng Văn Thụ, Hanoi                   │
│  Manager: Nguyễn Văn A | ☎ 0901234567       │
│                                             │
│  📦 Quantity                                 │
│  ┌──────────┬──────────┬──────────┐         │
│  │ On Hand  │ Reserved │Available │         │
│  │   50     │    10    │    40    │         │
│  └──────────┴──────────┴──────────┘         │
│  Incoming: 20 | Safety Stock: 10            │
│  Location: Shelf A-12                       │
│                                             │
│  📊 Status: 🟢 In Stock                      │
│                                             │
│  📝 Recent Activity                          │
│  ↗ Stock In: +30 (2024-11-25)               │
│  ↘ Stock Out: -20 (2024-11-24)              │
│                                             │
│  Last Updated: 2024-11-25 by Admin          │
│                                             │
│  [Stock In] [Stock Out] [Transfer]          │
└─────────────────────────────────────────────┘
```

---

### 6. ADVANCED INVENTORY FIELDS 📊

**API đã có**: ✅ Các fields trong response

**Thiếu ở UI**:
- ❌ Không hiển thị `quantityReserved`
- ❌ Không hiển thị `quantityAvailable`
- ❌ Không hiển thị `quantityIncoming`
- ❌ Không hiển thị `locationInWarehouse`
- ❌ Không hiển thị `lastUpdatedBy`

**Cần implement**:

#### A. Update InventoryTable
```typescript
// components/seller/inventory/InventoryTable.tsx

Thêm columns (optional, có thể toggle):
- Reserved: Số lượng đã đặt trước
- Available: Số lượng có thể bán (On Hand - Reserved)
- Incoming: Số lượng đang về
- Location: Vị trí trong kho
- Updated By: Người cập nhật cuối
```

#### B. Column Visibility Toggle
```typescript
// components/seller/inventory/ColumnToggle.tsx

Features:
- Dropdown checklist
- Show/hide columns
- Save preference to localStorage
- Default visible columns
```

**Mockup**:
```
┌─────────────────────────────────────────────┐
│  Columns                                 ▼  │
│  ☑ Product                                  │
│  ☑ Warehouse                                │
│  ☑ On Hand                                  │
│  ☐ Reserved                                 │
│  ☐ Available                                │
│  ☐ Incoming                                 │
│  ☑ Safety Stock                             │
│  ☑ Status                                   │
│  ☐ Location                                 │
│  ☑ Value                                    │
│  ☑ Updated                                  │
│  ☐ Updated By                               │
│  ☑ Actions                                  │
└─────────────────────────────────────────────┘
```

---

## 🟢 PRIORITY 3: NICE TO HAVE (Có thể làm sau)

### 7. STOCK TAKE PAGE 📋

**API đã có**: ✅ `POST /api/v1/inventory/stock-take`

**Thiếu hoàn toàn**:
- ❌ Không có trang `/seller/stock-take`
- ❌ Không có form kiểm kê
- ❌ Không có stock take history

**Cần implement**:

#### A. Stock Take Page
```typescript
// app/[locale]/seller/stock-take/page.tsx

Features:
- Select warehouse
- Load all products in warehouse
- Table với columns:
  - Product name
  - System quantity (read-only)
  - Actual quantity (input)
  - Difference (calculated)
  - Note (input)
- Highlight differences (red/green)
- Calculate total difference
- Bulk submit
- Generate report
```

#### B. Stock Take Form Component
```typescript
// components/seller/stock-take/StockTakeForm.tsx

Features:
- Warehouse selector
- Product list table
- Editable actual quantity
- Auto-calculate difference
- Color coding:
  - Green: actual > system
  - Red: actual < system
  - Gray: no difference
- Note per item
- Overall note
- Validation
- Submit button
- Preview before submit
```

#### C. Stock Take History
```typescript
// components/seller/stock-take/StockTakeHistory.tsx

Features:
- List past stock takes
- Filter by warehouse
- Filter by date
- Show summary (total items, adjustments)
- View details
- Download report
```

**Mockup**:
```
┌─────────────────────────────────────────────┐
│  Stock Take                                 │
│                                             │
│  Warehouse: [Hanoi Warehouse        ▼]     │
│  Date: 2024-11-28                           │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │Product      │System│Actual│Diff│Note│   │
│  ├─────────────────────────────────────┤   │
│  │Château M... │ 50   │ 48   │-2  │... │   │
│  │Bordeaux ... │ 120  │ 122  │+2  │... │   │
│  │Penfolds ... │ 5    │ 5    │ 0  │    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Summary:                                   │
│  Total Items: 3                             │
│  Items Adjusted: 2                          │
│  Net Change: 0                              │
│                                             │
│  Overall Note:                              │
│  ┌─────────────────────────────────────┐   │
│  │ Monthly stock take - Nov 2024       │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Cancel]              [Submit] 📋          │
└─────────────────────────────────────────────┘
```

---

### 8. BRANDS MANAGEMENT PAGE 🏷️

**API đã có**: ✅ `GET /api/v1/brands`, `POST /api/v1/brands`

**Thiếu hoàn toàn**:
- ❌ Không có trang `/seller/brands`
- ❌ Không có form create/edit brand

**Cần implement**:

#### A. Brands Page
```typescript
// app/[locale]/seller/brands/page.tsx

Features:
- List brands (grid or table)
- Search brands
- Filter by country
- Create brand button
- Edit brand
- Delete brand (nếu không có products)
- Brand statistics
```

#### B. Create/Edit Brand Modal
```typescript
// components/seller/brands/BrandModal.tsx

Fields:
- Name * (required)
- Country * (required, dropdown)
- Description (optional, textarea)
- Logo (optional, image upload)
- Website (optional)
- Validation
- Submit button
```

#### C. Brand Card Component
```typescript
// components/seller/brands/BrandCard.tsx

Display:
- Brand logo
- Brand name
- Country flag + name
- Description (truncated)
- Number of products
- Actions: Edit, Delete
```

**Mockup**:
```
┌─────────────────────────────────────────────┐
│  Brands Management                          │
│  [+ Add Brand]                              │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  🇫🇷      │  │  🇮🇹      │  │  🇦🇺      │  │
│  │ Château  │  │ Barolo   │  │ Penfolds │  │
│  │ Margaux  │  │          │  │          │  │
│  │ France   │  │ Italy    │  │ Australia│  │
│  │ 15 prods │  │ 8 prods  │  │ 12 prods │  │
│  │[Edit][×] │  │[Edit][×] │  │[Edit][×] │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
```

---

### 9. BULK OPERATIONS 📦

**API cần có**: ❌ Chưa có API

**Thiếu ở UI**:
- ❌ Không có checkbox select multiple
- ❌ Không có bulk actions

**Cần implement** (khi có API):

#### A. Bulk Selection
```typescript
// components/seller/inventory/InventoryTable.tsx

Features:
- Checkbox column
- Select all checkbox
- Select individual items
- Show selected count
- Bulk action bar
```

#### B. Bulk Actions Bar
```typescript
// components/seller/inventory/BulkActionsBar.tsx

Actions:
- Bulk Stock In
- Bulk Stock Out
- Bulk Transfer
- Bulk Export
- Clear selection
```

**Mockup**:
```
┌─────────────────────────────────────────────┐
│  ☑ 5 items selected                         │
│  [Stock In] [Stock Out] [Transfer] [Export] │
└─────────────────────────────────────────────┘
```

---

### 10. INVENTORY ANALYTICS 📈

**API cần có**: ❌ Chưa có API

**Thiếu hoàn toàn**:
- ❌ Không có charts/graphs
- ❌ Không có trends
- ❌ Không có forecasting

**Cần implement** (khi có API):

#### A. Analytics Dashboard
```typescript
// app/[locale]/seller/inventory/analytics/page.tsx

Features:
- Stock level trends (line chart)
- Stock in/out trends (bar chart)
- Top products by value
- Top products by turnover
- Warehouse comparison
- Low stock trends
- Forecast (nếu có AI)
```

**Mockup**:
```
┌─────────────────────────────────────────────┐
│  Inventory Analytics                        │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Stock Level Trends (30 days)      │   │
│  │  📈 [Line Chart]                    │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │Top Value │  │Top Turn  │  │Low Stock │  │
│  │[Chart]   │  │[Chart]   │  │[Chart]   │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘
```

---

### 11. NOTIFICATIONS & REAL-TIME UPDATES 🔔

**API cần có**: ❌ WebSocket/SSE

**Thiếu ở UI**:
- ❌ Không có real-time updates
- ❌ Không có notifications
- ❌ Không có toast messages cho events

**Cần implement** (khi có WebSocket):

#### A. Notification System
```typescript
// components/seller/NotificationCenter.tsx

Features:
- Bell icon với badge count
- Dropdown notification list
- Types:
  - Low stock alert
  - Out of stock alert
  - Transfer completed
  - Stock take completed
- Mark as read
- Clear all
- Link to related page
```

#### B. Real-time Updates
```typescript
// hooks/useInventoryRealtime.ts

Features:
- Subscribe to inventory changes
- Auto refresh data khi có update
- Show toast notification
- Highlight changed rows
```

---

### 12. MOBILE OPTIMIZATION 📱

**Thiếu ở UI**:
- ⚠️ Responsive nhưng chưa tối ưu cho mobile
- ❌ Không có mobile-specific views
- ❌ Không có swipe actions

**Cần improve**:

#### A. Mobile Table View
```typescript
// components/seller/inventory/InventoryMobileCard.tsx

Features:
- Card view thay vì table
- Swipe actions (Stock In, Stock Out)
- Collapsible details
- Touch-friendly buttons
- Bottom sheet modals
```

#### B. Mobile Filters
```typescript
// components/seller/inventory/MobileFilters.tsx

Features:
- Bottom sheet filter panel
- Touch-friendly controls
- Apply/Clear buttons
- Show active filters count
```

---

## 📋 SUMMARY CHECKLIST

### 🔴 Priority 1 (Critical)
- [ ] Inventory Alerts Dashboard
- [ ] Alert Badge Component
- [ ] Date Range Filter
- [ ] Export Modal & Functionality

### 🟡 Priority 2 (Important)
- [ ] Inventory Transfer Modal
- [ ] Transfer History
- [ ] Inventory Detail Modal
- [ ] Advanced Inventory Fields
- [ ] Column Visibility Toggle

### 🟢 Priority 3 (Nice to Have)
- [ ] Stock Take Page
- [ ] Stock Take History
- [ ] Brands Management Page
- [ ] Bulk Operations
- [ ] Inventory Analytics
- [ ] Notification System
- [ ] Real-time Updates
- [ ] Mobile Optimization

---

## 🎯 RECOMMENDED IMPLEMENTATION ORDER

### Week 1-2: Must Have
1. Date Range Filter (2 days)
2. Inventory Detail Modal (2 days)
3. Inventory Alerts Dashboard (3 days)
4. Export Functionality (2 days)

### Week 3-4: Should Have
5. Inventory Transfer (3 days)
6. Advanced Fields & Column Toggle (2 days)
7. Transfer History (2 days)

### Week 5-6: Nice to Have
8. Stock Take Page (4 days)
9. Brands Management (2 days)
10. Mobile Optimization (3 days)

### Future Enhancements
11. Bulk Operations (when API ready)
12. Analytics Dashboard (when API ready)
13. Real-time Updates (when WebSocket ready)

---

## 📝 NOTES

- Tất cả components nên có loading states
- Tất cả forms nên có validation
- Tất cả actions nên có confirmation
- Tất cả operations nên có success/error notifications
- Tất cả modals nên có keyboard shortcuts (ESC to close)
- Tất cả tables nên có empty states
- Tất cả filters nên có clear button
- Tất cả exports nên có progress indicator

---

**Created**: 2024-11-28  
**Version**: 1.0  
**Status**: Ready for implementation
