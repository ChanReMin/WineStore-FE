// types/inventoryLog.ts
export interface InventoryLog {
  id: number;
  warehouse: string;
  product: string;
  type: "IN" | "OUT" | "ADJUST" | "RETURN";
  quantity: number;
  user: string;
  note?: string;
  createdAt: string;
}

export interface InventoryLogResponse {
  success: boolean;
  data: InventoryLog[];
}

export type InventoryLogType = "IN" | "OUT" | "ADJUST" | "RETURN";
