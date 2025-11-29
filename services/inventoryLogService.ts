import axiosInstance from "@/lib/axios";

export interface InventoryLog {
  id: number;
  type: string;
  typeText: string;
  warehouse: {
    id: number;
    name: string;
    location: string;
    address: string;
  };
  product: {
    id: number;
    name: string;
    sku: string;
    price: number;
    image: string;
  };
  quantityBefore: number;
  quantityChange: number;
  quantityAfter: number;
  note?: string;
  referenceCode?: string;
  createdBy: string;
  createdAt: string;
}

export interface InventoryLogListParams {
  page?: number;
  limit?: number;
  warehouseId?: number;
  product_id?: number;
  type?: string;
  from_date?: string;
  to_date?: string;
}

export interface InventoryLogListResponse {
  success: boolean;
  message: string;
  data: {
    logs: InventoryLog[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
    summary?: {
      total: number;
      stockIn: number;
      stockOut: number;
      adjustments: number;
      returns: number;
      totalStockIn: number;
      totalStockOut: number;
      netChange: number;
    };
  };
}

export interface InventoryLogDetailResponse {
  success: boolean;
  message: string;
  data: InventoryLog;
}

export const inventoryLogService = {
  // Get inventory logs list
  async getInventoryLogs(
    params: InventoryLogListParams = {}
  ): Promise<InventoryLogListResponse> {
    try {
      const response = await axiosInstance.get<InventoryLogListResponse>(
        "/api/v1/inventory/logs",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory logs:", error);
      throw error;
    }
  },

  // Get inventory log detail
  async getInventoryLogDetail(logId: number): Promise<InventoryLogDetailResponse> {
    try {
      const response = await axiosInstance.get<InventoryLogDetailResponse>(
        `/api/v1/inventory/logs/${logId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory log detail:", error);
      throw error;
    }
  },
};
