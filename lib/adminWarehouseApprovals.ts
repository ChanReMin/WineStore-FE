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
    firstName: string;
    lastName: string;
    phoneNumber: string;
    totalProducts?: number;
    approvedProducts?: number;
  };
  createdAt: string;
  updatedAt: string;
  inventory_summary?: {
    totalProducts: number;
    totalquantity: number;
    total_value: number;
  };
}

export interface WarehouseApprovalsResponse {
  success: boolean;
  data: {
    requests: WarehouseRequest[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      perPage: number;
      has_next: boolean;
      has_prev: boolean;
    };
  };
}

export interface WarehouseStatistics {
  success: boolean;
  data: {
    overview: {
      totalWarehouses: number;
      active_warehouses: number;
      pending_warehouses: number;
      banned_warehouses: number;
    };
    inventory: {
      totalProducts: number;
      totalquantity: number;
      totalInventory_value: number;
    };
    byStatus: Array<{
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
      totalProducts: number;
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
      firstName: "Nguyễn",
      lastName: "Văn A",
      phoneNumber: "0901234567",
      totalProducts: 25,
      approvedProducts: 23,
    },
    createdAt: "2024-11-26T10:30:00Z",
    updatedAt: "2024-11-26T10:30:00Z",
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
      firstName: "Trần",
      lastName: "Thị B",
      phoneNumber: "0912345678",
      totalProducts: 18,
      approvedProducts: 16,
    },
    createdAt: "2024-11-26T09:00:00Z",
    updatedAt: "2024-11-26T09:00:00Z",
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
      firstName: "Lê",
      lastName: "Văn C",
      phoneNumber: "0923456789",
      totalProducts: 32,
      approvedProducts: 30,
    },
    createdAt: "2024-11-25T14:00:00Z",
    updatedAt: "2024-11-25T14:00:00Z",
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
      firstName: "Phạm",
      lastName: "Thị D",
      phoneNumber: "0934567890",
      totalProducts: 15,
      approvedProducts: 14,
    },
    createdAt: "2024-11-25T11:00:00Z",
    updatedAt: "2024-11-25T11:00:00Z",
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
      firstName: "Hoàng",
      lastName: "Văn E",
      phoneNumber: "0945678901",
      totalProducts: 28,
      approvedProducts: 26,
    },
    createdAt: "2024-11-24T16:00:00Z",
    updatedAt: "2024-11-24T16:00:00Z",
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
      firstName: "Nguyễn",
      lastName: "Văn A",
      phoneNumber: "0901234567",
    },
    inventory_summary: {
      totalProducts: 150,
      totalquantity: 5000,
      total_value: 2500000000,
    },
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-20T08:00:00Z",
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
      firstName: "Nguyễn",
      lastName: "Văn A",
      phoneNumber: "0901234567",
    },
    inventory_summary: {
      totalProducts: 80,
      totalquantity: 2000,
      total_value: 1200000000,
    },
    createdAt: "2024-11-18T14:00:00Z",
    updatedAt: "2024-11-25T10:00:00Z",
  },
];

// Simulate API calls
export const fetchWarehouseRequests = async (params?: {
  page?: number;
  limit?: number;
  status?: number;
  manager_id?: number;
  search?: string;
  sortby?: string;
  sortorder?: "asc" | "desc";
}): Promise<WarehouseApprovalsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const {
    page = 1,
    limit = 20,
    status,
    search = "",
    sortorder = "desc",
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
        `${req.manager.firstName} ${req.manager.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }

  // Sort
  filteredRequests.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortorder === "desc" ? dateB - dateA : dateA - dateB;
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
        currentPage: page,
        totalPages: Math.ceil(filteredRequests.length / limit),
        totalItems: filteredRequests.length,
        perPage: limit,
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
          totalWarehouses: totalWarehouses,
          active_warehouses: activeWarehouses,
          pending_warehouses: pendingWarehouses,
          banned_warehouses: bannedWarehouses,
        },
        inventory: {
          totalProducts: 12500,
          totalquantity: 350000,
          totalInventory_value: 175000000000,
        },
        byStatus: [
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
            totalProducts: 2500,
          },
          {
            id: 8,
            name: "Kho Tân Bình",
            manager_name: "Trần Thị B",
            total_value: 18000000000,
            totalProducts: 1800,
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
  warehouse.updatedAt = new Date().toISOString();

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
