// Order types matching backend API

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderAddress {
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  state?: string;
  country: string;
}

export interface OrderPaymentMethod {
  id: number;
  name: string;
  code: string;
}

export interface OrderCoupon {
  code: string;
  discountType: number;
  discountValue: number;
  discountAmount: number;
}

export interface OrderShippingInfo {
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface OrderTimelineItem {
  status: number;
  statusText: string;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: number;
  orderCode: string;
  status: number;
  statusText: string;
  paymentStatus: number;
  paymentStatusText: string;
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  createdAt: string;
  paidAt?: string;
  confirmedAt?: string;
  shippedAt?: string;
  note?: string;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  paymentMethod: OrderPaymentMethod;
  coupon?: OrderCoupon;
  shippingInfo?: OrderShippingInfo;
  timeline: OrderTimelineItem[];
}

export interface OrderListItem {
  id: number;
  orderCode: string;
  status: number;
  statusText: string;
  paymentStatus: number;
  paymentStatusText: string;
  totalAmount: number;
  finalAmount: number;
  createdAt: string;
  itemCount: number;
}

export interface CreateOrderRequest {
  addressId: number;
  paymentMethodId: number;
  couponCode?: string | null;
  note?: string;
}

export interface CreateOrderResponse {
  orderId: number;
  orderCode: string;
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  status: number;
  statusText: string;
  paymentStatus: number;
  paymentStatusText: string;
  paymentUrl?: string;
  createdAt: string;
}

// Order status enums (matching backend)
export enum OrderStatus {
  PENDING = 1, // Pending Confirmation - đợi xác nhận thông tin
  CONFIRMED = 2, // Confirmed - đã xác nhận
  PAID = 3, // Paid - đã thanh toán
  CANCELLED = 6, // Cancelled - đã hủy
}

// Alias for backward compatibility
export const ORDER_STATUS = OrderStatus;

export enum PaymentStatus {
  UNPAID = 0,
  PAID = 1,
  REFUNDED = 2,
  FAILED = 3,
}

// Seller order types
export interface SellerOrderListItem {
  id: number;
  orderCode: string;
  status: number;
  statusText: string;
  paymentStatus: number;
  paymentStatusText: string;
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalAmount: number;
  createdAt: string;
  itemCount?: number;
  customer?: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface SellerOrdersResponse {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
  };
  orders: SellerOrderListItem[];
}

// Re-export OrderDetail type alias
export type OrderDetail = Order;
