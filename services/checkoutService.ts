// Checkout Service - Real API Implementation
import { axiosInstance } from "@/lib/axios";
import type { ApiResponse } from "@/types/cart";

export interface CheckoutRequest {
  shippingAddressId: number;
  paymentMethodId: number;
  note?: string;
}

export interface CheckoutResponse {
  order_id: number;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
}

export const checkoutService = {
  /**
   * Create order from cart
   * POST /api/v1/checkout
   */
  async createOrder(data: CheckoutRequest): Promise<CheckoutResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<CheckoutResponse>>(
        "/api/v1/checkout",
        data
      );
      return response.data.data;
    } catch (error: any) {
      console.error("Checkout error:", error);
      const message = error.response?.data?.message || "Không thể tạo đơn hàng";
      throw new Error(message);
    }
  },
};
