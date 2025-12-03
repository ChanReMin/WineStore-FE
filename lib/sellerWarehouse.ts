// Mock data service for Seller Warehouse Management

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  description: string;
  status: 0 | 1 | 2; // 0=pending, 1=active, 2=banned
  manager_id?: number;
  createdAt: string;
  updatedAt: string;
  inventorySummary?: {
    totalProducts: number;
    totalQuantity: number;
    totalValue: number;
    lowStockProducts: number;
    outOfStockProducts: number;
  };
}

export interface WarehouseStatistics {
  totalWarehouses: number;
  active_warehouses: number;
  pending_warehouses: number;
  banned_warehouses: number;
  totalInventory_value: number;
  totalProducts: number;
  totalquantity: number;
  warehouses_byStatus: Array<{
    status: number;
    count: number;
    label: string;
  }>;
}

export interface WarehouseDetail extends Warehouse {
  inventory: {
    totalProducts: number;
    totalQuantity: number;
    totalValue: number;
    lowStockProducts: number;
    outOfStockProducts: number;
  };
  recentLogs: Array<{
    id: number;
    type: "IN" | "OUT";
    productName: string;
    quantity: number;
    createdAt: string;
  }>;
}

// Mock warehouses data
export const mockWarehouses: Warehouse[] = [
  {
    id: 1,
    name: "Kho rượu vang Tân Bình",
    location: "456 Hoàng Văn Thụ, Tân Bình, TP.HCM",
    description: "Kho tổng chuyên rượu vang cao cấp",
    status: 1,
    manager_id: 5,
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-20T08:00:00Z",
    inventorySummary: {
      totalProducts: 150,
      totalQuantity: 5000,
      totalValue: 2500000000,
      lowStockProducts: 12,
      outOfStockProducts: 0,
    },
  },
  {
    id: 2,
    name: "Kho rượu vang Quận 1",
    location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    description: "Kho chuyên rượu vang nhập khẩu Pháp, Italy",
    status: 1,
    manager_id: 5,
    createdAt: "2024-11-10T14:30:00Z",
    updatedAt: "2024-11-25T16:00:00Z",
    inventorySummary: {
      totalProducts: 85,
      totalQuantity: 2800,
      totalValue: 1800000000,
      lowStockProducts: 8,
      outOfStockProducts: 0,
    },
  },
  {
    id: 3,
    name: "Kho rượu vang Thủ Đức",
    location: "789 Võ Văn Ngân, Thủ Đức, TP.HCM",
    description: "Kho phân phối khu vực Đông Sài Gòn",
    status: 0,
    manager_id: 5,
    createdAt: "2024-11-26T10:30:00Z",
    updatedAt: "2024-11-26T10:30:00Z",
    inventorySummary: {
      totalProducts: 0,
      totalQuantity: 0,
      totalValue: 0,
      lowStockProducts: 0,
      outOfStockProducts: 0,
    },
  },
  {
    id: 4,
    name: "Kho rượu vang Bình Thạnh",
    location: "321 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP.HCM",
    description: "Kho dự trữ rượu vang Úc và New Zealand",
    status: 1,
    manager_id: 5,
    createdAt: "2024-10-05T09:00:00Z",
    updatedAt: "2024-11-22T11:30:00Z",
    inventorySummary: {
      totalProducts: 120,
      totalQuantity: 3500,
      totalValue: 1500000000,
      lowStockProducts: 5,
      outOfStockProducts: 0,
    },
  },
  {
    id: 5,
    name: "Kho rượu vang Phú Nhuận",
    location: "555 Phan Xích Long, Phú Nhuận, TP.HCM",
    description: "Kho nhỏ phục vụ khu vực trung tâm",
    status: 2,
    manager_id: 5,
    createdAt: "2024-09-20T08:00:00Z",
    updatedAt: "2024-11-01T10:00:00Z",
    inventorySummary: {
      totalProducts: 45,
      totalQuantity: 800,
      totalValue: 400000000,
      lowStockProducts: 3,
      outOfStockProducts: 0,
    },
  },
];

// Mock statistics
export const mockWarehouseStatistics: WarehouseStatistics = {
  totalWarehouses: 5,
  active_warehouses: 3,
  pending_warehouses: 1,
  banned_warehouses: 1,
  totalInventory_value: 5000000000,
  totalProducts: 400,
  totalquantity: 12100,
  warehouses_byStatus: [
    { status: 1, count: 3, label: "Đang hoạt động" },
    { status: 0, count: 1, label: "Chờ duyệt" },
    { status: 2, count: 1, label: "Bị khóa" },
  ],
};

// Mock warehouse detail
export const mockWarehouseDetails: Record<number, WarehouseDetail> = {
  1: {
    ...mockWarehouses[0],
    inventory: {
      totalProducts: 150,
      totalQuantity: 5000,
      totalValue: 2500000000,
      lowStockProducts: 12,
      outOfStockProducts: 0,
    },
    recentLogs: [
      {
        id: 1001,
        type: "IN",
        productName: "Rượu vang đỏ Bordeaux 2020",
        quantity: 50,
        createdAt: "2024-11-25T14:00:00Z",
      },
      {
        id: 1002,
        type: "OUT",
        productName: "Rượu vang trắng Chardonnay",
        quantity: -20,
        createdAt: "2024-11-25T16:30:00Z",
      },
      {
        id: 1003,
        type: "IN",
        productName: "Champagne Moët & Chandon",
        quantity: 30,
        createdAt: "2024-11-24T10:15:00Z",
      },
      {
        id: 1004,
        type: "OUT",
        productName: "Rượu vang đỏ Cabernet Sauvignon",
        quantity: -15,
        createdAt: "2024-11-24T13:45:00Z",
      },
    ],
  },
  2: {
    ...mockWarehouses[1],
    inventory: {
      totalProducts: 85,
      totalQuantity: 2800,
      totalValue: 1800000000,
      lowStockProducts: 8,
      outOfStockProducts: 0,
    },
    recentLogs: [
      {
        id: 2001,
        type: "IN",
        productName: "Rượu vang Pháp Châteauneuf-du-Pape",
        quantity: 40,
        createdAt: "2024-11-26T09:00:00Z",
      },
      {
        id: 2002,
        type: "OUT",
        productName: "Rượu vang Italy Barolo",
        quantity: -25,
        createdAt: "2024-11-25T15:20:00Z",
      },
    ],
  },
};

// Service functions
export const getWarehouses = async (params?: {
  status?: number;
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{
  success: boolean;
  data: {
    warehouses: Warehouse[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      perPage: number;
      has_next: boolean;
      has_prev: boolean;
    };
    summary: {
      totalWarehouses: number;
      active: number;
      pending: number;
      banned: number;
    };
  };
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...mockWarehouses];

  // Filter by status
  if (params?.status !== undefined) {
    filtered = filtered.filter((w) => w.status === params.status);
  }

  // Filter by search
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      (w) =>
        w.name.toLowerCase().includes(searchLower) ||
        w.location.toLowerCase().includes(searchLower)
    );
  }

  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    success: true,
    data: {
      warehouses: paginated,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filtered.length / limit),
        totalItems: filtered.length,
        perPage: limit,
        has_next: end < filtered.length,
        has_prev: page > 1,
      },
      summary: {
        totalWarehouses: mockWarehouses.length,
        active: mockWarehouses.filter((w) => w.status === 1).length,
        pending: mockWarehouses.filter((w) => w.status === 0).length,
        banned: mockWarehouses.filter((w) => w.status === 2).length,
      },
    },
  };
};

export const getWarehouseDetail = async (
  id: number
): Promise<{ success: boolean; data: WarehouseDetail }> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const detail = mockWarehouseDetails[id];
  if (!detail) {
    throw new Error("Warehouse not found");
  }

  return {
    success: true,
    data: detail,
  };
};

export const getWarehouseStatistics = async (): Promise<{
  success: boolean;
  data: WarehouseStatistics;
}> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    success: true,
    data: mockWarehouseStatistics,
  };
};

export const createWarehouse = async (data: {
  name: string;
  location: string;
  description: string;
}): Promise<{ success: boolean; message: string; data: Warehouse }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newWarehouse: Warehouse = {
    id: mockWarehouses.length + 1,
    ...data,
    status: 0,
    manager_id: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    inventorySummary: {
      totalProducts: 0,
      totalQuantity: 0,
      totalValue: 0,
      lowStockProducts: 0,
      outOfStockProducts: 0,
    },
  };

  mockWarehouses.push(newWarehouse);

  return {
    success: true,
    message: "Yêu cầu tạo kho đã được gửi, chờ admin phê duyệt",
    data: newWarehouse,
  };
};

export const updateWarehouse = async (
  id: number,
  data: {
    name: string;
    location: string;
    description: string;
  }
): Promise<{ success: boolean; message: string; data: Warehouse }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const warehouse = mockWarehouses.find((w) => w.id === id);
  if (!warehouse) {
    throw new Error("Warehouse not found");
  }

  if (warehouse.status !== 1) {
    throw new Error("Chỉ có thể cập nhật kho đang hoạt động");
  }

  Object.assign(warehouse, {
    ...data,
    updatedAt: new Date().toISOString(),
  });

  return {
    success: true,
    message: "Cập nhật kho thành công",
    data: warehouse,
  };
};

export const deleteWarehouse = async (
  id: number
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const warehouse = mockWarehouses.find((w) => w.id === id);
  if (!warehouse) {
    throw new Error("Warehouse not found");
  }

  if (warehouse.status !== 0) {
    throw new Error("Chỉ có thể xóa kho đang chờ duyệt");
  }

  const index = mockWarehouses.findIndex((w) => w.id === id);
  mockWarehouses.splice(index, 1);

  return {
    success: true,
    message: "Đã xóa yêu cầu tạo kho",
  };
};
