import axiosInstance from "@/lib/axios";
import type {
  InventoryItem,
  InventoryResponse,
  InventoryUpdateRequest,
} from "@/types/inventory";

export interface InventoryListParams {
  page?: number;
  limit?: number;
  warehouseId?: number;
  productId?: number;
  status?: string;
  search?: string;
}

export interface InventoryListResponse {
  success: boolean;
  message: string;
  data: {
    inventory: InventoryItem[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
    summary: {
      totalProducts: number;
      inStock: number;
      lowStock: number;
      outOfStock: number;
      totalValue: number;
    };
  };
}

export interface InventoryDetailResponse {
  success: boolean;
  message: string;
  data: InventoryItem;
}

export interface InventoryUpdateResponse {
  success: boolean;
  message: string;
  data: {
    inventoryId: number;
    warehouseId: number;
    productId: number;
    oldQuantity: number;
    newQuantity: number;
    quantityChange: number;
    type: string;
    logId: number;
    updatedAt: string;
  };
}

export interface TransferInventoryRequest {
  productId: number;
  fromWarehouseId: number;
  toWarehouseId: number;
  quantity: number;
  note?: string;
}

export interface TransferInventoryResponse {
  success: boolean;
  message: string;
  data: {
    transferId: number;
    transferCode: string;
    productId: number;
    fromWarehouseId: number;
    toWarehouseId: number;
    quantity: number;
    status: string;
    statusText: string;
    createdAt: string;
  };
}

export const inventoryService = {
  // Get inventory list with filters
  async getInventoryList(
    params: InventoryListParams = {}
  ): Promise<InventoryListResponse> {
    try {
      const response = await axiosInstance.get<InventoryListResponse>(
        "/api/v1/inventory",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory list:", error);
      throw error;
    }
  },

  // Get inventory detail
  async getInventoryDetail(inventoryId: number): Promise<InventoryDetailResponse> {
    try {
      const response = await axiosInstance.get<InventoryDetailResponse>(
        `/api/v1/inventory/${inventoryId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching inventory detail:", error);
      throw error;
    }
  },

  // Update inventory (stock in/out)
  async updateInventory(
    inventoryId: number,
    data: InventoryUpdateRequest
  ): Promise<InventoryUpdateResponse> {
    try {
      const response = await axiosInstance.put<InventoryUpdateResponse>(
        `/api/v1/inventory/${inventoryId}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating inventory:", error);
      throw error;
    }
  },

  // Transfer inventory between warehouses
  async transferInventory(
    data: TransferInventoryRequest
  ): Promise<TransferInventoryResponse> {
    try {
      const response = await axiosInstance.post<TransferInventoryResponse>(
        "/api/v1/inventory/transfer",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error transferring inventory:", error);
      throw error;
    }
  },

  // Delete inventory
  async deleteInventory(inventoryId: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/inventory/${inventoryId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting inventory:", error);
      throw error;
    }
  },
};
