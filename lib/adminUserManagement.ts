// Mock data for Admin User Management based on API documentation

export interface User {
  id: number;
  account: {
    id: number;
    email: string;
    role: number;
    role_name: string;
    status: number;
    status_name: string;
    last_login_at: string;
    created_at: string;
  };
  user_info: {
    avatar: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    date_of_birth: string;
    gender: number;
    gender_name: string;
  };
  stats: {
    total_orders: number;
    total_spent: number;
    address_count: number;
  };
}

export interface UserListResponse {
  success: boolean;
  data: {
    users: User[];
    pagination: {
      current_page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
    summary: {
      total_users: number;
      active_users: number;
      inactive_users: number;
      locked_users: number;
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
      last_login_at: string;
      created_at: string;
      updated_at: string;
    };
    user_info: {
      avatar: string;
      first_name: string;
      last_name: string;
      phone_number: string;
      date_of_birth: string;
      gender: number;
      created_at: string;
      updated_at: string;
    };
    addresses: {
      id: number;
      full_name: string;
      phone_number: string;
      address_line: string;
      ward: string;
      district: string;
      city: string;
      is_default: boolean;
    }[];
    order_stats: {
      total_orders: number;
      completed_orders: number;
      cancelled_orders: number;
      total_spent: number;
      avg_order_value: number;
    };
  };
}

export interface Activity {
  id: number;
  user_id: number;
  type: string;
  description: string;
  ip_address?: string;
  user_agent?: string;
  reference_id?: number;
  reference_type?: string;
  created_at: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: 1,
    account: {
      id: 1,
      email: "customer01@example.com",
      role: 0,
      role_name: "Customer",
      status: 1,
      status_name: "Active",
      last_login_at: "2024-11-26T10:30:00Z",
      created_at: "2024-01-15T08:00:00Z",
    },
    user_info: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer01",
      first_name: "Nguyễn",
      last_name: "Văn A",
      phone_number: "0901234567",
      date_of_birth: "1990-05-15",
      gender: 1,
      gender_name: "Male",
    },
    stats: {
      total_orders: 15,
      total_spent: 25000000,
      address_count: 2,
    },
  },
  {
    id: 2,
    account: {
      id: 2,
      email: "customer02@example.com",
      role: 0,
      role_name: "Customer",
      status: 1,
      status_name: "Active",
      last_login_at: "2024-11-25T15:45:00Z",
      created_at: "2024-02-10T09:30:00Z",
    },
    user_info: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer02",
      first_name: "Trần",
      last_name: "Thị B",
      phone_number: "0912345678",
      date_of_birth: "1995-08-20",
      gender: 2,
      gender_name: "Female",
    },
    stats: {
      total_orders: 8,
      total_spent: 12000000,
      address_count: 1,
    },
  },
  {
    id: 3,
    account: {
      id: 3,
      email: "customer03@example.com",
      role: 0,
      role_name: "Customer",
      status: 0,
      status_name: "Inactive",
      last_login_at: "2024-11-20T08:20:00Z",
      created_at: "2024-03-05T10:00:00Z",
    },
    user_info: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer03",
      first_name: "Lê",
      last_name: "Văn C",
      phone_number: "0923456789",
      date_of_birth: "1988-03-12",
      gender: 1,
      gender_name: "Male",
    },
    stats: {
      total_orders: 3,
      total_spent: 5000000,
      address_count: 1,
    },
  },
  {
    id: 4,
    account: {
      id: 4,
      email: "customer04@example.com",
      role: 0,
      role_name: "Customer",
      status: 1,
      status_name: "Active",
      last_login_at: "2024-11-26T09:15:00Z",
      created_at: "2024-04-20T11:45:00Z",
    },
    user_info: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer04",
      first_name: "Phạm",
      last_name: "Thị D",
      phone_number: "0934567890",
      date_of_birth: "1992-11-25",
      gender: 2,
      gender_name: "Female",
    },
    stats: {
      total_orders: 22,
      total_spent: 38000000,
      address_count: 3,
    },
  },
  {
    id: 5,
    account: {
      id: 5,
      email: "customer05@example.com",
      role: 0,
      role_name: "Customer",
      status: -1,
      status_name: "Locked",
      last_login_at: "2024-11-10T14:30:00Z",
      created_at: "2024-05-12T08:20:00Z",
    },
    user_info: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer05",
      first_name: "Hoàng",
      last_name: "Văn E",
      phone_number: "0945678901",
      date_of_birth: "1993-07-08",
      gender: 1,
      gender_name: "Male",
    },
    stats: {
      total_orders: 5,
      total_spent: 8000000,
      address_count: 1,
    },
  },
  {
    id: 6,
    account: {
      id: 6,
      email: "seller01@example.com",
      role: 1,
      role_name: "Seller",
      status: 1,
      status_name: "Active",
      last_login_at: "2024-11-26T11:00:00Z",
      created_at: "2024-01-20T09:15:00Z",
    },
    user_info: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller01",
      first_name: "Vũ",
      last_name: "Thị F",
      phone_number: "0956789012",
      date_of_birth: "1991-09-30",
      gender: 2,
      gender_name: "Female",
    },
    stats: {
      total_orders: 0,
      total_spent: 0,
      address_count: 1,
    },
  },
  {
    id: 7,
    account: {
      id: 7,
      email: "admin01@example.com",
      role: 2,
      role_name: "Admin",
      status: 1,
      status_name: "Active",
      last_login_at: "2024-11-26T12:00:00Z",
      created_at: "2024-01-01T00:00:00Z",
    },
    user_info: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin01",
      first_name: "Admin",
      last_name: "System",
      phone_number: "0967890123",
      date_of_birth: "1985-01-01",
      gender: 1,
      gender_name: "Male",
    },
    stats: {
      total_orders: 0,
      total_spent: 0,
      address_count: 0,
    },
  },
  {
    id: 8,
    account: {
      id: 8,
      email: "customer06@example.com",
      role: 0,
      role_name: "Customer",
      status: 1,
      status_name: "Active",
      last_login_at: "2024-11-26T08:45:00Z",
      created_at: "2024-06-15T10:30:00Z",
    },
    user_info: {
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer06",
      first_name: "Đặng",
      last_name: "Văn G",
      phone_number: "0978901234",
      date_of_birth: "1994-12-10",
      gender: 1,
      gender_name: "Male",
    },
    stats: {
      total_orders: 12,
      total_spent: 18000000,
      address_count: 2,
    },
  },
];

// Mock activities
const mockActivities: Activity[] = [
  {
    id: 1001,
    user_id: 1,
    type: "login",
    description: "Đăng nhập từ IP 192.168.1.1",
    ip_address: "192.168.1.1",
    user_agent: "Mozilla/5.0...",
    created_at: "2024-11-26T10:30:00Z",
  },
  {
    id: 1002,
    user_id: 1,
    type: "order",
    description: "Đặt đơn hàng #ORD123456",
    reference_id: 456,
    reference_type: "order",
    created_at: "2024-11-26T11:15:00Z",
  },
  {
    id: 1003,
    user_id: 1,
    type: "profile_update",
    description: "Cập nhật thông tin cá nhân",
    created_at: "2024-11-25T14:20:00Z",
  },
];

export const fetchUsers = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  role?: number | "all";
  status?: number | "all";
  sort_by?: string;
  sort_order?: string;
}): Promise<UserListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredUsers = [...mockUsers];

  // Filter by search
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.account.email.toLowerCase().includes(searchLower) ||
        `${user.user_info.first_name} ${user.user_info.last_name}`
          .toLowerCase()
          .includes(searchLower) ||
        user.user_info.phone_number.includes(searchLower) ||
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
  if (params.sort_by) {
    filteredUsers.sort((a, b) => {
      let aVal: any, bVal: any;

      switch (params.sort_by) {
        case "created_at":
          aVal = new Date(a.account.created_at).getTime();
          bVal = new Date(b.account.created_at).getTime();
          break;
        case "last_login_at":
          aVal = new Date(a.account.last_login_at).getTime();
          bVal = new Date(b.account.last_login_at).getTime();
          break;
        case "email":
          aVal = a.account.email;
          bVal = b.account.email;
          break;
        default:
          return 0;
      }

      if (params.sort_order === "desc") {
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
        current_page: page,
        per_page: limit,
        total: filteredUsers.length,
        total_pages: Math.ceil(filteredUsers.length / limit),
      },
      summary: {
        total_users: mockUsers.length,
        active_users: mockUsers.filter((u) => u.account.status === 1).length,
        inactive_users: mockUsers.filter((u) => u.account.status === 0).length,
        locked_users: mockUsers.filter((u) => u.account.status === -1).length,
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
        updated_at: "2024-11-20T14:22:00Z",
      },
      user_info: {
        ...user.user_info,
        created_at: user.account.created_at,
        updated_at: "2024-11-20T14:22:00Z",
      },
      addresses: [
        {
          id: 1,
          full_name: `${user.user_info.first_name} ${user.user_info.last_name}`,
          phone_number: user.user_info.phone_number,
          address_line: "123 Đường ABC",
          ward: "Phường 1",
          district: "Quận 1",
          city: "TP.HCM",
          is_default: true,
        },
      ],
      order_stats: {
        total_orders: user.stats.total_orders,
        completed_orders: Math.floor(user.stats.total_orders * 0.8),
        cancelled_orders: Math.floor(user.stats.total_orders * 0.1),
        total_spent: user.stats.total_spent,
        avg_order_value:
          user.stats.total_orders > 0
            ? Math.floor(user.stats.total_spent / user.stats.total_orders)
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
  user_info: {
    first_name: string;
    last_name: string;
    phone_number?: string;
    date_of_birth?: string;
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
      role_name:
        data.role === 0 ? "Customer" : data.role === 1 ? "Seller" : "Admin",
      status: data.status ?? 1,
      status_name: "Active",
      last_login_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    user_info: {
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      first_name: data.user_info.first_name,
      last_name: data.user_info.last_name,
      phone_number: data.user_info.phone_number || "",
      date_of_birth: data.user_info.date_of_birth || "",
      gender: data.user_info.gender || 1,
      gender_name: data.user_info.gender === 2 ? "Female" : "Male",
    },
    stats: {
      total_orders: 0,
      total_spent: 0,
      address_count: 0,
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
    user_info: Partial<User["user_info"]>;
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
    mockUsers[userIndex].account.role_name =
      data.role === 0 ? "Customer" : data.role === 1 ? "Seller" : "Admin";
  }
  if (data.status !== undefined) {
    mockUsers[userIndex].account.status = data.status;
  }
  if (data.user_info) {
    mockUsers[userIndex].user_info = {
      ...mockUsers[userIndex].user_info,
      ...data.user_info,
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
  mockUsers[userIndex].account.status_name =
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
  mockUsers[userIndex].account.role_name =
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
      current_page: number;
      per_page: number;
      total: number;
    };
  };
}> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredActivities = mockActivities.filter((a) => a.user_id === userId);

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
        current_page: page,
        per_page: limit,
        total: filteredActivities.length,
      },
    },
  };
};
