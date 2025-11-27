"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  CheckCircle,
  Check,
} from "lucide-react";
import { CheckoutStep } from "@/contexts/CheckoutContext";

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

const STEPS = [
  { key: "cart", label: "Giỏ hàng", icon: ShoppingCart },
  { key: "address", label: "Địa chỉ", icon: MapPin },
  { key: "payment", label: "Thanh toán", icon: CreditCard },
  { key: "review", label: "Xác nhận", icon: CheckCircle },
];

export default function CheckoutProgress({
  currentStep,
}: CheckoutProgressProps) {
  if (currentStep === "success") return null;

  const currentIndex = STEPS.findIndex((step) => step.key === currentStep);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isUpcoming = index > currentIndex;

          return (
            <div key={step.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isCompleted
                      ? "#3b4417"
                      : isActive
                        ? "#3b4417"
                        : "#e8e6dc",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center relative z-10 ${
                    isCompleted || isActive ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={24} strokeWidth={3} />
                  ) : (
                    <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                  )}
                </motion.div>

                <motion.p
                  initial={false}
                  animate={{
                    color: isCompleted || isActive ? "#3b4417" : "#9ca3af",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  className="mt-2 text-xs md:text-sm text-center uppercase tracking-wide"
                >
                  {step.label}
                </motion.p>
              </div>

              {index < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 bg-[#e8e6dc] relative -mt-8 mx-2">
                  <motion.div
                    initial={false}
                    animate={{
                      width: isCompleted ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-[#3b4417]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
