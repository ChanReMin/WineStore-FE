// Profile Service - Real API Integration
import axiosInstance from "@/lib/axios";
import type {
  CustomerProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
  Address,
  CreateAddressRequest,
  UpdateAddressRequest,
} from "@/types/profile";

export const profileService = {
  // Get current user profile
  async getProfile(): Promise<CustomerProfile> {
    const response = await axiosInstance.get("/api/v1/profile");
    return response.data.data;
  },

  // Update profile (with optional avatar upload)
  async updateProfile(
    data: UpdateProfileRequest,
    avatarFile?: File
  ): Promise<CustomerProfile> {
    const formData = new FormData();

    // Append fields only if they exist
    if (data.firstName) formData.append("firstName", data.firstName);
    if (data.lastName) formData.append("lastName", data.lastName);
    if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
    if (data.dateOfBirth) formData.append("dateOfBirth", data.dateOfBirth);
    if (data.gender !== undefined)
      formData.append("gender", data.gender.toString());
    if (avatarFile) formData.append("avatar", avatarFile);

    const response = await axiosInstance.put("/api/v1/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  },

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await axiosInstance.put("/api/v1/profile/password", data);
  },

  // Get all user addresses
  async getAddresses(): Promise<Address[]> {
    const response = await axiosInstance.get("/api/v1/profile/addresses");
    return response.data.data.addresses;
  },

  // Add new address
  async addAddress(data: CreateAddressRequest): Promise<Address> {
    const response = await axiosInstance.post(
      "/api/v1/profile/addresses",
      data
    );
    return response.data.data;
  },

  // Update address
  async updateAddress(
    id: number,
    data: UpdateAddressRequest
  ): Promise<Address> {
    const response = await axiosInstance.put(
      `/api/v1/profile/addresses/${id}`,
      data
    );
    return response.data.data;
  },

  // Delete address
  async deleteAddress(id: number): Promise<void> {
    await axiosInstance.delete(`/api/v1/profile/addresses/${id}`);
  },

  // Set default address (bonus API)
  async setDefaultAddress(id: number): Promise<void> {
    await axiosInstance.put(`/api/v1/profile/addresses/${id}/set-default`);
  },

  // Upload avatar
  async uploadAvatar(avatarFile: File): Promise<{ avatar: string }> {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await axiosInstance.patch(
      "/api/v1/users/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  },
};
