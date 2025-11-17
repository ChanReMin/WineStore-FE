import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/seo';

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified?: Date | string;
};

// Static routes that should always be in the sitemap
const staticRoutes: RouteConfig[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  // Add more static routes here as your app grows
  // { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  // { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  // { path: '/products', priority: 0.9, changeFrequency: 'daily' },
];

// You can fetch dynamic routes from your API/database here
// Example:
// async function getDynamicRoutes(): Promise<RouteConfig[]> {
//   try {
//     const products = await fetchProducts(); // Your API call
//     return products.map((product) => ({
//       path: `/products/${product.slug}`,
//       priority: 0.8,
//       changeFrequency: 'weekly' as const,
//       lastModified: product.updatedAt,
//     }));
//   } catch (error) {
//     console.error('Error fetching dynamic routes:', error);
//     return [];
//   }
// }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = absoluteUrl('/');
  const lastModified = new Date();

  // Build static routes
  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified || lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Uncomment when you have dynamic routes
  // const dynamicRoutes = await getDynamicRoutes();
  // const dynamicSitemapEntries = dynamicRoutes.map((route) => ({
  //   url: absoluteUrl(route.path),
  //   lastModified: route.lastModified || lastModified,
  //   changeFrequency: route.changeFrequency,
  //   priority: route.priority,
  // }));
  // routes.push(...dynamicSitemapEntries);

  return routes;
}
