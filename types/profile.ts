// Profile Types
export interface CustomerProfile {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: number; // 1: Male, 2: Female, 3: Other
  created_at: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: number;
  avatar?: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

// Address Types
export interface Address {
  id: number;
  full_name: string;
  phone_number: string;
  address_line: string;
  city: string;
  state: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface CreateAddressRequest {
  full_name: string;
  phone_number: string;
  address_line: string;
  city: string;
  state: string;
  country: string;
  is_default?: boolean;
}

export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}
