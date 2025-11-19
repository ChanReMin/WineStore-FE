// types/order.ts
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  order_code: string;
  customer: Customer;
  status: number;
  status_text: string;
  payment_status: number;
  payment_method?: string;
  final_amount: number;
  shipping_fee?: number;
  discount_amount?: number;
  subtotal?: number;
  created_at: string;
  updated_at?: string;
  shipping_address?: ShippingAddress;
  items?: OrderItem[];
  note?: string;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
}

export interface OrderResponse {
  success: boolean;
  data: {
    orders: Order[];
    pagination: Pagination;
  };
}

export interface OrderStatusUpdate {
  status: number;
  note?: string;
}

// Order Status
export enum OrderStatus {
  PENDING = 1, // Chờ xác nhận
  PROCESSING = 2, // Đang xử lý
  SHIPPING = 3, // Đang giao
  COMPLETED = 4, // Hoàn thành
  CANCELLED = 5, // Đã hủy
}

// Payment Status
export enum PaymentStatus {
  PENDING = 1, // Chờ thanh toán
  PAID = 2, // Đã thanh toán
  COMPLETED = 3, // Hoàn thành
  REFUNDED = 4, // Đã hoàn tiền
}
