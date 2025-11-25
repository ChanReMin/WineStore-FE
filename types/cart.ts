// Cart Types
export interface CartProduct {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  image: string;
  price: number;
  in_stock: boolean;
  max_quantity: number;
}

export interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  unit_price: number;
  line_total: number;
  added_at: string;
}

export interface CartSummary {
  total_items: number;
  total_quantity: number;
  subtotal: number;
  estimated_shipping: number;
  estimated_total: number;
}

export interface Cart {
  cart_id: number;
  user_id: number;
  items: CartItem[];
  summary: CartSummary;
  updated_at: string;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
  // Optional: provide product info to avoid lookup (for mock)
  product_info?: {
    name: string;
    slug: string;
    image: string;
    price: number;
    max_quantity?: number;
  };
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface AddToCartResponse {
  cart_item_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  line_total: number;
}
