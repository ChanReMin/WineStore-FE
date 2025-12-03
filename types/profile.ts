// Profile Types
export interface CustomerProfile {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: number; // 1: Male, 2: Female, 3: Other
  role?: string;
  loyaltyPoints?: number;
  createdAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: number;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Address Types
export interface Address {
  id: number;
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  isDefault: boolean;
  addressType: string;
  createdAt: string;
}

export interface CreateAddressRequest {
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  isDefault?: boolean;
  addressType?: string;
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}
