// Mock data service for Seller Warehouse Management

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  description: string;
  status: 0 | 1 | 2; // 0=pending, 1=active, 2=banned
  manager_id: number;
  created_at: string;
  updated_at: string;
  inventory_summary?: {
    total_products: number;
    total_quantity: number;
  };
}

export interface WarehouseStatistics {
  total_warehouses: number;
  active_warehouses: number;
  pending_warehouses: number;
  banned_warehouses: number;
  total_inventory_value: number;
  total_products: number;
  total_quantity: number;
  warehouses_by_status: Array<{
    status: number;
    count: number;
    label: string;
  }>;
}

export interface WarehouseDetail extends Warehouse {
  inventory: {
    total_products: number;
    total_quantity: number;
    total_value: number;
    low_stock_products: number;
  };
  recent_logs: Array<{
    id: number;
    type: "IN" | "OUT";
    product_name: string;
    quantity: number;
    created_at: string;
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
    created_at: "2024-11-15T10:00:00Z",
    updated_at: "2024-11-20T08:00:00Z",
    inventory_summary: {
      total_products: 150,
      total_quantity: 5000,
    },
  },
  {
    id: 2,
    name: "Kho rượu vang Quận 1",
    location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    description: "Kho chuyên rượu vang nhập khẩu Pháp, Italy",
    status: 1,
    manager_id: 5,
    created_at: "2024-11-10T14:30:00Z",
    updated_at: "2024-11-25T16:00:00Z",
    inventory_summary: {
      total_products: 85,
      total_quantity: 2800,
    },
  },
  {
    id: 3,
    name: "Kho rượu vang Thủ Đức",
    location: "789 Võ Văn Ngân, Thủ Đức, TP.HCM",
    description: "Kho phân phối khu vực Đông Sài Gòn",
    status: 0,
    manager_id: 5,
    created_at: "2024-11-26T10:30:00Z",
    updated_at: "2024-11-26T10:30:00Z",
    inventory_summary: {
      total_products: 0,
      total_quantity: 0,
    },
  },
  {
    id: 4,
    name: "Kho rượu vang Bình Thạnh",
    location: "321 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP.HCM",
    description: "Kho dự trữ rượu vang Úc và New Zealand",
    status: 1,
    manager_id: 5,
    created_at: "2024-10-05T09:00:00Z",
    updated_at: "2024-11-22T11:30:00Z",
    inventory_summary: {
      total_products: 120,
      total_quantity: 3500,
    },
  },
  {
    id: 5,
    name: "Kho rượu vang Phú Nhuận",
    location: "555 Phan Xích Long, Phú Nhuận, TP.HCM",
    description: "Kho nhỏ phục vụ khu vực trung tâm",
    status: 2,
    manager_id: 5,
    created_at: "2024-09-20T08:00:00Z",
    updated_at: "2024-11-01T10:00:00Z",
    inventory_summary: {
      total_products: 45,
      total_quantity: 800,
    },
  },
];

// Mock statistics
export const mockWarehouseStatistics: WarehouseStatistics = {
  total_warehouses: 5,
  active_warehouses: 3,
  pending_warehouses: 1,
  banned_warehouses: 1,
  total_inventory_value: 5000000000,
  total_products: 400,
  total_quantity: 12100,
  warehouses_by_status: [
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
      total_products: 150,
      total_quantity: 5000,
      total_value: 2500000000,
      low_stock_products: 12,
    },
    recent_logs: [
      {
        id: 1001,
        type: "IN",
        product_name: "Rượu vang đỏ Bordeaux 2020",
        quantity: 50,
        created_at: "2024-11-25T14:00:00Z",
      },
      {
        id: 1002,
        type: "OUT",
        product_name: "Rượu vang trắng Chardonnay",
        quantity: -20,
        created_at: "2024-11-25T16:30:00Z",
      },
      {
        id: 1003,
        type: "IN",
        product_name: "Champagne Moët & Chandon",
        quantity: 30,
        created_at: "2024-11-24T10:15:00Z",
      },
      {
        id: 1004,
        type: "OUT",
        product_name: "Rượu vang đỏ Cabernet Sauvignon",
        quantity: -15,
        created_at: "2024-11-24T13:45:00Z",
      },
    ],
  },
  2: {
    ...mockWarehouses[1],
    inventory: {
      total_products: 85,
      total_quantity: 2800,
      total_value: 1800000000,
      low_stock_products: 8,
    },
    recent_logs: [
      {
        id: 2001,
        type: "IN",
        product_name: "Rượu vang Pháp Châteauneuf-du-Pape",
        quantity: 40,
        created_at: "2024-11-26T09:00:00Z",
      },
      {
        id: 2002,
        type: "OUT",
        product_name: "Rượu vang Italy Barolo",
        quantity: -25,
        created_at: "2024-11-25T15:20:00Z",
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
      current_page: number;
      total_pages: number;
      total_items: number;
      per_page: number;
      has_next: boolean;
      has_prev: boolean;
    };
    summary: {
      total_warehouses: number;
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
        current_page: page,
        total_pages: Math.ceil(filtered.length / limit),
        total_items: filtered.length,
        per_page: limit,
        has_next: end < filtered.length,
        has_prev: page > 1,
      },
      summary: {
        total_warehouses: mockWarehouses.length,
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    inventory_summary: {
      total_products: 0,
      total_quantity: 0,
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
    updated_at: new Date().toISOString(),
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
