// Cart Types
export interface CartProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
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
  subtotal: number;
  total_items: number;
  total_quantity: number;
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

// API Request/Response Types
export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// For backward compatibility with existing code
export interface CartProduct_Legacy {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  image: string;
  price: number;
  inStock: boolean;
  maxQuantity: number;
}

export interface CartItem_Legacy {
  id: number;
  product: CartProduct_Legacy;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  added_at: string;
}

export interface CartSummary_Legacy {
  totalItems: number;
  totalquantity: number;
  subtotal: number;
  estimatedshipping: number;
  estimatedtotal: number;
}

export interface Cart_Legacy {
  cartId: number;
  userId: number;
  items: CartItem_Legacy[];
  summary: CartSummary_Legacy;
  updatedAt: string;
}
