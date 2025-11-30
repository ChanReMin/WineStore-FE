import axiosInstance from "@/lib/axios";

// Types
export interface User {
  id: number;
  account: {
    id: number;
    email: string;
    role: number;
    roleName: string;
    status: number;
    statusName: string;
    lastLoginAt: string;
    createdAt: string;
  };
  userInfo: {
    avatar: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: number;
    genderName: string;
  };
  stats: {
    totalOrders: number;
    totalSpent: number;
    addressCount: number;
  };
}

export interface UserListResponse {
  success: boolean;
  data: {
    users: User[];
    pagination: {
      currentPage: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
    summary: {
      totalUsers: number;
      activeUsers: number;
      inactiveUsers: number;
      lockedUsers: number;
      customers: number;
      sellers: number;
      admins: number;
    };
  };
}

export interface UserDetail {
  id: number;
  account: {
    id: number;
    email: string;
    role: number;
    status: number;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
  };
  userInfo: {
    avatar: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: number;
    createdAt: string;
    updatedAt: string;
  };
  addresses: Array<{
    id: number;
    fullName: string;
    phoneNumber: string;
    addressLine: string;
    ward: string;
    district: string;
    city: string;
    isDefault: boolean;
  }>;
  stats: {
    totalOrders: number;
    completedOrders: number;
    totalSpent: number;
    totalProducts: number;
    totalReviews: number;
  };
  recentActivities: Array<{
    id: number;
    type: string;
    description: string;
    createdAt: string;
  }>;
}

export interface UserDetailResponse {
  success: boolean;
  data: UserDetail;
}

export interface UserStatistics {
  success: boolean;
  data: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    bannedUsers: number;
    newUsersThisMonth: number;
    usersByRole: {
      buyer: number;
      seller: number;
      admin: number;
    };
    userGrowth: Array<{
      date: string;
      count: number;
    }>;
  };
}

export interface ActivityLog {
  id: number;
  userId: number;
  type: string;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface ActivityLogsResponse {
  success: boolean;
  data: {
    activities: ActivityLog[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalActivities: number;
      limit: number;
    };
  };
}

/**
 * API 1: Lấy danh sách người dùng
 */
export const fetchUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: number | "all";
  status?: number | "all";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<UserListResponse> => {
  const {
    page = 1,
    limit = 10,
    search,
    role,
    status,
    sortBy,
    sortOrder = "desc",
  } = params || {};

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  if (search) queryParams.append("search", search);
  if (role !== undefined && role !== "all")
    queryParams.append("role", role.toString());
  if (status !== undefined && status !== "all")
    queryParams.append("status", status.toString());
  if (sortBy) queryParams.append("sortBy", sortBy);
  queryParams.append("sortOrder", sortOrder);

  const response = await axiosInstance.get<UserListResponse>(
    `/api/v1/admin/users?${queryParams.toString()}`
  );

  return response.data;
};

/**
 * API 2: Lấy chi tiết người dùng
 */
export const fetchUserDetail = async (
  userId: number
): Promise<UserDetailResponse> => {
  const response = await axiosInstance.get<UserDetailResponse>(
    `/api/v1/admin/users/${userId}`
  );

  return response.data;
};

/**
 * API 3: Cập nhật thông tin người dùng
 */
export const updateUser = async (
  userId: number,
  data: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: number;
  }
): Promise<{
  success: boolean;
  message: string;
  data: User;
}> => {
  const response = await axiosInstance.put(
    `/api/v1/admin/users/${userId}`,
    data
  );

  return response.data;
};

/**
 * API 4: Thay đổi trạng thái người dùng
 */
export const changeUserStatus = async (
  userId: number,
  status: number,
  reason?: string
): Promise<{
  success: boolean;
  message: string;
  data: {
    id: number;
    status: number;
    updatedAt: string;
  };
}> => {
  const response = await axiosInstance.patch(
    `/api/v1/admin/users/${userId}/status`,
    { status, reason }
  );

  return response.data;
};

/**
 * API 5: Thay đổi vai trò người dùng
 */
export const changeUserRole = async (
  userId: number,
  role: number,
  note?: string
): Promise<{
  success: boolean;
  message: string;
  data: {
    id: number;
    role: number;
    updatedAt: string;
  };
}> => {
  const response = await axiosInstance.patch(
    `/api/v1/admin/users/${userId}/role`,
    { role, note }
  );

  return response.data;
};

/**
 * API 6: Tạo người dùng mới
 */
export const createUser = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: number;
  role: number;
  status: number;
}): Promise<{
  success: boolean;
  message: string;
  data: User;
}> => {
  const response = await axiosInstance.post("/api/v1/admin/users", data);

  return response.data;
};

/**
 * API 7: Xóa người dùng
 */
export const deleteUser = async (
  userId: number,
  permanent = false
): Promise<{
  success: boolean;
  message: string;
}> => {
  const queryParams = new URLSearchParams();
  if (permanent) queryParams.append("permanent", "true");

  const response = await axiosInstance.delete(
    `/api/v1/admin/users/${userId}?${queryParams.toString()}`
  );

  return response.data;
};

/**
 * API 8: Thống kê người dùng
 */
export const fetchUserStatistics = async (params?: {
  startDate?: string;
  endDate?: string;
}): Promise<UserStatistics> => {
  const queryParams = new URLSearchParams();
  if (params?.startDate) queryParams.append("startDate", params.startDate);
  if (params?.endDate) queryParams.append("endDate", params.endDate);

  const response = await axiosInstance.get<UserStatistics>(
    `/api/v1/admin/users/statistics?${queryParams.toString()}`
  );

  return response.data;
};

/**
 * API 9: Lấy lịch sử hoạt động người dùng
 */
export const fetchUserActivities = async (
  userId: number,
  params?: {
    page?: number;
    limit?: number;
    type?: string;
  }
): Promise<ActivityLogsResponse> => {
  const { page = 1, limit = 20, type } = params || {};

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());
  if (type) queryParams.append("type", type);

  const response = await axiosInstance.get<ActivityLogsResponse>(
    `/api/v1/admin/users/${userId}/activities?${queryParams.toString()}`
  );

  return response.data;
};
