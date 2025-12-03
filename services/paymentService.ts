import api from "@/lib/axios";
import { handleApiError } from "@/lib/errorHandler";

export interface PaymentMethod {
  id: number;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
}

const paymentService = {
  // Get available payment methods
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    try {
      const response = await api.get("/payment-methods");
      return response.data.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export default paymentService;
