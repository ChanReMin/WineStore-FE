# 📜 Custom Scrollbar - Wine Store

## 🎨 Tổng Quan

Custom scrollbar đã được thiết kế phù hợp với theme sang trọng của Wine Store, sử dụng màu sắc từ homepage và tạo trải nghiệm người dùng mượt mà.

---

## 🎯 Các Loại Scrollbar

### 1. **Default Scrollbar** (Toàn trang)
- **Track**: Màu kem nhạt `#fdfbf5` với border tinh tế
- **Thumb**: Gradient xanh olive `#3b4417` → `#4c5b23` → `#3b4417`
- **Hover**: Tối hơn với shadow effect
- **Active**: Màu đậm nhất `#2a2f18`

**Đặc điểm**:
- Width: 12px
- Border radius: 6px
- Border: 2px solid để tạo khoảng cách
- Smooth transition 0.3s

### 2. **Dark Section Scrollbar**
Áp dụng cho các section có background `#120906` (như homepage hero)

- **Track**: Nền tối `#120906`
- **Thumb**: Gradient màu kem sáng `#f6f3ea` → `#e5ddc7` → `#f6f3ea`
- **Hover**: Trắng sáng với glow effect

**Cách sử dụng**:
```tsx
<div className="dark-section bg-[#120906]">
  {/* Content */}
</div>
```

### 3. **Seller Dashboard Scrollbar**
Dành riêng cho seller layout

- **Track**: `#fafafa` (neutral-50)
- **Thumb**: Màu chính seller `#33391d`
- **Hover**: Tối hơn với shadow

**Cách sử dụng**:
```tsx
<div className="seller-layout">
  {/* Seller content */}
</div>
```

### 4. **Modal & Dropdown Scrollbar**
Scrollbar nhỏ gọn cho modals và dropdowns

- **Width**: 8px (nhỏ hơn)
- **Track**: Trong suốt với opacity thấp
- **Thumb**: Semi-transparent olive
- **Border radius**: 4px

**Cách sử dụng**:
```tsx
<div className="modal-content overflow-y-auto">
  {/* Modal content */}
</div>

<div className="dropdown-content overflow-y-auto">
  {/* Dropdown items */}
</div>
```

---

## 🔧 Đã Áp Dụng Ở Đâu?

### ✅ Homepage (`app/page.tsx`)
- Class `dark-section` đã được thêm
- Scrollbar màu sáng trên nền tối

### ✅ Seller Layout (`app/seller/layout.tsx`)
- Class `seller-layout` đã được thêm
- Scrollbar theme seller

### ✅ Auth Modal (`components/auth/AuthModal.tsx`)
- Class `modal-content` đã được thêm
- Scrollbar nhỏ gọn cho form

### ✅ Seller Sidebar (`components/seller/SellerSidebar.tsx`)
- Class `dropdown-content` cho menu navigation
- Scrollbar mỏng cho danh sách dài

### ✅ Seller Header (`components/seller/SellerHeader.tsx`)
- Class `dropdown-content` cho notifications và user menu
- Scrollbar nhỏ gọn

---

## 🎨 Màu Sắc Chi Tiết

### Light Theme (Default)
```css
Track: #fdfbf5 (Kem nhạt)
Border: #e8e6dc (Xám kem)
Thumb: #3b4417 → #4c5b23 → #3b4417 (Gradient olive)
Hover: #2a2f18 → #3b4417 → #2a2f18 (Tối hơn)
Active: #2a2f18 (Đậm nhất)
```

### Dark Theme (Dark Sections)
```css
Track: #120906 (Nâu đen)
Border: #2a2418 (Nâu tối)
Thumb: #f6f3ea → #e5ddc7 → #f6f3ea (Gradient kem)
Hover: #ffffff → #f6f3ea → #ffffff (Trắng sáng)
```

### Seller Theme
```css
Track: #fafafa (Neutral 50)
Border: #e5e5e5 (Neutral 200)
Thumb: #33391d (Olive đậm)
Hover: #2a2f18 (Tối hơn)
```

### Modal/Dropdown Theme
```css
Track: rgba(0, 0, 0, 0.03) (Trong suốt)
Thumb: rgba(59, 68, 23, 0.4) (Semi-transparent olive)
Hover: rgba(59, 68, 23, 0.6) (Đậm hơn)
```

---

## 🌐 Browser Support

### Webkit Browsers (Chrome, Safari, Edge)
✅ Full support với `::-webkit-scrollbar` pseudo-elements

### Firefox
✅ Support với `scrollbar-width` và `scrollbar-color`
```css
scrollbar-width: thin;
scrollbar-color: #3b4417 #fdfbf5;
```

### Mobile Browsers
⚠️ Scrollbar thường ẩn trên mobile, chỉ hiện khi scroll

---

## 🎯 Best Practices

### 1. Khi nào dùng class nào?

**`dark-section`**: 
- Sections có background tối (`#120906`, đen, nâu đậm)
- Hero sections, footer

**`seller-layout`**:
- Toàn bộ seller dashboard
- Admin panels

**`modal-content`**:
- Modals, dialogs
- Popups có scroll

**`dropdown-content`**:
- Dropdown menus
- Select options
- Navigation menus
- Notification lists

### 2. Accessibility

✅ **Smooth scrolling** được bật mặc định
✅ **Respect user preferences**: Tắt smooth scroll nếu user prefer reduced motion
✅ **Contrast ratio**: Đảm bảo thumb dễ nhìn thấy trên track

### 3. Performance

✅ **Hardware acceleration**: Sử dụng `transform` thay vì `top/left`
✅ **Transition**: Chỉ 0.3s cho smooth nhưng không lag
✅ **Border trick**: Dùng border thay vì margin để tránh reflow

---

## 🔄 Smooth Scrolling

Smooth scrolling đã được bật cho toàn bộ trang:

```css
html {
  scroll-behavior: smooth;
}
```

**Lưu ý**: Tự động tắt nếu user có setting `prefers-reduced-motion: reduce`

---

## 🎨 Customization

### Thay đổi màu scrollbar

Để thay đổi màu, edit trong `app/globals.css`:

```css
/* Thay đổi màu thumb */
::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    #YOUR_COLOR_1 0%,
    #YOUR_COLOR_2 50%,
    #YOUR_COLOR_1 100%
  );
}

/* Thay đổi màu track */
::-webkit-scrollbar-track {
  background: #YOUR_BACKGROUND_COLOR;
}
```

### Thay đổi kích thước

```css
::-webkit-scrollbar {
  width: 10px; /* Thay đổi độ rộng */
  height: 10px; /* Thay đổi chiều cao (horizontal scroll) */
}
```

### Thêm effects

```css
/* Thêm shadow */
::-webkit-scrollbar-thumb:hover {
  box-shadow: 0 0 12px rgba(59, 68, 23, 0.5);
}

/* Thêm animation */
::-webkit-scrollbar-thumb {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 📱 Testing

### Desktop
1. Mở trang trong Chrome/Edge/Safari
2. Scroll để xem scrollbar
3. Hover để xem effect
4. Click và kéo để test active state

### Firefox
1. Mở trang trong Firefox
2. Scrollbar sẽ mỏng hơn (thin)
3. Màu sắc vẫn giữ nguyên

### Mobile
1. Scrollbar thường ẩn
2. Chỉ hiện khi đang scroll
3. Tự động ẩn sau vài giây

---

## 🐛 Troubleshooting

### Scrollbar không hiển thị?
- Kiểm tra element có `overflow-y-auto` hoặc `overflow-y-scroll`
- Kiểm tra content có đủ dài để scroll không

### Màu không đúng?
- Kiểm tra class đã được thêm đúng chưa
- Kiểm tra CSS specificity (có thể cần `!important`)

### Scrollbar quá to/nhỏ?
- Điều chỉnh `width` trong `::-webkit-scrollbar`
- Điều chỉnh `border` để thay đổi kích thước thumb

### Firefox không hoạt động?
- Kiểm tra `scrollbar-width` và `scrollbar-color` đã được set
- Firefox chỉ support basic styling

---

## 📚 Resources

- [MDN: CSS Scrollbars](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scrollbars)
- [Webkit Scrollbar Styling](https://webkit.org/blog/363/styling-scrollbars/)
- [Can I Use: Scrollbar Styling](https://caniuse.com/css-scrollbar)

---

**Ngày tạo**: 19/11/2025  
**Phiên bản**: 1.0  
**Dự án**: Wine Store Frontend
