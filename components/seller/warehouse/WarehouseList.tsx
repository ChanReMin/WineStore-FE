"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Package,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { warehouseService, type Warehouse } from "@/services/warehouseService";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

interface WarehouseListProps {
  warehouses: Warehouse[];
  onViewDetail: (id: number) => void;
  onEdit: (warehouse: Warehouse) => void;
  onRefresh: () => void;
}

export default function WarehouseList({
  warehouses,
  onViewDetail,
  onEdit,
  onRefresh,
}: WarehouseListProps) {
  const t = useTranslations("seller.warehouses");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            {t("status.pending")}
          </Badge>
        );
      case 1:
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {t("status.active")}
          </Badge>
        );
      case 2:
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            {t("status.banned")}
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleDelete = async (warehouse: Warehouse) => {
    if (warehouse.status !== 0) {
      toast.error(t("list.deleteOnlyPending"));
      return;
    }

    if (!confirm(t("list.deleteConfirm", { name: warehouse.name }))) {
      return;
    }

    setDeletingId(warehouse.id);
    try {
      const result = await warehouseService.deleteWarehouse(warehouse.id);
      toast.success(result.message || t("list.deleteSuccess"));
      onRefresh();
    } catch (error: any) {
      console.error("Error deleting warehouse:", error);
      toast.error(error.message || t("list.deleteError"));
    } finally {
      setDeletingId(null);
    }
  };

  if (warehouses.length === 0) {
    return (
      <Card className="border-[#d4d6b4]">
        <CardContent className="p-12 text-center">
          <Package className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
          <p className="text-neutral-500 text-lg">{t("list.noWarehouses")}</p>
          <p className="text-neutral-400 text-sm mt-2">
            {t("list.noWarehousesDesc")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {warehouses?.map((warehouse, index) => (
        <motion.div
          key={warehouse.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300 border-[#d4d6b4] hover:border-[#3b4417] h-full">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-[#3b4417] text-lg mb-2 line-clamp-1">
                    {warehouse.name}
                  </h3>
                  {getStatusBadge(warehouse.status)}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={deletingId === warehouse.id}
                    >
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onViewDetail(warehouse.id)}
                      className="cursor-pointer"
                    >
                      <Eye size={16} className="mr-2" />
                      {t("list.viewDetails")}
                    </DropdownMenuItem>
                    {warehouse.status === 1 && (
                      <DropdownMenuItem
                        onClick={() => onEdit(warehouse)}
                        className="cursor-pointer"
                      >
                        <Edit size={16} className="mr-2" />
                        {t("list.edit")}
                      </DropdownMenuItem>
                    )}
                    {warehouse.status === 0 && (
                      <DropdownMenuItem
                        onClick={() => handleDelete(warehouse)}
                        className="cursor-pointer text-red-600"
                      >
                        <Trash2 size={16} className="mr-2" />
                        {t("list.delete")}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2 text-sm text-[#7a8451] mb-4">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <div className="flex flex-col">
                  <span className="line-clamp-2">{warehouse.location}</span>
                  {warehouse.city && (
                    <span className="text-xs mt-0.5">{warehouse.city}</span>
                  )}
                </div>
              </div>

              {/* Description */}
              {warehouse.description && (
                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                  {warehouse.description}
                </p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#f5f3e8] rounded-lg p-3">
                  <p className="text-xs text-[#7a8451] uppercase tracking-wide mb-1">
                    {t("list.products")}
                  </p>
                  <p className="text-lg font-bold text-[#3b4417]">
                    {warehouse.inventorySummary?.totalProducts || 0}
                  </p>
                </div>
                <div className="bg-[#f5f3e8] rounded-lg p-3">
                  <p className="text-xs text-[#7a8451] uppercase tracking-wide mb-1">
                    {t("list.quantity")}
                  </p>
                  <p className="text-lg font-bold text-[#3b4417]">
                    {(
                      warehouse.inventorySummary?.totalQuantity ?? 0
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-1 text-xs text-neutral-400 pt-3 border-t border-neutral-100">
                <Calendar size={12} />
                <span>
                  {t("list.updated")}:{" "}
                  {new Date(warehouse.updatedAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
