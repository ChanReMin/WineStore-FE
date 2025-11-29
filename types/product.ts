// types/product.ts
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  basePrice?: number; // For shop display
  profitMargin: number;
  category: { id: number; name: string };
  brand: { id: number; name: string };
  images: string; // URL string, not array
  thumbnail?: string; // For shop display
  concentration: number;
  originCountry: string;
  countryOfProduction?: string; // Alias for originCountry (for compatibility)
  winetype?: string;
  grapeVariety?: string;
  productionArea?: string;
  capacity?: number;
  idealtemperature?: string;
  humidity?: string;
  avoidLight?: string;
  placeTheBottleHorizontally?: string;
  avoidVibration?: string;
  openedWine?: string;
  useWineCabinet?: string;
  status: number;
  statusText: string;
  totalInventory: number;
  inStock?: boolean;
  soldCount: number;
  ratingAverage: number;
  ratingCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage?: number;
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
