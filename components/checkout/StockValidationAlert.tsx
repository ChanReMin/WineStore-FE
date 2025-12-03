"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface StockValidationAlertProps {
  outOfStockItems: Array<{
    productName: string;
    currentStock: number;
    requestedQuantity: number;
  }>;
  onDismiss?: () => void;
}

export default function StockValidationAlert({
  outOfStockItems,
  onDismiss,
}: StockValidationAlertProps) {
  if (outOfStockItems.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        className="mb-6 overflow-hidden rounded-lg border-l-4 border-red-500 bg-red-50 shadow-md"
      >
        <div className="flex items-start gap-4 p-5">
          <div className="flex-shrink-0">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100"
            >
              <AlertCircle className="h-5 w-5 text-red-600" />
            </motion.div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              {outOfStockItems.length === 1
                ? "Sản phẩm không đủ hàng"
                : `${outOfStockItems.length} sản phẩm không đủ hàng`}
            </h3>

            <div className="space-y-2">
              {outOfStockItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-md bg-red-100 p-3 text-sm text-red-800"
                >
                  <p className="font-semibold mb-1">{item.productName}</p>
                  <p>
                    Bạn đang đặt{" "}
                    <span className="font-bold">{item.requestedQuantity}</span>{" "}
                    sản phẩm, nhưng chỉ còn{" "}
                    <span className="font-bold">{item.currentStock}</span> trong
                    kho.
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-3 text-sm text-red-700">
              Vui lòng điều chỉnh số lượng trong giỏ hàng trước khi đặt hàng.
            </p>
          </div>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
