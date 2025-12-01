import axiosInstance from "@/lib/axios";

// Types
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

/**
 * API 1: Lấy danh sách warehouse chờ duyệt
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
 * API 5: Lấy lịch sử phê duyệt (nếu có endpoint riêng)
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
 * API 6: Thống kê warehouse
 */
export const fetchWarehouseStatistics =
  async (): Promise<WarehouseStatistics> => {
    const response = await axiosInstance.get<WarehouseStatistics>(
      "/api/v1/warehouses/stats"
    );

    return response.data;
  };
