// types/promotion.ts
export interface Promotion {
  id: number;
  code: string;
  name: string;
  description: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT"; // API returns string enum
  discount_type?: number; // Legacy: 0: Percentage, 1: Fixed amount (for backward compatibility)
  discount_type_text?: string;
  discountValue: number;
  discount_value?: number; // Legacy (for backward compatibility)
  start_date: string;
  end_date: string;
  max_usage: number;
  used_count: number;
  remaining_usage?: number;
  status: number; // 1: Active, 0: Inactive
  status_text?: string;
  applicable_products_count?: number;
  created_at: string;
}

export interface ApplicableProduct {
  id: number;
  name: string;
  price: number;
}

export interface PromotionDetail extends Promotion {
  applicableProducts?: ApplicableProduct[];
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  per_page?: number;
}

export interface PromotionListResponse {
  success: boolean;
  data: {
    promotions: Promotion[];
    pagination: Pagination;
  };
}

export interface PromotionDetailResponse {
  success: boolean;
  data: PromotionDetail;
}

export interface UsageByDate {
  date: string;
  usageCount: number;
  discountAmount: number;
}

export interface PromotionStatistics {
  promotion_id: number;
  promotionCode: string;
  total_usage: number;
  maxusage: number;
  remainingUsage: number;
  totalDiscountAmount: number;
  totalOrders: number;
  usageByDate: UsageByDate[];
}

export interface PromotionStatisticsResponse {
  success: boolean;
  data: PromotionStatistics;
}

export interface PromotionFormData {
  code: string;
  name: string;
  description: string;
  discount_type: number;
  discount_value: number;
  start_date: string;
  end_date: string;
  max_usage: number;
  productIds?: number[];
  status?: number;
}
