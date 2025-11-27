// types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  categoryId: number;
  brand: string;
  brandId: number;
  concentration: number;
  status: number;
  statusText: string;
  totalInventory: number;
  createdAt: string;
  approvedAt: string | null;
  approvedBy: string | null;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface Summary {
  total: number;
  pending: number;
  active: number;
  banned: number;
}

export interface ProductResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: Pagination;
    summary: Summary;
  };
}
