import api from "@/lib/axios";
import { handleApiError } from "@/lib/errorHandler";

export interface CreateOrderRequest {
  shippingAddressId: number;
  paymentMethodId: number;
  couponCode?: string;
  note?: string;
}

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

export interface OrderDetail {
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

const orderService = {
  // Create new order
  createOrder: async (
    data: CreateOrderRequest
  ): Promise<CreateOrderResponse> => {
    try {
      const response = await api.post("api/v1/orders", data);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get order detail
  getOrderDetail: async (orderId: number): Promise<OrderDetail> => {
    try {
      const response = await api.get(`api/v1/orders/${orderId}`);
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Get user orders list
  getOrders: async (params?: {
    page?: number;
    limit?: number;
    status?: number;
  }): Promise<{
    orders: OrderListItem[];
    pagination: {
      totalPages: number;
      totalItems: number;
      currentPage: number;
    };
  }> => {
    try {
      const response = await api.get("api/v1/orders", { params });
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Cancel order
  cancelOrder: async (orderId: number, reason?: string): Promise<void> => {
    try {
      await api.post(`api/v1/orders/${orderId}/cancel`, { reason });
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Seller APIs
  seller: {
    // Get seller orders with filters
    getOrders: async (params?: {
      page?: number;
      limit?: number;
      status?: number;
      paymentStatus?: number;
      fromDate?: string;
      toDate?: string;
      search?: string;
    }): Promise<{
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        perPage: number;
      };
      orders: any[];
    }> => {
      try {
        const response = await api.get("api/v1/orders", { params });
        return response.data.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    // Get seller order detail
    getOrderDetail: async (orderId: number): Promise<OrderDetail> => {
      try {
        const response = await api.get(`api/v1/orders/${orderId}`);
        return response.data.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },

    // Update order status
    updateOrderStatus: async (
      orderId: number,
      status: number,
      note?: string
    ): Promise<void> => {
      try {
        await api.put(`api/v1/orders/${orderId}/status`, { status, note });
      } catch (error) {
        throw handleApiError(error);
      }
    },
  },
};

export default orderService;
export { orderService };
