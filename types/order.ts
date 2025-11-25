// Order Types
export interface Order {
  id: number;
  order_code: string;
  status: number;
  status_text: string;
  payment_status: number;
  payment_status_text: string;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  created_at: string;
  items_count: number;
  paid_at?: string;
  note?: string;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface ShippingAddress {
  full_name: string;
  phone_number: string;
  address_line: string;
  city: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  code: string;
}

export interface OrderDetail extends Order {
  shipping_address: ShippingAddress;
  items: OrderItem[];
  payment_method: PaymentMethod;
}

export interface CreateOrderRequest {
  shipping_address_id: number;
  payment_method_id: number;
  promotion_code?: string;
  note?: string;
}

export interface CreateOrderResponse {
  order_id: number;
  order_code: string;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  status: number;
  payment_status: number;
  payment_url?: string;
}

export interface OrderListParams {
  page?: number;
  limit?: number;
  status?: number;
  from_date?: string;
  to_date?: string;
}

export interface OrderListResponse {
  orders: Order[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
  };
}

// Order Status Constants
export const ORDER_STATUS = {
  PENDING: 1,
  PROCESSING: 2,
  SHIPPING: 3,
  DELIVERED: 4,
  CANCELLED: 5,
} as const;

export const ORDER_STATUS_TEXT: Record<number, string> = {
  1: "Chờ xác nhận",
  2: "Đang xử lý",
  3: "Đang giao hàng",
  4: "Đã giao hàng",
  5: "Đã hủy",
};

export const PAYMENT_STATUS = {
  UNPAID: 0,
  PAID: 1,
  REFUNDED: 2,
} as const;

export const PAYMENT_STATUS_TEXT: Record<number, string> = {
  0: "Chưa thanh toán",
  1: "Đã thanh toán",
  2: "Đã hoàn tiền",
};
