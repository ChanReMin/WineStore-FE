# Seller Warehouse Management - Implementation Guide

## 📋 Tổng quan

Hệ thống quản lý kho hàng hoàn chỉnh cho Seller với mock data, sẵn sàng tích hợp API thực.

## 🎯 Tính năng đã triển khai

### 1. Dashboard & Statistics
- ✅ Hiển thị tổng số kho, đang hoạt động, chờ duyệt, bị khóa
- ✅ Animated cards với color scheme từ seller dashboard
- ✅ Real-time statistics

### 2. Danh sách kho (Warehouse List)
- ✅ Grid layout responsive (1/2/3 columns)
- ✅ Status badges (Pending/Active/Banned)
- ✅ Inventory summary (products, quantity)
- ✅ Dropdown menu với actions
- ✅ Smooth animations với Framer Motion

### 3. Tìm kiếm & Lọc
- ✅ Search theo tên và địa chỉ
- ✅ Filter theo trạng thái (All/Active/Pending/Banned)
- ✅ Real-time filtering

### 4. Tạo kho mới (Create Warehouse)
- ✅ Modal với form validation
- ✅ Tự động chuyển sang trạng thái "Chờ duyệt"
- ✅ Thông báo cần admin phê duyệt
- ✅ Đa ngôn ngữ (VI/EN)

### 5. Chỉnh sửa kho (Edit Warehouse)
- ✅ Chỉ cho phép edit kho đang hoạt động (status = 1)
- ✅ Form validation
- ✅ Modal với animation

### 6. Xem chi tiết (Warehouse Detail)
- ✅ Thông tin đầy đủ về kho
- ✅ Inventory summary (products, quantity, value, low stock)
- ✅ Recent activity logs (IN/OUT transactions)
- ✅ Status badges và timestamps

### 7. Xóa kho (Delete Warehouse)
- ✅ Chỉ cho phép xóa kho chờ duyệt (status = 0)
- ✅ Confirmation dialog
- ✅ Toast notifications

## 📁 Cấu trúc Files

```
app/[locale]/seller/warehouses/
  └── page.tsx                          # Route page

components/seller/warehouse/
  ├── WarehouseManagement.tsx           # Main component
  ├── WarehouseStatCards.tsx            # Statistics cards
  ├── WarehouseList.tsx                 # Grid list với cards
  ├── CreateWarehouseModal.tsx          # Create modal
  ├── EditWarehouseModal.tsx            # Edit modal
  └── WarehouseDetailModal.tsx          # Detail modal

lib/
  └── sellerWarehouse.ts                # Mock data service

messages/
  ├── vi.json                           # Vietnamese translations
  └── en.json                           # English translations
```

## 🎨 UI/UX Design

### Color Scheme (từ Seller Dashboard)
- Primary: `#3b4417` (Dark olive green)
- Secondary: `#d4af37` (Gold)
- Background: `#fdfbf5` (Cream)
- Accent: `#f5f3e8` (Light beige)
- Text: `#7a8451` (Olive green)

### Animations
- Card hover effects
- Smooth transitions
- Framer Motion animations
- Loading states

### Status Colors
- **Pending (Chờ duyệt)**: Amber/Yellow
- **Active (Đang hoạt động)**: Green
- **Banned (Bị khóa)**: Red

## 🌐 Đa ngôn ngữ

Tất cả text đã được translate:
- ✅ Tiếng Việt (vi)
- ✅ Tiếng Anh (en)

Translation keys trong `messages/{locale}.json`:
```json
{
  "seller": {
    "warehouses": {
      "title": "...",
      "subtitle": "...",
      "stats": { ... },
      "filters": { ... },
      "list": { ... },
      "status": { ... },
      "create": { ... },
      "edit": { ... },
      "detail": { ... }
    }
  }
}
```

## 🔌 Tích hợp API

### Mock Data Service (`lib/sellerWarehouse.ts`)

Các functions cần thay thế bằng API calls:

```typescript
// 1. Lấy danh sách kho
export const getWarehouses = async (params?: {
  status?: number;
  page?: number;
  limit?: number;
  search?: string;
}) => { ... }

// 2. Lấy chi tiết kho
export const getWarehouseDetail = async (id: number) => { ... }

// 3. Lấy thống kê
export const getWarehouseStatistics = async () => { ... }

// 4. Tạo kho mới
export const createWarehouse = async (data: {
  name: string;
  location: string;
  description: string;
}) => { ... }

// 5. Cập nhật kho
export const updateWarehouse = async (id: number, data: {...}) => { ... }

// 6. Xóa kho
export const deleteWarehouse = async (id: number) => { ... }
```

### Ví dụ tích hợp API thực:

```typescript
import axios from 'axios';

export const getWarehouses = async (params?: {
  status?: number;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await axios.get('/api/seller/warehouses', { params });
  return response.data;
};
```

## 🚀 Cách sử dụng

### 1. Truy cập trang
```
/[locale]/seller/warehouses
```

### 2. Navigation
Đã thêm vào Seller Sidebar:
- Inventory Management > Warehouses

### 3. Permissions
- Chỉ seller có quyền truy cập
- Kiểm tra role trong layout

## 📊 Mock Data

### Warehouses (5 mẫu)
1. Kho Tân Bình - Active
2. Kho Quận 1 - Active  
3. Kho Thủ Đức - Pending
4. Kho Bình Thạnh - Active
5. Kho Phú Nhuận - Banned

### Statistics
- Total: 5 warehouses
- Active: 3
- Pending: 1
- Banned: 1

## ✅ Testing Checklist

- [x] Hiển thị danh sách kho
- [x] Tìm kiếm theo tên/địa chỉ
- [x] Lọc theo trạng thái
- [x] Tạo kho mới
- [x] Chỉnh sửa kho (chỉ active)
- [x] Xem chi tiết kho
- [x] Xóa kho (chỉ pending)
- [x] Responsive design
- [x] Animations hoạt động
- [x] Đa ngôn ngữ (VI/EN)
- [x] TypeScript type checking
- [x] No console errors

## 🔄 Workflow

### Tạo kho mới
1. Click "Tạo kho mới"
2. Điền form (name, location, description)
3. Submit → Status = Pending
4. Chờ Admin phê duyệt

### Chỉnh sửa kho
1. Chỉ kho Active mới có nút Edit
2. Click Edit → Modal mở
3. Cập nhật thông tin
4. Submit → Cập nhật thành công

### Xóa kho
1. Chỉ kho Pending mới có nút Delete
2. Click Delete → Confirmation
3. Confirm → Xóa thành công

## 🎯 Next Steps

Khi có API thật:
1. Thay thế functions trong `lib/sellerWarehouse.ts`
2. Thêm error handling
3. Thêm loading states
4. Thêm pagination
5. Thêm real-time updates (WebSocket)
6. Thêm export/import features

## 📝 Notes

- Mock data có delay 300-800ms để simulate API
- Toast notifications sử dụng `react-toastify`
- Dropdown menu custom (không dùng Radix UI)
- Tất cả components đều có TypeScript types
- Animations sử dụng Framer Motion
- Responsive từ mobile đến desktop

---

**Created by:** Kiro AI Assistant
**Date:** November 26, 2024
**Status:** ✅ Ready for Production (with real API)
