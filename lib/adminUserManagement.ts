// Mock data for Admin User Management based on API documentation

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

export interface UserDetailResponse {
  success: boolean;
  data: {
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
    addresses: {
      id: number;
      fullName: string;
      phoneNumber: string;
      addressLine: string;
      ward: string;
      district: string;
      city: string;
      isDefault: boolean;
    }[];
    orderStats: {
      totalOrders: number;
      completedOrders: number;
      cancelledOrders: number;
      totalSpent: number;
      avgOrderValue: number;
    };
  };
}

export interface Activity {
  id: number;
  userId: number;
  type: string;
  description: string;
  ip_address?: string;
  user_agent?: string;
  reference_id?: number;
  reference_type?: string;
  createdAt: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: 1,
    account: {
      id: 1,
      email: "customer01@example.com",
      role: 0,
      roleName: "Customer",
      status: 1,
      statusName: "Active",
      lastLoginAt: "2024-11-26T10:30:00Z",
      createdAt: "2024-01-15T08:00:00Z",
    },
    userInfo: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer01",
      firstName: "Nguyễn",
      lastName: "Văn A",
      phoneNumber: "0901234567",
      dateOfBirth: "1990-05-15",
      gender: 1,
      genderName: "Male",
    },
    stats: {
      totalOrders: 15,
      totalSpent: 25000000,
      addressCount: 2,
    },
  },
  {
    id: 2,
    account: {
      id: 2,
      email: "customer02@example.com",
      role: 0,
      roleName: "Customer",
      status: 1,
      statusName: "Active",
      lastLoginAt: "2024-11-25T15:45:00Z",
      createdAt: "2024-02-10T09:30:00Z",
    },
    userInfo: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer02",
      firstName: "Trần",
      lastName: "Thị B",
      phoneNumber: "0912345678",
      dateOfBirth: "1995-08-20",
      gender: 2,
      genderName: "Female",
    },
    stats: {
      totalOrders: 8,
      totalSpent: 12000000,
      addressCount: 1,
    },
  },
  {
    id: 3,
    account: {
      id: 3,
      email: "customer03@example.com",
      role: 0,
      roleName: "Customer",
      status: 0,
      statusName: "Inactive",
      lastLoginAt: "2024-11-20T08:20:00Z",
      createdAt: "2024-03-05T10:00:00Z",
    },
    userInfo: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer03",
      firstName: "Lê",
      lastName: "Văn C",
      phoneNumber: "0923456789",
      dateOfBirth: "1988-03-12",
      gender: 1,
      genderName: "Male",
    },
    stats: {
      totalOrders: 3,
      totalSpent: 5000000,
      addressCount: 1,
    },
  },
  {
    id: 4,
    account: {
      id: 4,
      email: "customer04@example.com",
      role: 0,
      roleName: "Customer",
      status: 1,
      statusName: "Active",
      lastLoginAt: "2024-11-26T09:15:00Z",
      createdAt: "2024-04-20T11:45:00Z",
    },
    userInfo: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer04",
      firstName: "Phạm",
      lastName: "Thị D",
      phoneNumber: "0934567890",
      dateOfBirth: "1992-11-25",
      gender: 2,
      genderName: "Female",
    },
    stats: {
      totalOrders: 22,
      totalSpent: 38000000,
      addressCount: 3,
    },
  },
  {
    id: 5,
    account: {
      id: 5,
      email: "customer05@example.com",
      role: 0,
      roleName: "Customer",
      status: -1,
      statusName: "Locked",
      lastLoginAt: "2024-11-10T14:30:00Z",
      createdAt: "2024-05-12T08:20:00Z",
    },
    userInfo: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer05",
      firstName: "Hoàng",
      lastName: "Văn E",
      phoneNumber: "0945678901",
      dateOfBirth: "1993-07-08",
      gender: 1,
      genderName: "Male",
    },
    stats: {
      totalOrders: 5,
      totalSpent: 8000000,
      addressCount: 1,
    },
  },
  {
    id: 6,
    account: {
      id: 6,
      email: "seller01@example.com",
      role: 1,
      roleName: "Seller",
      status: 1,
      statusName: "Active",
      lastLoginAt: "2024-11-26T11:00:00Z",
      createdAt: "2024-01-20T09:15:00Z",
    },
    userInfo: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller01",
      firstName: "Vũ",
      lastName: "Thị F",
      phoneNumber: "0956789012",
      dateOfBirth: "1991-09-30",
      gender: 2,
      genderName: "Female",
    },
    stats: {
      totalOrders: 0,
      totalSpent: 0,
      addressCount: 1,
    },
  },
  {
    id: 7,
    account: {
      id: 7,
      email: "admin01@example.com",
      role: 2,
      roleName: "Admin",
      status: 1,
      statusName: "Active",
      lastLoginAt: "2024-11-26T12:00:00Z",
      createdAt: "2024-01-01T00:00:00Z",
    },
    userInfo: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin01",
      firstName: "Admin",
      lastName: "System",
      phoneNumber: "0967890123",
      dateOfBirth: "1985-01-01",
      gender: 1,
      genderName: "Male",
    },
    stats: {
      totalOrders: 0,
      totalSpent: 0,
      addressCount: 0,
    },
  },
  {
    id: 8,
    account: {
      id: 8,
      email: "customer06@example.com",
      role: 0,
      roleName: "Customer",
      status: 1,
      statusName: "Active",
      lastLoginAt: "2024-11-26T08:45:00Z",
      createdAt: "2024-06-15T10:30:00Z",
    },
    userInfo: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer06",
      firstName: "Đặng",
      lastName: "Văn G",
      phoneNumber: "0978901234",
      dateOfBirth: "1994-12-10",
      gender: 1,
      genderName: "Male",
    },
    stats: {
      totalOrders: 12,
      totalSpent: 18000000,
      addressCount: 2,
    },
  },
];

// Mock activities
const mockActivities: Activity[] = [
  {
    id: 1001,
    userId: 1,
    type: "login",
    description: "Đăng nhập từ IP 192.168.1.1",
    ip_address: "192.168.1.1",
    user_agent: "Mozilla/5.0...",
    createdAt: "2024-11-26T10:30:00Z",
  },
  {
    id: 1002,
    userId: 1,
    type: "order",
    description: "Đặt đơn hàng #ORD123456",
    reference_id: 456,
    reference_type: "order",
    createdAt: "2024-11-26T11:15:00Z",
  },
  {
    id: 1003,
    userId: 1,
    type: "profile_update",
    description: "Cập nhật thông tin cá nhân",
    createdAt: "2024-11-25T14:20:00Z",
  },
];

export const fetchUsers = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  role?: number | "all";
  status?: number | "all";
  sortby?: string;
  sortorder?: string;
}): Promise<UserListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredUsers = [...mockUsers];

  // Filter by search
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.account.email.toLowerCase().includes(searchLower) ||
        `${user.userInfo.firstName} ${user.userInfo.lastName}`
          .toLowerCase()
          .includes(searchLower) ||
        user.userInfo.phoneNumber.includes(searchLower) ||
        user.id.toString().includes(searchLower)
    );
  }

  // Filter by role
  if (params.role !== undefined && params.role !== "all") {
    filteredUsers = filteredUsers.filter(
      (user) => user.account.role === params.role
    );
  }

  // Filter by status
  if (params.status !== undefined && params.status !== "all") {
    filteredUsers = filteredUsers.filter(
      (user) => user.account.status === params.status
    );
  }

  // Sort
  if (params.sortby) {
    filteredUsers.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (params.sortby) {
        case "createdAt":
          aVal = new Date(a.account.createdAt).getTime();
          bVal = new Date(b.account.createdAt).getTime();
          break;
        case "lastLoginAt":
          aVal = new Date(a.account.lastLoginAt).getTime();
          bVal = new Date(b.account.lastLoginAt).getTime();
          break;
        case "email":
          aVal = a.account.email;
          bVal = b.account.email;
          break;
        default:
          return 0;
      }

      if (params.sortorder === "desc") {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
  }

  const page = params.page || 1;
  const limit = params.limit || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return {
    success: true,
    data: {
      users: paginatedUsers,
      pagination: {
        currentPage: page,
        perPage: limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
      summary: {
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter((u) => u.account.status === 1).length,
        inactiveUsers: mockUsers.filter((u) => u.account.status === 0).length,
        lockedUsers: mockUsers.filter((u) => u.account.status === -1).length,
        customers: mockUsers.filter((u) => u.account.role === 0).length,
        sellers: mockUsers.filter((u) => u.account.role === 1).length,
        admins: mockUsers.filter((u) => u.account.role === 2).length,
      },
    },
  };
};

export const fetchUserDetail = async (
  userId: number
): Promise<UserDetailResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    success: true,
    data: {
      id: user.id,
      account: {
        ...user.account,
        updatedAt: "2024-11-20T14:22:00Z",
      },
      userInfo: {
        ...user.userInfo,
        createdAt: user.account.createdAt,
        updatedAt: "2024-11-20T14:22:00Z",
      },
      addresses: [
        {
          id: 1,
          fullName: `${user.userInfo.firstName} ${user.userInfo.lastName}`,
          phoneNumber: user.userInfo.phoneNumber,
          addressLine: "123 Đường ABC",
          ward: "Phường 1",
          district: "Quận 1",
          city: "TP.HCM",
          isDefault: true,
        },
      ],
      orderStats: {
        totalOrders: user.stats.totalOrders,
        completedOrders: Math.floor(user.stats.totalOrders * 0.8),
        cancelledOrders: Math.floor(user.stats.totalOrders * 0.1),
        totalSpent: user.stats.totalSpent,
        avgOrderValue:
          user.stats.totalOrders > 0
            ? Math.floor(user.stats.totalSpent / user.stats.totalOrders)
            : 0,
      },
    },
  };
};

export const createUser = async (data: {
  email: string;
  password: string;
  role: number;
  status?: number;
  userInfo: {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: number;
  };
}): Promise<{ success: boolean; message: string; data: User }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate validation
  if (mockUsers.some((u) => u.account.email === data.email)) {
    throw new Error("Email đã tồn tại trong hệ thống");
  }

  const newUser: User = {
    id: mockUsers.length + 1,
    account: {
      id: mockUsers.length + 1,
      email: data.email,
      role: data.role,
      roleName:
        data.role === 0 ? "Customer" : data.role === 1 ? "Seller" : "Admin",
      status: data.status ?? 1,
      statusName: "Active",
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    userInfo: {
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      firstName: data.userInfo.firstName,
      lastName: data.userInfo.lastName,
      phoneNumber: data.userInfo.phoneNumber || "",
      dateOfBirth: data.userInfo.dateOfBirth || "",
      gender: data.userInfo.gender || 1,
      genderName: data.userInfo.gender === 2 ? "Female" : "Male",
    },
    stats: {
      totalOrders: 0,
      totalSpent: 0,
      addressCount: 0,
    },
  };

  mockUsers.push(newUser);

  return {
    success: true,
    message: "Tạo user thành công",
    data: newUser,
  };
};

export const updateUser = async (
  userId: number,
  data: Partial<{
    email: string;
    role: number;
    status: number;
    userInfo: Partial<User["userInfo"]>;
  }>
): Promise<{ success: boolean; message: string; data: User }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const userIndex = mockUsers.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    throw new Error("Không tìm thấy user");
  }

  if (data.email) {
    mockUsers[userIndex].account.email = data.email;
  }
  if (data.role !== undefined) {
    mockUsers[userIndex].account.role = data.role;
    mockUsers[userIndex].account.roleName =
      data.role === 0 ? "Customer" : data.role === 1 ? "Seller" : "Admin";
  }
  if (data.status !== undefined) {
    mockUsers[userIndex].account.status = data.status;
  }
  if (data.userInfo) {
    mockUsers[userIndex].userInfo = {
      ...mockUsers[userIndex].userInfo,
      ...data.userInfo,
    };
  }

  return {
    success: true,
    message: "Cập nhật user thành công",
    data: mockUsers[userIndex],
  };
};

export const updateUserStatus = async (
  userId: number,
  status: number,
  reason?: string
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const userIndex = mockUsers.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    throw new Error("Không tìm thấy user");
  }

  mockUsers[userIndex].account.status = status;
  mockUsers[userIndex].account.statusName =
    status === 1 ? "Active" : status === 0 ? "Inactive" : "Locked";

  return {
    success: true,
    message: "Cập nhật trạng thái thành công",
  };
};

export const updateUserRole = async (
  userId: number,
  role: number,
  note?: string
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const userIndex = mockUsers.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    throw new Error("Không tìm thấy user");
  }

  mockUsers[userIndex].account.role = role;
  mockUsers[userIndex].account.roleName =
    role === 0 ? "Customer" : role === 1 ? "Seller" : "Admin";

  return {
    success: true,
    message: "Cập nhật role thành công",
  };
};

export const resetUserPassword = async (
  userId: number,
  newPassword: string,
  sendEmail: boolean = true
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    throw new Error("Không tìm thấy user");
  }

  return {
    success: true,
    message: "Reset password thành công",
  };
};

export const deleteUser = async (
  userId: number,
  force: boolean = false
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const userIndex = mockUsers.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    throw new Error("Không tìm thấy user");
  }

  if (force) {
    mockUsers.splice(userIndex, 1);
  } else {
    mockUsers[userIndex].account.status = 0;
  }

  return {
    success: true,
    message: "Xóa user thành công",
  };
};

export const fetchUserActivities = async (
  userId: number,
  params: {
    page?: number;
    limit?: number;
    type?: string;
    from_date?: string;
    to_date?: string;
  }
): Promise<{
  success: boolean;
  data: {
    activities: Activity[];
    pagination: {
      currentPage: number;
      perPage: number;
      total: number;
    };
  };
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredActivities = mockActivities.filter((a) => a.userId === userId);

  if (params.type) {
    filteredActivities = filteredActivities.filter(
      (a) => a.type === params.type
    );
  }

  const page = params.page || 1;
  const limit = params.limit || 50;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex);

  return {
    success: true,
    data: {
      activities: paginatedActivities,
      pagination: {
        currentPage: page,
        perPage: limit,
        total: filteredActivities.length,
      },
    },
  };
};
