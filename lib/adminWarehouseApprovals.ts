// Mock data for Admin Warehouse Approvals based on API documentation

export interface WarehouseRequest {
  id: number;
  name: string;
  location: string;
  description: string;
  status: 0 | 1 | 2; // 0=pending, 1=active, 2=banned
  manager: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    total_products?: number;
    approved_products?: number;
  };
  created_at: string;
  updated_at: string;
  inventory_summary?: {
    total_products: number;
    total_quantity: number;
    total_value: number;
  };
}

export interface WarehouseApprovalsResponse {
  success: boolean;
  data: {
    requests: WarehouseRequest[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_items: number;
      per_page: number;
      has_next: boolean;
      has_prev: boolean;
    };
  };
}

export interface WarehouseStatistics {
  success: boolean;
  data: {
    overview: {
      total_warehouses: number;
      active_warehouses: number;
      pending_warehouses: number;
      banned_warehouses: number;
    };
    inventory: {
      total_products: number;
      total_quantity: number;
      total_inventory_value: number;
    };
    by_status: Array<{
      status: number;
      status_label: string;
      count: number;
      percentage: number;
    }>;
    top_warehouses: Array<{
      id: number;
      name: string;
      manager_name: string;
      total_value: number;
      total_products: number;
    }>;
    recent_requests: WarehouseRequest[];
  };
}

// Mock warehouse requests data
const mockWarehouseRequests: WarehouseRequest[] = [
  {
    id: 15,
    name: "Kho rượu vang Quận 1",
    location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    description:
      "Kho chuyên rượu vang nhập khẩu Pháp, Italy. Diện tích 500m2, đầy đủ thiết bị bảo quản chuyên nghiệp.",
    status: 0,
    manager: {
      id: 5,
      email: "seller@example.com",
      first_name: "Nguyễn",
      last_name: "Văn A",
      phone_number: "0901234567",
      total_products: 25,
      approved_products: 23,
    },
    created_at: "2024-11-26T10:30:00Z",
    updated_at: "2024-11-26T10:30:00Z",
  },
  {
    id: 16,
    name: "Kho rượu vang Quận 7",
    location: "789 Nguyễn Văn Linh, Quận 7, TP.HCM",
    description:
      "Kho chi nhánh phía Nam, chuyên phân phối rượu vang cao cấp. Diện tích 300m2.",
    status: 0,
    manager: {
      id: 8,
      email: "seller2@example.com",
      first_name: "Trần",
      last_name: "Thị B",
      phone_number: "0912345678",
      total_products: 18,
      approved_products: 16,
    },
    created_at: "2024-11-26T09:00:00Z",
    updated_at: "2024-11-26T09:00:00Z",
  },
  {
    id: 17,
    name: "Kho rượu vang Tân Bình",
    location: "456 Hoàng Văn Thụ, Tân Bình, TP.HCM",
    description:
      "Kho tổng, diện tích lớn 800m2, hệ thống điều hòa nhiệt độ tự động.",
    status: 0,
    manager: {
      id: 10,
      email: "seller3@example.com",
      first_name: "Lê",
      last_name: "Văn C",
      phone_number: "0923456789",
      total_products: 32,
      approved_products: 30,
    },
    created_at: "2024-11-25T14:00:00Z",
    updated_at: "2024-11-25T14:00:00Z",
  },
  {
    id: 18,
    name: "Kho rượu vang Quận 3",
    location: "321 Võ Văn Tần, Quận 3, TP.HCM",
    description:
      "Kho chi nhánh trung tâm, thuận tiện giao hàng nhanh. Diện tích 400m2.",
    status: 0,
    manager: {
      id: 12,
      email: "seller4@example.com",
      first_name: "Phạm",
      last_name: "Thị D",
      phone_number: "0934567890",
      total_products: 15,
      approved_products: 14,
    },
    created_at: "2024-11-25T11:00:00Z",
    updated_at: "2024-11-25T11:00:00Z",
  },
  {
    id: 19,
    name: "Kho rượu vang Bình Thạnh",
    location: "555 Điện Biên Phủ, Bình Thạnh, TP.HCM",
    description:
      "Kho mới, trang thiết bị hiện đại, đảm bảo chất lượng bảo quản tốt nhất.",
    status: 0,
    manager: {
      id: 14,
      email: "seller5@example.com",
      first_name: "Hoàng",
      last_name: "Văn E",
      phone_number: "0945678901",
      total_products: 28,
      approved_products: 26,
    },
    created_at: "2024-11-24T16:00:00Z",
    updated_at: "2024-11-24T16:00:00Z",
  },
];

// Mock active warehouses
const mockActiveWarehouses: WarehouseRequest[] = [
  {
    id: 12,
    name: "Kho rượu vang Tân Bình Central",
    location: "456 Hoàng Văn Thụ, Tân Bình, TP.HCM",
    description: "Kho tổng",
    status: 1,
    manager: {
      id: 5,
      email: "seller@example.com",
      first_name: "Nguyễn",
      last_name: "Văn A",
      phone_number: "0901234567",
    },
    inventory_summary: {
      total_products: 150,
      total_quantity: 5000,
      total_value: 2500000000,
    },
    created_at: "2024-11-15T10:00:00Z",
    updated_at: "2024-11-20T08:00:00Z",
  },
  {
    id: 13,
    name: "Kho rượu vang Quận 3 Premium",
    location: "321 Võ Văn Tần, Quận 3, TP.HCM",
    description: "Kho chi nhánh",
    status: 1,
    manager: {
      id: 5,
      email: "seller@example.com",
      first_name: "Nguyễn",
      last_name: "Văn A",
      phone_number: "0901234567",
    },
    inventory_summary: {
      total_products: 80,
      total_quantity: 2000,
      total_value: 1200000000,
    },
    created_at: "2024-11-18T14:00:00Z",
    updated_at: "2024-11-25T10:00:00Z",
  },
];

// Simulate API calls
export const fetchWarehouseRequests = async (params?: {
  page?: number;
  limit?: number;
  status?: number;
  manager_id?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}): Promise<WarehouseApprovalsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const {
    page = 1,
    limit = 20,
    status,
    search = "",
    sort_order = "desc",
  } = params || {};

  let filteredRequests = [...mockWarehouseRequests];

  // Filter by status
  if (status !== undefined) {
    filteredRequests = filteredRequests.filter((req) => req.status === status);
  }

  // Search filter
  if (search) {
    filteredRequests = filteredRequests.filter(
      (req) =>
        req.name.toLowerCase().includes(search.toLowerCase()) ||
        req.location.toLowerCase().includes(search.toLowerCase()) ||
        `${req.manager.first_name} ${req.manager.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }

  // Sort
  filteredRequests.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sort_order === "desc" ? dateB - dateA : dateA - dateB;
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  return {
    success: true,
    data: {
      requests: paginatedRequests,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(filteredRequests.length / limit),
        total_items: filteredRequests.length,
        per_page: limit,
        has_next: page < Math.ceil(filteredRequests.length / limit),
        has_prev: page > 1,
      },
    },
  };
};

export const fetchWarehouseStatistics =
  async (): Promise<WarehouseStatistics> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const totalWarehouses =
      mockActiveWarehouses.length + mockWarehouseRequests.length;
    const activeWarehouses = mockActiveWarehouses.length;
    const pendingWarehouses = mockWarehouseRequests.filter(
      (w) => w.status === 0
    ).length;
    const bannedWarehouses = 2;

    return {
      success: true,
      data: {
        overview: {
          total_warehouses: totalWarehouses,
          active_warehouses: activeWarehouses,
          pending_warehouses: pendingWarehouses,
          banned_warehouses: bannedWarehouses,
        },
        inventory: {
          total_products: 12500,
          total_quantity: 350000,
          total_inventory_value: 175000000000,
        },
        by_status: [
          {
            status: 1,
            status_label: "Đang hoạt động",
            count: activeWarehouses,
            percentage: (activeWarehouses / totalWarehouses) * 100,
          },
          {
            status: 0,
            status_label: "Chờ duyệt",
            count: pendingWarehouses,
            percentage: (pendingWarehouses / totalWarehouses) * 100,
          },
          {
            status: 2,
            status_label: "Bị khóa",
            count: bannedWarehouses,
            percentage: (bannedWarehouses / totalWarehouses) * 100,
          },
        ],
        top_warehouses: [
          {
            id: 5,
            name: "Kho trung tâm Q1",
            manager_name: "Nguyễn Văn A",
            total_value: 25000000000,
            total_products: 2500,
          },
          {
            id: 8,
            name: "Kho Tân Bình",
            manager_name: "Trần Thị B",
            total_value: 18000000000,
            total_products: 1800,
          },
        ],
        recent_requests: mockWarehouseRequests.slice(0, 3),
      },
    };
  };

export const approveWarehouse = async (
  warehouseId: number,
  note?: string
): Promise<{ success: boolean; message: string; data: WarehouseRequest }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const warehouse = mockWarehouseRequests.find((w) => w.id === warehouseId);
  if (!warehouse) {
    throw new Error("Không tìm thấy warehouse request");
  }

  warehouse.status = 1;
  warehouse.updated_at = new Date().toISOString();

  return {
    success: true,
    message: "Đã phê duyệt kho thành công",
    data: warehouse,
  };
};

export const rejectWarehouse = async (
  warehouseId: number,
  reason: string
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const index = mockWarehouseRequests.findIndex((w) => w.id === warehouseId);
  if (index === -1) {
    throw new Error("Không tìm thấy warehouse request");
  }

  // Remove from list (simulating deletion)
  mockWarehouseRequests.splice(index, 1);

  return {
    success: true,
    message: "Đã từ chối yêu cầu tạo kho",
  };
};

export const fetchWarehouseDetail = async (
  warehouseId: number
): Promise<{ success: boolean; data: WarehouseRequest }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const warehouse = mockWarehouseRequests.find((w) => w.id === warehouseId);
  if (!warehouse) {
    throw new Error("Không tìm thấy warehouse");
  }

  return {
    success: true,
    data: warehouse,
  };
};
