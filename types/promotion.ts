// types/promotion.ts
export interface Promotion {
  id: number;
  code: string;
  name: string;
  description: string;
  discounttype: number; // 1: Percentage, 2: Fixed amount
  discountvalue: number;
  startdate: string;
  enddate: string;
  maxusage: number;
  usedcount: number;
  status: number; // 1: Active, 0: Inactive
  createdAt: string;
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
  currentPage: number;
  totalPages: number;
  totalItems: number;
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
  promotion_code: string;
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
  discounttype: number;
  discountvalue: number;
  startdate: string;
  enddate: string;
  maxusage: number;
  productIds?: number[];
  status?: number;
}
