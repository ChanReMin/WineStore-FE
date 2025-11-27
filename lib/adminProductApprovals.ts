// Mock data for Admin Product Approvals based on API documentation

export interface ProductApproval {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category: {
    id: number;
    name: string;
    parent_id?: number;
  };
  brand: {
    id: number;
    name: string;
    country?: string;
  };
  price: number;
  basePrice: number;
  images: string[];
  seller: {
    userId: number;
    accountId?: number;
    fullName: string;
    email: string;
    phoneNumber?: string;
    totalProducts?: number;
    approvedProducts?: number;
    rejectedProducts?: number;
    sellerRating?: number;
  };
  approvalStatus: "pending" | "approved" | "rejected" | "pending_changes";
  approvalStatusText: string;
  submittedAt: string;
  createdAt: string;
  // Detailed fields
  countryOfProduction?: string;
  grapeVariety?: string;
  concentration?: number;
  productionArea?: string;
  vintageYear?: number;
  capacityMl?: number;
  idealtemperature?: string;
  storageNotes?: string;
  description?: string;
  status?: number;
}

export interface ProductApprovalsResponse {
  success: boolean;
  data: {
    products: ProductApproval[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
    summary: {
      totalPending: number;
      totalApprovedToday: number;
      totalRejectedToday: number;
    };
  };
}

// Mock products data
const mockProducts: ProductApproval[] = [
  {
    id: 1050,
    name: "Chateau Margaux 2020",
    slug: "chateau-margaux-2020",
    sku: "WN-CHM-2020",
    category: {
      id: 5,
      name: "Rượu vang đỏ",
      parent_id: 1,
    },
    brand: {
      id: 3,
      name: "Chateau Margaux",
      country: "France",
    },
    price: 16000000,
    basePrice: 18000000,
    images: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
    ],
    seller: {
      userId: 456,
      accountId: 123,
      fullName: "Nguyễn Văn A",
      email: "seller@example.com",
      phoneNumber: "0912345678",
      totalProducts: 25,
      approvedProducts: 23,
      rejectedProducts: 1,
      sellerRating: 4.8,
    },
    approvalStatus: "pending",
    approvalStatusText: "Chờ duyệt",
    submittedAt: "2024-11-24T15:00:00Z",
    createdAt: "2024-11-24T14:30:00Z",
    countryOfProduction: "France",
    grapeVariety: "Cabernet Sauvignon, Merlot",
    concentration: 13.5,
    productionArea: "Bordeaux",
    vintageYear: 2020,
    capacityMl: 750,
    idealtemperature: "16-18°C",
    storageNotes: "Nằm ngang, nhiệt độ ổn định",
    description:
      "Chateau Margaux 2020 là một trong những loại rượu vang đỏ cao cấp nhất từ vùng Bordeaux, Pháp. Với hương vị phức tạp và cân bằng hoàn hảo.",
    status: 0,
  },
  {
    id: 1051,
    name: "Penfolds Grange 2018",
    slug: "penfolds-grange-2018",
    sku: "WN-PFG-2018",
    category: {
      id: 5,
      name: "Rượu vang đỏ",
    },
    brand: {
      id: 8,
      name: "Penfolds",
      country: "Australia",
    },
    price: 12500000,
    basePrice: 14000000,
    images: [
      "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
    ],
    seller: {
      userId: 457,
      fullName: "Trần Thị B",
      email: "tranthib@example.com",
      phoneNumber: "0923456789",
      totalProducts: 18,
      approvedProducts: 16,
      rejectedProducts: 0,
      sellerRating: 4.6,
    },
    approvalStatus: "pending",
    approvalStatusText: "Chờ duyệt",
    submittedAt: "2024-11-25T09:30:00Z",
    createdAt: "2024-11-25T09:00:00Z",
    countryOfProduction: "Australia",
    grapeVariety: "Shiraz",
    concentration: 14.5,
    productionArea: "South Australia",
    vintageYear: 2018,
    capacityMl: 750,
    idealtemperature: "16-18°C",
    storageNotes: "Bảo quản nơi khô ráo, thoáng mát",
    description:
      "Penfolds Grange là biểu tượng của rượu vang Úc, với hương vị mạnh mẽ và đậm đà.",
    status: 0,
  },
  {
    id: 1052,
    name: "Opus One 2019",
    slug: "opus-one-2019",
    sku: "WN-OPO-2019",
    category: {
      id: 5,
      name: "Rượu vang đỏ",
    },
    brand: {
      id: 12,
      name: "Opus One",
      country: "USA",
    },
    price: 22000000,
    basePrice: 25000000,
    images: [
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
    ],
    seller: {
      userId: 458,
      fullName: "Lê Văn C",
      email: "levanc@example.com",
      totalProducts: 32,
      approvedProducts: 30,
      rejectedProducts: 1,
      sellerRating: 4.9,
    },
    approvalStatus: "pending",
    approvalStatusText: "Chờ duyệt",
    submittedAt: "2024-11-25T11:00:00Z",
    createdAt: "2024-11-25T10:45:00Z",
    countryOfProduction: "USA",
    grapeVariety: "Cabernet Sauvignon, Merlot, Cabernet Franc",
    concentration: 14.0,
    productionArea: "Napa Valley",
    vintageYear: 2019,
    capacityMl: 750,
    idealtemperature: "16-18°C",
    storageNotes: "Nằm ngang, tránh ánh sáng trực tiếp",
    description:
      "Opus One là sự hợp tác giữa Baron Philippe de Rothschild và Robert Mondavi, tạo nên một trong những loại rượu vang cao cấp nhất của Mỹ.",
    status: 0,
  },
  {
    id: 1053,
    name: "Dom Pérignon 2012",
    slug: "dom-perignon-2012",
    sku: "WN-DPG-2012",
    category: {
      id: 8,
      name: "Rượu vang sủi",
    },
    brand: {
      id: 15,
      name: "Dom Pérignon",
      country: "France",
    },
    price: 18000000,
    basePrice: 20000000,
    images: [
      "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=400",
    ],
    seller: {
      userId: 459,
      fullName: "Phạm Thị D",
      email: "phamthid@example.com",
      totalProducts: 15,
      approvedProducts: 14,
      rejectedProducts: 0,
      sellerRating: 4.7,
    },
    approvalStatus: "approved",
    approvalStatusText: "Đã duyệt",
    submittedAt: "2024-11-20T14:00:00Z",
    createdAt: "2024-11-20T13:30:00Z",
    countryOfProduction: "France",
    grapeVariety: "Chardonnay, Pinot Noir",
    concentration: 12.5,
    productionArea: "Champagne",
    vintageYear: 2012,
    capacityMl: 750,
    idealtemperature: "8-10°C",
    storageNotes: "Bảo quản nơi mát, tránh rung động",
    description:
      "Dom Pérignon là champagne cao cấp với hương vị tinh tế và bọt khí mịn màng.",
    status: 1,
  },
  {
    id: 1054,
    name: "Sassicaia 2017",
    slug: "sassicaia-2017",
    sku: "WN-SSC-2017",
    category: {
      id: 5,
      name: "Rượu vang đỏ",
    },
    brand: {
      id: 20,
      name: "Tenuta San Guido",
      country: "Italy",
    },
    price: 15000000,
    basePrice: 17000000,
    images: ["https://images.unsplash.com/photo-1566754436-d9e8c96c4b6e?w=400"],
    seller: {
      userId: 460,
      fullName: "Hoàng Văn E",
      email: "hoangvane@example.com",
      totalProducts: 28,
      approvedProducts: 26,
      rejectedProducts: 1,
      sellerRating: 4.8,
    },
    approvalStatus: "rejected",
    approvalStatusText: "Đã từ chối",
    submittedAt: "2024-11-22T10:00:00Z",
    createdAt: "2024-11-22T09:30:00Z",
    countryOfProduction: "Italy",
    grapeVariety: "Cabernet Sauvignon, Cabernet Franc",
    concentration: 13.5,
    productionArea: "Tuscany",
    vintageYear: 2017,
    capacityMl: 750,
    idealtemperature: "16-18°C",
    storageNotes: "Nằm ngang, nhiệt độ ổn định",
    description:
      "Sassicaia là một trong những Super Tuscan nổi tiếng nhất, với phong cách Bordeaux độc đáo.",
    status: 0,
  },
  {
    id: 1055,
    name: "Cloudy Bay Sauvignon Blanc 2021",
    slug: "cloudy-bay-sauvignon-blanc-2021",
    sku: "WN-CBS-2021",
    category: {
      id: 6,
      name: "Rượu vang trắng",
    },
    brand: {
      id: 25,
      name: "Cloudy Bay",
      country: "New Zealand",
    },
    price: 1800000,
    basePrice: 2000000,
    images: [
      "https://images.unsplash.com/photo-1597306691829-6e6c3e6e5e5e?w=400",
    ],
    seller: {
      userId: 461,
      fullName: "Vũ Thị F",
      email: "vuthif@example.com",
      totalProducts: 20,
      approvedProducts: 19,
      rejectedProducts: 0,
      sellerRating: 4.5,
    },
    approvalStatus: "pending",
    approvalStatusText: "Chờ duyệt",
    submittedAt: "2024-11-25T13:00:00Z",
    createdAt: "2024-11-25T12:45:00Z",
    countryOfProduction: "New Zealand",
    grapeVariety: "Sauvignon Blanc",
    concentration: 13.0,
    productionArea: "Marlborough",
    vintageYear: 2021,
    capacityMl: 750,
    idealtemperature: "8-10°C",
    storageNotes: "Bảo quản nơi mát, tránh ánh sáng",
    description:
      "Cloudy Bay Sauvignon Blanc là biểu tượng của rượu vang New Zealand với hương vị tươi mát.",
    status: 0,
  },
  {
    id: 1056,
    name: "Tignanello 2018",
    slug: "tignanello-2018",
    sku: "WN-TGN-2018",
    category: {
      id: 5,
      name: "Rượu vang đỏ",
    },
    brand: {
      id: 30,
      name: "Antinori",
      country: "Italy",
    },
    price: 8500000,
    basePrice: 9500000,
    images: ["https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400"],
    seller: {
      userId: 462,
      fullName: "Đặng Văn G",
      email: "dangvang@example.com",
      totalProducts: 22,
      approvedProducts: 21,
      rejectedProducts: 0,
      sellerRating: 4.6,
    },
    approvalStatus: "pending",
    approvalStatusText: "Chờ duyệt",
    submittedAt: "2024-11-25T14:30:00Z",
    createdAt: "2024-11-25T14:00:00Z",
    countryOfProduction: "Italy",
    grapeVariety: "Sangiovese, Cabernet Sauvignon, Cabernet Franc",
    concentration: 13.5,
    productionArea: "Tuscany",
    vintageYear: 2018,
    capacityMl: 750,
    idealtemperature: "16-18°C",
    storageNotes: "Nằm ngang, nhiệt độ ổn định",
    description:
      "Tignanello là một trong những Super Tuscan đầu tiên và nổi tiếng nhất của Ý.",
    status: 0,
  },
];

// Simulate API calls
export const fetchProductApprovals = async (params?: {
  page?: number;
  limit?: number;
  status?: "all" | "pending" | "approved" | "rejected";
  seller_id?: number;
  categoryId?: number;
  sort?: "newest" | "oldest";
}): Promise<ProductApprovalsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const {
    page = 1,
    limit = 20,
    status = "all",
    sort = "newest",
  } = params || {};

  let filteredProducts = [...mockProducts];

  // Filter by status
  if (status !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.approvalStatus === status
    );
  }

  // Sort
  filteredProducts.sort((a, b) => {
    const dateA = new Date(a.submittedAt).getTime();
    const dateB = new Date(b.submittedAt).getTime();
    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Calculate summary
  const summary = {
    totalPending: mockProducts.filter((p) => p.approvalStatus === "pending")
      .length,
    totalApprovedToday: mockProducts.filter(
      (p) => p.approvalStatus === "approved"
    ).length,
    totalRejectedToday: mockProducts.filter(
      (p) => p.approvalStatus === "rejected"
    ).length,
  };

  return {
    success: true,
    data: {
      products: paginatedProducts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredProducts.length / limit),
        totalItems: filteredProducts.length,
      },
      summary,
    },
  };
};

export const fetchProductApprovalDetail = async (
  productId: number
): Promise<{ success: boolean; data: ProductApproval }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return {
    success: true,
    data: product,
  };
};

export const approveProduct = async (
  productId: number,
  note?: string
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const product = mockProducts.find((p) => p.id === productId);
  if (product) {
    product.approvalStatus = "approved";
    product.approvalStatusText = "Đã duyệt";
    product.status = 1;
  }

  return {
    success: true,
    message: "Đã duyệt sản phẩm",
  };
};

export const rejectProduct = async (
  productId: number,
  reason: string,
  note?: string
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const product = mockProducts.find((p) => p.id === productId);
  if (product) {
    product.approvalStatus = "rejected";
    product.approvalStatusText = "Đã từ chối";
    product.status = 0;
  }

  return {
    success: true,
    message: "Đã từ chối sản phẩm",
  };
};

export const requestProductChanges = async (
  productId: number,
  changesRequired: string[],
  note?: string
): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const product = mockProducts.find((p) => p.id === productId);
  if (product) {
    product.approvalStatus = "pending_changes";
    product.approvalStatusText = "Yêu cầu chỉnh sửa";
  }

  return {
    success: true,
    message: "Đã gửi yêu cầu chỉnh sửa",
  };
};
