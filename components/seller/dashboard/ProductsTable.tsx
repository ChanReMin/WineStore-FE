"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

  const handleAddPromotionConfirm = (productId: number, promotionIds: number[]) => {
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
          Không tìm thấy sản phẩm
        </h3>
        <p className="text-[#7a8451]">
          Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-[#d4d6b4] overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#f5f3e8] hover:bg-[#f5f3e8]">
              <TableHead className="font-semibold text-[#3b4417]">ID</TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Sản phẩm
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Giá
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Danh mục
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Tồn kho
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Trạng thái
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417]">
                Ngày tạo
              </TableHead>
              <TableHead className="font-semibold text-[#3b4417] text-right">
                Thao tác
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
                    <p className="text-sm text-[#7a8451]">{product.brand}</p>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-[#3b4417]">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#f5f3e8] text-[#3b4417] text-sm">
                    {product.category}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#7a8451]" />
                    <span
                      className={`font-medium ${
                        product.total_inventory < 20
                          ? "text-orange-600"
                          : "text-[#3b4417]"
                      }`}
                    >
                      {product.total_inventory}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <ProductStatusBadge
                    status={product.status}
                    statusText={product.status_text}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-[#7a8451]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(product.created_at)}
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
                      title="Xem chi tiết"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddPromotion(product)}
                      className="p-2 rounded-lg hover:bg-amber-50 text-amber-600 transition-colors"
                      title="Thêm khuyến mãi"
                    >
                      <Tag className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(product)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(product)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                      title="Xóa"
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
      {products.some((p) => p.approved_at) && (
        <div className="p-4 bg-[#fdfbf5] border-t border-[#e8e6dc]">
          <div className="flex items-start gap-3 text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <p className="font-medium text-[#3b4417] mb-1">
                Thông tin phê duyệt
              </p>
              <p className="text-[#7a8451]">
                Sản phẩm đã được duyệt sẽ hiển thị cho khách hàng. Sản phẩm chờ
                duyệt cần được Admin xét duyệt trước khi bán.
              </p>
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
                category_id: 1, // Map from category name to ID
                brand_id: 1, // Map from brand name to ID
                name: selectedProduct.name,
                price: selectedProduct.price,
                wine_type: "Vang đỏ",
                country_of_production: "",
                grape_variety: "",
                concentration: 0,
                production_area: "",
                capacity: 750,
                ideal_temperature: "",
                humidity: "",
                avoid_light: "",
                place_the_bottle_horizontally: "",
                avoid_vibration: "",
                opened_wine: "",
                use_wine_cabinet: "",
                images: [],
                description: "",
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
