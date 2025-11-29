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
    name: "Summer Discount",
    description: "10% off for orders from 1,000,000 VND",
    discounttype: 1,
    discountvalue: 10,
    startdate: "2024-06-01T00:00:00Z",
    enddate: "2024-08-31T23:59:59Z",
    maxusage: 1000,
    usedcount: 345,
    status: 1,
    createdAt: "2024-05-01T00:00:00Z",
  },
  {
    id: 2,
    code: "WINEFEST2024",
    name: "Wine Festival",
    description: "20% off on all orders",
    discounttype: 1,
    discountvalue: 20,
    startdate: "2024-07-15T00:00:00Z",
    enddate: "2024-09-15T23:59:59Z",
    maxusage: 500,
    usedcount: 120,
    status: 1,
    createdAt: "2024-06-01T00:00:00Z",
  },
  {
    id: 3,
    code: "REDWINE2024",
    name: "Red Wine Promotion",
    description: "5% off when purchasing 2 or more bottles of red wine",
    discounttype: 1,
    discountvalue: 5,
    startdate: "2024-05-01T00:00:00Z",
    enddate: "2024-06-30T23:59:59Z",
    maxusage: 300,
    usedcount: 85,
    status: 0,
    createdAt: "2024-04-20T00:00:00Z",
  },
  {
    id: 4,
    code: "PREMIUM2024",
    name: "Premium Line Offer",
    description: "1,000,000 VND off bottles over 10,000,000 VND",
    discounttype: 2,
    discountvalue: 1000000,
    startdate: "2024-08-01T00:00:00Z",
    enddate: "2024-09-30T23:59:59Z",
    maxusage: 200,
    usedcount: 30,
    status: 1,
    createdAt: "2024-07-10T00:00:00Z",
  },
  {
    id: 5,
    code: "FLASHSALE",
    name: "Weekend Flash Sale",
    description: "25% off for orders from 3,000,000 VND",
    discounttype: 1,
    discountvalue: 25,
    startdate: "2024-09-05T00:00:00Z",
    enddate: "2024-09-07T23:59:59Z",
    maxusage: 100,
    usedcount: 65,
    status: 1,
    createdAt: "2024-09-01T00:00:00Z",
  },
];

export const mockGetPromotions: PromotionListResponse = {
  success: true,
  data: {
    promotions: mockPromotions,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: mockPromotions.length,
    },
  },
};

export const mockPromotionDetail: PromotionDetailResponse = {
  success: true,
  data: {
    ...mockPromotions[0],
    applicableProducts: [
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
    promotionCode: "SUMMER2024",
    total_usage: 345,
    maxusage: 1000,
    remainingUsage: 655,
    totalDiscountAmount: 125000000,
    totalOrders: 345,
    usageByDate: [
      { date: "2024-06-01", usageCount: 15, discountAmount: 5400000 },
      { date: "2024-06-02", usageCount: 12, discountAmount: 4300000 },
      { date: "2024-06-03", usageCount: 9, discountAmount: 3800000 },
      { date: "2024-06-04", usageCount: 17, discountAmount: 6000000 },
      { date: "2024-06-05", usageCount: 22, discountAmount: 8100000 },
    ],
  },
};
