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

export const MOCK_ADDRESSES: Address[] = [
  {
    id: 123,
    userId: 456,
    fullName: "Nguyễn Văn A",
    phoneNumber: "0912345678",
    addressLine: "123 Nguyễn Huệ",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: true,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: 124,
    userId: 456,
    fullName: "Nguyễn Văn A",
    phoneNumber: "0912345678",
    addressLine: "456 Lê Lợi",
    ward: "Phường Bến Thành",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: false,
    createdAt: "2024-03-20T10:30:00Z",
  },
];

export const MOCK_paymentMethodS: PaymentMethod[] = [
  {
    id: 1,
    code: "COD",
    name: "Thanh toán khi nhận hàng",
    description: "Thanh toán bằng tiền mặt khi nhận hàng",
    isActive: true,
  },
  {
    id: 2,
    code: "VNPAY",
    name: "Thanh toán qua VNPAY",
    description: "Thanh toán online qua cổng VNPAY",
    isActive: true,
  },
  {
    id: 3,
    code: "MOMO",
    name: "Ví điện tử MoMo",
    description: "Thanh toán qua ví điện tử MoMo",
    isActive: true,
  },
  {
    id: 4,
    code: "BANK_TRANSFER",
    name: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản trực tiếp vào tài khoản công ty",
    isActive: true,
  },
];

// Mock API functions
export const mockAPI = {
  getCart: async (): Promise<CartItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_CART_ITEMS;
  },

  getAddresses: async (): Promise<Address[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_ADDRESSES;
  },

  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_paymentMethodS;
  },
};
