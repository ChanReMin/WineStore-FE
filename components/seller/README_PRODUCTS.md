# Product Management Components

Các component được tạo để quản lý sản phẩm cho Seller Dashboard.

## Components

### 1. ProductSummaryCards
Hiển thị tổng quan số liệu sản phẩm (tổng, chờ duyệt, đang bán, bị cấm).

**Props:**
- `summary`: Object chứa thống kê sản phẩm

### 2. ProductFilters
Bộ lọc và tìm kiếm sản phẩm.

**Props:**
- `searchQuery`: Từ khóa tìm kiếm
- `onSearchChange`: Callback khi thay đổi search
- `statusFilter`: Trạng thái đang lọc
- `onStatusChange`: Callback khi thay đổi filter
- `summary`: Thống kê để hiển thị số lượng

### 3. ProductsTable
Bảng hiển thị danh sách sản phẩm với các thao tác.

**Props:**
- `products`: Mảng sản phẩm cần hiển thị

**Features:**
- Hiển thị thông tin sản phẩm (ID, tên, giá, danh mục, tồn kho, trạng thái)
- Các nút thao tác: Xem chi tiết, Chỉnh sửa, Xóa
- Animation khi hover
- Empty state khi không có sản phẩm

### 4. ProductStatusBadge
Badge hiển thị trạng thái sản phẩm với màu sắc phù hợp.

**Props:**
- `status`: Mã trạng thái (1: Chờ duyệt, 2: Đang bán, 3: Bị cấm)
- `statusText`: Text hiển thị

### 5. ProductDetailModal
Modal hiển thị chi tiết đầy đủ của sản phẩm.

**Props:**
- `product`: Sản phẩm cần hiển thị
- `isOpen`: Trạng thái mở/đóng modal
- `onClose`: Callback khi đóng modal

**Features:**
- Hiển thị đầy đủ thông tin sản phẩm
- Timeline lịch sử (tạo, phê duyệt)
- Thông tin người phê duyệt
- Ghi chú theo trạng thái

### 6. ProductPagination
Component phân trang với thông tin chi tiết.

**Props:**
- `currentPage`: Trang hiện tại
- `totalPages`: Tổng số trang
- `totalItems`: Tổng số items
- `onPageChange`: Callback khi chuyển trang

### 7. ImageUpload
Component upload ảnh với drag & drop, compression và validation.

**Props:**
- `value`: Array base64 strings
- `onChange`: Callback khi thay đổi
- `maxFiles`: Số ảnh tối đa (default: 5)
- `maxSizeMB`: Dung lượng tối đa/ảnh (default: 5MB)
- `acceptedFormats`: Định dạng chấp nhận
- `enableCompression`: Bật tự động nén (default: true)

**Features:**
- Drag & Drop upload
- Multiple images support
- Auto compression (resize + quality)
- Preview grid với delete
- Validation format & size
- Loading state
- Error handling

## Color Scheme

Tuân theo theme của Wine Store:
- Primary: `#3b4417` (Olive green)
- Secondary: `#7a8451` (Light olive)
- Background: `#fdfbf5` (Cream)
- Border: `#d4d6b4` (Light olive border)
- Accent: `#f5f3e8` (Light cream)

## Status Colors

- **Pending (Chờ duyệt)**: Amber/Yellow
- **Active (Đang bán)**: Emerald/Green
- **Banned (Bị cấm)**: Red

## Usage Example

```tsx
import ProductSummaryCards from "@/components/seller/ProductSummaryCards";
import ProductFilters from "@/components/seller/ProductFilters";
import ProductsTable from "@/components/seller/ProductsTable";
import ProductPagination from "@/components/seller/ProductPagination";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      <ProductSummaryCards summary={summary} />
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        summary={summary}
      />
      <ProductsTable products={products} />
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

## Future Enhancements

- [ ] Tích hợp API thực tế
- [x] Form tạo/chỉnh sửa sản phẩm
- [x] Image upload với compression
- [x] Delete confirmation modal
- [ ] Bulk actions (xóa nhiều, export)
- [ ] Advanced filters (giá, danh mục, brand)
- [ ] Sort columns
- [ ] Image preview trong table
- [ ] Drag & drop để sắp xếp images
