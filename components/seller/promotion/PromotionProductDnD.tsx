"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
import { useTranslations } from "next-intl";

interface Product {
  id: number;
  name: string;
  price: number;
  promotions: Promotion[];
}

interface PromotionProductDnDProps {
  promotions: Promotion[];
  initialProducts: Product[];
}

export function PromotionProductDnD({
  promotions,
  initialProducts,
}: PromotionProductDnDProps) {
  const t = useTranslations("seller.promotions.assignment.toast");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activePromotion, setActivePromotion] = useState<Promotion | null>(
    null
  );

  // Ref để prevent duplicate toast
  const toastShownRef = useRef(false);

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

      // Lấy product trước để check và show toast
      setProducts((prevProducts) => {
        const targetProduct = prevProducts.find((p) => p.id === productId);
        if (!targetProduct) return prevProducts;

        // Kiểm tra xem promotion đã tồn tại chưa
        const alreadyExists = targetProduct.promotions.some(
          (p) => p.id === promotion.id
        );

        // Show toast chỉ 1 lần
        if (!toastShownRef.current) {
          toastShownRef.current = true;

          if (alreadyExists) {
            toast.warning(t("assignWarning", { promotion: promotion.name }));
          } else {
            toast.success(
              t("assignSuccess", {
                promotion: promotion.name,
                product: targetProduct.name,
              })
            );
          }
        }

        // Nếu đã tồn tại, không cập nhật state
        if (alreadyExists) {
          return prevProducts;
        }

        // Cập nhật state
        return prevProducts.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              promotions: [...product.promotions, promotion],
            };
          }
          return product;
        });
      });
    },
    [t]
  );

  const handleRemovePromotion = useCallback(
    (productId: number, promotionId: number) => {
      // Lấy thông tin trước khi update để show toast
      const targetProduct = products.find((p) => p.id === productId);
      const removedPromotion = targetProduct?.promotions.find(
        (p) => p.id === promotionId
      );

      // Cập nhật state
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              promotions: product.promotions.filter(
                (p) => p.id !== promotionId
              ),
            };
          }
          return product;
        })
      );

      // Hiển thị toast sau khi cập nhật (outside của setProducts)
      if (removedPromotion && targetProduct) {
        toast.info(
          t("removeSuccess", {
            promotion: removedPromotion.name,
            product: targetProduct.name,
          })
        );
      }
    },
    [products, t]
  );

  // Tạo Set các promotion ID đã được gán (memoized)
  const assignedPromotionIds = useMemo(
    () =>
      new Set(products.flatMap((p) => p.promotions.map((promo) => promo.id))),
    [products]
  );

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
