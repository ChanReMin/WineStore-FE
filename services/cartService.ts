// Cart Service - Real API Implementation
import { axiosInstance } from "@/lib/axios";
import type {
  Cart,
  Cart_Legacy,
  AddToCartRequest,
  UpdateCartItemRequest,
  ApiResponse,
} from "@/types/cart";

/**
 * Transform API response to legacy format for backward compatibility
 */
const transformToLegacy = (cart: Cart): Cart_Legacy => {
  return {
    cartId: cart.cart_id,
    userId: cart.user_id,
    items: cart.items.map((item) => ({
      id: item.id,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        sku: item.product.sku,
        image: item.product.image,
        price: item.product.price,
        inStock: item.product.in_stock,
        maxQuantity: item.product.max_quantity,
      },
      quantity: item.quantity,
      unitPrice: item.unit_price,
      lineTotal: item.line_total,
      added_at: item.added_at,
    })),
    summary: {
      totalItems: cart.summary.total_items,
      totalquantity: cart.summary.total_quantity,
      subtotal: cart.summary.subtotal,
      estimatedshipping: cart.summary.estimated_shipping,
      estimatedtotal: cart.summary.estimated_total,
    },
    updatedAt: cart.updated_at,
  };
};

export const cartService = {
  /**
   * Get current user's cart
   * GET /api/v1/cart
   */
  async getCart(): Promise<Cart_Legacy> {
    try {
      const response =
        await axiosInstance.get<ApiResponse<Cart>>("/api/v1/cart");
      return transformToLegacy(response.data.data);
    } catch (error: any) {
      console.error("Get cart error:", error);
      throw new Error(
        error.response?.data?.message || "Không thể tải giỏ hàng"
      );
    }
  },

  /**
   * Add item to cart
   * POST /api/v1/cart/items
   */
  async addToCart(data: AddToCartRequest): Promise<void> {
    try {
      await axiosInstance.post<ApiResponse<Cart>>("/api/v1/cart/items", data);
      // API returns updated cart, but we'll fetch it separately for consistency
    } catch (error: any) {
      console.error("Add to cart error:", error);
      const message =
        error.response?.data?.message || "Không thể thêm vào giỏ hàng";
      throw new Error(message);
    }
  },

  /**
   * Update cart item quantity
   * PUT /api/v1/cart/items/:itemId
   */
  async updateCartItem(
    cartItemId: number,
    data: UpdateCartItemRequest
  ): Promise<Cart_Legacy> {
    try {
      const response = await axiosInstance.put<ApiResponse<Cart>>(
        `/api/v1/cart/items/${cartItemId}`,
        data
      );
      return transformToLegacy(response.data.data);
    } catch (error: any) {
      console.error("Update cart item error:", error);
      const message =
        error.response?.data?.message || "Không thể cập nhật giỏ hàng";
      throw new Error(message);
    }
  },

  /**
   * Remove item from cart
   * DELETE /api/v1/cart/items/:cartItemId
   */
  async removeCartItem(cartItemId: number): Promise<Cart_Legacy> {
    try {
      const response = await axiosInstance.delete<ApiResponse<Cart>>(
        `/api/v1/cart/items/${cartItemId}`
      );
      return transformToLegacy(response.data.data);
    } catch (error: any) {
      console.error("Remove cart item error:", error);
      const message = error.response?.data?.message || "Không thể xóa sản phẩm";
      throw new Error(message);
    }
  },

  /**
   * Clear entire cart
   * DELETE /api/v1/cart
   */
  async clearCart(): Promise<void> {
    try {
      await axiosInstance.delete<ApiResponse<null>>("/api/v1/cart");
    } catch (error: any) {
      console.error("Clear cart error:", error);
      const message = error.response?.data?.message || "Không thể xóa giỏ hàng";
      throw new Error(message);
    }
  },
};
