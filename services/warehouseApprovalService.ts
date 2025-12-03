import axiosInstance from "@/lib/axios";

// Types
export interface WarehouseRequest {
  id: number;
  name: string;
  location: string;
  description: string;
  status: 0 | 1 | 2 | 3; // 0=pending, 1=approved, 2=banned, 3=rejected
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
  inventorySummary?: {
    totalProducts: number;
    totalQuantity: number;
    totalValue: number;
    lowStockProducts: number;
    outOfStockProducts: number;
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

export interface SellerWarehousesResponse {
  success: boolean;
  data: {
    warehouses: WarehouseRequest[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      perPage: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    summary?: {
      totalWarehouses: number;
      active: number;
      pending: number;
      rejected: number;
      banned: number;
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

export interface WarehouseDetailResponse {
  success: boolean;
  data: WarehouseRequest;
}

export interface ApproveWarehouseResponse {
  success: boolean;
  message: string;
  data: WarehouseRequest;
}

export interface RejectWarehouseResponse {
  success: boolean;
  message: string;
}

export interface BanWarehouseResponse {
  success: boolean;
  message: string;
  data: WarehouseRequest;
}

export interface UnbanWarehouseResponse {
  success: boolean;
  message: string;
  data: WarehouseRequest;
}

/**
 * API 1: Lấy danh sách warehouse chờ duyệt (Admin)
 */
export const fetchWarehouseRequests = async (params?: {
  page?: number;
  limit?: number;
  status?: number;
  manager_id?: number;
  search?: string;
  sortby?: string;
  sortorder?: "asc" | "desc";
}): Promise<WarehouseApprovalsResponse> => {
  const {
    page = 1,
    limit = 20,
    status,
    manager_id,
    search,
    sortby,
    sortorder = "desc",
  } = params || {};

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  if (status !== undefined) queryParams.append("status", status.toString());
  if (manager_id) queryParams.append("manager_id", manager_id.toString());
  if (search) queryParams.append("search", search);
  if (sortby) queryParams.append("sortby", sortby);
  queryParams.append("sortorder", sortorder);

  const response = await axiosInstance.get<WarehouseApprovalsResponse>(
    `/api/v1/warehouses?${queryParams.toString()}`
  );

  return response.data;
};

/**
 * API: Lấy danh sách warehouse của seller (trả về data.warehouses)
 */
export const fetchSellerWarehouses = async (params?: {
  page?: number;
  limit?: number;
  status?: number;
  managerId?: number;
  search?: string;
  sortby?: string;
  sortorder?: "asc" | "desc";
}): Promise<SellerWarehousesResponse> => {
  const {
    page = 1,
    limit = 100,
    status,
    managerId,
    search,
    sortby,
    sortorder = "desc",
  } = params || {};

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  if (status !== undefined) queryParams.append("status", status.toString());
  if (managerId) queryParams.append("managerId", managerId.toString());
  if (search) queryParams.append("search", search);
  if (sortby) queryParams.append("sortby", sortby);
  queryParams.append("sortorder", sortorder);

  const response = await axiosInstance.get<SellerWarehousesResponse>(
    `/api/v1/warehouses?${queryParams.toString()}`
  );

  return response.data;
};

/**
 * API 2: Lấy chi tiết warehouse
 */
export const fetchWarehouseDetail = async (
  warehouseId: number
): Promise<WarehouseDetailResponse> => {
  const response = await axiosInstance.get<WarehouseDetailResponse>(
    `/api/v1/warehouses/${warehouseId}`
  );

  return response.data;
};

/**
 * API 3: Phê duyệt warehouse
 */
export const approveWarehouse = async (
  warehouseId: number,
  note?: string
): Promise<ApproveWarehouseResponse> => {
  const response = await axiosInstance.patch<ApproveWarehouseResponse>(
    `/api/v1/warehouses/${warehouseId}/approve`,
    { reason: note }
  );

  return response.data;
};

/**
 * API 4: Từ chối warehouse
 */
export const rejectWarehouse = async (
  warehouseId: number,
  reason: string
): Promise<RejectWarehouseResponse> => {
  const response = await axiosInstance.patch<RejectWarehouseResponse>(
    `/api/v1/warehouses/${warehouseId}/reject`,
    { reason }
  );

  return response.data;
};

/**
 * API 5: Ban warehouse
 */
export const banWarehouse = async (
  warehouseId: number,
  reason: string
): Promise<BanWarehouseResponse> => {
  const response = await axiosInstance.patch<BanWarehouseResponse>(
    `/api/v1/warehouses/${warehouseId}/ban`,
    { reason }
  );

  return response.data;
};

/**
 * API 6: Unban warehouse
 */
export const unbanWarehouse = async (
  warehouseId: number,
  note?: string
): Promise<UnbanWarehouseResponse> => {
  const response = await axiosInstance.patch<UnbanWarehouseResponse>(
    `/api/v1/warehouses/${warehouseId}/unban`,
    { reason: note }
  );

  return response.data;
};

/**
 * API 7: Lấy lịch sử phê duyệt (nếu có endpoint riêng)
 */
export const fetchApprovalHistory = async (
  warehouseId: number
): Promise<{
  success: boolean;
  data: Array<{
    id: string;
    action: "APPROVED" | "REJECTED";
    adminId: string;
    adminName: string;
    reason?: string;
    timestamp: string;
  }>;
}> => {
  const response = await axiosInstance.get(
    `/api/v1/warehouses/${warehouseId}/approval-history`
  );

  return response.data;
};

/**
 * API 8: Thống kê warehouse
 */
export const fetchWarehouseStatistics =
  async (): Promise<WarehouseStatistics> => {
    const response = await axiosInstance.get<WarehouseStatistics>(
      "/api/v1/warehouses/stats"
    );

    return response.data;
  };
