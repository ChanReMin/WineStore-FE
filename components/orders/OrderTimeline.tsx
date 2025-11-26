"use client";

import { motion } from "framer-motion";

interface OrderTimelineProps {
  status: number;
}

const steps = [
  {
    id: 1,
    label: "Chờ xác nhận",
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
  },
  {
    id: 2,
    label: "Đang xử lý",
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
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Đang giao",
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
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        />
      </svg>
    ),
  },
  {
    id: 4,
    label: "Đã giao",
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
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
];

export default function OrderTimeline({ status }: OrderTimelineProps) {
  // If cancelled, show different timeline
  if (status === 5) {
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
            <p className="font-semibold text-red-900">Đơn hàng đã bị hủy</p>
            <p className="text-sm text-red-700">Đơn hàng của bạn đã được hủy</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-6">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-0 top-6 h-1 w-full bg-neutral-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((status - 1) / 3) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#33391d] to-[#5a6332]"
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
                  {step.label}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
