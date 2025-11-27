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
  use_wine_cabinet: string;
  images: string[]; // Changed from string to string[] for multiple images
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
