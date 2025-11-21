// types/promotion.ts
export interface Promotion {
  id: number;
  code: string;
  name: string;
  description: string;
  discount_type: number; // 1: Percentage, 2: Fixed amount
  discount_value: number;
  start_date: string;
  end_date: string;
  max_usage: number;
  used_count: number;
  status: number; // 1: Active, 0: Inactive
  created_at: string;
}

export interface ApplicableProduct {
  id: number;
  name: string;
  price: number;
}

export interface PromotionDetail extends Promotion {
  applicable_products?: ApplicableProduct[];
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
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
  usage_count: number;
  discount_amount: number;
}

export interface PromotionStatistics {
  promotion_id: number;
  promotion_code: string;
  total_usage: number;
  max_usage: number;
  remaining_usage: number;
  total_discount_amount: number;
  total_orders: number;
  usage_by_date: UsageByDate[];
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
  product_ids?: number[];
  status?: number;
}
