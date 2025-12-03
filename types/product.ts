// types/product.ts
import type { Promotion } from "./promotion";

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  fullDescription: string | null;
  price: number;
  costPrice: number | null;
  profitMargin: number;
  originalPrice: number | null;
  basePrice?: number; // For shop display (computed field)
  category: { id: number; name: string; slug?: string };
  brand: { id: number; name: string; description?: string };
  images: string; // URL string, not array
  thumbnail?: string; // For shop display
  concentration: number | null;
  volume: number | null;
  originCountry: string | null;
  countryOfProduction?: string; // Alias for originCountry (for compatibility)
  status: number;
  statusText: string;
  totalInventory: number;
  inStock?: boolean; // Computed field
  soldCount: number;
  wineType: string | null;
  winetype?: string; // Alias for wineType (for compatibility)
  humidity: string | null;
  light: string | null;
  position: string | null;
  vibration: string | null;
  afterOpening: string | null;
  servingTemperature: string | null;
  ratingAverage: number;
  createdAt: string;
  updatedAt: string;
  approvedAt: string | null;
  temperature: string | null;
  // Additional fields for display
  grapeVariety?: string | null;
  productionArea?: string | null;
  capacity?: number | null;
  idealtemperature?: string | null;
  avoidLight?: string | null;
  placeTheBottleHorizontally?: string | null;
  avoidVibration?: string | null;
  openedWine?: string | null;
  useWineCabinet?: string | null;
  foodPairing?: string[];
  ratingCount?: number;
  seller?: {
    id: number;
    name: string;
    rating: number;
  };
  promotions?: Promotion[]; // Optional: only included when
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
  reject: number;
}

export interface ProductResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: Pagination;
    summary: Summary;
  };
}
