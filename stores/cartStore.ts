import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart_Legacy } from "@/types/cart";
import { cartService } from "@/services/cartService";

interface CartState {
  cart: Cart_Legacy | null;
  isLoading: boolean;
  error: string | null;
  pendingUpdates: Map<number, NodeJS.Timeout>; // Track debounce timers

  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
  removeCartItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartItemCount: () => number;
  flushPendingUpdates: () => Promise<void>; // Force sync all pending updates
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      error: null,
      pendingUpdates: new Map(),

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

      addToCart: async (productId: number, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
          await cartService.addToCart({
            product_id: productId,
            quantity,
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
        const { cart, pendingUpdates } = get();
        if (!cart) {
          console.error("Cart is null, cannot update");
          return;
        }

        // Find the item to check constraints
        const item = cart.items.find((i) => i.id === cartItemId);
        if (!item) {
          console.error("Item not found in cart:", cartItemId);
          return;
        }

        // Validate quantity
        if (quantity < 1) {
          console.warn("Quantity must be at least 1");
          return;
        }

        if (quantity > item.product.maxQuantity) {
          console.warn("Quantity exceeds max:", {
            requested: quantity,
            max: item.product.maxQuantity,
          });
          throw new Error(`Số lượng tối đa là ${item.product.maxQuantity}`);
        }

        // OPTIMISTIC UPDATE - Update UI immediately
        const optimisticCart = {
          ...cart,
          items: cart.items.map((item) => {
            if (item.id === cartItemId) {
              const newLineTotal = item.unitPrice * quantity;
              return { ...item, quantity, lineTotal: newLineTotal };
            }
            return item;
          }),
        };

        // Recalculate summary
        const totalItems = optimisticCart.items.length;
        const totalquantity = optimisticCart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const subtotal = optimisticCart.items.reduce(
          (sum, item) => sum + item.lineTotal,
          0
        );
        const estimatedshipping = 0;
        const estimatedtotal = subtotal;

        optimisticCart.summary = {
          totalItems,
          totalquantity,
          subtotal,
          estimatedshipping,
          estimatedtotal,
        };

        // Update UI immediately
        set({ cart: optimisticCart, error: null });

        // DEBOUNCED API CALL - Cancel previous pending update for this item
        const existingTimer = pendingUpdates.get(cartItemId);
        if (existingTimer) {
          clearTimeout(existingTimer);
        }

        // Schedule new API call after 800ms of inactivity
        const timer = setTimeout(async () => {
          set({ isLoading: true });

          try {
            const updatedCart = await cartService.updateCartItem(cartItemId, {
              quantity,
            });

            // Remove from pending updates
            const newPendingUpdates = new Map(get().pendingUpdates);
            newPendingUpdates.delete(cartItemId);

            set({
              cart: updatedCart,
              isLoading: false,
              pendingUpdates: newPendingUpdates,
            });
          } catch (error) {
            console.error("Failed to sync with server:", error);

            // Rollback to original cart on error
            await get().fetchCart();

            set({ isLoading: false });
            set({
              error:
                error instanceof Error
                  ? error.message
                  : "Lỗi cập nhật giỏ hàng",
            });
            throw error;
          }
        }, 800); // 800ms debounce

        // Store the timer
        const newPendingUpdates = new Map(pendingUpdates);
        newPendingUpdates.set(cartItemId, timer);
        set({ pendingUpdates: newPendingUpdates });
      },

      removeCartItem: async (cartItemId: number) => {
        const { cart, pendingUpdates } = get();
        if (!cart) return;

        // Cancel any pending update for this item
        const existingTimer = pendingUpdates.get(cartItemId);
        if (existingTimer) {
          clearTimeout(existingTimer);
          const newPendingUpdates = new Map(pendingUpdates);
          newPendingUpdates.delete(cartItemId);
          set({ pendingUpdates: newPendingUpdates });
        }

        // OPTIMISTIC UPDATE - Remove from UI immediately
        const optimisticCart = {
          ...cart,
          items: cart.items.filter((item) => item.id !== cartItemId),
        };

        // Recalculate summary
        const totalItems = optimisticCart.items.length;
        const totalquantity = optimisticCart.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const subtotal = optimisticCart.items.reduce(
          (sum, item) => sum + item.lineTotal,
          0
        );
        const estimatedshipping = 0;
        const estimatedtotal = subtotal;

        optimisticCart.summary = {
          totalItems,
          totalquantity,
          subtotal,
          estimatedshipping,
          estimatedtotal,
        };

        // Update UI immediately
        set({ cart: optimisticCart, isLoading: true, error: null });

        try {
          // Call API in background
          const updatedCart = await cartService.removeCartItem(cartItemId);
          set({ cart: updatedCart, isLoading: false });
        } catch (error) {
          // Rollback on error
          await get().fetchCart();
          set({ isLoading: false });
          set({
            error: error instanceof Error ? error.message : "Lỗi xóa sản phẩm",
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

      flushPendingUpdates: async () => {
        const { pendingUpdates } = get();

        // Clear all timers and trigger immediate sync
        for (const [cartItemId, timer] of pendingUpdates.entries()) {
          clearTimeout(timer);
        }

        // Clear pending updates map
        set({ pendingUpdates: new Map() });

        // Fetch fresh cart from server
        if (pendingUpdates.size > 0) {
          await get().fetchCart();
        }
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
