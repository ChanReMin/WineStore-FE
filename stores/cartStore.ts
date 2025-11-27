import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart } from "@/types/cart";
import { cartService } from "@/services/cartService";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (
    productId: number,
    quantity: number,
    productInfo?: {
      name: string;
      slug: string;
      image: string;
      price: number;
      maxQuantity?: number;
    }
  ) => Promise<void>;
  updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
  removeCartItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const cart = await cartService.getCart();
          set({ cart, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Lỗi tải giỏ hàng",
            isLoading: false,
          });
        }
      },

      addToCart: async (
        productId: number,
        quantity: number,
        productInfo?: {
          name: string;
          slug: string;
          image: string;
          price: number;
          maxQuantity?: number;
        }
      ) => {
        set({ isLoading: true, error: null });
        try {
          await cartService.addToCart({
            productId: productId,
            quantity,
            product_info: productInfo,
          });
          await get().fetchCart();
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Lỗi thêm vào giỏ hàng",
            isLoading: false,
          });
          throw error;
        }
      },

      updateCartItem: async (cartItemId: number, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
          await cartService.updateCartItem(cartItemId, { quantity });
          await get().fetchCart();
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Lỗi cập nhật giỏ hàng",
            isLoading: false,
          });
          throw error;
        }
      },

      removeCartItem: async (cartItemId: number) => {
        set({ isLoading: true, error: null });
        try {
          await cartService.removeCartItem(cartItemId);
          await get().fetchCart();
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Lỗi xóa sản phẩm",
            isLoading: false,
          });
          throw error;
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          await cartService.clearCart();
          await get().fetchCart();
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Lỗi xóa giỏ hàng",
            isLoading: false,
          });
          throw error;
        }
      },

      getCartItemCount: () => {
        const { cart } = get();
        return cart?.summary.totalquantity || 0;
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
