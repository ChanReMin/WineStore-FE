"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Address } from "@/types/profile";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
}: AddressCardProps) {
  const t = useTranslations("profile.addresses.card");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Default Badge */}
      {address.is_default && (
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          className="absolute right-0 top-0 rounded-bl-lg bg-[#33391d] px-3 py-1 text-xs font-medium text-white"
        >
          {t("default")}
        </motion.div>
      )}

      <div className="space-y-3">
        {/* Name & Phone */}
        <div>
          <h3 className="text-lg font-semibold text-[#33391d]">
            {address.full_name}
          </h3>
          <p className="text-sm text-neutral-600">{address.phone_number}</p>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-sm text-neutral-700">
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p>{address.address_line}</p>
            <p>
              {address.city}, {address.state}, {address.country}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(address)}
            className="flex items-center gap-1.5 rounded-md border border-[#33391d] px-3 py-1.5 text-sm text-[#33391d] transition-colors hover:bg-[#33391d] hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            {t("edit")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(address.id)}
            className="flex items-center gap-1.5 rounded-md border border-red-500 px-3 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-500 hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            {t("delete")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
