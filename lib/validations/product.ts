import { z } from "zod";

// Product form schema
export const productSchema = z.object({
  category_id: z.number().min(1, "Please select a category"),

  brand_id: z.number().min(1, "Please select a brand"),

  name: z
    .string()
    .min(1, "Product name is required")
    .max(200, "Product name must not exceed 200 characters"),

  price: z
    .number()
    .min(1000, "Price must be at least 1,000 VND")
    .max(1_000_000_000, "Price must not exceed 1,000,000,000 VND"),

  wine_type: z
    .string()
    .min(1, "Wine type is required")
    .max(100, "Wine type must not exceed 100 characters"),

  country_of_production: z
    .string()
    .min(1, "Country of production is required")
    .max(100, "Country name must not exceed 100 characters"),

  grape_variety: z
    .string()
    .min(1, "Grape variety is required")
    .max(200, "Grape variety must not exceed 200 characters"),

  concentration: z
    .number()
    .min(0, "Alcohol concentration must be at least 0%")
    .max(100, "Alcohol concentration must not exceed 100%"),

  production_area: z
    .string()
    .min(1, "Production area is required")
    .max(200, "Production area must not exceed 200 characters"),

  capacity: z
    .number()
    .min(1, "Capacity must be greater than 0")
    .max(10_000, "Capacity must not exceed 10,000ml"),

  ideal_temperature: z
    .string()
    .min(1, "Ideal temperature is required")
    .max(100, "Ideal temperature must not exceed 100 characters"),

  humidity: z
    .string()
    .min(1, "Humidity information is required")
    .max(100, "Humidity value must not exceed 100 characters"),

  avoid_light: z
    .string()
    .min(1, "Light-avoidance information is required")
    .max(200, "This field must not exceed 200 characters"),

  place_the_bottle_horizontally: z
    .string()
    .min(1, "Bottle placement information is required")
    .max(200, "This field must not exceed 200 characters"),

  avoid_vibration: z
    .string()
    .min(1, "Vibration-avoidance information is required")
    .max(200, "This field must not exceed 200 characters"),

  opened_wine: z
    .string()
    .min(1, "Opened wine information is required")
    .max(200, "This field must not exceed 200 characters"),

  use_wine_cabinet: z
    .string()
    .min(1, "Wine cabinet usage information is required")
    .max(200, "This field must not exceed 200 characters"),

  images: z
    .array(z.string())
    .min(1, "Please upload at least one image")
    .max(5, "You can upload up to 5 images"),

  description: z
    .string()
    .min(10, "Description must contain at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters"),
});

// Type export
export type ProductFormData = z.infer<typeof productSchema>;
