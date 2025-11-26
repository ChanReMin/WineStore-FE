// Mock data for Admin Seller Requests based on API documentation

export interface SellerRequest {
  id: number;
  user: {
    user_id: number;
    account_id: number;
    email: string;
    full_name: string;
    phone_number: string;
    avatar: string;
    total_orders?: number;
    total_spent?: number;
    account_age_days?: number;
  };
  current_role: number;
  requested_role: number;
  reason?: string | null;
  status: "pending" | "approved" | "rejected";
  status_text: string;
  created_at: string;
  updated_at?: string;
}

export interface SellerRequestsResponse {
  success: boolean;
  data: {
    requests: SellerRequest[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_items: number;
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
      user_id: 456,
      account_id: 123,
      email: "nguyenvana@example.com",
      full_name: "Nguyễn Văn A",
      phone_number: "0912345678",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenVanA",
      total_orders: 25,
      total_spent: 75000000,
      account_age_days: 180,
    },
    current_role: 0,
    requested_role: 1,
    status: "pending",
    status_text: "Chờ duyệt",
    created_at: "2024-11-20T10:00:00Z",
  },
  {
    id: 1002,
    user: {
      user_id: 457,
      account_id: 124,
      email: "tranthib@example.com",
      full_name: "Trần Thị B",
      phone_number: "0923456789",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TranThiB",
      total_orders: 18,
      total_spent: 52000000,
      account_age_days: 120,
    },
    current_role: 0,
    requested_role: 1,
    status: "pending",
    status_text: "Chờ duyệt",
    created_at: "2024-11-21T14:30:00Z",
  },
  {
    id: 1003,
    user: {
      user_id: 458,
      account_id: 125,
      email: "levanc@example.com",
      full_name: "Lê Văn C",
      phone_number: "0934567890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LeVanC",
      total_orders: 32,
      total_spent: 98000000,
      account_age_days: 240,
    },
    current_role: 0,
    requested_role: 1,
    status: "approved",
    status_text: "Đã duyệt",
    created_at: "2024-11-15T09:15:00Z",
    updated_at: "2024-11-16T10:20:00Z",
  },
  {
    id: 1004,
    user: {
      user_id: 459,
      account_id: 126,
      email: "phamthid@example.com",
      full_name: "Phạm Thị D",
      phone_number: "0945678901",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PhamThiD",
      total_orders: 8,
      total_spent: 15000000,
      account_age_days: 45,
    },
    current_role: 0,
    requested_role: 1,
    status: "rejected",
    status_text: "Đã từ chối",
    created_at: "2024-11-18T16:45:00Z",
    updated_at: "2024-11-19T11:30:00Z",
    reason: "Không đủ điều kiện nâng cấp",
  },
  {
    id: 1005,
    user: {
      user_id: 460,
      account_id: 127,
      email: "hoangvane@example.com",
      full_name: "Hoàng Văn E",
      phone_number: "0956789012",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HoangVanE",
      total_orders: 42,
      total_spent: 125000000,
      account_age_days: 365,
    },
    current_role: 0,
    requested_role: 1,
    status: "pending",
    status_text: "Chờ duyệt",
    created_at: "2024-11-22T08:20:00Z",
  },
  {
    id: 1006,
    user: {
      user_id: 461,
      account_id: 128,
      email: "vuthif@example.com",
      full_name: "Vũ Thị F",
      phone_number: "0967890123",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=VuThiF",
      total_orders: 15,
      total_spent: 38000000,
      account_age_days: 90,
    },
    current_role: 0,
    requested_role: 1,
    status: "pending",
    status_text: "Chờ duyệt",
    created_at: "2024-11-23T11:10:00Z",
  },
  {
    id: 1007,
    user: {
      user_id: 462,
      account_id: 129,
      email: "dangvang@example.com",
      full_name: "Đặng Văn G",
      phone_number: "0978901234",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DangVanG",
      total_orders: 28,
      total_spent: 82000000,
      account_age_days: 200,
    },
    current_role: 0,
    requested_role: 1,
    status: "approved",
    status_text: "Đã duyệt",
    created_at: "2024-11-10T13:40:00Z",
    updated_at: "2024-11-11T09:15:00Z",
  },
  {
    id: 1008,
    user: {
      user_id: 463,
      account_id: 130,
      email: "buithih@example.com",
      full_name: "Bùi Thị H",
      phone_number: "0989012345",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BuiThiH",
      total_orders: 20,
      total_spent: 58000000,
      account_age_days: 150,
    },
    current_role: 0,
    requested_role: 1,
    status: "pending",
    status_text: "Chờ duyệt",
    created_at: "2024-11-24T15:25:00Z",
  },
  {
    id: 1009,
    user: {
      user_id: 464,
      account_id: 131,
      email: "nguyenv@example.com",
      full_name: "Nguyễn V",
      phone_number: "0990123456",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenV",
      total_orders: 10,
      total_spent: 30000000,
      account_age_days: 60,
    },
    current_role: 0,
    requested_role: 1,
    status: "pending",
    status_text: "Chờ duyệt",
    created_at: "2024-11-25T10:00:00Z",
  },
  {
    id: 1010,
    user: {
      user_id: 465,
      account_id: 132,
      email: "nguyenv@example.com",
      full_name: "Nguyễn V",
      phone_number: "0990123456",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenV2",
      total_orders: 12,
      total_spent: 35000000,
      account_age_days: 75,
    },
    current_role: 0,
    requested_role: 1,
    status: "pending",
    status_text: "Chờ duyệt",
    created_at: "2024-11-26T09:00:00Z",
  },
  {
    id: 1011,
    user: {
      user_id: 466,
      account_id: 133,
      email: "nguyenv@example.com",
      full_name: "Nguyễn V",
      phone_number: "0990123456",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NguyenV3",
      total_orders: 14,
      total_spent: 40000000,
      account_age_days: 80,
    },
    current_role: 0,
    requested_role: 1,
    status: "pending",
    status_text: "Chờ duyệt",
    created_at: "2024-11-27T10:00:00Z",
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
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
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
        current_page: page,
        total_pages: Math.ceil(filteredRequests.length / limit),
        total_items: filteredRequests.length,
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
    request.status_text = "Đã duyệt";
    request.updated_at = new Date().toISOString();
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
    request.status_text = "Đã từ chối";
    request.reason = reason;
    request.updated_at = new Date().toISOString();
  }

  return {
    success: true,
    message: "Đã từ chối yêu cầu",
  };
};
