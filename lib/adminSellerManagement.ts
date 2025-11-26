// Mock data for Admin Seller Management based on API documentation

export interface Seller {
  id: number;
  account_id: number;
  email: string;
  role: number;
  status: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar: string;
  date_of_birth: string;
  gender: number;
  last_login_at: string;
  created_at: string;
  updated_at?: string;
  managed_warehouses: {
    warehouse_id: number;
    warehouse_name: string;
    location?: string;
  }[];
  statistics?: {
    total_orders_handled: number;
    total_revenue: number;
    average_rating: number;
  };
}

export interface SellerListResponse {
  success: boolean;
  data: {
    sellers: Seller[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_records: number;
      limit: number;
    };
    summary: {
      total_sellers: number;
      active_sellers: number;
      inactive_sellers: number;
      locked_sellers: number;
    };
  };
}

export interface SellerDetailResponse {
  success: boolean;
  data: Seller;
}

// Mock sellers data
const mockSellers: Seller[] = [
  {
    id: 1,
    account_id: 5,
    email: "seller01@wineshop.com",
    role: 1,
    status: 1,
    first_name: "Nguyễn",
    last_name: "Văn A",
    phone_number: "0901234567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller01",
    date_of_birth: "1990-05-15",
    gender: 1,
    last_login_at: "2024-11-26T10:30:00Z",
    created_at: "2024-01-15T08:00:00Z",
    updated_at: "2024-11-20T14:22:00Z",
    managed_warehouses: [
      {
        warehouse_id: 1,
        warehouse_name: "Kho Hà Nội",
        location: "Số 123, Đường ABC, Hà Nội",
      },
    ],
    statistics: {
      total_orders_handled: 245,
      total_revenue: 125000000,
      average_rating: 4.5,
    },
  },
  {
    id: 2,
    account_id: 8,
    email: "seller02@wineshop.com",
    role: 1,
    status: 1,
    first_name: "Trần",
    last_name: "Thị B",
    phone_number: "0912345678",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller02",
    date_of_birth: "1995-08-20",
    gender: 2,
    last_login_at: "2024-11-25T15:45:00Z",
    created_at: "2024-02-10T09:30:00Z",
    updated_at: "2024-11-18T11:15:00Z",
    managed_warehouses: [
      {
        warehouse_id: 2,
        warehouse_name: "Kho TP.HCM",
        location: "Số 456, Đường XYZ, TP.HCM",
      },
      {
        warehouse_id: 3,
        warehouse_name: "Kho Đà Nẵng",
        location: "Số 789, Đường DEF, Đà Nẵng",
      },
    ],
    statistics: {
      total_orders_handled: 189,
      total_revenue: 98500000,
      average_rating: 4.7,
    },
  },
  {
    id: 3,
    account_id: 12,
    email: "seller03@wineshop.com",
    role: 1,
    status: 0,
    first_name: "Lê",
    last_name: "Văn C",
    phone_number: "0923456789",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller03",
    date_of_birth: "1988-03-12",
    gender: 1,
    last_login_at: "2024-11-20T08:20:00Z",
    created_at: "2024-03-05T10:00:00Z",
    updated_at: "2024-11-15T16:30:00Z",
    managed_warehouses: [],
    statistics: {
      total_orders_handled: 156,
      total_revenue: 75000000,
      average_rating: 4.3,
    },
  },
  {
    id: 4,
    account_id: 15,
    email: "seller04@wineshop.com",
    role: 1,
    status: 1,
    first_name: "Phạm",
    last_name: "Thị D",
    phone_number: "0934567890",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller04",
    date_of_birth: "1992-11-25",
    gender: 2,
    last_login_at: "2024-11-26T09:15:00Z",
    created_at: "2024-04-20T11:45:00Z",
    updated_at: "2024-11-22T13:50:00Z",
    managed_warehouses: [
      {
        warehouse_id: 1,
        warehouse_name: "Kho Hà Nội",
        location: "Số 123, Đường ABC, Hà Nội",
      },
    ],
    statistics: {
      total_orders_handled: 312,
      total_revenue: 156000000,
      average_rating: 4.8,
    },
  },
  {
    id: 5,
    account_id: 18,
    email: "seller05@wineshop.com",
    role: 1,
    status: -1,
    first_name: "Hoàng",
    last_name: "Văn E",
    phone_number: "0945678901",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller05",
    date_of_birth: "1993-07-08",
    gender: 1,
    last_login_at: "2024-11-10T14:30:00Z",
    created_at: "2024-05-12T08:20:00Z",
    updated_at: "2024-11-10T15:00:00Z",
    managed_warehouses: [],
    statistics: {
      total_orders_handled: 89,
      total_revenue: 42000000,
      average_rating: 3.9,
    },
  },
  {
    id: 6,
    account_id: 22,
    email: "seller06@wineshop.com",
    role: 1,
    status: 1,
    first_name: "Vũ",
    last_name: "Thị F",
    phone_number: "0956789012",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller06",
    date_of_birth: "1991-09-30",
    gender: 2,
    last_login_at: "2024-11-26T11:00:00Z",
    created_at: "2024-06-18T09:15:00Z",
    updated_at: "2024-11-24T10:20:00Z",
    managed_warehouses: [
      {
        warehouse_id: 2,
        warehouse_name: "Kho TP.HCM",
        location: "Số 456, Đường XYZ, TP.HCM",
      },
    ],
    statistics: {
      total_orders_handled: 278,
      total_revenue: 142000000,
      average_rating: 4.6,
    },
  },
];

export const fetchSellers = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: number | "all";
  role?: number;
}): Promise<SellerListResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredSellers = [...mockSellers];

  // Filter by search
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredSellers = filteredSellers.filter(
      (seller) =>
        seller.email.toLowerCase().includes(searchLower) ||
        `${seller.first_name} ${seller.last_name}`
          .toLowerCase()
          .includes(searchLower) ||
        seller.phone_number.includes(searchLower)
    );
  }

  // Filter by status
  if (params.status !== undefined && params.status !== "all") {
    filteredSellers = filteredSellers.filter(
      (seller) => seller.status === params.status
    );
  }

  // Filter by role
  if (params.role !== undefined) {
    filteredSellers = filteredSellers.filter(
      (seller) => seller.role === params.role
    );
  }

  const page = params.page || 1;
  const limit = params.limit || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedSellers = filteredSellers.slice(startIndex, endIndex);

  return {
    success: true,
    data: {
      sellers: paginatedSellers,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(filteredSellers.length / limit),
        total_records: filteredSellers.length,
        limit,
      },
      summary: {
        total_sellers: mockSellers.length,
        active_sellers: mockSellers.filter((s) => s.status === 1).length,
        inactive_sellers: mockSellers.filter((s) => s.status === 0).length,
        locked_sellers: mockSellers.filter((s) => s.status === -1).length,
      },
    },
  };
};

export const fetchSellerDetail = async (
  sellerId: number
): Promise<SellerDetailResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const seller = mockSellers.find((s) => s.id === sellerId);

  if (!seller) {
    throw new Error("Seller not found");
  }

  return {
    success: true,
    data: seller,
  };
};

export const createSeller = async (data: {
  email: string;
  password: string;
  role: number;
  first_name: string;
  last_name: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: number;
  warehouse_ids?: number[];
}): Promise<{ success: boolean; message: string; data: Seller }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate validation
  if (mockSellers.some((s) => s.email === data.email)) {
    throw new Error("Email đã tồn tại trong hệ thống");
  }

  const newSeller: Seller = {
    id: mockSellers.length + 1,
    account_id: 100 + mockSellers.length,
    email: data.email,
    role: data.role,
    status: 1,
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: data.phone_number || "",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
    date_of_birth: data.date_of_birth || "",
    gender: data.gender || 1,
    last_login_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    managed_warehouses: [],
    statistics: {
      total_orders_handled: 0,
      total_revenue: 0,
      average_rating: 0,
    },
  };

  mockSellers.push(newSeller);

  return {
    success: true,
    message: "Tạo seller thành công",
    data: newSeller,
  };
};

export const updateSeller = async (
  sellerId: number,
  data: Partial<Seller>
): Promise<{ success: boolean; message: string; data: Seller }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const sellerIndex = mockSellers.findIndex((s) => s.id === sellerId);

  if (sellerIndex === -1) {
    throw new Error("Không tìm thấy seller");
  }

  mockSellers[sellerIndex] = {
    ...mockSellers[sellerIndex],
    ...data,
    updated_at: new Date().toISOString(),
  };

  return {
    success: true,
    message: "Cập nhật thông tin seller thành công",
    data: mockSellers[sellerIndex],
  };
};

export const updateSellerStatus = async (
  sellerId: number,
  status: number
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const sellerIndex = mockSellers.findIndex((s) => s.id === sellerId);

  if (sellerIndex === -1) {
    throw new Error("Không tìm thấy seller");
  }

  mockSellers[sellerIndex].status = status;
  mockSellers[sellerIndex].updated_at = new Date().toISOString();

  return {
    success: true,
    message: "Cập nhật trạng thái thành công",
  };
};

export const updateSellerPassword = async (
  sellerId: number,
  newPassword: string
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const seller = mockSellers.find((s) => s.id === sellerId);

  if (!seller) {
    throw new Error("Không tìm thấy seller");
  }

  return {
    success: true,
    message: "Đổi mật khẩu thành công",
  };
};

export const deleteSeller = async (
  sellerId: number
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const sellerIndex = mockSellers.findIndex((s) => s.id === sellerId);

  if (sellerIndex === -1) {
    throw new Error("Không tìm thấy seller");
  }

  // Soft delete - set status to 0
  mockSellers[sellerIndex].status = 0;

  return {
    success: true,
    message: "Xóa seller thành công",
  };
};
