// Order Types
export interface Order {
  id: number;
  orderCode: string;
  status: number;
  statusText: string;
  paymentStatus: number;
  paymentstatusText: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  createdAt: string;
  items_count: number;
  paid_at?: string;
  note?: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  code: string;
}

export interface OrderDetail extends Order {
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
}

export interface CreateOrderRequest {
  shippingAddressId: number;
  paymentMethodId: number;
  promotionCode?: string;
  note?: string;
}

export interface CreateOrderResponse {
  order_id: number;
  orderCode: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: number;
  paymentStatus: number;
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
    currentPage: number;
    totalPages: number;
    totalItems: number;
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

export const ORDER_statusText: Record<number, string> = {
  1: "Chờ xác nhận",
  2: "Đang xử lý",
  3: "Đang giao hàng",
  4: "Đã giao hàng",
  5: "Đã hủy",
};

export const paymentStatus = {
  UNPAID: 0,
  PAID: 1,
  REFUNDED: 2,
} as const;

export const paymentstatusText: Record<number, string> = {
  0: "Chưa thanh toán",
  1: "Đã thanh toán",
  2: "Đã hoàn tiền",
};
