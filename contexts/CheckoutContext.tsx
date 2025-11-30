"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// Types
export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  stockAvailable: number;
  isAvailable: boolean;
}

export interface Address {
  id: number;
  userId: number;
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  ward?: string;
  district?: string;
  city: string;
  isDefault: boolean;
  createdAt: string;
}

export interface PaymentMethod {
  id: number;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface Promotion {
  id: number;
  code: string;
  name: string;
  description: string;
  discount_type: number;
  discountTypeText: string;
  discount_value: number;
  minOrderAmount: number;
  start_date: string;
  end_date: string;
}

export interface ShippingFee {
  shippingFee: number;
  estimatedDeliveryDays: number;
  freeShippingThreshold: number;
  note: string;
}

export interface OrderPreview {
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  promotion?: Promotion;
  summary: {
    subtotal: number;
    discountAmount: number;
    shippingFee: number;
    totalAmount: number;
  };
}

export type CheckoutStep =
  | "cart"
  | "address"
  | "payment"
  | "review"
  | "success";

interface CheckoutContextType {
  currentStep: CheckoutStep;
  cart: CartItem[];
  selectedAddress: Address | null;
  addresses: Address[];
  selectedPaymentMethod: PaymentMethod | null;
  paymentMethods: PaymentMethod[];
  promotion: Promotion | null;
  promotionCode: string;
  shippingFee: ShippingFee | null;
  orderPreview: OrderPreview | null;
  orderId: string | null;
  isLoadingCart: boolean;
  isLoadingAddresses: boolean;
  isLoadingPaymentMethods: boolean;
  isValidatingPromotion: boolean;
  isCalculatingShipping: boolean;
  isCreatingOrder: boolean;
  setCurrentStep: (step: CheckoutStep) => void;
  updateCartItemQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeCartItem: (itemId: number) => Promise<void>;
  selectAddress: (address: Address) => void;
  addNewAddress: (
    address: Omit<Address, "id" | "userId" | "createdAt">
  ) => Promise<void>;
  selectPaymentMethod: (method: PaymentMethod) => void;
  setPromotionCode: (code: string) => void;
  validatePromotion: () => Promise<void>;
  calculateShipping: () => Promise<void>;
  createOrderPreview: () => Promise<void>;
  submitOrder: () => Promise<void>;
  resetCheckout: () => void;
  initializeData?: (
    cartData: CartItem[],
    addressData: Address[],
    paymentData: PaymentMethod[]
  ) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [promotion, setPromotion] = useState<Promotion | null>(null);
  const [promotionCode, setPromotionCode] = useState("");
  const [shippingFee, setShippingFee] = useState<ShippingFee | null>(null);
  const [orderPreview, setOrderPreview] = useState<OrderPreview | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(false);
  const [isValidatingPromotion, setIsValidatingPromotion] = useState(false);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Initialize with mock data
  const initializeData = useCallback(
    (
      cartData: CartItem[],
      addressData: Address[],
      paymentData: PaymentMethod[]
    ) => {
      setCart(cartData);
      setAddresses(addressData);
      if (addressData.length > 0) {
        setSelectedAddress(
          addressData.find((a) => a.isDefault) || addressData[0]
        );
      }
      setPaymentMethods(paymentData);
    },
    []
  );

  const updateCartItemQuantity = useCallback(
    async (itemId: number, quantity: number) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCart((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity, lineTotal: item.unitPrice * quantity }
            : item
        )
      );
    },
    []
  );

  const removeCartItem = useCallback(async (itemId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const selectAddress = useCallback((address: Address) => {
    setSelectedAddress(address);
  }, []);

  const addNewAddress = useCallback(
    async (addressData: Omit<Address, "id" | "userId" | "createdAt">) => {
      setIsLoadingAddresses(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newAddress: Address = {
        ...addressData,
        id: Date.now(),
        userId: 456,
        createdAt: new Date().toISOString(),
      };
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddress(newAddress);
      setIsLoadingAddresses(false);
    },
    []
  );

  const selectPaymentMethod = useCallback((method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  }, []);

  const validatePromotion = useCallback(async () => {
    if (!promotionCode.trim()) return;
    setIsValidatingPromotion(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (promotionCode.toUpperCase() === "SUMMER2024") {
      setPromotion({
        id: 5,
        code: "SUMMER2024",
        name: "Giảm giá mùa hè 2024",
        description: "Giảm 5% cho đơn hàng từ 10 triệu",
        discount_type: 1,
        discountTypeText: "Phần trăm",
        discount_value: 5.0,
        minOrderAmount: 10000000.0,
        start_date: "2024-06-01T00:00:00Z",
        end_date: "2024-08-31T23:59:59Z",
      });
    } else {
      setPromotion(null);
      alert("Mã khuyến mãi không hợp lệ");
    }
    setIsValidatingPromotion(false);
  }, [promotionCode]);

  const calculateShipping = useCallback(async () => {
    if (!selectedAddress) return;
    setIsCalculatingShipping(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setShippingFee({
      shippingFee: 50000.0,
      estimatedDeliveryDays: 3,
      freeShippingThreshold: 50000000.0,
      note: "Miễn phí vận chuyển cho đơn hàng từ 50 triệu",
    });
    setIsCalculatingShipping(false);
  }, [selectedAddress]);

  const createOrderPreview = useCallback(async () => {
    if (!selectedAddress || !selectedPaymentMethod) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
    const discountAmount = promotion
      ? (subtotal * promotion.discount_value) / 100
      : 0;
    const shippingCost = shippingFee?.shippingFee || 0;
    const totalAmount = subtotal - discountAmount + shippingCost;
    setOrderPreview({
      items: cart,
      shippingAddress: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      promotion: promotion || undefined,
      summary: {
        subtotal,
        discountAmount,
        shippingFee: shippingCost,
        totalAmount,
      },
    });
  }, [cart, selectedAddress, selectedPaymentMethod, promotion, shippingFee]);

  const submitOrder = useCallback(async () => {
    setIsCreatingOrder(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);
    setCurrentStep("success");
    setIsCreatingOrder(false);
  }, []);

  const resetCheckout = useCallback(() => {
    setCurrentStep("cart");
    setCart([]);
    setSelectedAddress(null);
    setSelectedPaymentMethod(null);
    setPromotion(null);
    setPromotionCode("");
    setShippingFee(null);
    setOrderPreview(null);
    setOrderId(null);
  }, []);

  const value: CheckoutContextType = {
    currentStep,
    cart,
    selectedAddress,
    addresses,
    selectedPaymentMethod,
    paymentMethods,
    promotion,
    promotionCode,
    shippingFee,
    orderPreview,
    orderId,
    isLoadingCart,
    isLoadingAddresses,
    isLoadingPaymentMethods,
    isValidatingPromotion,
    isCalculatingShipping,
    isCreatingOrder,
    setCurrentStep,
    updateCartItemQuantity,
    removeCartItem,
    selectAddress,
    addNewAddress,
    selectPaymentMethod,
    setPromotionCode,
    validatePromotion,
    calculateShipping,
    createOrderPreview,
    submitOrder,
    resetCheckout,
    initializeData,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
