"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  MapPin,
  CreditCard,
  CheckCircle,
  Check,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { CheckoutStep } from "@/contexts/CheckoutContext";

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

export default function CheckoutProgress({
  currentStep,
}: CheckoutProgressProps) {
  const t = useTranslations("checkout.progress");

  const STEPS = [
    { key: "cart", label: t("cart"), icon: ShoppingCart },
    { key: "address", label: t("address"), icon: MapPin },
    { key: "payment", label: t("payment"), icon: CreditCard },
    { key: "review", label: t("review"), icon: CheckCircle },
  ];

  if (currentStep === "success") return null;

  const currentIndex = STEPS.findIndex((step) => step.key === currentStep);

  return (
    <div className="mb-3 md:mb-5 lg:mb-8 xl:mb-10">
      <div className="flex items-center justify-between max-w-2xl lg:max-w-3xl mx-auto">
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
                  className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center relative z-10 ${
                    isCompleted || isActive ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={16} className="md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 xl:w-6 xl:h-6" strokeWidth={3} />
                  ) : (
                    <Icon size={16} className="md:w-[18px] md:h-[18px] lg:w-5 lg:h-5 xl:w-6 xl:h-6" strokeWidth={isActive ? 2 : 1.5} />
                  )}
                </motion.div>

                <motion.p
                  initial={false}
                  animate={{
                    color: isCompleted || isActive ? "#3b4417" : "#9ca3af",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  className="mt-1 md:mt-1.5 text-[8px] md:text-[10px] lg:text-xs xl:text-sm text-center uppercase tracking-wide"
                >
                  {step.label}
                </motion.p>
              </div>

              {index < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 bg-[#e8e6dc] relative -mt-4 md:-mt-5 lg:-mt-6 xl:-mt-8 mx-1 md:mx-2">
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
