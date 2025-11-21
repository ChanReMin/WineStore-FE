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
    slug: "how-to-distinguish-red-and-white-wine",
    title: "How to Distinguish Red and White Wine",
    excerpt:
      "Learn the basic differences between red and white wine, from production methods to characteristic flavors.",
    content: "",
    image: "/wines/wine-1.jpg",
    category: "education",
    categoryLabel: "Knowledge",
    author: "Sommelier Minh",
    date: "15/11/2025",
    readTime: "5 min read",
    tags: ["red wine", "white wine", "wine basics"],
  },
  {
    slug: "art-of-wine-tasting",
    title: "The Art of Wine Tasting Like a Pro",
    excerpt:
      "Discover 5 essential steps to properly enjoy wine: observe, smell, taste, evaluate, and savor.",
    content: "",
    image: "/wines/wine-2.jpg",
    category: "tasting",
    categoryLabel: "Tasting",
    author: "Sommelier Linh",
    date: "12/11/2025",
    readTime: "7 min read",
    tags: ["wine tasting", "sommelier tips", "wine appreciation"],
  },
  {
    slug: "wine-and-food-pairing-guide",
    title: "Wine and Food Pairing: A Complete Guide",
    excerpt:
      "Tips for pairing wine with dishes to create the perfect culinary experience.",
    content: "",
    image: "/wines/wine-3.jpg",
    category: "pairing",
    categoryLabel: "Food Pairing",
    author: "Chef Hùng",
    date: "10/11/2025",
    readTime: "8 min read",
    tags: ["wine pairing", "food and wine", "culinary"],
  },
  {
    slug: "proper-wine-storage-at-home",
    title: "How to Properly Store Wine at Home",
    excerpt:
      "A detailed guide on ideal temperature, humidity, and location for long-term wine storage.",
    content: "",
    image: "/wines/wine-4.jpg",
    category: "storage",
    categoryLabel: "Storage",
    author: "Sommelier Minh",
    date: "08/11/2025",
    readTime: "6 min read",
    tags: ["wine storage", "wine cellar", "preservation"],
  },
  {
    slug: "famous-french-wine-regions",
    title: "Exploring France's Famous Wine Regions",
    excerpt:
      "A journey through Bordeaux, Burgundy, Champagne, and the most renowned wine regions of France.",
    content: "",
    image: "/wines/wine-5.jpg",
    category: "regions",
    categoryLabel: "Regions",
    author: "Travel Wine",
    date: "05/11/2025",
    readTime: "10 min read",
    tags: ["french wine", "wine regions", "bordeaux", "burgundy"],
  },
  {
    slug: "italian-wine-characteristics-and-style",
    title: "Italian Wine: Unique Characteristics and Style",
    excerpt:
      "Learn about the diversity of Italian wines from Tuscany to Piedmont, Veneto, and Sicily.",
    content: "",
    image: "/wines/wine-6.jpg",
    category: "regions",
    categoryLabel: "Regions",
    author: "Wine Explorer",
    date: "03/11/2025",
    readTime: "9 min read",
    tags: ["italian wine", "tuscany", "wine regions"],
  },
  {
    slug: "ideal-wine-serving-temperature",
    title: "Ideal Wine Serving Temperature",
    excerpt:
      "A detailed guide on optimal serving temperatures for different types of wine to fully enjoy their flavors.",
    content: "",
    image: "/wines/wine-1.jpg",
    category: "tasting",
    categoryLabel: "Tasting",
    author: "Sommelier Linh",
    date: "01/11/2025",
    readTime: "5 min read",
    tags: ["serving temperature", "wine tips", "wine service"],
  },
  {
    slug: "choosing-the-right-wine-glass",
    title: "How to Choose the Right Wine Glass",
    excerpt:
      "The importance of selecting the correct glass and its impact on the wine-tasting experience.",
    content: "",
    image: "/wines/wine-2.jpg",
    category: "education",
    categoryLabel: "Knowledge",
    author: "Sommelier Minh",
    date: "28/10/2025",
    readTime: "6 min read",
    tags: ["wine glasses", "glassware", "wine accessories"],
  },
  {
    slug: "organic-and-biodynamic-wine",
    title: "Organic and Biodynamic Wine: The New Trend",
    excerpt:
      "Learn about organic and biodynamic wines, sustainable production methods, and health benefits.",
    content: "",
    image: "/wines/wine-3.jpg",
    category: "education",
    categoryLabel: "Knowledge",
    author: "Green Wine",
    date: "25/10/2025",
    readTime: "7 min read",
    tags: ["organic wine", "biodynamic", "sustainable"],
  },
];

