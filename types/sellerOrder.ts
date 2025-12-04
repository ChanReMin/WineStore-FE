// Seller Order Types from API

export interface SellerOrderCustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
}

export interface SellerOrder {
  id: number;
  order_code: string;
  customer: SellerOrderCustomer;
  status: number;
  status_text: string;
  payment_status: number;
  payment_status_text: string;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  items_count: number;
  created_at: string;
  time_remaining_to_confirm?: number;
}

export interface SellerOrdersResponse {
  success: boolean;
  message: string;
  data: {
    orders: SellerOrder[];
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
  };
}
