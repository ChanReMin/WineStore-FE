import type { Metadata } from 'next';

const fallbackSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wine-store.example.com';
const baseSiteUrl = fallbackSiteUrl.replace(/\/$/, '');

export const seoConfig = {
  siteName: 'Wine Store',
  tagline: 'Premium Wine Collection',
  description:
    "Discover premium wines curated from the world's best vineyards. Shop the finest selection of red, white, and sparkling wines delivered to your door.",
  siteUrl: baseSiteUrl,
  locale: 'vi_VN',
  region: 'VN',
  contactEmail: 'support@wine-store.com',
  phone: '+84 028 1234 5678',
  twitterHandle: '@winstore_vn',
  social: {
    facebook: 'https://www.facebook.com/winestore',
    instagram: 'https://www.instagram.com/winestore',
    youtube: 'https://www.youtube.com/@winestore',
  },
  keywords: [
    'wine',
    'red wine',
    'white wine',
    'sparkling wine',
    'premium wine shop',
    'wine store Vietnam',
    'fine wine delivery',
    'sommelier selection',
    'wine online',
    'buy wine online',
    'wine collection',
    'premium wines',
  ],
  logoPath: '/icons/logo.svg',
  ogImagePath: '/og-image.jpg',
};

const buildAbsoluteUrl = (path: string) =>
  new URL(path, `${seoConfig.siteUrl}/`).toString();

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return buildAbsoluteUrl(normalized);
};

const sameAs = Object.values(seoConfig.social);
if (!sameAs.includes(seoConfig.siteUrl)) {
  sameAs.push(seoConfig.siteUrl);
}

export const defaultStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.description,
    logo: absoluteUrl(seoConfig.logoPath),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: seoConfig.contactEmail,
        telephone: seoConfig.phone,
        areaServed: seoConfig.region,
        availableLanguage: ['vi', 'en'],
      },
    ],
    sameAs,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    inLanguage: seoConfig.locale,
    description: seoConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${seoConfig.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: seoConfig.siteName,
    image: absoluteUrl(seoConfig.logoPath),
    '@id': seoConfig.siteUrl,
    url: seoConfig.siteUrl,
    telephone: seoConfig.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'VN',
    },
  },
];

// Helper function to generate metadata for pages
export function generateMetadata({
  title,
  description,
  path = '/',
  image,
  noIndex = false,
  keywords,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}): Metadata {
  const pageTitle = title
    ? `${title} | ${seoConfig.siteName}`
    : `${seoConfig.siteName} - ${seoConfig.tagline}`;
  const pageDescription = description || seoConfig.description;
  const pageImage = image
    ? absoluteUrl(image)
    : absoluteUrl(seoConfig.ogImagePath);
  const pageUrl = absoluteUrl(path);

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords || seoConfig.keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: seoConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

// Helper function to generate structured data for products
export function generateProductStructuredData(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  sku?: string;
  brand?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    sku: product.sku || product.name,
    brand: {
      '@type': 'Brand',
      name: product.brand || seoConfig.siteName,
    },
    category: product.category || 'Wine',
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.sku || product.name}`),
      priceCurrency: product.currency || 'VND',
      price: product.price,
      availability:
        product.availability ||
        'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: seoConfig.siteName,
      },
    },
  };
}

// Helper function to generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const facebookVerification =
  process.env.NEXT_PUBLIC_FACEBOOK_SITE_VERIFICATION;

export const seoVerification: Metadata['verification'] = {
  ...(googleVerification && { google: googleVerification }),
  ...(bingVerification && { bing: bingVerification }),
  ...(facebookVerification && {
    other: {
      'facebook-domain-verification': facebookVerification,
    },
  }),
};

export const themeColor = '#5c0613';
