"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileImage,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  totalItems?: number;
  filteredItems?: number;
  availableColumns?: Array<{
    key: string;
    label: string;
    defaultChecked?: boolean;
  }>;
  onExport?: (config: ExportConfig) => Promise<void>;
}

interface ExportConfig {
  format: "csv" | "excel" | "pdf";
  range: "current" | "filtered" | "custom";
  columns: string[];
}

const defaultColumns = [
  { key: "product", label: "Tên sản phẩm", defaultChecked: true },
  { key: "warehouse", label: "Kho hàng", defaultChecked: true },
  { key: "quantity", label: "Số lượng", defaultChecked: true },
  { key: "safetyStock", label: "Mức an toàn", defaultChecked: true },
  { key: "status", label: "Trạng thái", defaultChecked: true },
  { key: "value", label: "Giá trị", defaultChecked: true },
  { key: "lastUpdated", label: "Cập nhật lần cuối", defaultChecked: true },
];

export default function ExportModal({
  isOpen,
  onClose,
  title = "Xuất dữ liệu Inventory",
  totalItems = 0,
  filteredItems = 0,
  availableColumns = defaultColumns,
  onExport,
}: ExportModalProps) {
  const [format, setFormat] = useState<"csv" | "excel" | "pdf">("excel");
  const [range, setRange] = useState<"current" | "filtered" | "custom">(
    "filtered"
  );
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    availableColumns.filter((col) => col.defaultChecked).map((col) => col.key)
  );
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const formats = [
    {
      value: "csv",
      label: "CSV",
      icon: FileText,
      description: "Tệp văn bản phân cách bằng dấu phẩy",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      value: "excel",
      label: "Excel",
      icon: FileSpreadsheet,
      description: "Bảng tính Microsoft Excel (.xlsx)",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      value: "pdf",
      label: "PDF",
      icon: FileImage,
      description: "Tài liệu PDF có định dạng",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  ];

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((k) => k !== columnKey)
        : [...prev, columnKey]
    );
  };

  const handleSelectAll = () => {
    if (selectedColumns.length === availableColumns.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(availableColumns.map((col) => col.key));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const config: ExportConfig = {
        format,
        range,
        columns: selectedColumns,
      };

      if (onExport) {
        await onExport(config);
      } else {
        // Simulate export
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      clearInterval(progressInterval);
      setProgress(100);
      setExportSuccess(true);

      // Auto close after success
      setTimeout(() => {
        onClose();
        resetState();
      }, 1500);
    } catch (error) {
      console.error("Export failed:", error);
      clearInterval(progressInterval);
      setIsExporting(false);
    }
  };

  const resetState = () => {
    setIsExporting(false);
    setExportSuccess(false);
    setProgress(0);
  };

  const getItemCount = () => {
    if (range === "current") return 10;
    if (range === "filtered") return filteredItems;
    return totalItems;
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <Card className="border-[#d4d6b4] shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-[#e8e6dc] bg-[#fdfbf5]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#3b4417] rounded-lg">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#3b4417]">
                          {title}
                        </h2>
                        <p className="text-sm text-neutral-600 mt-0.5">
                          Chọn định dạng và dữ liệu cần xuất
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
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {/* Format Selection */}
                  <div>
                    <Label className="text-sm font-semibold text-[#3b4417] mb-3 block uppercase tracking-wider">
                      Định dạng xuất
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {formats.map((fmt) => (
                        <motion.button
                          key={fmt.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormat(fmt.value as any)}
                          className={`
                            p-4 rounded-lg border-2 transition-all text-left
                            ${
                              format === fmt.value
                                ? `${fmt.borderColor} ${fmt.bgColor}`
                                : "border-[#e8e6dc] bg-white hover:border-[#d4d6b4]"
                            }
                          `}
                        >
                          <fmt.icon
                            className={`w-6 h-6 mb-2 ${format === fmt.value ? fmt.color : "text-neutral-400"}`}
                          />
                          <p
                            className={`font-semibold mb-1 ${format === fmt.value ? fmt.color : "text-[#3b4417]"}`}
                          >
                            {fmt.label}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {fmt.description}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Range Selection */}
                  <div>
                    <Label className="text-sm font-semibold text-[#3b4417] mb-3 block uppercase tracking-wider">
                      Phạm vi dữ liệu
                    </Label>
                    <div className="space-y-2">
                      {[
                        {
                          value: "current",
                          label: "Trang hiện tại",
                          count: 10,
                        },
                        {
                          value: "filtered",
                          label: "Tất cả kết quả lọc",
                          count: filteredItems,
                        },
                        {
                          value: "custom",
                          label: "Tùy chỉnh phạm vi",
                          count: totalItems,
                        },
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setRange(option.value as any)}
                          className={`
                            w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between
                            ${
                              range === option.value
                                ? "border-[#d4af37] bg-[#fdfbf5]"
                                : "border-[#e8e6dc] bg-white hover:border-[#d4d6b4]"
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center
                              ${range === option.value ? "border-[#d4af37]" : "border-neutral-300"}
                            `}
                            >
                              {range === option.value && (
                                <div className="w-3 h-3 rounded-full bg-[#d4af37]" />
                              )}
                            </div>
                            <span className="font-medium text-[#3b4417]">
                              {option.label}
                            </span>
                          </div>
                          <span className="text-sm text-neutral-600">
                            {option.count} mục
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Column Selection */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-semibold text-[#3b4417] uppercase tracking-wider">
                        Cột dữ liệu
                      </Label>
                      <Button
                        onClick={handleSelectAll}
                        variant="ghost"
                        size="sm"
                        className="text-[#3b4417] hover:text-[#d4af37]"
                      >
                        {selectedColumns.length === availableColumns.length
                          ? "Bỏ chọn tất cả"
                          : "Chọn tất cả"}
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 p-4 bg-[#fdfbf5] rounded-lg border border-[#e8e6dc]">
                      {availableColumns.map((column) => (
                        <div
                          key={column.key}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={column.key}
                            checked={selectedColumns.includes(column.key)}
                            onCheckedChange={() =>
                              handleColumnToggle(column.key)
                            }
                          />
                          <Label
                            htmlFor={column.key}
                            className="text-sm text-[#3b4417] cursor-pointer"
                          >
                            {column.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {isExporting && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#f5f3e8] rounded-lg border border-[#d4d6b4]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#3b4417]">
                          {exportSuccess
                            ? "Hoàn thành!"
                            : "Đang xuất dữ liệu..."}
                        </span>
                        <span className="text-sm font-bold text-[#d4af37]">
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                          className={`h-full ${exportSuccess ? "bg-emerald-500" : "bg-[#d4af37]"}`}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#e8e6dc] bg-[#fdfbf5]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-neutral-600">
                      Sẽ xuất{" "}
                      <span className="font-bold text-[#3b4417]">
                        {getItemCount()}
                      </span>{" "}
                      mục với{" "}
                      <span className="font-bold text-[#3b4417]">
                        {selectedColumns.length}
                      </span>{" "}
                      cột
                    </p>
                    <div className="flex gap-3">
                      <Button
                        onClick={onClose}
                        variant="outline"
                        disabled={isExporting}
                        className="border-[#d4d6b4] hover:bg-white"
                      >
                        Hủy
                      </Button>
                      <Button
                        onClick={handleExport}
                        disabled={isExporting || selectedColumns.length === 0}
                        className="bg-[#3b4417] hover:bg-[#2a2f18] text-white min-w-[120px]"
                      >
                        {isExporting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Đang xuất...
                          </>
                        ) : exportSuccess ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Thành công
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Xuất dữ liệu
                          </>
                        )}
                      </Button>
                    </div>
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
