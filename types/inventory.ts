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
  quantity_on_hand: number;
  safety_stock: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  last_updated_at: string;
}

export interface InventoryResponse {
  success: boolean;
  data: InventoryItem[];
}

export interface InventoryUpdateRequest {
  warehouse_id: number;
  product_id: number;
  quantity: number;
  type: "in" | "out"; // Nhập kho hoặc xuất kho
  note?: string;
}
