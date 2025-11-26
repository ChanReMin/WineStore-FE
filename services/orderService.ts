// Mock Order Service
import type {
  Order,
  OrderDetail,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderListParams,
  OrderListResponse,
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "@/types/order";

// Mock data
const mockOrders: OrderDetail[] = [
  {
    id: 1,
    order_code: "ORD-20241122-0001",
    status: 3,
    status_text: "Đang giao hàng",
    payment_status: 1,
    payment_status_text: "Đã thanh toán",
    total_amount: 11880000,
    discount_amount: 1188000,
    final_amount: 10692000,
    created_at: "2024-11-20T10:30:00Z",
    paid_at: "2024-11-20T10:35:00Z",
    items_count: 2,
    note: "Giao hàng giờ hành chính",
    shipping_address: {
      full_name: "John Doe",
      phone_number: "0123456789",
      address_line: "123 Đường Lê Lợi, Quận 1",
      city: "TP. Hồ Chí Minh",
    },
    items: [
      {
        id: 1,
        product_id: 1,
        product_name: "Château Margaux 2015",
        product_image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
        quantity: 2,
        unit_price: 5940000,
        line_total: 11880000,
      },
    ],
    payment_method: {
      id: 1,
      name: "VNPay",
      code: "VNPAY",
    },
  },
  {
    id: 2,
    order_code: "ORD-20241118-0002",
    status: 4,
    status_text: "Đã giao hàng",
    payment_status: 1,
    payment_status_text: "Đã thanh toán",
    total_amount: 8500000,
    discount_amount: 850000,
    final_amount: 7650000,
    created_at: "2024-11-18T14:20:00Z",
    paid_at: "2024-11-18T14:25:00Z",
    items_count: 3,
    shipping_address: {
      full_name: "John Doe",
      phone_number: "0123456789",
      address_line: "456 Đường Nguyễn Huệ, Quận 1",
      city: "TP. Hồ Chí Minh",
    },
    items: [
      {
        id: 2,
        product_id: 2,
        product_name: "Penfolds Grange 2016",
        product_image:
          "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
        quantity: 1,
        unit_price: 4500000,
        line_total: 4500000,
      },
      {
        id: 3,
        product_id: 3,
        product_name: "Dom Pérignon 2010",
        product_image:
          "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
        quantity: 2,
        unit_price: 2000000,
        line_total: 4000000,
      },
    ],
    payment_method: {
      id: 1,
      name: "VNPay",
      code: "VNPAY",
    },
  },
  {
    id: 3,
    order_code: "ORD-20241115-0003",
    status: 1,
    status_text: "Chờ xác nhận",
    payment_status: 0,
    payment_status_text: "Chưa thanh toán",
    total_amount: 3200000,
    discount_amount: 0,
    final_amount: 3200000,
    created_at: "2024-11-15T09:15:00Z",
    items_count: 1,
    shipping_address: {
      full_name: "John Doe",
      phone_number: "0987654321",
      address_line: "789 Đường Trần Hưng Đạo, Quận 5",
      city: "TP. Hồ Chí Minh",
    },
    items: [
      {
        id: 4,
        product_id: 4,
        product_name: "Opus One 2018",
        product_image:
          "https://images.unsplash.com/photo-1566754436-d9e8c7e7e4e5?w=400",
        quantity: 1,
        unit_price: 3200000,
        line_total: 3200000,
      },
    ],
    payment_method: {
      id: 2,
      name: "COD",
      code: "COD",
    },
  },
  {
    id: 4,
    order_code: "ORD-20241110-0004",
    status: 5,
    status_text: "Đã hủy",
    payment_status: 2,
    payment_status_text: "Đã hoàn tiền",
    total_amount: 6400000,
    discount_amount: 640000,
    final_amount: 5760000,
    created_at: "2024-11-10T16:45:00Z",
    paid_at: "2024-11-10T16:50:00Z",
    items_count: 2,
    note: "Khách hàng yêu cầu hủy",
    shipping_address: {
      full_name: "John Doe",
      phone_number: "0123456789",
      address_line: "123 Đường Lê Lợi, Quận 1",
      city: "TP. Hồ Chí Minh",
    },
    items: [
      {
        id: 5,
        product_id: 5,
        product_name: "Screaming Eagle 2017",
        product_image:
          "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
        quantity: 2,
        unit_price: 3200000,
        line_total: 6400000,
      },
    ],
    payment_method: {
      id: 1,
      name: "VNPay",
      code: "VNPAY",
    },
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const orderService = {
  // Get order list
  async getOrders(params: OrderListParams = {}): Promise<OrderListResponse> {
    await delay(800);

    const { page = 1, limit = 20, status, from_date, to_date } = params;

    let filteredOrders = [...mockOrders];

    // Filter by status
    if (status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status
      );
    }

    // Filter by date range
    if (from_date) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.created_at) >= new Date(from_date)
      );
    }
    if (to_date) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.created_at) <= new Date(to_date)
      );
    }

    // Sort by created_at desc
    filteredOrders.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return {
      orders: paginatedOrders,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(filteredOrders.length / limit),
        total_items: filteredOrders.length,
      },
    };
  },

  // Get order detail
  async getOrderDetail(orderId: number): Promise<OrderDetail> {
    await delay(600);

    const order = mockOrders.find((o) => o.id === orderId);
    if (!order) {
      throw new Error("Không tìm thấy đơn hàng");
    }

    return order;
  },

  // Create order
  async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    await delay(1000);

    // Mock response
    return {
      order_id: mockOrders.length + 1,
      order_code: `ORD-${new Date().toISOString().split("T")[0].replace(/-/g, "")}-${String(mockOrders.length + 1).padStart(4, "0")}`,
      total_amount: 11880000,
      discount_amount: 1188000,
      final_amount: 10692000,
      status: 1,
      payment_status: 0,
      payment_url:
        data.payment_method_id === 1
          ? "https://payment.vnpay.vn/..."
          : undefined,
    };
  },

  // Cancel order
  async cancelOrder(orderId: number, reason: string): Promise<void> {
    await delay(800);

    const order = mockOrders.find((o) => o.id === orderId);
    if (!order) {
      throw new Error("Không tìm thấy đơn hàng");
    }

    // Check if order can be cancelled
    if (order.status >= 3) {
      throw new Error("Không thể hủy đơn hàng đang giao hoặc đã giao");
    }

    // Update order status
    order.status = 5;
    order.status_text = "Đã hủy";
    order.note = reason;
  },
};
