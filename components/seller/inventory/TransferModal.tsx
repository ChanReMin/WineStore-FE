"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, Package, MapPin, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { InventoryItem } from "@/types/inventory";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  warehouses: Array<{ id: number; name: string; location?: string }>;
  onTransfer?: (config: TransferConfig) => Promise<void>;
}

interface TransferConfig {
  productId: number;
  inventoryId: number;
  fromWarehouseId: number;
  toWarehouseId: number;
  quantity: number;
  note: string;
}

export default function TransferModal({
  isOpen,
  onClose,
  item,
  warehouses,
  onTransfer,
}: TransferModalProps) {
  const [toWarehouseId, setToWarehouseId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [note, setNote] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [error, setError] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setToWarehouseId("");
      setQuantity("");
      setNote("");
      setError("");
    }
  }, [isOpen, item]);

  if (!item) return null;

  const availableWarehouses = warehouses.filter(
    (w) => w.id !== item.warehouse.id
  );

  const selectedWarehouse = warehouses.find(
    (w) => w.id === Number(toWarehouseId)
  );

  const handleQuantityChange = (value: string) => {
    const num = value.replace(/[^0-9]/g, "");
    setQuantity(num);
    setError("");
  };

  const validateTransfer = (): boolean => {
    if (!toWarehouseId) {
      setError("Vui lòng chọn kho đích");
      return false;
    }

    const qty = Number(quantity);
    if (!qty || qty <= 0) {
      setError("Số lượng phải lớn hơn 0");
      return false;
    }

    if (qty > item.quantityOnHand) {
      setError(`Số lượng vượt quá tồn kho hiện tại (${item.quantityOnHand})`);
      return false;
    }

    return true;
  };

  const handleTransfer = async () => {
    if (!validateTransfer()) return;

    setIsTransferring(true);
    try {
      const config: TransferConfig = {
        productId: item.product.id,
        inventoryId: item.id,
        fromWarehouseId: item.warehouse.id,
        toWarehouseId: Number(toWarehouseId),
        quantity: Number(quantity),
        note,
      };

      if (onTransfer) {
        await onTransfer(config);
      }

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setIsTransferring(false);
    }
  };

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
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl max-h-[95vh] overflow-hidden"
            >
              <Card className="border-[#d4d6b4] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
                {/* Header */}
                <div className="p-4 md:p-6 border-b border-[#e8e6dc] bg-[#fdfbf5]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="p-2 md:p-2.5 bg-[#3b4417] rounded-lg">
                        <ArrowRightLeft className="w-4 md:w-5 h-4 md:h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-[#3b4417]">
                          Chuyển kho
                        </h2>
                        <p className="text-xs md:text-sm text-neutral-600 mt-0.5">
                          Chuyển sản phẩm giữa các kho
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-neutral-500" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
                  {/* Product Info */}
                  <div className="p-3 md:p-4 bg-[#f5f3e8] rounded-lg border border-[#e8e6dc]">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <Package className="w-4 md:w-5 h-4 md:h-5 text-[#7a8451]" />
                      <h3 className="text-sm md:text-base font-semibold text-[#3b4417]">
                        Thông tin sản phẩm
                      </h3>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <div className="flex justify-between gap-2">
                        <span className="text-xs md:text-sm text-neutral-600">
                          Sản phẩm:
                        </span>
                        <span className="text-xs md:text-sm font-medium text-[#3b4417] text-right">
                          {item.product.name}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-xs md:text-sm text-neutral-600">
                          Kho hiện tại:
                        </span>
                        <span className="text-xs md:text-sm font-medium text-[#3b4417]">
                          {item.warehouse.name}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-xs md:text-sm text-neutral-600">
                          Tồn kho:
                        </span>
                        <span className="text-base md:text-lg font-bold text-emerald-600">
                          {item.quantityOnHand} sản phẩm
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Form */}
                  <div className="space-y-4">
                    {/* To Warehouse */}
                    <div>
                      <Label className="text-xs md:text-sm font-semibold text-[#3b4417] mb-1.5 md:mb-2 block">
                        Kho đích <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={toWarehouseId}
                        onValueChange={setToWarehouseId}
                      >
                        <SelectTrigger className="border-[#d4d6b4]">
                          <SelectValue placeholder="Chọn kho đích..." />
                        </SelectTrigger>
                        <SelectContent>
                          {availableWarehouses.map((warehouse) => (
                            <SelectItem
                              key={warehouse.id}
                              value={warehouse.id.toString()}
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#7a8451]" />
                                <div>
                                  <p className="font-medium">
                                    {warehouse.name}
                                  </p>
                                  <p className="text-xs text-neutral-500">
                                    {warehouse.location}
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Quantity */}
                    <div>
                      <Label className="text-xs md:text-sm font-semibold text-[#3b4417] mb-1.5 md:mb-2 block">
                        Số lượng chuyển <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        placeholder="0"
                        className="border-[#d4d6b4]"
                      />
                      <p className="text-xs text-neutral-500 mt-1">
                        Tối đa: {item.quantityOnHand} sản phẩm
                      </p>
                    </div>

                    {/* Note */}
                    <div>
                      <Label className="text-xs md:text-sm font-semibold text-[#3b4417] mb-1.5 md:mb-2 block">
                        Ghi chú
                      </Label>
                      <Textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Nhập lý do chuyển kho..."
                        className="border-[#d4d6b4] min-h-[60px] md:min-h-[80px] text-sm"
                      />
                    </div>
                  </div>

                  {/* Preview */}
                  {toWarehouseId && quantity && Number(quantity) > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <p className="text-xs md:text-sm font-medium text-blue-900">
                        Xác nhận chuyển kho:
                      </p>
                      <p className="text-xs md:text-sm text-blue-700 mt-1">
                        Chuyển <span className="font-bold">{quantity}</span> sản
                        phẩm từ{" "}
                        <span className="font-bold">{item.warehouse.name}</span>{" "}
                        đến{" "}
                        <span className="font-bold">
                          {selectedWarehouse?.name}
                        </span>
                      </p>
                    </motion.div>
                  )}

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 rounded-lg border border-red-200 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <p className="text-sm text-red-700">{error}</p>
                    </motion.div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 md:p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                  <div className="flex gap-2 md:gap-3 justify-end">
                    <Button
                      onClick={onClose}
                      variant="outline"
                      disabled={isTransferring}
                      className="border-[#d4d6b4] hover:bg-white text-sm md:text-base px-4 md:px-6"
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={handleTransfer}
                      disabled={isTransferring || !toWarehouseId || !quantity}
                      className="bg-[#3b4417] hover:bg-[#2a2f18] text-white min-w-[100px] md:min-w-[120px] text-sm md:text-base px-4 md:px-6"
                    >
                      {isTransferring ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Đang chuyển...
                        </>
                      ) : (
                        <>
                          <ArrowRightLeft className="w-4 h-4 mr-2" />
                          Chuyển kho
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
