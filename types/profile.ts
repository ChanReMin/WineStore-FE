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
  createdAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: number;
  avatar?: string;
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
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
}

export interface CreateAddressRequest {
  fullName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  isDefault?: boolean;
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}
