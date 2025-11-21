export const mockOverview = {
  success: true,
  data: {
    total_orders: 186,
    total_revenue: 284500000,
    pending_orders: 12,
    completed_orders: 150,
    cancelled_orders: 24,
    low_stock_products: 7,
    out_of_stock_products: 3,
  },
};

export const mockRevenue = {
  success: true,
  data: {
    period: "daily",
    chart_data: [
      { date: "2024-01-20", revenue: 7200000, orders: 11 },
      { date: "2024-01-21", revenue: 6800000, orders: 10 },
      { date: "2024-01-22", revenue: 8200000, orders: 13 },
      { date: "2024-01-23", revenue: 7600000, orders: 12 },
      { date: "2024-01-24", revenue: 9400000, orders: 15 },
      { date: "2024-01-25", revenue: 8800000, orders: 14 },
      { date: "2024-01-26", revenue: 10200000, orders: 18 },
    ],
    total_revenue: 55800000,
    total_orders: 93,
  },
};

export const mockOrders = {
  success: true,
  data: {
    orders: [
      {
        id: 101,
        order_code: "ORD-20240126-0001",
        customer: { id: 1, name: "Nguyen Van A", email: "a.nguyen@example.com" },
        status: 1,
        status_text: "Pending Confirmation",
        payment_status: 1,
        final_amount: 5940000,
        created_at: "2024-01-26T14:12:00Z",
      },
      {
        id: 100,
        order_code: "ORD-20240126-0002",
        customer: { id: 2, name: "Tran Thi B", email: "tran.b@example.com" },
        status: 2,
        status_text: "Processing",
        payment_status: 1,
        final_amount: 10692000,
        created_at: "2024-01-26T13:40:00Z",
      },
      {
        id: 99,
        order_code: "ORD-20240126-0003",
        customer: { id: 3, name: "Pham Duc C", email: "pham.c@example.com" },
        status: 4,
        status_text: "Shipping",
        payment_status: 1,
        final_amount: 8200000,
        created_at: "2024-01-26T12:10:00Z",
      },
      {
        id: 98,
        order_code: "ORD-20240126-0004",
        customer: { id: 4, name: "Le Thi D", email: "le.d@example.com" },
        status: 5,
        status_text: "Completed",
        payment_status: 1,
        final_amount: 4200000,
        created_at: "2024-01-26T11:20:00Z",
      },
      {
        id: 97,
        order_code: "ORD-20240126-0005",
        customer: { id: 5, name: "Hoang Bao E", email: "bao.e@example.com" },
        status: 7,
        status_text: "Cancelled",
        payment_status: 0,
        final_amount: 0,
        created_at: "2024-01-26T10:55:00Z",
      },
    ],
    pagination: {
      current_page: 1,
      total_pages: 10,
    },
  },
};

export const mockInventory = {
  success: true,
  data: [
    {
      id: 1,
      warehouse: { id: 1, name: "Hanoi Warehouse", location: "Hanoi" },
      product: { id: 1, name: "Château Margaux 2015", price: 5940000 },
      quantity_on_hand: 4,
      safety_stock: 10,
      status: "low_stock",
      last_updated_at: "2024-01-26T10:00:00Z",
    },
    {
      id: 2,
      warehouse: { id: 1, name: "Hanoi Warehouse", location: "Hanoi" },
      product: { id: 2, name: "Moët & Chandon Brut Impérial", price: 1890000 },
      quantity_on_hand: 0,
      safety_stock: 5,
      status: "out_of_stock",
      last_updated_at: "2024-01-25T09:15:00Z",
    },
    {
      id: 3,
      warehouse: { id: 2, name: "Ho Chi Minh City Warehouse", location: "Ho Chi Minh City" },
      product: { id: 3, name: "Penfolds Bin 389 Cabernet Shiraz", price: 2490000 },
      quantity_on_hand: 3,
      safety_stock: 8,
      status: "low_stock",
      last_updated_at: "2024-01-25T12:30:00Z",
    },
  ],
};

