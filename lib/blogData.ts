export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  categoryLabel: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cach-phan-biet-ruou-vang-do-trang",
    title: "Cách Phân Biệt Rượu Vang Đỏ và Vang Trắng",
    excerpt:
      "Tìm hiểu sự khác biệt cơ bản giữa rượu vang đỏ và vang trắng, từ quy trình sản xuất đến hương vị đặc trưng.",
    content: "",
    image: "/wines/wine-1.jpg",
    category: "education",
    categoryLabel: "Kiến thức",
    author: "Sommelier Minh",
    date: "15/11/2025",
    readTime: "5 phút đọc",
    tags: ["red wine", "white wine", "wine basics"],
  },
  {
    slug: "nghe-thuat-thuong-thuc-ruou-vang",
    title: "Nghệ Thuật Thưởng Thức Rượu Vang Như Chuyên Gia",
    excerpt:
      "Khám phá 5 bước cơ bản để thưởng thức rượu vang đúng cách: quan sát, ngửi, nếm, đánh giá và tận hưởng.",
    content: "",
    image: "/wines/wine-2.jpg",
    category: "tasting",
    categoryLabel: "Thưởng thức",
    author: "Sommelier Linh",
    date: "12/11/2025",
    readTime: "7 phút đọc",
    tags: ["wine tasting", "sommelier tips", "wine appreciation"],
  },
  {
    slug: "ket-hop-ruou-vang-voi-mon-an",
    title: "Kết Hợp Rượu Vang với Món Ăn: Hướng Dẫn Toàn Diện",
    excerpt:
      "Bí quyết kết hợp rượu vang với các món ăn để tạo nên trải nghiệm ẩm thực hoàn hảo.",
    content: "",
    image: "/wines/wine-3.jpg",
    category: "pairing",
    categoryLabel: "Kết hợp món ăn",
    author: "Chef Hùng",
    date: "10/11/2025",
    readTime: "8 phút đọc",
    tags: ["wine pairing", "food and wine", "culinary"],
  },
  {
    slug: "cach-bao-quan-ruou-vang-dung-cach",
    title: "Cách Bảo Quản Rượu Vang Đúng Cách Tại Nhà",
    excerpt:
      "Hướng dẫn chi tiết về nhiệt độ, độ ẩm và vị trí lý tưởng để bảo quản rượu vang lâu dài.",
    content: "",
    image: "/wines/wine-4.jpg",
    category: "storage",
    categoryLabel: "Bảo quản",
    author: "Sommelier Minh",
    date: "08/11/2025",
    readTime: "6 phút đọc",
    tags: ["wine storage", "wine cellar", "preservation"],
  },
  {
    slug: "vung-ruou-vang-noi-tieng-phap",
    title: "Khám Phá Các Vùng Rượu Vang Nổi Tiếng Của Pháp",
    excerpt:
      "Hành trình qua Bordeaux, Burgundy, Champagne và những vùng sản xuất rượu vang danh tiếng nhất nước Pháp.",
    content: "",
    image: "/wines/wine-5.jpg",
    category: "regions",
    categoryLabel: "Vùng miền",
    author: "Travel Wine",
    date: "05/11/2025",
    readTime: "10 phút đọc",
    tags: ["french wine", "wine regions", "bordeaux", "burgundy"],
  },
  {
    slug: "ruou-vang-y-dac-trung-va-phong-cach",
    title: "Rượu Vang Ý: Đặc Trưng và Phong Cách Độc Đáo",
    excerpt:
      "Tìm hiểu về sự đa dạng của rượu vang Ý từ Tuscany đến Piedmont, Veneto và Sicily.",
    content: "",
    image: "/wines/wine-6.jpg",
    category: "regions",
    categoryLabel: "Vùng miền",
    author: "Wine Explorer",
    date: "03/11/2025",
    readTime: "9 phút đọc",
    tags: ["italian wine", "tuscany", "wine regions"],
  },
  {
    slug: "nhiet-do-phuc-vu-ruou-vang-ly-tuong",
    title: "Nhiệt Độ Phục Vụ Rượu Vang Lý Tưởng",
    excerpt:
      "Hướng dẫn chi tiết về nhiệt độ phục vụ tối ưu cho từng loại rượu vang để tận hưởng trọn vẹn hương vị.",
    content: "",
    image: "/wines/wine-1.jpg",
    category: "tasting",
    categoryLabel: "Thưởng thức",
    author: "Sommelier Linh",
    date: "01/11/2025",
    readTime: "5 phút đọc",
    tags: ["serving temperature", "wine tips", "wine service"],
  },
  {
    slug: "chon-ly-ruou-vang-phu-hop",
    title: "Cách Chọn Ly Rượu Vang Phù Hợp",
    excerpt:
      "Tầm quan trọng của việc chọn ly rượu đúng cách và ảnh hưởng của nó đến trải nghiệm thưởng thức.",
    content: "",
    image: "/wines/wine-2.jpg",
    category: "education",
    categoryLabel: "Kiến thức",
    author: "Sommelier Minh",
    date: "28/10/2025",
    readTime: "6 phút đọc",
    tags: ["wine glasses", "glassware", "wine accessories"],
  },
  {
    slug: "ruou-vang-organic-va-biodynamic",
    title: "Rượu Vang Organic và Biodynamic: Xu Hướng Mới",
    excerpt:
      "Tìm hiểu về rượu vang hữu cơ và biodynamic, quy trình sản xuất bền vững và lợi ích cho sức khỏe.",
    content: "",
    image: "/wines/wine-3.jpg",
    category: "education",
    categoryLabel: "Kiến thức",
    author: "Green Wine",
    date: "25/10/2025",
    readTime: "7 phút đọc",
    tags: ["organic wine", "biodynamic", "sustainable"],
  },
];
