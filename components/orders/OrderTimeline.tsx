"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface OrderTimelineProps {
  status: number;
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const t = useTranslations("orders.timeline");

  const steps = [
    {
      id: 1,
      labelKey: "pendingLabel",
      descKey: "pendingDesc",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      emoji: "📝",
    },
    {
      id: 2,
      labelKey: "confirmedLabel",
      descKey: "confirmedDesc",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      emoji: "✅",
    },
    {
      id: 3,
      labelKey: "paidLabel",
      descKey: "paidDesc",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      emoji: "💰",
    },
  ];

  // If cancelled, show different timeline
  if (status === 5 || status === 6) {
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <div className="flex items-center justify-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.div>
          <div>
            <p className="font-semibold text-red-900">{t("cancelledTitle")}</p>
            <p className="text-sm text-red-700">{t("cancelledDesc")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-linear-to-r from-amber-50 to-orange-50 p-6">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-0 top-6 h-1 w-full bg-neutral-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((status - 1) / 2) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-linear-to-r from-[#33391d] to-[#5a6332]"
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = status > step.id;
            const isCurrent = status === step.id;
            const isPending = status < step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {/* Icon Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                    isCompleted
                      ? "bg-[#33391d] text-white shadow-lg"
                      : isCurrent
                        ? "bg-white border-4 border-[#33391d] text-[#33391d] shadow-lg animate-pulse"
                        : "bg-white border-2 border-neutral-300 text-neutral-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </motion.div>

                {/* Label */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className={`mt-2 text-center text-xs font-medium ${
                    isCompleted || isCurrent
                      ? "text-[#33391d]"
                      : "text-neutral-500"
                  }`}
                >
                  {t(step.labelKey)}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
