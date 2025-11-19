// types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  status: number;
  status_text: string;
  total_inventory: number;
  created_at: string;
  approved_at: string | null;
  approved_by: string | null;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
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
