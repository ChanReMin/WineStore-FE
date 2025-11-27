export const mockOverview = {
  success: true,
  data: {
    totalOrders: 186,
    totalRevenue: 284500000,
    pending_orders: 12,
    completedOrders: 150,
    cancelledOrders: 24,
    lowStockProducts: 7,
    outOfStock_products: 3,
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
    totalRevenue: 55800000,
    totalOrders: 93,
  },
};

export const mockOrders = {
  success: true,
  data: {
    orders: [
      {
        id: 101,
        orderCode: "ORD-20240126-0001",
        customer: {
          id: 1,
          name: "Nguyen Van A",
          email: "a.nguyen@example.com",
        },
        status: 1,
        statusText: "Pending Confirmation",
        paymentStatus: 1,
        finalAmount: 5940000,
        createdAt: "2024-01-26T14:12:00Z",
      },
      {
        id: 100,
        orderCode: "ORD-20240126-0002",
        customer: { id: 2, name: "Tran Thi B", email: "tran.b@example.com" },
        status: 2,
        statusText: "Processing",
        paymentStatus: 1,
        finalAmount: 10692000,
        createdAt: "2024-01-26T13:40:00Z",
      },
      {
        id: 99,
        orderCode: "ORD-20240126-0003",
        customer: { id: 3, name: "Pham Duc C", email: "pham.c@example.com" },
        status: 4,
        statusText: "Shipping",
        paymentStatus: 1,
        finalAmount: 8200000,
        createdAt: "2024-01-26T12:10:00Z",
      },
      {
        id: 98,
        orderCode: "ORD-20240126-0004",
        customer: { id: 4, name: "Le Thi D", email: "le.d@example.com" },
        status: 5,
        statusText: "Completed",
        paymentStatus: 1,
        finalAmount: 4200000,
        createdAt: "2024-01-26T11:20:00Z",
      },
      {
        id: 97,
        orderCode: "ORD-20240126-0005",
        customer: { id: 5, name: "Hoang Bao E", email: "bao.e@example.com" },
        status: 7,
        statusText: "Cancelled",
        paymentStatus: 0,
        finalAmount: 0,
        createdAt: "2024-01-26T10:55:00Z",
      },
    ],
    pagination: {
      currentPage: 1,
      totalPages: 10,
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
      quantityOnHand: 4,
      safetyStock: 10,
      status: "lowStock",
      lastUpdatedAt: "2024-01-26T10:00:00Z",
    },
    {
      id: 2,
      warehouse: { id: 1, name: "Hanoi Warehouse", location: "Hanoi" },
      product: { id: 2, name: "Moët & Chandon Brut Impérial", price: 1890000 },
      quantityOnHand: 0,
      safetyStock: 5,
      status: "outOfStock",
      lastUpdatedAt: "2024-01-25T09:15:00Z",
    },
    {
      id: 3,
      warehouse: {
        id: 2,
        name: "Ho Chi Minh City Warehouse",
        location: "Ho Chi Minh City",
      },
      product: {
        id: 3,
        name: "Penfolds Bin 389 Cabernet Shiraz",
        price: 2490000,
      },
      quantityOnHand: 3,
      safetyStock: 8,
      status: "lowStock",
      lastUpdatedAt: "2024-01-25T12:30:00Z",
    },
  ],
};
