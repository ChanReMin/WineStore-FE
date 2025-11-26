import { create } from "zustand";
import type { Promotion } from "@/types/promotion";

export interface Product {
  id: number;
  name: string;
  price: number;
  promotions: Promotion[];
}

interface PromotionAssignmentState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addPromotionToProduct: (productId: number, promotion: Promotion) => boolean;
  removePromotionFromProduct: (productId: number, promotionId: number) => void;
  getAssignedPromotionIds: () => Set<number>;
  resetProducts: (initialProducts: Product[]) => void;
}

export const usePromotionAssignmentStore = create<PromotionAssignmentState>(
  (set, get) => ({
    products: [],

    setProducts: (products) => set({ products }),

    addPromotionToProduct: (productId, promotion) => {
      const { products } = get();
      let success = false;

      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          // Kiểm tra xem promotion đã tồn tại chưa
          const alreadyExists = product.promotions.some(
            (p) => p.id === promotion.id
          );

          if (alreadyExists) {
            return product;
          }

          success = true;
          return {
            ...product,
            promotions: [...product.promotions, promotion],
          };
        }
        return product;
      });

      if (success) {
        set({ products: updatedProducts });
      }

      return success;
    },

    removePromotionFromProduct: (productId, promotionId) => {
      const { products } = get();

      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            promotions: product.promotions.filter((p) => p.id !== promotionId),
          };
        }
        return product;
      });

      set({ products: updatedProducts });
    },

    getAssignedPromotionIds: () => {
      const { products } = get();
      return new Set(
        products.flatMap((p) => p.promotions.map((promo) => promo.id))
      );
    },

    resetProducts: (initialProducts) => {
      set({ products: initialProducts });
    },
  })
);
