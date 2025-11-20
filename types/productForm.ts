// types/productForm.ts
export interface ProductFormData {
  category_id: number;
  brand_id: number;
  name: string;
  price: number;
  wine_type: string;
  country_of_production: string;
  grape_variety: string;
  concentration: number;
  production_area: string;
  capacity: number;
  ideal_temperature: string;
  humidity: string;
  avoid_light: string;
  place_the_bottle_horizontally: string;
  avoid_vibration: string;
  opened_wine: string;
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
