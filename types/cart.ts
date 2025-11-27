// Cart Types
export interface CartProduct {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  image: string;
  price: number;
  inStock: boolean;
  maxQuantity: number;
}

export interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  added_at: string;
}

export interface CartSummary {
  totalItems: number;
  totalquantity: number;
  subtotal: number;
  estimatedshipping: number;
  estimatedtotal: number;
}

export interface Cart {
  cartId: number;
  userId: number;
  items: CartItem[];
  summary: CartSummary;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
  // Optional: provide product info to avoid lookup (for mock)
  product_info?: {
    name: string;
    slug: string;
    image: string;
    price: number;
    maxQuantity?: number;
  };
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface AddToCartResponse {
  cartItemId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}
