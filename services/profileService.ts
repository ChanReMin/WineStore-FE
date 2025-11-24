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
  first_name: "John",
  last_name: "Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  phone_number: "0123456789",
  date_of_birth: "1990-01-01",
  gender: 1,
  created_at: "2024-01-01T00:00:00Z",
};

let mockAddresses: Address[] = [
  {
    id: 1,
    full_name: "John Doe",
    phone_number: "0123456789",
    address_line: "123 Đường Lê Lợi",
    city: "Hà Nội",
    state: "Hà Nội",
    country: "Việt Nam",
    is_default: true,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    full_name: "John Doe",
    phone_number: "0987654321",
    address_line: "456 Đường Nguyễn Huệ",
    city: "TP. Hồ Chí Minh",
    state: "TP. Hồ Chí Minh",
    country: "Việt Nam",
    is_default: false,
    created_at: "2024-02-01T00:00:00Z",
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
    if (data.old_password !== "OldPassword123!") {
      throw new Error("Mật khẩu cũ không đúng");
    }
    if (data.new_password !== data.confirm_password) {
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
      is_default: data.is_default || false,
      created_at: new Date().toISOString(),
    };

    // If new address is default, set others to false
    if (newAddress.is_default) {
      mockAddresses = mockAddresses.map((addr) => ({
        ...addr,
        is_default: false,
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
    if (data.is_default) {
      mockAddresses = mockAddresses.map((addr) => ({
        ...addr,
        is_default: false,
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
