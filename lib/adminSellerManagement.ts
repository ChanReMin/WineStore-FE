// Mock data for Admin Seller Management based on API documentation

export interface Seller {
  id: number;
  accountId: number;
  email: string;
  role: number;
  status: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  dateOfBirth: string;
  gender: number;
  lastLoginAt: string;
  createdAt: string;
  updatedAt?: string;
  managedWarehouses: {
    warehouseId: number;
    warehouseName: string;
    location?: string;
  }[];
  statistics?: {
    totalOrdersHandled: number;
    totalRevenue: number;
    average_rating: number;
  };
}

export interface SellerListResponse {
  success: boolean;
  data: {
    sellers: Seller[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalRecords: number;
      limit: number;
    };
    summary: {
      totalSellers: number;
      activeSellers: number;
      inactiveSellers: number;
      lockedSellers: number;
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
    accountId: 5,
    email: "seller01@wineshop.com",
    role: 1,
    status: 1,
    firstName: "Nguyễn",
    lastName: "Văn A",
    phoneNumber: "0901234567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller01",
    dateOfBirth: "1990-05-15",
    gender: 1,
    lastLoginAt: "2024-11-26T10:30:00Z",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-11-20T14:22:00Z",
    managedWarehouses: [
      {
        warehouseId: 1,
        warehouseName: "Kho Hà Nội",
        location: "Số 123, Đường ABC, Hà Nội",
      },
    ],
    statistics: {
      totalOrdersHandled: 245,
      totalRevenue: 125000000,
      average_rating: 4.5,
    },
  },
  {
    id: 2,
    accountId: 8,
    email: "seller02@wineshop.com",
    role: 1,
    status: 1,
    firstName: "Trần",
    lastName: "Thị B",
    phoneNumber: "0912345678",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller02",
    dateOfBirth: "1995-08-20",
    gender: 2,
    lastLoginAt: "2024-11-25T15:45:00Z",
    createdAt: "2024-02-10T09:30:00Z",
    updatedAt: "2024-11-18T11:15:00Z",
    managedWarehouses: [
      {
        warehouseId: 2,
        warehouseName: "Kho TP.HCM",
        location: "Số 456, Đường XYZ, TP.HCM",
      },
      {
        warehouseId: 3,
        warehouseName: "Kho Đà Nẵng",
        location: "Số 789, Đường DEF, Đà Nẵng",
      },
    ],
    statistics: {
      totalOrdersHandled: 189,
      totalRevenue: 98500000,
      average_rating: 4.7,
    },
  },
  {
    id: 3,
    accountId: 12,
    email: "seller03@wineshop.com",
    role: 1,
    status: 0,
    firstName: "Lê",
    lastName: "Văn C",
    phoneNumber: "0923456789",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller03",
    dateOfBirth: "1988-03-12",
    gender: 1,
    lastLoginAt: "2024-11-20T08:20:00Z",
    createdAt: "2024-03-05T10:00:00Z",
    updatedAt: "2024-11-15T16:30:00Z",
    managedWarehouses: [],
    statistics: {
      totalOrdersHandled: 156,
      totalRevenue: 75000000,
      average_rating: 4.3,
    },
  },
  {
    id: 4,
    accountId: 15,
    email: "seller04@wineshop.com",
    role: 1,
    status: 1,
    firstName: "Phạm",
    lastName: "Thị D",
    phoneNumber: "0934567890",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller04",
    dateOfBirth: "1992-11-25",
    gender: 2,
    lastLoginAt: "2024-11-26T09:15:00Z",
    createdAt: "2024-04-20T11:45:00Z",
    updatedAt: "2024-11-22T13:50:00Z",
    managedWarehouses: [
      {
        warehouseId: 1,
        warehouseName: "Kho Hà Nội",
        location: "Số 123, Đường ABC, Hà Nội",
      },
    ],
    statistics: {
      totalOrdersHandled: 312,
      totalRevenue: 156000000,
      average_rating: 4.8,
    },
  },
  {
    id: 5,
    accountId: 18,
    email: "seller05@wineshop.com",
    role: 1,
    status: -1,
    firstName: "Hoàng",
    lastName: "Văn E",
    phoneNumber: "0945678901",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller05",
    dateOfBirth: "1993-07-08",
    gender: 1,
    lastLoginAt: "2024-11-10T14:30:00Z",
    createdAt: "2024-05-12T08:20:00Z",
    updatedAt: "2024-11-10T15:00:00Z",
    managedWarehouses: [],
    statistics: {
      totalOrdersHandled: 89,
      totalRevenue: 42000000,
      average_rating: 3.9,
    },
  },
  {
    id: 6,
    accountId: 22,
    email: "seller06@wineshop.com",
    role: 1,
    status: 1,
    firstName: "Vũ",
    lastName: "Thị F",
    phoneNumber: "0956789012",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller06",
    dateOfBirth: "1991-09-30",
    gender: 2,
    lastLoginAt: "2024-11-26T11:00:00Z",
    createdAt: "2024-06-18T09:15:00Z",
    updatedAt: "2024-11-24T10:20:00Z",
    managedWarehouses: [
      {
        warehouseId: 2,
        warehouseName: "Kho TP.HCM",
        location: "Số 456, Đường XYZ, TP.HCM",
      },
    ],
    statistics: {
      totalOrdersHandled: 278,
      totalRevenue: 142000000,
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
        `${seller.firstName} ${seller.lastName}`
          .toLowerCase()
          .includes(searchLower) ||
        seller.phoneNumber.includes(searchLower)
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
        currentPage: page,
        totalPages: Math.ceil(filteredSellers.length / limit),
        totalRecords: filteredSellers.length,
        limit,
      },
      summary: {
        totalSellers: mockSellers.length,
        activeSellers: mockSellers.filter((s) => s.status === 1).length,
        inactiveSellers: mockSellers.filter((s) => s.status === 0).length,
        lockedSellers: mockSellers.filter((s) => s.status === -1).length,
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
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: number;
  warehouseIds?: number[];
}): Promise<{ success: boolean; message: string; data: Seller }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate validation
  if (mockSellers.some((s) => s.email === data.email)) {
    throw new Error("Email đã tồn tại trong hệ thống");
  }

  const newSeller: Seller = {
    id: mockSellers.length + 1,
    accountId: 100 + mockSellers.length,
    email: data.email,
    role: data.role,
    status: 1,
    firstName: data.firstName,
    lastName: data.lastName,
    phoneNumber: data.phoneNumber || "",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
    dateOfBirth: data.dateOfBirth || "",
    gender: data.gender || 1,
    lastLoginAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    managedWarehouses: [],
    statistics: {
      totalOrdersHandled: 0,
      totalRevenue: 0,
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
    updatedAt: new Date().toISOString(),
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
  mockSellers[sellerIndex].updatedAt = new Date().toISOString();

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
