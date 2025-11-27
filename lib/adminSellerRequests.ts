// Mock data for Admin Seller Requests based on API documentation

export interface SellerRequest {
  id: number;
  user: {
    userId: number;
    accountId: number;
    email: string;
    fullName: string;
    phoneNumber: string;
    avatar: string;
    totalOrders?: number;
    totalSpent?: number;
    account_age_days?: number;
  };
  currentRole: number;
  requestedRole: number;
  reason?: string | null;
  status: "pending" | "approved" | "rejected";
  statusText: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SellerRequestsResponse {
  success: boolean;
  data: {
    requests: SellerRequest[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
    summary: {
      total_requests: number;
      pending: number;
      approved: number;
      rejected: number;
    };
  };
}

// Mock data
const mockRequests: SellerRequest[] = [
  {
    id: 1001,
    user: {
      userId: 456,
      accountId: 123,
      email: "nguyenvana@example.com",
      fullName: "Nguyễn Văn A",
      phoneNumber: "0912345678",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenVanA",
      totalOrders: 25,
      totalSpent: 75000000,
      account_age_days: 180,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "pending",
    statusText: "Chờ duyệt",
    createdAt: "2024-11-20T10:00:00Z",
  },
  {
    id: 1002,
    user: {
      userId: 457,
      accountId: 124,
      email: "tranthib@example.com",
      fullName: "Trần Thị B",
      phoneNumber: "0923456789",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TranThiB",
      totalOrders: 18,
      totalSpent: 52000000,
      account_age_days: 120,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "pending",
    statusText: "Chờ duyệt",
    createdAt: "2024-11-21T14:30:00Z",
  },
  {
    id: 1003,
    user: {
      userId: 458,
      accountId: 125,
      email: "levanc@example.com",
      fullName: "Lê Văn C",
      phoneNumber: "0934567890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LeVanC",
      totalOrders: 32,
      totalSpent: 98000000,
      account_age_days: 240,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "approved",
    statusText: "Đã duyệt",
    createdAt: "2024-11-15T09:15:00Z",
    updatedAt: "2024-11-16T10:20:00Z",
  },
  {
    id: 1004,
    user: {
      userId: 459,
      accountId: 126,
      email: "phamthid@example.com",
      fullName: "Phạm Thị D",
      phoneNumber: "0945678901",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PhamThiD",
      totalOrders: 8,
      totalSpent: 15000000,
      account_age_days: 45,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "rejected",
    statusText: "Đã từ chối",
    createdAt: "2024-11-18T16:45:00Z",
    updatedAt: "2024-11-19T11:30:00Z",
    reason: "Không đủ điều kiện nâng cấp",
  },
  {
    id: 1005,
    user: {
      userId: 460,
      accountId: 127,
      email: "hoangvane@example.com",
      fullName: "Hoàng Văn E",
      phoneNumber: "0956789012",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HoangVanE",
      totalOrders: 42,
      totalSpent: 125000000,
      account_age_days: 365,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "pending",
    statusText: "Chờ duyệt",
    createdAt: "2024-11-22T08:20:00Z",
  },
  {
    id: 1006,
    user: {
      userId: 461,
      accountId: 128,
      email: "vuthif@example.com",
      fullName: "Vũ Thị F",
      phoneNumber: "0967890123",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=VuThiF",
      totalOrders: 15,
      totalSpent: 38000000,
      account_age_days: 90,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "pending",
    statusText: "Chờ duyệt",
    createdAt: "2024-11-23T11:10:00Z",
  },
  {
    id: 1007,
    user: {
      userId: 462,
      accountId: 129,
      email: "dangvang@example.com",
      fullName: "Đặng Văn G",
      phoneNumber: "0978901234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DangVanG",
      totalOrders: 28,
      totalSpent: 82000000,
      account_age_days: 200,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "approved",
    statusText: "Đã duyệt",
    createdAt: "2024-11-10T13:40:00Z",
    updatedAt: "2024-11-11T09:15:00Z",
  },
  {
    id: 1008,
    user: {
      userId: 463,
      accountId: 130,
      email: "buithih@example.com",
      fullName: "Bùi Thị H",
      phoneNumber: "0989012345",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BuiThiH",
      totalOrders: 20,
      totalSpent: 58000000,
      account_age_days: 150,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "pending",
    statusText: "Chờ duyệt",
    createdAt: "2024-11-24T15:25:00Z",
  },
  {
    id: 1009,
    user: {
      userId: 464,
      accountId: 131,
      email: "nguyenv@example.com",
      fullName: "Nguyễn V",
      phoneNumber: "0990123456",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenV",
      totalOrders: 10,
      totalSpent: 30000000,
      account_age_days: 60,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "pending",
    statusText: "Chờ duyệt",
    createdAt: "2024-11-25T10:00:00Z",
  },
  {
    id: 1010,
    user: {
      userId: 465,
      accountId: 132,
      email: "nguyenv@example.com",
      fullName: "Nguyễn V",
      phoneNumber: "0990123456",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenV2",
      totalOrders: 12,
      totalSpent: 35000000,
      account_age_days: 75,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "pending",
    statusText: "Chờ duyệt",
    createdAt: "2024-11-26T09:00:00Z",
  },
  {
    id: 1011,
    user: {
      userId: 466,
      accountId: 133,
      email: "nguyenv@example.com",
      fullName: "Nguyễn V",
      phoneNumber: "0990123456",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenV3",
      totalOrders: 14,
      totalSpent: 40000000,
      account_age_days: 80,
    },
    currentRole: 0,
    requestedRole: 1,
    status: "pending",
    statusText: "Chờ duyệt",
    createdAt: "2024-11-27T10:00:00Z",
  },
];

// Simulate API calls
export const fetchSellerRequests = async (params?: {
  page?: number;
  limit?: number;
  status?: "all" | "pending" | "approved" | "rejected";
  sort?: "newest" | "oldest";
}): Promise<SellerRequestsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const {
    page = 1,
    limit = 10,
    status = "all",
    sort = "newest",
  } = params || {};

  let filteredRequests = [...mockRequests];

  // Filter by status
  if (status !== "all") {
    filteredRequests = filteredRequests.filter((req) => req.status === status);
  }

  // Sort
  filteredRequests.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

  // Calculate summary
  const summary = {
    total_requests: mockRequests.length,
    pending: mockRequests.filter((r) => r.status === "pending").length,
    approved: mockRequests.filter((r) => r.status === "approved").length,
    rejected: mockRequests.filter((r) => r.status === "rejected").length,
  };

  return {
    success: true,
    data: {
      requests: paginatedRequests,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredRequests.length / limit),
        totalItems: filteredRequests.length,
      },
      summary,
    },
  };
};

export const fetchSellerRequestDetail = async (
  requestId: number
): Promise<{ success: boolean; data: SellerRequest }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const request = mockRequests.find((r) => r.id === requestId);

  if (!request) {
    throw new Error("Request not found");
  }

  return {
    success: true,
    data: request,
  };
};

export const approveSellerRequest = async (
  requestId: number,
  note?: string
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const request = mockRequests.find((r) => r.id === requestId);
  if (request) {
    request.status = "approved";
    request.statusText = "Đã duyệt";
    request.updatedAt = new Date().toISOString();
  }

  return {
    success: true,
    message: "Đã duyệt yêu cầu nâng cấp",
  };
};

export const rejectSellerRequest = async (
  requestId: number,
  reason: string,
  note?: string
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const request = mockRequests.find((r) => r.id === requestId);
  if (request) {
    request.status = "rejected";
    request.statusText = "Đã từ chối";
    request.reason = reason;
    request.updatedAt = new Date().toISOString();
  }

  return {
    success: true,
    message: "Đã từ chối yêu cầu",
  };
};
