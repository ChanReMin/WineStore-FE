// promotions.mock.ts

import {
  Promotion,
  PromotionDetailResponse,
  PromotionListResponse,
  PromotionStatisticsResponse,
} from "@/types/promotion";

export const mockPromotions: Promotion[] = [
  {
    id: 1,
    code: "SUMMER2024",
    name: "Giảm giá mùa hè",
    description: "Giảm 10% cho đơn từ 1 triệu",
    discount_type: 1,
    discount_value: 10,
    start_date: "2024-06-01T00:00:00Z",
    end_date: "2024-08-31T23:59:59Z",
    max_usage: 1000,
    used_count: 345,
    status: 1,
    created_at: "2024-05-01T00:00:00Z",
  },
  {
    id: 2,
    code: "WINEFEST2024",
    name: "Lễ hội rượu vang",
    description: "Giảm 20% cho tất cả đơn hàng",
    discount_type: 1,
    discount_value: 20,
    start_date: "2024-07-15T00:00:00Z",
    end_date: "2024-09-15T23:59:59Z",
    max_usage: 500,
    used_count: 120,
    status: 1,
    created_at: "2024-06-01T00:00:00Z",
  },
  {
    id: 3,
    code: "REDWINE2024",
    name: "Khuyến mãi rượu vang đỏ",
    description: "Giảm 5% khi mua từ 2 chai vang đỏ",
    discount_type: 1,
    discount_value: 5,
    start_date: "2024-05-01T00:00:00Z",
    end_date: "2024-06-30T23:59:59Z",
    max_usage: 300,
    used_count: 85,
    status: 0,
    created_at: "2024-04-20T00:00:00Z",
  },
  {
    id: 4,
    code: "PREMIUM2024",
    name: "Ưu đãi dòng cao cấp",
    description: "Giảm 1.000.000đ cho các chai trên 10 triệu",
    discount_type: 2,
    discount_value: 1000000,
    start_date: "2024-08-01T00:00:00Z",
    end_date: "2024-09-30T23:59:59Z",
    max_usage: 200,
    used_count: 30,
    status: 1,
    created_at: "2024-07-10T00:00:00Z",
  },
  {
    id: 5,
    code: "FLASHSALE",
    name: "Flash Sale cuối tuần",
    description: "Giảm 25% cho đơn từ 3 triệu",
    discount_type: 1,
    discount_value: 25,
    start_date: "2024-09-05T00:00:00Z",
    end_date: "2024-09-07T23:59:59Z",
    max_usage: 100,
    used_count: 65,
    status: 1,
    created_at: "2024-09-01T00:00:00Z",
  },
];

export const mockGetPromotions: PromotionListResponse = {
  success: true,
  data: {
    promotions: mockPromotions,
    pagination: {
      current_page: 1,
      total_pages: 1,
      total_items: mockPromotions.length,
    },
  },
};

export const mockPromotionDetail: PromotionDetailResponse = {
  success: true,
  data: {
    ...mockPromotions[0],
    applicable_products: [
      {
        id: 1,
        name: "Château Margaux 2015",
        price: 5940000,
      },
      {
        id: 2,
        name: "Bordeaux 2018",
        price: 3500000,
      },
      {
        id: 3,
        name: "Penfolds Grange",
        price: 12000000,
      },
    ],
  },
};

export const mockPromotionStatistics: PromotionStatisticsResponse = {
  success: true,
  data: {
    promotion_id: 1,
    promotion_code: "SUMMER2024",
    total_usage: 345,
    max_usage: 1000,
    remaining_usage: 655,
    total_discount_amount: 125000000,
    total_orders: 345,
    usage_by_date: [
      { date: "2024-06-01", usage_count: 15, discount_amount: 5400000 },
      { date: "2024-06-02", usage_count: 12, discount_amount: 4300000 },
      { date: "2024-06-03", usage_count: 9, discount_amount: 3800000 },
      { date: "2024-06-04", usage_count: 17, discount_amount: 6000000 },
      { date: "2024-06-05", usage_count: 22, discount_amount: 8100000 },
    ],
  },
};
