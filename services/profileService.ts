// Mock Profile Service
import type {
  CustomerProfile,
  UpdateProfileRequest,
  ChangePasswordRequest,
  Address,
  CreateAddressRequest,
  UpdateAddressRequest,
} from "@/types/profile";

// Mock data
let mockProfile: CustomerProfile = {
  id: 1,
  email: "customer@example.com",
  username: "johndoe",
  firstName: "John",
  lastName: "Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  phoneNumber: "0123456789",
  dateOfBirth: "1990-01-01",
  gender: 1,
  createdAt: "2024-01-01T00:00:00Z",
};

let mockAddresses: Address[] = [
  {
    id: 1,
    fullName: "John Doe",
    phoneNumber: "0123456789",
    addressLine: "123 Đường Lê Lợi",
    city: "Hà Nội",
    state: "Hà Nội",
    country: "Việt Nam",
    isDefault: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    fullName: "John Doe",
    phoneNumber: "0987654321",
    addressLine: "456 Đường Nguyễn Huệ",
    city: "TP. Hồ Chí Minh",
    state: "TP. Hồ Chí Minh",
    country: "Việt Nam",
    isDefault: false,
    createdAt: "2024-02-01T00:00:00Z",
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const profileService = {
  // Get profile
  async getProfile(): Promise<CustomerProfile> {
    await delay(500);
    return mockProfile;
  },

  // Update profile
  async updateProfile(data: UpdateProfileRequest): Promise<CustomerProfile> {
    await delay(800);
    mockProfile = { ...mockProfile, ...data };
    return mockProfile;
  },

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await delay(800);
    // Mock validation
    if (data.oldPassword !== "OldPassword123!") {
      throw new Error("Mật khẩu cũ không đúng");
    }
    if (data.newPassword !== data.confirmPassword) {
      throw new Error("Mật khẩu xác nhận không khớp");
    }
    // Success - no return needed
  },

  // Get addresses
  async getAddresses(): Promise<Address[]> {
    await delay(500);
    return mockAddresses;
  },

  // Add address
  async addAddress(data: CreateAddressRequest): Promise<Address> {
    await delay(800);
    const newAddress: Address = {
      id: mockAddresses.length + 1,
      ...data,
      isDefault: data.isDefault || false,
      createdAt: new Date().toISOString(),
    };

    // If new address is default, set others to false
    if (newAddress.isDefault) {
      mockAddresses = mockAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }));
    }

    mockAddresses.push(newAddress);
    return newAddress;
  },

  // Update address
  async updateAddress(
    id: number,
    data: UpdateAddressRequest
  ): Promise<Address> {
    await delay(800);
    const index = mockAddresses.findIndex((addr) => addr.id === id);
    if (index === -1) throw new Error("Không tìm thấy địa chỉ");

    // If updating to default, set others to false
    if (data.isDefault) {
      mockAddresses = mockAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }));
    }

    mockAddresses[index] = { ...mockAddresses[index], ...data };
    return mockAddresses[index];
  },

  // Delete address
  async deleteAddress(id: number): Promise<void> {
    await delay(500);
    mockAddresses = mockAddresses.filter((addr) => addr.id !== id);
  },
};
