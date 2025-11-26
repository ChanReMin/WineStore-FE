"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type CollisionDetection,
} from "@dnd-kit/core";
import { PromotionList } from "./PromotionList";
import { ProductPromotionZone } from "./ProductPromotionZone";
import { DraggablePromotionItem } from "./DraggablePromotionItem";
import type { Promotion } from "@/types/promotion";
import { toast } from "react-toastify";
import {
  usePromotionAssignmentStore,
  type Product,
} from "@/stores/promotionAssignmentStore";
import { useTranslations } from "next-intl";

interface PromotionProductDnDWithStoreProps {
  promotions: Promotion[];
  initialProducts: Product[];
}

export function PromotionProductDnDWithStore({
  promotions,
  initialProducts,
}: PromotionProductDnDWithStoreProps) {
  const t = useTranslations("seller.promotions.assignment.toast");
  const [activePromotion, setActivePromotion] = useState<Promotion | null>(
    null
  );

  // Ref để prevent duplicate toast
  const toastShownRef = useRef(false);

  const {
    products,
    addPromotionToProduct,
    removePromotionFromProduct,
    getAssignedPromotionIds,
    resetProducts,
  } = usePromotionAssignmentStore();

  // Initialize products
  useEffect(() => {
    resetProducts(initialProducts);
  }, [initialProducts, resetProducts]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Tăng một chút để tránh trigger nhầm
      },
    })
  );

  // Auto-scroll when dragging near edges
  useEffect(() => {
    let animationFrameId: number;
    let isScrolling = false;

    const autoScroll = () => {
      if (!isScrolling) return;

      const promotionList = document.querySelector(
        '[data-scroll-container="promotions"]'
      );
      const productZone = document.querySelector(
        '[data-scroll-container="products"]'
      );

      if (promotionList || productZone) {
        animationFrameId = requestAnimationFrame(autoScroll);
      }
    };

    const handleDragMove = (event: MouseEvent) => {
      if (!activePromotion) return;

      const scrollSpeed = 15;
      const edgeThreshold = 80;
      const mouseY = event.clientY;

      isScrolling = false;

      // Check promotion list
      const promotionList = document.querySelector(
        '[data-scroll-container="promotions"]'
      );
      if (promotionList) {
        const rect = promotionList.getBoundingClientRect();
        if (mouseY >= rect.top && mouseY <= rect.bottom) {
          if (mouseY < rect.top + edgeThreshold) {
            promotionList.scrollTop -= scrollSpeed;
            isScrolling = true;
          } else if (mouseY > rect.bottom - edgeThreshold) {
            promotionList.scrollTop += scrollSpeed;
            isScrolling = true;
          }
        }
      }

      // Check product zone
      const productZone = document.querySelector(
        '[data-scroll-container="products"]'
      );
      if (productZone) {
        const rect = productZone.getBoundingClientRect();
        if (mouseY >= rect.top && mouseY <= rect.bottom) {
          if (mouseY < rect.top + edgeThreshold) {
            productZone.scrollTop -= scrollSpeed;
            isScrolling = true;
          } else if (mouseY > rect.bottom - edgeThreshold) {
            productZone.scrollTop += scrollSpeed;
            isScrolling = true;
          }
        }
      }

      if (isScrolling && !animationFrameId) {
        animationFrameId = requestAnimationFrame(autoScroll);
      }
    };

    if (activePromotion) {
      document.addEventListener("mousemove", handleDragMove);
      return () => {
        document.removeEventListener("mousemove", handleDragMove);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [activePromotion]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const promotion = active.data.current?.promotion as Promotion;
    setActivePromotion(promotion);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActivePromotion(null);
      toastShownRef.current = false; // Reset flag

      if (!over) return;

      // Chỉ chấp nhận drop vào drop zone (không phải toàn bộ card)
      const overId = over.id.toString();
      if (!overId.startsWith("product-dropzone-")) {
        return; // Không phải drop zone, bỏ qua
      }

      const promotion = active.data.current?.promotion as Promotion;
      const productId = over.data.current?.product?.id as number;

      if (!promotion || !productId) return;

      // Tìm product trước để lấy tên
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const success = addPromotionToProduct(productId, promotion);

      // Show toast chỉ 1 lần
      if (!toastShownRef.current) {
        toastShownRef.current = true;

        if (success) {
          toast.success(
            t("assignSuccess", {
              promotion: promotion.name,
              product: product.name,
            })
          );
        } else {
          toast.warning(t("assignWarning", { promotion: promotion.name }));
        }
      }
    },
    [products, addPromotionToProduct, t]
  );

  const handleRemovePromotion = useCallback(
    (productId: number, promotionId: number) => {
      // Tìm product và promotion trước khi xóa
      const product = products.find((p) => p.id === productId);
      const promotion = product?.promotions.find((p) => p.id === promotionId);

      // Xóa khỏi store
      removePromotionFromProduct(productId, promotionId);

      // Hiển thị toast sau khi xóa (chỉ 1 lần)
      // Dùng setTimeout để đảm bảo toast chỉ show 1 lần
      if (promotion && product) {
        setTimeout(() => {
          toast.info(
            t("removeSuccess", {
              promotion: promotion.name,
              product: product.name,
            })
          );
        }, 0);
      }
    },
    [products, removePromotionFromProduct, t]
  );

  const assignedPromotionIds = getAssignedPromotionIds();

  // Custom collision detection: ưu tiên pointerWithin, fallback rectIntersection
  const collisionDetectionStrategy: CollisionDetection = useCallback((args) => {
    // Ưu tiên phát hiện nếu pointer nằm trong drop zone
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    // Fallback: kiểm tra giao nhau của hình chữ nhật
    return rectIntersection(args);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full max-w-[1800px] mx-auto grid grid-cols-[320px_1fr] gap-0">
        <PromotionList
          promotions={promotions}
          assignedPromotionIds={assignedPromotionIds}
        />
        <ProductPromotionZone
          products={products}
          onRemovePromotion={handleRemovePromotion}
        />
      </div>

      <DragOverlay dropAnimation={null}>
        {activePromotion ? (
          <div
            style={{
              transform: "rotate(3deg) scale(1.05)",
              cursor: "grabbing",
            }}
            className="opacity-95 shadow-2xl"
          >
            <DraggablePromotionItem promotion={activePromotion} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
