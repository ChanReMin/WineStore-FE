"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Edit,
  Trash2,
  Eye,
  Calendar,
  Package,
  CheckCircle,
  Tag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductStatusBadge from "./ProductStatusBadge";
import ProductDetailModal from "./ProductDetailModal";
import ProductFormModal from "./ProductFormModal";
import DeleteProductModal from "./DeleteProductModal";
import AddPromotionToProductModal from "./AddPromotionToProductModal";
import type { Product } from "@/types/product";
import type { ProductFormData } from "@/types/productForm";

interface ProductsTableProps {
  products: Product[];
  onEdit?: (id: number, data: ProductFormData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  onAddPromotion?: (productId: number, promotionIds: number[]) => void;
}

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
  onAddPromotion,
}: ProductsTableProps) {
  const t = useTranslations("seller.products.table");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddPromotionModalOpen, setIsAddPromotionModalOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleAddPromotion = (product: Product) => {
    setSelectedProduct(product);
    setIsAddPromotionModalOpen(true);
  };

  const handleAddPromotionConfirm = (
    productId: number,
    promotionIds: number[]
  ) => {
    if (onAddPromotion) {
      onAddPromotion(productId, promotionIds);
    }
  };

  const handleEditSubmit = async (data: ProductFormData) => {
    if (selectedProduct && onEdit) {
      await onEdit(selectedProduct.id, data);
    }
  };

  const handleDeleteConfirm = async (productId: number) => {
    if (onDelete) {
      await onDelete(productId);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (products.length === 0) {
    return (
      <Card className="p-12 text-center border-[#d4d6b4]">
        <Package className="w-16 h-16 mx-auto text-[#7a8451] mb-4 opacity-50" />
        <h3 className="text-xl font-semibold text-[#3b4417] mb-2">
          {t("noProductsFound")}
        </h3>
        <p className="text-[#7a8451]">{t("tryChangingFilter")}</p>
      </Card>
    );
  }

  return (
    <Card className="border-[#d4d6b4] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f5f3e8] hover:bg-[#f5f3e8]">
              <TableHead className="font-semibold text-[#3b4417]">
                {t("id")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("product")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("price")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("category")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("inventory")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("status")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                {t("createdDate")}
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417] text-right">
                {t("actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredRow(product.id)}
                onMouseLeave={() => setHoveredRow(null)}
                className="border-b border-[#e8e6dc] hover:bg-[#fdfbf5] transition-colors"
              >
                <TableCell className="font-medium text-[#3b4417]">
                  #{product.id}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-[#3b4417] mb-1">
                      {product.name}
                    </p>
                    <p className="text-sm text-[#7a8451]">{product.brand.name}</p>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-[#3b4417]">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#f5f3e8] text-[#3b4417] text-sm">
                    {product.category.name}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#7a8451]" />
                    <span
                      className={`font-medium ${
                        product.totalInventory < 20
                          ? "text-orange-600"
                          : "text-[#3b4417]"
                      }`}
                    >
                      {product.totalInventory}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <ProductStatusBadge
                    status={product.status}
                    statusText={product.statusText}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-[#7a8451]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(product.createdAt)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewDetails(product)}
                      className="p-2 rounded-lg hover:bg-[#f5f3e8] text-[#3b4417] transition-colors"
                      title={t("viewDetails")}
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddPromotion(product)}
                      className="p-2 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors"
                      title={t("addPromotion")}
                    >
                      <Tag className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(product)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                      title={t("edit")}
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(product)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                      title={t("delete")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Approval Info for Approved Products */}
      {products.some((p) => p.status === 1) && (
        <div className="p-4 bg-[#fdfbf5] border-t border-[#e8e6dc]">
          <div className="flex items-start gap-3 text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <p className="font-medium text-[#3b4417] mb-1">
                {t("approvalInfo")}
              </p>
              <p className="text-[#7a8451]">{t("approvalDescription")}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={(product) => {
          setIsDetailModalOpen(false);
          handleEdit(product);
        }}
      />

      <ProductFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={
          selectedProduct
            ? {
                categoryId: selectedProduct.category.id,
                brandId: selectedProduct.brand.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                winetype: selectedProduct.winetype || "",
                countryOfProduction: selectedProduct.originCountry || "",
                grapeVariety: selectedProduct.grapeVariety || "",
                concentration: selectedProduct.concentration || 0,
                productionArea: selectedProduct.productionArea || "",
                capacity: selectedProduct.capacity || 750,
                idealtemperature: selectedProduct.idealtemperature || "",
                humidity: selectedProduct.humidity || "",
                avoidLight: selectedProduct.avoidLight || "",
                placeTheBottleHorizontally: selectedProduct.placeTheBottleHorizontally || "",
                avoidVibration: selectedProduct.avoidVibration || "",
                openedWine: selectedProduct.openedWine || "",
                useWineCabinet: selectedProduct.useWineCabinet || "",
                images: selectedProduct.images ? [selectedProduct.images] : [],
                imageFiles: [],
                description: selectedProduct.description || "",
              }
            : undefined
        }
        mode="edit"
      />

      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        product={selectedProduct}
      />

      <AddPromotionToProductModal
        isOpen={isAddPromotionModalOpen}
        onClose={() => setIsAddPromotionModalOpen(false)}
        product={selectedProduct}
        onConfirm={handleAddPromotionConfirm}
      />
    </Card>
  );
}
