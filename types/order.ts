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
  paymentMethod?: OrderPaymentMethod;
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
export interface SellerOrderCustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
}

export interface SellerOrderListItem {
  id: number;
  customer: SellerOrderCustomer;
  status: number;
  order_code: string;
  status_text: string;
  payment_status: number;
  payment_status_text: string;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  items_count: number;
  created_at: string;
  time_remaining_to_confirm: number;
}

export interface SellerOrdersResponse {
  orders: SellerOrderListItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
  };
  summary: {
    pending: number;
    confirmed: number;
    paid: number;
    cancelled: number;
  };
}

// Seller order detail types
export interface SellerOrderItemDetail {
  id: number;
  productId: number;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  costPrice: number;
  lineTotal: number;
  profit: number;
  warehouseId: number;
}

export interface SellerOrderDetail {
  id: number;
  customer: SellerOrderCustomer;
  status: number;
  items: SellerOrderItemDetail[];
  note: string;
  order_code: string;
  status_text: string;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  total_profit: number;
  shipping_address: OrderAddress;
  internal_note: string;
}

// Re-export OrderDetail type alias
export type OrderDetail = Order;
