// Mock Order Service
import type {
  Order,
  OrderDetail,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderListParams,
  OrderListResponse,
  ORDER_STATUS,
  paymentStatus,
} from "@/types/order";

// Mock data
const mockOrders: OrderDetail[] = [
  {
    id: 1,
    orderCode: "ORD-20241122-0001",
    status: 3,
    statusText: "Đang giao hàng",
    paymentStatus: 1,
    paymentstatusText: "Đã thanh toán",
    totalAmount: 11880000,
    discountAmount: 1188000,
    finalAmount: 10692000,
    createdAt: "2024-11-20T10:30:00Z",
    paid_at: "2024-11-20T10:35:00Z",
    items_count: 2,
    note: "Giao hàng giờ hành chính",
    shippingAddress: {
      fullName: "John Doe",
      phoneNumber: "0123456789",
      addressLine: "123 Đường Lê Lợi, Quận 1",
      city: "TP. Hồ Chí Minh",
    },
    items: [
      {
        id: 1,
        productId: 1,
        productName: "Château Margaux 2015",
        productImage:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
        quantity: 2,
        unitPrice: 5940000,
        lineTotal: 11880000,
      },
    ],
    paymentMethod: {
      id: 1,
      name: "VNPay",
      code: "VNPAY",
    },
  },
  {
    id: 2,
    orderCode: "ORD-20241118-0002",
    status: 4,
    statusText: "Đã giao hàng",
    paymentStatus: 1,
    paymentstatusText: "Đã thanh toán",
    totalAmount: 8500000,
    discountAmount: 850000,
    finalAmount: 7650000,
    createdAt: "2024-11-18T14:20:00Z",
    paid_at: "2024-11-18T14:25:00Z",
    items_count: 3,
    shippingAddress: {
      fullName: "John Doe",
      phoneNumber: "0123456789",
      addressLine: "456 Đường Nguyễn Huệ, Quận 1",
      city: "TP. Hồ Chí Minh",
    },
    items: [
      {
        id: 2,
        productId: 2,
        productName: "Penfolds Grange 2016",
        productImage:
          "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
        quantity: 1,
        unitPrice: 4500000,
        lineTotal: 4500000,
      },
      {
        id: 3,
        productId: 3,
        productName: "Dom Pérignon 2010",
        productImage:
          "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
        quantity: 2,
        unitPrice: 2000000,
        lineTotal: 4000000,
      },
    ],
    paymentMethod: {
      id: 1,
      name: "VNPay",
      code: "VNPAY",
    },
  },
  {
    id: 3,
    orderCode: "ORD-20241115-0003",
    status: 1,
    statusText: "Chờ xác nhận",
    paymentStatus: 0,
    paymentstatusText: "Chưa thanh toán",
    totalAmount: 3200000,
    discountAmount: 0,
    finalAmount: 3200000,
    createdAt: "2024-11-15T09:15:00Z",
    items_count: 1,
    shippingAddress: {
      fullName: "John Doe",
      phoneNumber: "0987654321",
      addressLine: "789 Đường Trần Hưng Đạo, Quận 5",
      city: "TP. Hồ Chí Minh",
    },
    items: [
      {
        id: 4,
        productId: 4,
        productName: "Opus One 2018",
        productImage:
          "https://images.unsplash.com/photo-1566754436-d9e8c7e7e4e5?w=400",
        quantity: 1,
        unitPrice: 3200000,
        lineTotal: 3200000,
      },
    ],
    paymentMethod: {
      id: 2,
      name: "COD",
      code: "COD",
    },
  },
  {
    id: 4,
    orderCode: "ORD-20241110-0004",
    status: 5,
    statusText: "Đã hủy",
    paymentStatus: 2,
    paymentstatusText: "Đã hoàn tiền",
    totalAmount: 6400000,
    discountAmount: 640000,
    finalAmount: 5760000,
    createdAt: "2024-11-10T16:45:00Z",
    paid_at: "2024-11-10T16:50:00Z",
    items_count: 2,
    note: "Khách hàng yêu cầu hủy",
    shippingAddress: {
      fullName: "John Doe",
      phoneNumber: "0123456789",
      addressLine: "123 Đường Lê Lợi, Quận 1",
      city: "TP. Hồ Chí Minh",
    },
    items: [
      {
        id: 5,
        productId: 5,
        productName: "Screaming Eagle 2017",
        productImage:
          "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
        quantity: 2,
        unitPrice: 3200000,
        lineTotal: 6400000,
      },
    ],
    paymentMethod: {
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
        (order) => new Date(order.createdAt) >= new Date(from_date)
      );
    }
    if (to_date) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.createdAt) <= new Date(to_date)
      );
    }

    // Sort by createdAt desc
    filteredOrders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return {
      orders: paginatedOrders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredOrders.length / limit),
        totalItems: filteredOrders.length,
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
      orderCode: `ORD-${new Date().toISOString().split("T")[0].replace(/-/g, "")}-${String(mockOrders.length + 1).padStart(4, "0")}`,
      totalAmount: 11880000,
      discountAmount: 1188000,
      finalAmount: 10692000,
      status: 1,
      paymentStatus: 0,
      payment_url:
        data.paymentMethod_id === 1
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
    order.statusText = "Đã hủy";
    order.note = reason;
  },
};
