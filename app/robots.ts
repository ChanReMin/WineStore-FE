import type { MetadataRoute } from 'next';
import { absoluteUrl, seoConfig } from '@/config/seo';

const disallowedPaths = ['/api/private', '/admin'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
    ],
    host: seoConfig.siteUrl,
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
