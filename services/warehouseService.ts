import axiosInstance from "@/lib/axios";

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  city?: string;
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
  activeWarehouses: number;
  pendingWarehouses: number;
  bannedWarehouses: number;
  totalInventoryValue: number;
  totalProducts: number;
  totalQuantity: number;
  warehousesByStatus: Array<{
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

export interface WarehouseListParams {
  status?: number;
  page?: number;
  limit?: number;
  search?: string;
}

export interface WarehouseListResponse {
  success: boolean;
  data: {
    warehouses: Warehouse[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      perPage: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    summary: {
      totalWarehouses: number;
      active: number;
      pending: number;
      rejected: number;
      banned: number;
    };
  };
}

export interface CreateWarehouseRequest {
  name: string;
  location: string;
  city: string;
  description: string;
}

export interface UpdateWarehouseRequest {
  name: string;
  location: string;
  city: string;
  description: string;
}

export interface City {
  name: string;
  code?: string;
  storeCount?: number;
}

export interface CitiesResponse {
  success: boolean;
  data: {
    cities: City[];
  };
}

export interface WarehousesByCityResponse {
  success: boolean;
  data: {
    warehouses: Warehouse[];
  };
}

export const warehouseService = {
  // Get warehouses list
  async getWarehouses(
    params: WarehouseListParams = {}
  ): Promise<WarehouseListResponse> {
    try {
      const response = await axiosInstance.get<WarehouseListResponse>(
        "/api/v1/warehouses",
        { params }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      throw error;
    }
  },

  // Get warehouse detail
  async getWarehouseDetail(
    id: number
  ): Promise<{ success: boolean; data: WarehouseDetail }> {
    try {
      const response = await axiosInstance.get<{
        success: boolean;
        data: WarehouseDetail;
      }>(`/api/v1/warehouses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching warehouse detail:", error);
      throw error;
    }
  },

  // Get warehouse statistics
  async getWarehouseStatistics(): Promise<{
    success: boolean;
    data: WarehouseStatistics;
  }> {
    try {
      const response = await axiosInstance.get<{
        success: boolean;
        data: WarehouseStatistics;
      }>("/api/v1/warehouses/statistics");
      return response.data;
    } catch (error) {
      console.error("Error fetching warehouse statistics:", error);
      throw error;
    }
  },

  // Create warehouse
  async createWarehouse(
    data: CreateWarehouseRequest
  ): Promise<{ success: boolean; message: string; data: Warehouse }> {
    try {
      const response = await axiosInstance.post<{
        success: boolean;
        message: string;
        data: Warehouse;
      }>("/api/v1/warehouses", data);
      return response.data;
    } catch (error) {
      console.error("Error creating warehouse:", error);
      throw error;
    }
  },

  // Update warehouse
  async updateWarehouse(
    id: number,
    data: UpdateWarehouseRequest
  ): Promise<{ success: boolean; message: string; data: Warehouse }> {
    try {
      const response = await axiosInstance.put<{
        success: boolean;
        message: string;
        data: Warehouse;
      }>(`/api/v1/warehouses/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating warehouse:", error);
      throw error;
    }
  },

  // Delete warehouse
  async deleteWarehouse(
    id: number
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axiosInstance.delete<{
        success: boolean;
        message: string;
      }>(`/api/v1/warehouses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting warehouse:", error);
      throw error;
    }
  },

  // Get cities list
  async getCities(): Promise<CitiesResponse> {
    try {
      const response = await axiosInstance.get<CitiesResponse>(
        "/api/v1/warehouses/cities"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
    }
  },

  // Get warehouses by city
  async getWarehousesByCity(city: string): Promise<WarehousesByCityResponse> {
    try {
      const response = await axiosInstance.get<WarehousesByCityResponse>(
        "/api/v1/warehouses/by-city",
        { params: { city } }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching warehouses by city:", error);
      throw error;
    }
  },
};
