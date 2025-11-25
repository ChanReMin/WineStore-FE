// Example: Sử dụng axios instance đã config auth
import axiosInstance from "./axios";

// Ví dụ gọi API protected
export const getProducts = async () => {
  const response = await axiosInstance.get("/api/v1/products");
  return response.data;
};

export const getUserOrders = async () => {
  const response = await axiosInstance.get("/api/v1/orders");
  return response.data;
};

export const updateProfile = async (data: any) => {
  const response = await axiosInstance.put("/api/v1/users/profile", data);
  return response.data;
};
