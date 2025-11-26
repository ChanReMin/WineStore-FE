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
  base_price: number;
  images: string[];
  seller: {
    user_id: number;
    account_id?: number;
    full_name: string;
    email: string;
    phone_number?: string;
    total_products?: number;
    approved_products?: number;
    rejected_products?: number;
    seller_rating?: number;
  };
  approval_status: "pending" | "approved" | "rejected" | "pending_changes";
  approval_status_text: string;
  submitted_at: string;
  created_at: string;
  // Detailed fields
  country_of_production?: string;
  grape_variety?: string;
  concentration?: number;
  production_area?: string;
  vintage_year?: number;
  capacity_ml?: number;
  ideal_temperature?: string;
  storage_notes?: string;
  description?: string;
  status?: number;
}

export interface ProductApprovalsResponse {
  success: boolean;
  data: {
    products: ProductApproval[];
    pagination: {
      current_page: number;
      total_pages: number;
      total_items: number;
    };
    summary: {
      total_pending: number;
      total_approved_today: number;
      total_rejected_today: number;
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
    base_price: 18000000,
    images: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
    ],
    seller: {
      user_id: 456,
      account_id: 123,
      full_name: "Nguyễn Văn A",
      email: "seller@example.com",
      phone_number: "0912345678",
      total_products: 25,
      approved_products: 23,
      rejected_products: 1,
      seller_rating: 4.8,
    },
    approval_status: "pending",
    approval_status_text: "Chờ duyệt",
    submitted_at: "2024-11-24T15:00:00Z",
    created_at: "2024-11-24T14:30:00Z",
    country_of_production: "France",
    grape_variety: "Cabernet Sauvignon, Merlot",
    concentration: 13.5,
    production_area: "Bordeaux",
    vintage_year: 2020,
    capacity_ml: 750,
    ideal_temperature: "16-18°C",
    storage_notes: "Nằm ngang, nhiệt độ ổn định",
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
    base_price: 14000000,
    images: [
      "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
    ],
    seller: {
      user_id: 457,
      full_name: "Trần Thị B",
      email: "tranthib@example.com",
      phone_number: "0923456789",
      total_products: 18,
      approved_products: 16,
      rejected_products: 0,
      seller_rating: 4.6,
    },
    approval_status: "pending",
    approval_status_text: "Chờ duyệt",
    submitted_at: "2024-11-25T09:30:00Z",
    created_at: "2024-11-25T09:00:00Z",
    country_of_production: "Australia",
    grape_variety: "Shiraz",
    concentration: 14.5,
    production_area: "South Australia",
    vintage_year: 2018,
    capacity_ml: 750,
    ideal_temperature: "16-18°C",
    storage_notes: "Bảo quản nơi khô ráo, thoáng mát",
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
    base_price: 25000000,
    images: [
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
    ],
    seller: {
      user_id: 458,
      full_name: "Lê Văn C",
      email: "levanc@example.com",
      total_products: 32,
      approved_products: 30,
      rejected_products: 1,
      seller_rating: 4.9,
    },
    approval_status: "pending",
    approval_status_text: "Chờ duyệt",
    submitted_at: "2024-11-25T11:00:00Z",
    created_at: "2024-11-25T10:45:00Z",
    country_of_production: "USA",
    grape_variety: "Cabernet Sauvignon, Merlot, Cabernet Franc",
    concentration: 14.0,
    production_area: "Napa Valley",
    vintage_year: 2019,
    capacity_ml: 750,
    ideal_temperature: "16-18°C",
    storage_notes: "Nằm ngang, tránh ánh sáng trực tiếp",
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
    base_price: 20000000,
    images: [
      "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=400",
    ],
    seller: {
      user_id: 459,
      full_name: "Phạm Thị D",
      email: "phamthid@example.com",
      total_products: 15,
      approved_products: 14,
      rejected_products: 0,
      seller_rating: 4.7,
    },
    approval_status: "approved",
    approval_status_text: "Đã duyệt",
    submitted_at: "2024-11-20T14:00:00Z",
    created_at: "2024-11-20T13:30:00Z",
    country_of_production: "France",
    grape_variety: "Chardonnay, Pinot Noir",
    concentration: 12.5,
    production_area: "Champagne",
    vintage_year: 2012,
    capacity_ml: 750,
    ideal_temperature: "8-10°C",
    storage_notes: "Bảo quản nơi mát, tránh rung động",
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
    base_price: 17000000,
    images: ["https://images.unsplash.com/photo-1566754436-d9e8c96c4b6e?w=400"],
    seller: {
      user_id: 460,
      full_name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      total_products: 28,
      approved_products: 26,
      rejected_products: 1,
      seller_rating: 4.8,
    },
    approval_status: "rejected",
    approval_status_text: "Đã từ chối",
    submitted_at: "2024-11-22T10:00:00Z",
    created_at: "2024-11-22T09:30:00Z",
    country_of_production: "Italy",
    grape_variety: "Cabernet Sauvignon, Cabernet Franc",
    concentration: 13.5,
    production_area: "Tuscany",
    vintage_year: 2017,
    capacity_ml: 750,
    ideal_temperature: "16-18°C",
    storage_notes: "Nằm ngang, nhiệt độ ổn định",
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
    base_price: 2000000,
    images: [
      "https://images.unsplash.com/photo-1597306691829-6e6c3e6e5e5e?w=400",
    ],
    seller: {
      user_id: 461,
      full_name: "Vũ Thị F",
      email: "vuthif@example.com",
      total_products: 20,
      approved_products: 19,
      rejected_products: 0,
      seller_rating: 4.5,
    },
    approval_status: "pending",
    approval_status_text: "Chờ duyệt",
    submitted_at: "2024-11-25T13:00:00Z",
    created_at: "2024-11-25T12:45:00Z",
    country_of_production: "New Zealand",
    grape_variety: "Sauvignon Blanc",
    concentration: 13.0,
    production_area: "Marlborough",
    vintage_year: 2021,
    capacity_ml: 750,
    ideal_temperature: "8-10°C",
    storage_notes: "Bảo quản nơi mát, tránh ánh sáng",
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
    base_price: 9500000,
    images: ["https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400"],
    seller: {
      user_id: 462,
      full_name: "Đặng Văn G",
      email: "dangvang@example.com",
      total_products: 22,
      approved_products: 21,
      rejected_products: 0,
      seller_rating: 4.6,
    },
    approval_status: "pending",
    approval_status_text: "Chờ duyệt",
    submitted_at: "2024-11-25T14:30:00Z",
    created_at: "2024-11-25T14:00:00Z",
    country_of_production: "Italy",
    grape_variety: "Sangiovese, Cabernet Sauvignon, Cabernet Franc",
    concentration: 13.5,
    production_area: "Tuscany",
    vintage_year: 2018,
    capacity_ml: 750,
    ideal_temperature: "16-18°C",
    storage_notes: "Nằm ngang, nhiệt độ ổn định",
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
  category_id?: number;
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
      (product) => product.approval_status === status
    );
  }

  // Sort
  filteredProducts.sort((a, b) => {
    const dateA = new Date(a.submitted_at).getTime();
    const dateB = new Date(b.submitted_at).getTime();
    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Calculate summary
  const summary = {
    total_pending: mockProducts.filter((p) => p.approval_status === "pending")
      .length,
    total_approved_today: mockProducts.filter(
      (p) => p.approval_status === "approved"
    ).length,
    total_rejected_today: mockProducts.filter(
      (p) => p.approval_status === "rejected"
    ).length,
  };

  return {
    success: true,
    data: {
      products: paginatedProducts,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(filteredProducts.length / limit),
        total_items: filteredProducts.length,
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
    product.approval_status = "approved";
    product.approval_status_text = "Đã duyệt";
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
    product.approval_status = "rejected";
    product.approval_status_text = "Đã từ chối";
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
    product.approval_status = "pending_changes";
    product.approval_status_text = "Yêu cầu chỉnh sửa";
  }

  return {
    success: true,
    message: "Đã gửi yêu cầu chỉnh sửa",
  };
};
