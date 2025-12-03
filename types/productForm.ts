// types/productForm.ts
export interface ProductFormData {
  categoryId: number;
  brandId: number;
  name: string;
  price: number;
  winetype: string;
  countryOfProduction: string;
  grapeVariety: string;
  concentration: number;
  productionArea: string;
  capacity: number;
  idealtemperature: string;
  humidity: string;
  avoidLight: string;
  placeTheBottleHorizontally: string;
  avoidVibration: string;
  openedWine: string;
  useWineCabinet: string;
  images?: string; // URL of existing image (from server) - for display
  imagePreview?: string[]; // Base64 strings for preview of new images
  image?: File[]; // Actual file objects for upload (new images)
  description: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}
