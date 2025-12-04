"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Address as ProfileAddress } from "@/types/profile";

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

// Use Address type from profile (matches backend API)
export interface Address extends ProfileAddress {}

export interface PaymentMethod {
  id: number;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
}

// Promotion and Shipping removed - not used in this implementation

export interface OrderPreview {
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  summary: {
    subtotal: number;
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
  orderPreview: OrderPreview | null;
  orderId: string | null;
  isLoadingCart: boolean;
  isLoadingAddresses: boolean;
  isLoadingPaymentMethods: boolean;
  isCreatingOrder: boolean;
  setCurrentStep: (step: CheckoutStep) => void;
  updateCartItemQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeCartItem: (itemId: number) => Promise<void>;
  selectAddress: (address: Address) => void;
  addNewAddress: (address: Omit<Address, "id" | "createdAt">) => Promise<void>;
  selectPaymentMethod: (method: PaymentMethod) => void;
  submitOrder: () => Promise<void>;
  resetCheckout: () => void;
  initializeData?: (
    cartData: CartItem[],
    addressData: Address[],
    paymentData: PaymentMethod[]
  ) => void;
  loadAddresses: () => Promise<void>;
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
  const [orderPreview, setOrderPreview] = useState<OrderPreview | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Initialize checkout data
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

  // Load addresses from API
  const loadAddresses = useCallback(async () => {
    setIsLoadingAddresses(true);
    try {
      const { profileService } = await import("@/services/profileService");
      const addressData = await profileService.getAddresses();
      setAddresses(addressData);
      if (addressData.length > 0) {
        setSelectedAddress(
          addressData.find((a) => a.isDefault) || addressData[0]
        );
      }
    } catch (error) {
      console.error("Failed to load addresses:", error);
      const { toast } = await import("react-toastify");
      toast.error("Failed to load addresses");
    } finally {
      setIsLoadingAddresses(false);
    }
  }, []);

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
    async (addressData: Omit<Address, "id" | "createdAt">) => {
      setIsLoadingAddresses(true);
      try {
        const { profileService } = await import("@/services/profileService");
        const { toast } = await import("react-toastify");

        const newAddress = await profileService.addAddress(addressData);
        setAddresses((prev) => [...prev, newAddress]);
        setSelectedAddress(newAddress);

        toast.success("Address added successfully");
      } catch (error: any) {
        console.error("Failed to add address:", error);
        const { toast } = await import("react-toastify");
        const message =
          error.response?.data?.message || "Failed to add address";
        toast.error(message);
        throw error;
      } finally {
        setIsLoadingAddresses(false);
      }
    },
    []
  );

  const selectPaymentMethod = useCallback((method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  }, []);

  const submitOrder = useCallback(async () => {
    setIsCreatingOrder(true);

    try {
      const { toast } = await import("react-toastify");

      // Validate address & payment method
      if (!selectedAddress || !selectedPaymentMethod) {
        toast.error("Please select shipping address and payment method");
        return;
      }

      // Create order via API
      // POST /api/v1/orders
      // Returns: { orderId, orderCode, paymentUrl, ... }
      const orderService = (await import("@/services/orderService")).default;
      const orderResponse = await orderService.createOrder({
        shippingAddressId: selectedAddress.id,
        paymentMethodId: selectedPaymentMethod.id, // 1: COD, 2: VNPAY, 3: MOMO
        couponCode: "",
        note: undefined,
      });

      console.log("Order created:", orderResponse);

      // Set order ID
      setOrderId(orderResponse.orderCode);

      // Backend has cleared the cart, fetch updated cart from API
      if (typeof window !== "undefined") {
        const { useCartStore } = await import("@/stores/cartStore");
        await useCartStore.getState().fetchCart(); // Fetch updated cart (will be empty)
      }
      // Clear checkout cart items
      setCart([]);

      // Handle payment redirect based on payment method
      if (orderResponse.paymentUrl) {
        // For online payment methods (paymentMethodId 2: VNPAY, 3: MOMO)
        // Redirect to payment gateway URL immediately
        toast.success("Redirecting to payment gateway...");

        console.log("Redirecting to:", orderResponse.paymentUrl);

        // Use window.location.replace() to prevent back navigation
        // This replaces current history entry, user cannot go back to checkout page
        setTimeout(() => {
          window.location.replace(orderResponse.paymentUrl!);
        }, 500); // Small delay to show toast message
        return; // Stop execution, browser will redirect
      }

      // For COD (paymentMethodId 1) - No payment URL needed
      // Show success page directly
      setCurrentStep("success");
      toast.success("Order placed successfully!");
    } catch (error: any) {
      console.error("Order creation failed:", error);

      const { toast } = await import("react-toastify");
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create order";
      toast.error(message);

      throw error;
    } finally {
      setIsCreatingOrder(false);
    }
  }, [selectedAddress, selectedPaymentMethod]);

  const resetCheckout = useCallback(() => {
    setCurrentStep("cart");
    setCart([]);
    setSelectedAddress(null);
    setSelectedPaymentMethod(null);
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
    orderPreview,
    orderId,
    isLoadingCart,
    isLoadingAddresses,
    isLoadingPaymentMethods,
    isCreatingOrder,
    setCurrentStep,
    updateCartItemQuantity,
    removeCartItem,
    selectAddress,
    addNewAddress,
    selectPaymentMethod,
    submitOrder,
    resetCheckout,
    initializeData,
    loadAddresses,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
