import { CartItem, Address, PaymentMethod } from "@/contexts/CheckoutContext";

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 789,
    productId: 101,
    productName: "Rượu Vang Đỏ Château Margaux 2015",
    productSlug: "ruou-vang-do-chateau-margaux-2015",
    productImage: "/wines/wine-1.jpg",
    sku: "WR-CHM-2015",
    unitPrice: 15000000.0,
    quantity: 2,
    lineTotal: 30000000.0,
    stockAvailable: 5,
    isAvailable: true,
  },
  {
    id: 790,
    productId: 102,
    productName: "Rượu Vang Trắng Chardonnay Reserve",
    productSlug: "ruou-vang-trang-chardonnay-reserve",
    productImage: "/wines/wine-2.jpg",
    sku: "WW-CHR-2020",
    unitPrice: 3500000.0,
    quantity: 1,
    lineTotal: 3500000.0,
    stockAvailable: 10,
    isAvailable: true,
  },
];

// DEPRECATED: Addresses are now loaded from API via profileService.getAddresses()
// This mock data is kept for reference only
export const MOCK_ADDRESSES: Address[] = [
  {
    id: 123,
    fullName: "Nguyễn Văn A",
    phoneNumber: "0912345678",
    addressLine: "123 Nguyễn Huệ",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    country: "Việt Nam",
    isDefault: true,
    addressType: "HOME",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: 124,
    fullName: "Nguyễn Văn A",
    phoneNumber: "0912345678",
    addressLine: "456 Lê Lợi",
    ward: "Phường Bến Thành",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    country: "Việt Nam",
    isDefault: false,
    addressType: "HOME",
    createdAt: "2024-03-20T10:30:00Z",
  },
];

// FALLBACK ONLY: Payment methods are now loaded from API via paymentService.getPaymentMethods()
// This mock data is kept as fallback if API fails
// Payment Method IDs from backend:
// 1: COD (Cash on Delivery) - No payment URL, direct order success
// 2: VNPAY - Returns paymentUrl for redirect to VNPAY gateway
// 3: MOMO - Returns paymentUrl for redirect to MoMo gateway
export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 1,
    code: "COD",
    name: "Thanh toán khi nhận hàng (COD)",
    description: "Thanh toán bằng tiền mặt khi nhận hàng",
    isActive: true,
  },
  {
    id: 2,
    code: "VNPAY",
    name: "Thanh toán qua VNPAY",
    description: "Thanh toán online qua cổng VNPAY - Chuyển hướng sang trang thanh toán",
    isActive: true,
  },
  {
    id: 3,
    code: "MOMO",
    name: "Ví điện tử MoMo",
    description: "Thanh toán qua ví điện tử MoMo - Chuyển hướng sang ứng dụng MoMo",
    isActive: true,
  },
];

// Mock API functions
export const mockAPI = {
  getCart: async (): Promise<CartItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_CART_ITEMS;
  },

  // DEPRECATED: Use profileService.getAddresses() instead
  getAddresses: async (): Promise<Address[]> => {
    console.warn(
      "mockAPI.getAddresses is deprecated. Use profileService.getAddresses() instead."
    );
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_ADDRESSES;
  },

  // DEPRECATED: Use paymentService.getPaymentMethods() instead
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    console.warn(
      "mockAPI.getPaymentMethods is deprecated. Use paymentService.getPaymentMethods() instead."
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_PAYMENT_METHODS;
  },
};
