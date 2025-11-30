// Mock data để test UI
export const MOCK_PRODUCTS = [
  {
    id: 12,
    name: "Château Margaux 2015",
    slug: "chateau-margaux-2015",
    thumbnail:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    price: 5900000,
    basePrice: 6500000,
    countryOfProduction: "France",
    concentration: 13.5,
    brand: { id: 1, name: "Château Margaux" },
  },
  {
    id: 13,
    name: "Penfolds Bin 389",
    slug: "penfolds-bin-389",
    thumbnail:
      "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400",
    price: 3200000,
    basePrice: 3500000,
    countryOfProduction: "Australia",
    concentration: 14.5,
    brand: { id: 2, name: "Penfolds" },
  },
  {
    id: 14,
    name: "Robert Mondavi Cabernet Sauvignon",
    slug: "robert-mondavi-cabernet",
    thumbnail:
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400",
    price: 1800000,
    basePrice: 2000000,
    countryOfProduction: "USA",
    concentration: 13.8,
    brand: { id: 3, name: "Robert Mondavi" },
  },
  {
    id: 15,
    name: "Domaine de la Romanée-Conti",
    slug: "romanee-conti",
    thumbnail:
      "https://images.unsplash.com/photo-1566754436900-c7f7f1b7e9b3?w=400",
    price: 12000000,
    basePrice: 13000000,
    countryOfProduction: "France",
    concentration: 13.0,
    brand: { id: 1, name: "Château Margaux" },
  },
  {
    id: 16,
    name: "Opus One 2018",
    slug: "opus-one-2018",
    thumbnail:
      "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400",
    price: 8500000,
    basePrice: 9000000,
    countryOfProduction: "USA",
    concentration: 14.0,
    brand: { id: 3, name: "Robert Mondavi" },
  },
  {
    id: 17,
    name: "Grange Hermitage",
    slug: "grange-hermitage",
    thumbnail:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400",
    price: 4500000,
    basePrice: 5000000,
    countryOfProduction: "Australia",
    concentration: 14.8,
    brand: { id: 2, name: "Penfolds" },
  },
  {
    id: 18,
    name: "Château Lafite Rothschild",
    slug: "lafite-rothschild",
    thumbnail:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
    price: 7200000,
    basePrice: 8000000,
    countryOfProduction: "France",
    concentration: 12.8,
    brand: { id: 1, name: "Château Margaux" },
  },
  {
    id: 19,
    name: "Screaming Eagle Cabernet",
    slug: "screaming-eagle",
    thumbnail:
      "https://images.unsplash.com/photo-1598524722956-30b3a4a0c3ca?w=400",
    price: 15000000,
    basePrice: 16000000,
    countryOfProduction: "USA",
    concentration: 14.2,
    brand: { id: 3, name: "Robert Mondavi" },
  },
];

export const MOCK_BRANDS = [
  { id: 1, name: "Château Margaux", country: "France" },
  { id: 2, name: "Penfolds", country: "Australia" },
  { id: 3, name: "Robert Mondavi", country: "USA" },
  { id: 4, name: "Antinori", country: "Italy" },
  { id: 5, name: "Torres", country: "Spain" },
];

export const MOCK_CATEGORIES = [
  {
    id: 1,
    name: "Vang Pháp",
    slug: "vang-phap",
    children: [
      { id: 2, name: "Bordeaux", slug: "bordeaux" },
      { id: 3, name: "Burgundy", slug: "burgundy" },
    ],
  },
  {
    id: 4,
    name: "Vang Úc",
    slug: "vang-uc",
    children: [],
  },
  {
    id: 5,
    name: "Vang Mỹ",
    slug: "vang-my",
    children: [],
  },
];

export const MOCK_PRODUCT_DETAIL = {
  id: 12,
  name: "Château Margaux 2015",
  price: 5900000,
  basePrice: 6500000,
  winetype: "Vang đỏ",
  countryOfProduction: "France",
  grapeVariety: "Cabernet Sauvignon",
  concentration: 13.5,
  productionArea: "Bordeaux",
  capacity: 750,
  idealtemperature: "15-18°C",
  humidity: "60-70%",
  avoidLight: "Tránh ánh sáng trực tiếp",
  placeTheBottleHorizontally: "Đặt chai nằm ngang",
  avoidVibration: "Tránh rung động",
  openedWine: "Sử dụng trong 3-5 ngày",
  useWineCabinet: "Nên sử dụng tủ rượu chuyên dụng",
  images: [
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
    "https://images.unsplash.com/photo-1566754436900-c7f7f1b7e9b3?w=800",
  ],
  description:
    "Château Margaux 2015 là một trong những chai vang đỏ xuất sắc nhất từ vùng Bordeaux, Pháp. Với hương vị phức tạp và cấu trúc hoàn hảo, đây là lựa chọn tuyệt vời cho những dịp đặc biệt.",
  brand: { id: 1, name: "Château Margaux", country: "France" },
  category: { id: 1, name: "Vang Pháp" },
  inventory: { totalquantity: 100, available: true },
  promotions: [
    {
      id: 1,
      code: "SUMMER2024",
      name: "Giảm giá mùa hè",
      discount_type: 1,
      discount_value: 10,
    },
  ],
};
