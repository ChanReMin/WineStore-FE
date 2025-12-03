"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface OrderStatsProps {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    paid: number;
    cancelled: number;
  };
}

export default function OrderStats({ stats }: OrderStatsProps) {
  const t = useTranslations("orders.stats");

  const statItems = [
    {
      label: t("total"),
      value: stats.total,
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-900",
    },
    {
      label: t("pending"),
      value: stats.pending,
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-900",
    },
    {
      label: t("confirmed"),
      value: stats.confirmed,
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-900",
    },
    {
      label: t("paid"),
      value: stats.paid,
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className={`rounded-lg ${item.bgColor} p-4 shadow-sm transition-all`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${item.textColor}`}>
                {item.label}
              </p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                className={`mt-1 text-3xl font-bold ${item.textColor}`}
              >
                {item.value}
              </motion.p>
            </div>
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className={item.textColor}
            >
              {item.icon}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
