export interface BlogPost {
  slug: string;
  postIndex: number;
  image: string;
  category: string;
  categoryLabel: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-distinguish-red-and-white-wine",
    postIndex: 0,
    image: "/wines/wine-1.jpg",
    category: "education",
    categoryLabel: "Knowledge",
  },
  {
    slug: "art-of-wine-tasting",
    postIndex: 1,
    image: "/wines/wine-2.jpg",
    category: "tasting",
    categoryLabel: "Tasting",
  },
  {
    slug: "wine-and-food-pairing-guide",
    postIndex: 2,
    image: "/wines/wine-3.jpg",
    category: "pairing",
    categoryLabel: "Food Pairing",
  },
  {
    slug: "proper-wine-storage-at-home",
    postIndex: 3,
    image: "/wines/wine-4.jpg",
    category: "storage",
    categoryLabel: "Storage",
  },
  {
    slug: "famous-french-wine-regions",
    postIndex: 4,
    image: "/wines/wine-5.jpg",
    category: "regions",
    categoryLabel: "Regions",
  },
  {
    slug: "italian-wine-characteristics-and-style",
    postIndex: 5,
    image: "/wines/wine-6.jpg",
    category: "regions",
    categoryLabel: "Regions",
  },
  {
    slug: "ideal-wine-serving-temperature",
    postIndex: 6,
    image: "/wines/wine-1.jpg",
    category: "tasting",
    categoryLabel: "Tasting",
  },
  {
    slug: "choosing-the-right-wine-glass",
    postIndex: 7,
    image: "/wines/wine-2.jpg",
    category: "education",
    categoryLabel: "Knowledge",
  },
  {
    slug: "organic-and-biodynamic-wine",
    postIndex: 8,
    image: "/wines/wine-3.jpg",
    category: "education",
    categoryLabel: "Knowledge",
  },
];

