"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Loader2,
  Package,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { InventoryItem } from "@/types/inventory";
import { useTranslations } from "next-intl";

interface UpdateInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    itemId: number,
    type: "in" | "out",
    quantity: number,
    note: string
  ) => Promise<void>;
  item: InventoryItem | null;
}

export default function UpdateInventoryModal({
  isOpen,
  onClose,
  onSubmit,
  item,
}: UpdateInventoryModalProps) {
  const t = useTranslations("seller.inventory.updateModal");
  const [type, setType] = useState<"in" | "out">("in");
  const [quantity, setQuantity] = useState<number>(0);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || quantity <= 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(item.id, type, quantity, note);
      onClose();
      setQuantity(0);
      setNote("");
      setType("in");
    } catch (error) {
      console.error("Error updating inventory:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!item) return null;

  const newQuantity =
    type === "in"
      ? item.quantity_on_hand + quantity
      : item.quantity_on_hand - quantity;

  const isValid =
    quantity > 0 && (type === "in" || quantity <= item.quantity_on_hand);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 p-4"
          >
            <Card className="border-[#d4d6b4] shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#e8e6dc] bg-[#f5f3e8]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#3b4417] rounded-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#3b4417]">
                      {t("title")}
                    </h2>
                    <p className="text-sm text-[#7a8451]">
                      {item.product.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="p-2 rounded-lg hover:bg-[#e8e6dc] transition-colors"
                >
                  <X className="w-5 h-5 text-[#3b4417]" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Current Stock Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4">
                    <p className="text-sm text-[#7a8451] mb-1">
                      {t("warehouse")}
                    </p>
                    <p className="font-semibold text-[#3b4417]">
                      {item.warehouse.name}
                    </p>
                    <p className="text-sm text-[#7a8451]">
                      {item.warehouse.location}
                    </p>
                  </div>
                  <div className="bg-[#fdfbf5] border border-[#e8e6dc] rounded-lg p-4">
                    <p className="text-sm text-[#7a8451] mb-1">
                      {t("currentStock")}
                    </p>
                    <p className="text-3xl font-bold text-[#3b4417]">
                      {item.quantity_on_hand}
                    </p>
                    <p className="text-sm text-[#7a8451]">
                      Safety Stock: {item.safety_stock}
                    </p>
                  </div>
                </div>

                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#3b4417] mb-3">
                    {t("type")}{" "}
                    <span className="text-red-600">{t("required")}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setType("in")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        type === "in"
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-[#d4d6b4] bg-white hover:border-emerald-500"
                      }`}
                    >
                      <TrendingUp
                        className={`w-8 h-8 mx-auto mb-2 ${
                          type === "in" ? "text-emerald-600" : "text-[#7a8451]"
                        }`}
                      />
                      <p
                        className={`font-semibold ${
                          type === "in" ? "text-emerald-700" : "text-[#3b4417]"
                        }`}
                      >
                        {t("stockIn")}
                      </p>
                      <p className="text-sm text-[#7a8451] mt-1">
                        {t("stockInDesc")}
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setType("out")}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        type === "out"
                          ? "border-red-500 bg-red-50"
                          : "border-[#d4d6b4] bg-white hover:border-red-500"
                      }`}
                    >
                      <TrendingDown
                        className={`w-8 h-8 mx-auto mb-2 ${
                          type === "out" ? "text-red-600" : "text-[#7a8451]"
                        }`}
                      />
                      <p
                        className={`font-semibold ${
                          type === "out" ? "text-red-700" : "text-[#3b4417]"
                        }`}
                      >
                        {t("stockOut")}
                      </p>
                      <p className="text-sm text-[#7a8451] mt-1">
                        {t("stockOutDesc")}
                      </p>
                    </button>
                  </div>
                </div>

                {/* Quantity Input */}
                <div>
                  <label className="block text-sm font-medium text-[#3b4417] mb-2">
                    {t("quantity")}{" "}
                    <span className="text-red-600">{t("required")}</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={type === "out" ? item.quantity_on_hand : undefined}
                    value={quantity || ""}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] text-lg font-semibold"
                    placeholder={t("notePlaceholder")}
                  />
                  {type === "out" && quantity > item.quantity_on_hand && (
                    <p className="text-sm text-red-600 mt-1">
                      {t("exceedsStock")}
                    </p>
                  )}
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-[#3b4417] mb-2">
                    {t("note")}
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-[#d4d6b4] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b4417] focus:border-transparent transition-all text-[#3b4417] resize-none"
                    placeholder={t("notePlaceholder")}
                  />
                </div>

                {/* Preview */}
                {quantity > 0 && isValid && (
                  <div
                    className={`${
                      type === "in"
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-red-50 border-red-200"
                    } border rounded-lg p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className={`w-5 h-5 mt-0.5 shrink-0 ${
                          type === "in" ? "text-emerald-600" : "text-red-600"
                        }`}
                      />
                      <div className="flex-1">
                        <p
                          className={`font-medium mb-1 ${
                            type === "in" ? "text-emerald-900" : "text-red-900"
                          }`}
                        >
                          {type === "in"
                            ? t("confirmStockIn")
                            : t("confirmStockOut")}
                        </p>
                        <p
                          className={`text-sm ${
                            type === "in" ? "text-emerald-700" : "text-red-700"
                          }`}
                        >
                          {t("stockWillChange")}{" "}
                          <span className="font-semibold">
                            {item.quantity_on_hand}
                          </span>{" "}
                          → <span className="font-semibold">{newQuantity}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 border border-[#d4d6b4] text-[#3b4417] rounded-lg hover:bg-[#f5f3e8] transition-colors font-medium disabled:opacity-50"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isValid}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#3b4417] text-white rounded-lg hover:bg-[#2a2f18] transition-colors font-medium disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t("updating")}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {t("update")}
                    </>
                  )}
                </button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
