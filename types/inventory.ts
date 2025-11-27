// types/inventory.ts
export interface Warehouse {
  id: number;
  name: string;
  location: string;
}

export interface InventoryProduct {
  id: number;
  name: string;
  price: number;
}

export interface InventoryItem {
  id: number;
  warehouse: Warehouse;
  product: InventoryProduct;
  quantityOnHand: number;
  safetyStock: number;
  status: "inStock" | "lowStock" | "outOfStock";
  lastUpdatedAt: string;
}

export interface InventoryResponse {
  success: boolean;
  data: InventoryItem[];
}

export interface InventoryUpdateRequest {
  warehouseId: number;
  productId: number;
  quantity: number;
  type: "in" | "out"; // Nhập kho hoặc xuất kho
  note?: string;
}
